import {Link} from "react-router-dom";

export default function Navbar(){


    return(
        <>
            <Link to={"/"}>Hello</Link>
            <Link to={"/bye"}>Bye</Link>
        </>
    )
}