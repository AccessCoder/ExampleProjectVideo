import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [username, setUsername] = useState<string>("")

    function login() {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin
        window.open( host + "/oauth2/authorization/github", "_self")
    }

    useEffect(()=> {
        axios.get("api/auth")
            .then(r => setUsername(r.data))
    }, [])
  return (
    <>
     <button onClick={login}>Login</button>
        <h1>{username}</h1>
    </>
  )
}

export default App
