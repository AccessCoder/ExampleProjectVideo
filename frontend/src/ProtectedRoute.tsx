import {Navigate, Outlet} from "react-router-dom";

type ProtectedRouteProps = {
    username : string|undefined|null
}

export default function ProtectedRoute(props:Readonly<ProtectedRouteProps>){

    // if (props.username === undefined){
    //     return <p>Loading</p>
    // }


    return(
        <>
            {props.username ? <Outlet/> : <Navigate to={"/"}/>}
        </>
    )
}