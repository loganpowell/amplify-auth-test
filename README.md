https://literal.io/writing/implementing-guest-authentication-with-amplify-cognito-appsync

https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-the-id-token.html
https://openid.net/specs/openid-connect-core-1_0.html#SelfIssuedValidation

As documented in the [AppSync Resolver Context Reference],
the identity context included with a request against AppSync
from an unauthenticated Cognito identity (i.e. IAM
authentication) has the following shape:

```json
{
    "accountId": "string",
    "cognitoIdentityPoolId": "string",
    "cognitoIdentityId": "string",
    // IP address(es) of request
    "sourceIp": ["string"],
    // IAM user principal
    "username": "string",
    "userArn": "string",
    // authenticated/unauthenticated based on the identity type
    "cognitoIdentityAuthType": "string",
    // the auth provider that was used to obtain the credentials
    "cognitoIdentityAuthProvider": "string"
}
```

[appsync resolver context reference]: https://docs.aws.amazon.com/appsync/latest/devguide/resolver-context-reference.html#aws-appsync-resolver-context-reference-identity

While the identity context of a request from an
authenticated Cognito identity (i.e. Cognito User Pool
authentication) looks like the following:

```json
{
    "sub" : "uuid",
    "issuer" : "string",
    "username" : "string",
    // JWT Claims
    "claims" : { ... },
    "sourceIp" : ["x.x.x.x"],
    "defaultAuthStrategy" : "string"
}
```

## JWT Claims

```json
// example claims
{
    "aud": "54irqi949savl6teqdhr5heq4",
    "auth_time": 1645633173,
    "cognito:username": "87f4282b-d938-4891-9338-3f707f6beae8",
    "email": "loganpowell@gmail.com",
    "email_verified": true,
    "event_id": "208112c7-5e35-4de6-b3a9-f0839c29a438",
    "exp": 1645636803,
    "iat": 1645633173,
    "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_xDz7AncLG",
    "jti": "77d83aa0-9c12-4aca-8386-b1d783f9f444",
    "origin_jti": "098244cf-1c02-47c4-b33e-d7fa387ca912",
    "sub": "87f4282b-d938-4891-9338-3f707f6beae8",
    "token_use": "id"
}
```

| key                | translation       | Cognito use                                                         |
| ------------------ | ----------------- | ------------------------------------------------------------------- |
| `aud`              | Audience          | contains `client_id` (must match an entry configured in authorizer) |
| `auth_time`        |                   | Date.now() of auth time / refresh token issuance                    |
| `cognito:username` |                   | username in Cognito                                                 |
| `email`            |                   | user email address                                                  |
| `email_verified`   |                   | boolean                                                             |
| `event_id`         | Auth event ID     | unique ID of                                                        |
| `exp`              | Expiration        | auth time + TTL                                                     |
| `iat`              | Initial Auth Time | Date.now() of auth time (before current time)                       |
| `given_name`       |                   | Name user input                                                     |
| `iss`              | Issuer            | User ID Pool URL (+region) must match configured issuer             |
| `jti`              | JWT ID            | Unique ID of JWT                                                    |
| `origin_jti`       | JWT ID Origin     | ID of the JWT originator                                            |
| `sub`              | Subject           | User ID                                                             |
| `token_use`        | Purpose           | "id"                                                                |

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

## AppSync

### Context

#### Example

```json
{
    "arguments": {
        "id": "1234"
    },
    "source": {},
    "result": {
        "postId": "1234",
        "title": "Some title",
        "content": "Some content",
        "author": {
            "id": "5678",
            "name": "Author Name"
        }
    },
    "identity": {
        "sourceIp": ["x.x.x.x"],
        "userArn": "arn:aws:iam::123456789012:user/appsync",
        "accountId": "666666666666",
        "user": "AIDAAAAAAAAAAAAAAAAAA"
    }
}
```

### Authorization

#### Using IAM

```json
{
    "accountId": "string",
    "cognitoIdentityAuthProvider": "string" // the auth provider that was used to obtain the credentials
    "cognitoIdentityAuthType": "string", // authenticated/unauthenticated based on the identity type
    "cognitoIdentityId": "string",
    "cognitoIdentityPoolId": "string",
    "sourceIp": ["string"],
    "userArn": "string",
    "username": "string", // IAM user principal
}
```

#### Using Cognito User Pools

```json
{
    "claims" : { ... },
    "defaultAuthStrategy" : "string"
    "issuer" : "string",
    "sourceIp" : ["x.x.x.x"],
    "sub" : "uuid",
    "username" : "string",
}
```

# Authorization Flow

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

## Guest Access

```diff
# Authentication
SEQUENCE No.            :  001 002 003 004  :
+ IAM                   :       i---o       :
+ Cognito               :       |   |       :
    - User Pools        :   i---o   i---o   :
    - Identity Pools    :   |           |   :
+ AppSync               :   |           |   :
    - graphql_api       :   o           i   :

# Authorization
SEQUENCE No.            :  001 002 003 004  :
+ IAM                   :       i---o       :
+ Cognito               :       |   |       :
    - User Pools        :       |   |       :
    - Identity Pools    :   i---o   i---o   :
+ AppSync               :   |           |   :
    - graphql_api       :   o           i   :
```

