import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from "../../api/Axios";
import useAuth from '../../hooks/useAuth';

export default function Login() {
    const authContext = useAuth()
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

    async function login() {
        try {
            const res = await Axios.post("/login", { email, password }, {
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });
            console.log(res.data.accessToken, res.data.success);
            if(!res.data) return;
            localStorage.setItem("accessToken", res.data.accessToken);
            authContext?.setAuth(() => res.data.success);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(!email || !password) return;
        await login()
        // e.currentTarget.reset();
    }
    return (
        <div className="register">
            <h1 className="register-title">Welcome Back</h1>
            <form onSubmit={handleSubmit} className="register-form" action="">
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <div className="input-password">
                        <input 
                        onChange={(e) => setPassword(e.target.value)}
                        type={visiblePassword ? "text" : "password"} 
                        id="password"/>
                        <span onClick={() => setVisiblePassword(visiblePassword ? false : true)} className="material-symbols-outlined show-password">
                            {visiblePassword ? "visibility":"visibility_off"}
                        </span>
                    </div>
                </div>
                <button type="submit">Log in</button>
            </form>
            <div className="ask-to-login">Don't have an account?<button onClick={() => navigate('/register')}>Sign Up</button></div>
        </div>
    )
}
