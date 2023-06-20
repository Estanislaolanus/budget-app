import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
    }
    return (
        <div className="register">
            <h1 className="register-title">Welcome Back</h1>
            <form onSubmit={handleSubmit} className="register-form" action="">
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email"/>
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <div className="input-password">
                        <input 
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
                <button type="submit">Log in</button>
            </form>
            <div className="ask-to-login">Don't have an account?<button onClick={() => navigate('/register')}>Sign Up</button></div>
        </div>
    )
}