## Publication Event

```diff
- Actor                 :  001 002 003 004 005 006 007 008 009 010  :
+ Cognito               :                                           :
    - IAM               :                                           :
    - Identity Pools    :               i---o                       :
+ AppSync               :               :   :                       :
    + graphql_api       :               i---o---i---o***i---o       :
        - context       :               |   i---o   |   |   |       :
    - admin_queries     :               |           |   |   |       :
+ DynamoDB              :               |           |   |   |       :
    - Groups            :               |           |   |   |       :
    + Nodes             :               |           i---o   |       :
        - Assets        :               |                   |       :
    - Edges             :               |                   |       :
    - Events            O   o           |                   |       :
+ DynamoDB Stream       :   |           |                   |       :
    - STATUS_CHANGED    :   i---o       |                   |       :
+ SNS (topics)          :       |       |                   |       :
    - NODE_PUBLISHED    :       i---o   |                   |       :
+ Lambda                :           |   |                   |       :
    - Publisher         A           i---o*******************i---o   :
+ Cloudwatch            :                                       |   :
    - Logs              :                                       i   :
    - Metrics           :                                           :
```

| seq | `o`: output                                            | `i`: input                                 |
| --- | ------------------------------------------------------ | ------------------------------------------ |
| 001 | Event: `{ Type: NODE_PUBLISHED, scope: [Node]` }       | DynamoDB Streams: `NODE_PUBLISHED`         |
| 002 | DynamoDB Streams: event emitted to SNS                 | SNS: receives event                        |
| 003 | SNS Topic: NODE_PUBLISHED                              | Lambda: update: `NODE_PUBLISHED`: [`Node`] |
| 004 | Lambda: batch gql update Nodes' `groups` [IAM]+Viewers | AppSync: receives gql with [owner creds]   |
| 005 | AppSync: [context]: JWT: checks authorized creds       | `context`: compared against owner creds    |
| 006 | Appsync: Confirmation of permissions                   | GraphQL: mutation authorized               |
| 007 | GraphQL: Mutation sent to update Node(s) to allow      | DynamoDB: mutations transaction received   |
| 008 | DynamoDB: mutations executed on relevant Nodes         | GraphQL: acknowledges mutation             |
| 009 | Appsync: sends response back through API to lambda     | Lambda: receives API response              |
| 010 | Lambda: console.log()s any metadata                    | Cloudwatch: records any logs from lambda   |

[iam]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_tags.html
[context]: https://docs.aws.amazon.com/appsync/latest/devguide/resolver-context-reference.html#aws-appsync-resolver-context-reference-identity
[owner creds]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags_roles.html#id_tags_roles_procs-console

## Tracking Circuit

```diff
- Actor                 :  001 002 003 004 005 006 007 008 009 010  :
+ Cognito               :
    - IAM               :
    - Identity Pools    :
+ AppSync               :
    + graphql_api       :
        - context       :
    - admin_queries     :
+ DynamoDB              :
    - Groups            :
    + Nodes             :
        - Assets        :
    - Edges             :
    - Events            :
+ DynamoDB Stream       :
    - STATUS_CHANGED    :
+ SNS (topics)          :
    - NODE_PUBLISHED    :
    - EMAIL_SENT        :   i # <==
    - EMAIL_INBOUND     :   i # <==
+ Lambda                :
    - Publisher         :
+ Cloudwatch            : 
    - Logs              :
    - Metrics           :
+ Pinpoint              :
    - SnsDestination    :
    - Analytics         :                           i---o
    - Responses         :                           i---o
    - Endpoints         :   i---o                   |   |
    - A/B test          :   |   |                   |   |
    - Segmentation      :   |   |                   |   |
+ SES                   :   |   |                   |   |
    - Transactional     :   |   i---o           o---i   i---o
    - Broadcast         :   |       |           |           |
+ Triggers              :   |       |           |           |
    - Schedule          :   |       |           |           |
+ SES                   :   |       i---o   i---o           i---o
+ SMS                   :   |           |   |                   |
+ Shooter               A   |           |   |                   |
    - email provider    :   o           |   |                   i
+ Target                :               |   |
    - phone             :               |   |
    - email provider    :               i---o
    - network           :
+ React                 :
    - cookies           :
```

| seq.   | Desription |
| ------ | ---------- |
| 001`o` |            |
| 001`i` |            |
| 002`o` |            |
| 002`i` |            |
| 003`o` |            |
| 003`i` |            |
| 004`o` |            |
| 004`i` |            |
| 005`o` |            |
| 005`i` |            |
| 006`o` |            |
| 006`i` |            |
| 007`o` |            |
| 007`i` |            |
| 008`o` |            |
| 008`i` |            |
| 009`o` |            |
| 009`i` |            |
| 010`o` |            |
| 010`1` |            |

## Changing exported resolver names to remove pre extension dots

```sh
autoload -U zmv
zmv '(*).(*)' '${1//./_}.$2'
```
