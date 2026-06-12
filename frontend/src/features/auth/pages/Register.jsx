import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"


const Register = () => {

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setpassword]=("")
    const navigate = useNavigate()

    const {loading,handleRegister} = useAuth()

    const handleSubmit =async (e)=>{
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate('/')
    }

    if(loading){
        return(<main><h1>Loading......</h1></main>)
    }

    // const navigate = useNavigate()

  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>

            <form onSubmit={handleSubmit} >
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input onChange={(e)=>{setUsername(e.target.value)}} type="username" id="username" name="username" placeholder="Enter your username" required />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}} type="email" id="email" name="email" placeholder="Enter your email" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e)=>{setpassword(e.target.value)}} type="password" id="password" name="password" placeholder="Enter your password" required />
                </div>

                <button className="button primary-button" >Register</button>
            </form>

            <p>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
    </main>
  )
}

export default Register
