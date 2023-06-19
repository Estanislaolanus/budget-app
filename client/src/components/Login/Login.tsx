import {FormEvent} from 'react'

export default function Login() {
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
    }
    return (
        <div className="register">
            <h1 className="register-title">Log in</h1>
            <form onSubmit={handleSubmit} className="register-form" action="">
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email"/>
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password"/>
                </div>
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}
