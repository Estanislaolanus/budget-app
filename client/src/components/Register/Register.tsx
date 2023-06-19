import { FormEvent } from "react"
import "./Register.css"
export default function Register() {
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
    }
    return (
        <div className="register">
            <h1 className="register-title">New Account</h1>
            <form onSubmit={handleSubmit} className="register-form" action="" >
                <div className="input-container">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username"/>
                </div>
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email"/>
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password"/>
                </div>
                <div className="input-container">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="text" id="confirm-password"/>
                </div>
                <button type="submit">Create new account</button>
            </form>
        </div>
    )
}
