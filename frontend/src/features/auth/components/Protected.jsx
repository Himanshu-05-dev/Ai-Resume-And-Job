import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
// import Login from "../pages/Login";


const Protected = ({children}) => {

    const {loading,user} = useAuth()

    if(loading){
        return(<main><h1>Laoding......</h1></main>)
    }

    if(!user){
        console.log(user)
        return <Navigate to={"/login"} />
    }

    return children
}

export default Protected
