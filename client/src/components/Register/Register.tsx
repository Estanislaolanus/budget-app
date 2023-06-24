import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import Axios from '../../api/Axios';
import "./Register.css";
import useAuth from "../../hooks/useAuth";
export default function Register({}) {
    const authContext = useAuth()
    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState<boolean>(false);
    const navigate = useNavigate();
    Axios.defaults.withCredentials = true;
    async function register() {
        try {
            const res = await Axios.post("/register", {username, email, password});
            console.log(res.data);
            if(!res.data) return;
            authContext?.setAuth(res.data.success);
            navigate("/");
        } catch (err) {
            console.error(err)
        }
    }
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (
            !username ||
            !email ||
            !password ||
            !confirmPassword
        )
            return;
        if (password !== confirmPassword) {
            return;
        }
        await register()
        e.currentTarget.reset();
    }
    return (
        <div className="register">
            <h1 className="register-title">Create Account</h1>
            <form onSubmit={handleSubmit} className="register-form" action="" >
                <div className="input-container">
                    <label htmlFor="username">Username</label>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" id="username" />
                </div>
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <div className="input-password">
                        <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        type={visiblePassword ? "text" : "password"} 
                        id="password" />
                        <span onClick={() => setVisiblePassword(visiblePassword ? false : true)} className="material-symbols-outlined show-password">
                        {visiblePassword ? "visibility":"visibility_off"}
                        </span>
                        
                    </div>
                </div>
                <div className="input-container">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <div className="input-password">
                        <input 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        type={visibleConfirmPassword ? "text" : "password"} id="confirm-password" />
                        <span 
                        onClick={() => setVisibleConfirmPassword(visibleConfirmPassword ? false : true)} 
                        className="material-symbols-outlined show-password">
                        {visibleConfirmPassword ? "visibility" : "visibility_off"}
                        </span>
                    </div>
                </div>
                <button type="submit">Create new account</button>

            </form>
            <div className="ask-to-login">Already have an account?<button onClick={() => navigate('/login')}>Login</button></div>
        </div>
        // Those passwords didn’t match. Try again.
    )
}
