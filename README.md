https://literal.io/writing/implementing-guest-authentication-with-amplify-cognito-appsync

https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-the-id-token.html
https://openid.net/specs/openid-connect-core-1_0.html#SelfIssuedValidation

```js
const unauth = {
    aud: "54irqi949savl6teqdhr5heq4",
    auth_time: 1645633173,
    "cognito:username": "87f4282b-d938-4891-9338-3f707f6beae8",
    email_verified: true,
    event_id: "208112c7-5e35-4de6-b3a9-f0839c29a438",
    exp: 1645636803,
    email: "loganpowell@gmail.com",
    iss: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_xDz7AncLG",
    iat: 1645633173,
    jti: "77d83aa0-9c12-4aca-8386-b1d783f9f444",
    origin_jti: "098244cf-1c02-47c4-b33e-d7fa387ca912",
    sub: "87f4282b-d938-4891-9338-3f707f6beae8",
    token_use: "id",
}

const auth = {
    sub: "87f4282b-d938-4891-9338-3f707f6beae8",
    email_verified: true,
    iss: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_xDz7AncLG",
    "cognito:username": "87f4282b-d938-4891-9338-3f707f6beae8",
    origin_jti: "ff938f9e-15f9-43a9-a97c-ce13d2c6ba36",
    aud: "54irqi949savl6teqdhr5heq4",
    event_id: "7624fbba-bca8-4665-be84-f347432d1d0e",
    token_use: "id",
    auth_time: 1645633263,
    exp: 1645636863,
    iat: 1645633263,
    jti: "28cd98a7-3eba-4607-9622-39231c6910fe",
    email: "loganpowell@gmail.com",
}
```

-   `sub`: Subject = User ID
-   `aud`: Audience = Must match one of the audience entries
    that is configured for the authorizer. contains the
    `client_id` that is used in the user authentication
-   `email_verified`: boolean
-   `token_use`: "id"
-   `auth_time`: Authentication time: time when auth occured
    UTC (Unix) Date.now()
-   `iss`: Issuer = Must match the issuer that is configured
    for the authorizer.
-   `cognito:username": username in cognito
-   `exp`: Must be after the current time in UTC.
-   `given_name`: User Name
-   `iat`: Must be before the current time in UTC.
-   `email`: email address

| key                | translation   | Cognito use                |
| ------------------ | ------------- | -------------------------- |
| `aud`              | Audience      | contains `client_id`       |
| `auth_time`        | apparent      | Date.now() of creation     |
| `cognito:username` | apparent      | username (human readable)  |
| `email_verified`   | apparent      | boolean                    |
| `event_id`         | Auth event ID |
| `exp`              | Expiration    | Date.now() + TTL           |
| `given_name`       | apparent      | user input                 |
| `iss`              | Issuer        | User ID Pool URL (+region) |
| `origin_jti`       | JWT ID Origin |
| `sub`              | Subject       | User ID                    |
| `token_use`        | Purpose       | "id"                       |

The Client MUST validate that the value of the iss (issuer)
Claim is https://self-isued.me. If iss contains a different
value, the ID Token is not Self-Issued, and instead it MUST
be validated according to Section 3.1.3.7. The Client MUST
validate that the aud (audience) Claim contains the value of
the redirect_uri that the Client sent in the Authentication
Request as an audience. The Client MUST validate the
signature of the ID Token according to JWS [JWS] using the
algorithm specified in the alg Header Parameter of the JOSE
Header, using the key in the sub_jwk Claim; the key is a
bare key in JWK format (not an X.509 certificate value). The
alg value SHOULD be the default of RS256. It MAY also be
ES256. The Client MUST validate that the sub Claim value is
the base64url encoded representation of the thumbprint of
the key in the sub_jwk Claim, as specified in Section 7.4.
The current time MUST be before the time represented by the
exp Claim (possibly allowing for some small leeway to
account for clock skew). The iat Claim can be used to reject
tokens that were issued too far away from the current time,
limiting the amount of time that nonces need to be stored to
prevent attacks. The acceptable range is Client specific.

## Changing exported resolver names to remove pre extension dots

```sh
autoload -U zmv
zmv '(*).(*)' '${1//./_}.$2'
```

## AppSync

### Authorization

#### Using IAM

```json
{
    "accountId": "string",
    "cognitoIdentityPoolId": "string",
    "cognitoIdentityId": "string",
    "sourceIp": ["string"],
    "username": "string", // IAM user principal
    "userArn": "string",
    "cognitoIdentityAuthType": "string", // authenticated/unauthenticated based on the identity type
    "cognitoIdentityAuthProvider": "string" // the auth provider that was used to obtain the credentials
}
```

#### Using Cognito User Pools

```json
{
    "sub" : "uuid",
    "issuer" : "string",
    "username" : "string",
    "claims" : { ... },
    "sourceIp" : ["x.x.x.x"],
    "defaultAuthStrategy" : "string"
}
```

#### Authorization Flow

Amplify Guest Users: How to Give Limited Access to Users without Logging In: https://youtu.be/lMOVP1Y8vOc?t=431

**Publication**

```sh
=== KEY ===

