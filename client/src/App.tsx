import { useState, useEffect } from "react"
import logo from "./logo.svg"
import "./App.css"
import Amplify from "@aws-amplify/core"
import { API, graphqlOperation, Auth } from "aws-amplify"
import {} from "../graphql/mutations"
import { listNodes } from "../graphql/queries"
import aws_exports from "../../src/aws-exports"
import { withAuthenticator } from "@aws-amplify/ui-react"
import CryptoJS from "crypto-js"
import "@aws-amplify/ui-react/styles.css"

/** 
const current_time = ~~(Date.now() / 1000)
const exp = current_time + 3600

const public_dummy = {
    aud: "54irqi949savl6teqdhr5heq4",
    auth_time: current_time - 30,
    "cognito:username": "87f4282b-d938-4891-9338-3f707f6beae8",
    email_verified: true,
    event_id: "208112c7-5e35-4de6-b3a9-f0839c29a438",
    exp,
    email: "loganpowell@gmail.com",
    iss: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_xDz7AncLG",
    iat: current_time - 30,
    jti: "77d83aa0-9c12-4aca-8386-b1d783f9f444",
    origin_jti: "098244cf-1c02-47c4-b33e-d7fa387ca912",
    sub: "87f4282b-d938-4891-9338-3f707f6beae8",
    token_use: "id",
}
function base64url(source) {
    // Encode in classical base64
    const encodedSource = CryptoJS.enc.Base64.stringify(source)
        // Remove padding equal characters
        .replace(/=+$/, "")
        // Replace characters according to base64url specifications
        .replace(/\+/g, "-")
        .replace(/\//g, "_")

    return encodedSource
}

var header = {
    alg: "HS256",
    typ: "JWT",
}

var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header))
var encodedHeader = base64url(stringifiedHeader)

var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(public_dummy))
var encodedData = base64url(stringifiedData)

var token = encodedHeader + "." + encodedData
*/

const new_config = {
    ...aws_exports,
    // fix for ownerField resolution provided by:
    // https://github.com/aws-amplify/amplify-cli/issues/3794#issuecomment-606757449
    graphql_headers: async () => {
        try {
            /**
             * TODO: when optional chaining evals to undefined
             * return a short jwt like string to use for auth
             */
            const token = (await Auth.currentSession()).getIdToken().getJwtToken()
            console.log({ token })
            return { Authorization: token }
        } catch (e) {
            console.log("unauthenticated user")
            return { Authorization: Auth }
        }
    },
}

Amplify.configure(new_config)
//Auth.configure(new_config)

const Protected = ({ signOut, user }) => {
    return (
        <>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign Out</button>
        </>
    )
}

const Tell = withAuthenticator(Protected)
function App() {
    //console.log({ user })
    const [count, setCount] = useState(0)
    const [user, setUser] = useState("")

    //console.log({ token })
    useEffect(() => {
        const getAuth = async () => {
            try {
                const token = (await Auth.currentSession()).getIdToken().getJwtToken()
                //console.log({ token })
                console.log("logged in:", Auth.currentCredentials())
                console.log()
                setUser(JSON.stringify(token))
            } catch (e) {
                const currentCredentials = await Auth.currentCredentials()
                const auth = await Auth.currentUserCredentials()
                console.log("Please login user")
                console.log({ Auth })
                console.log({ auth })
                console.log({ currentCredentials })

                //setUser(JSON.stringify(Auth))
            }
        }

        getAuth()
            // make sure to catch any error
            .catch(console.error)
    }, [count])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Tell />
                <pre>{user}</pre>
                <p>
                    <button type="button" onClick={() => setCount(count => count + 1)}>
                        count is: {count}
                    </button>
                </p>
                <p>
                    Edit <code>App.tsx</code> and save to test HMR updates.
                </p>
                <p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    {" | "}
                    <a
                        className="App-link"
                        href="https://vitejs.dev/guide/features.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Vite Docs
                    </a>
                </p>
            </header>
        </div>
    )
}

export default App
