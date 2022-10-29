import {Container} from "react-bootstrap";
import {DependabotIcon} from '@primer/octicons-react'
import {Link} from "react-router-dom"

function SignUpNavBar(){
    return(
        <div className="navBarSignUp" >
        <Link to="/" className="blackLink">
            <DependabotIcon size={36} style={{display: "inline-block"}}/>
            <h1 style={{display: "inline-block"}}>Draw</h1>
        </Link>
        </div>
    );
}

export default SignUpNavBar;