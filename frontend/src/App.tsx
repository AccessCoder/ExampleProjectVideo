import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import HelloPage from "./HelloPage.tsx";
import ByePage from "./ByePage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Navbar from "./Navbar.tsx";

function App() {

    const [username, setUsername] = useState<string|undefined|null>(undefined)

    function login() {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin
        window.open( host + "/oauth2/authorization/github", "_self")
    }

    function logout() {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin
        window.open( host + "/logout", "_self")
    }

    useEffect(()=> {
        axios.get("/api/auth")
            .then(r => setUsername(r.data))
    }, [])
  return (
    <>
     <button onClick={login}>Login</button>
     <button onClick={logout}>Logout</button>
        <h1>{username}</h1>

        <Navbar/>
        <Routes>
            <Route path={"/"} element={<HelloPage/>}/>

            <Route element={<ProtectedRoute username={username}/>}>
            <Route path={"/bye"} element={<ByePage/>}/>
            </Route>
        </Routes>
    </>
  )
}

export default App