- S: SuperAdmin
- A: Admin
- O: Owner
- E: Editor
- R: Reader
- P: Public

  Actor                 :
+ Cognito               :
    - IAM               : Unauthenticated user access
    - User Pools        : Authenticated user access
+ AppSync               :
    - graphql_api       : Access to state database
    - admin_queries     : Access to Cognito database
+ DynamoDB              :
    - Groups            : Who has access to/permissions against the state
    + Nodes             : What are the subjects/objects of the state
        - Assets        : What are the details of the subjects/objects
    - Edges             : How/where objects/subjects of state relate
    - Events            : When shared state is updated (CR only)
+ DynamoDB Stream       :
    - Events            : FIFO stream of Event CUD actions -> SNS
+ SNS (topics)          : PubSub (FIFO) topic-based push vehicle
    - NODE_PUBLISHED    : Topic: Can contain one or more Nodes to update
+ Lambda                :
    - Publisher         : Updates [Node(s)] in a single gql(aliased) batch op
+ Cloudwatch            :
    - Logs              : Simple console.log(x)s from Node.js
    - Metrics           : Traffic metrics
+ Pinpoint              :
    - Segmentation      : User differentiation categories
+ SES                   : Connected to Pinpoint and Cognito provide personalization
    - Transactional     : For individually personalized emails
    - Broadcast         : For segmented (campaign) emails
+ Triggers              :
    - Scheduled         :
+ SMS                   :

```

```diff
# Publication Event Workflow

- Actor                 :  001 002 003 004 005 006 007 008 009 010 011 012  :
+ Cognito               :                                                   :
    - IAM               :                                                   :
    - User Pools        :                   i---o                           :
+ AppSync               :                   |   |                           :
    - graphql_api       :               i---o***i---o***i---o***i---o       :
    - admin_queries     :               |           |   |   |   |   |       :
+ DynamoDB              :               |           |   |   |   |   |       :
    - Groups            :               |           i---o   |   |   |       :
    + Nodes             :               |                   i---o   |       :
        - Assets        :               |                           |       :
    - Edges             :               |                           |       :
    - Events            O   o           |                           |       :
+ DynamoDB Stream       :   |           |                           |       :
    - STATUS_CHANGED    :   i---o       |                           |       :
+ SNS (topics)          :       |       |                           |       :
    - NODE_PUBLISHED    :       i---o   |                           |       :
+ Lambda                :           |   |                           |       :
    - Publisher         A           i---o***************************i---o   :
+ Cloudwatch            :                                               |   :
    - Logs              :                                               i   :
    - Metrics           :                                                   :
+ Pinpoint              :                                                   :
    - Segmentation      :                                                   :
+ SES                   :                                                   :
    - Transactional     :                                                   :
    - Broadcast         :                                                   :
+ Triggers              :                                                   :
    - Schedule          :                                                   :
+ SMS                   :                                                   :

```

```diff
# Owner Sharing Event Workflow

- Actor                 :  001 002 003 004 005 006 007 008 009 010 011 012  :
+ Cognito               :                                                   :
    - IAM               :                                                   :
    - User Pools        :                   i---o                           :
+ AppSync               :                   |   |                           :
    - graphql_api       :               i---o***i---o***i---o***i---o       :
    - admin_queries     :               |           |   |   |   |   |       :
+ DynamoDB              :               |           |   |   |   |   |       :
    - Groups            :               |           i---o   |   |   |       :
    + Nodes             :               |                   i---o   |       :
        - Assets        :               |                           |       :
    - Edges             :               |                           |       :
    - Events            O   o           |                           |       :
+ DynamoDB Stream       :   |           |                           |       :
    - STATUS_CHANGED    :   i---o       |                           |       :
+ SNS (topics)          :       |       |                           |       :
    - NODE_PUBLISHED    :       i---o   |                           |       :
+ Lambda                :           |   |                           |       :
    - Publisher         A           i---o***************************i---o   :
+ Cloudwatch            :                                               |   :
    - Logs              :                                               i   :
    - Metrics           :                                                   :
+ Pinpoint              :                                                   :
    - Segmentation      :                                                   :
+ SES                   :                                                   :
    - Transactional     :                                                   :
    - Broadcast         :                                                   :
+ Triggers              :                                                   :
    - Schedule          :                                                   :
+ SMS                   :                                                   :

```
