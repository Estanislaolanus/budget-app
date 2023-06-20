import { FormEvent, useRef, useState, RefObject } from "react"
import { useNavigate } from "react-router-dom";
import "./Register.css"
export default function Register() {
    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState<boolean>(false);
    const navigate = useNavigate();
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
        const user = {
            username,
            email,
            password
        }
        console.log(user)
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

                        {visiblePassword ? 
                        <button onClick={() => setVisiblePassword(visiblePassword ? false : true)} className="material-symbols-outlined show-password">
                            visibility
                        </button>
                        :
                        <button onClick={() => setVisiblePassword(visiblePassword ? false : true)} className="material-symbols-outlined show-password">
                            visibility_off
                        </button>}
                    </div>
                </div>
                <div className="input-container">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <div className="input-password">
                        <input 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        type={visibleConfirmPassword ? "text" : "password"} id="confirm-password" />

                        {visibleConfirmPassword ? 
                        <button 
                        onClick={() => setVisibleConfirmPassword(visibleConfirmPassword ? false : true)} 
                        className="material-symbols-outlined show-password">
                            visibility
                        </button>
                        :
                        <button 
                        onClick={() => setVisibleConfirmPassword(visibleConfirmPassword ? false : true)} 
                        className="material-symbols-outlined show-password">
                            visibility_off
                        </button>}
                    </div>
                </div>
                <button type="submit">Create new account</button>

            </form>
            <div className="ask-to-login">Already have an account?<button onClick={() => navigate('/login')}>Login</button></div>
        </div>
    )
}
