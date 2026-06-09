import { Link } from "react-router-dom"


const Register = () => {

    const handleSubmit =(e)=>{
        e.preventDefault()
    }

    // const navigate = useNavigate()

  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>

            <form onSubmit={handleSubmit} >
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="username" id="username" name="username" placeholder="Enter your username" required />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required />
                </div>

                <button className="button primary-button" >Register</button>
            </form>

            <p>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
    </main>
  )
}

export default Register
