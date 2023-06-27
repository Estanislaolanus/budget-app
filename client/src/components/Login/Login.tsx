import { FormEvent, RefObject, ChangeEvent, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from "../../api/Axios";
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser'
import validateForm from '../../validations/validateLogin';

export default function Login() {
    const authContext = useAuth()
    const userContext = useUser();
    const navigate = useNavigate();
    const emailRef: RefObject<HTMLInputElement> = useRef(null);
    const passwordRef: RefObject<HTMLInputElement> = useRef(null);
    const [emailError, setEmailError] = useState<string>();
    const [passwordError, setPasswordError] = useState<string>();
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

    async function login() {
        try {
            if (!emailRef.current || !passwordRef.current) return;
            const res = await Axios.post("/login", { email:emailRef.current.value, password: passwordRef.current.value }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });
            if (!res.data) return;
            const data = res.data;
            localStorage.setItem("accessToken", res.data.accessToken);
            authContext?.setAuth(() => data.success);
            const dataUsername = data ? data.user.username : "";
            userContext?.setUser(() => {
                return { username: dataUsername || "", email: emailRef.current?.value || "" };
            });
            navigate("/");
        } catch (err) {
            setPasswordError("Email or password incorrect");
        }
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!emailRef.current || !passwordRef.current) return;
        const areFieldsValid = validateForm(emailRef.current.value, passwordRef.current.value);
        if(!areFieldsValid.isValid) {
            const { emailError, passwordError } = areFieldsValid.errorMessages;
            if(emailError) {
                emailRef.current.classList.add("invalid");
                setEmailError(emailError);
            }
            if(passwordError) {
                passwordRef.current.parentElement?.classList.add("invalid");
                setPasswordError(passwordError)
            }
            return;
        }
        
        await login();
    }
    function onType (e: ChangeEvent<HTMLInputElement>, type: string) {
        if(type === "password") {
            e.currentTarget.parentElement?.classList.remove("invalid");
        } else {
            e.currentTarget.classList.remove("invalid");
        }
        switch(type) {
            case "email": 
                setEmailError("");
            break;
            case "password":
                setPasswordError("");
            break;
        }
    }
    return (
        <div className="register">
            <h1 className="register-title">Welcome Back</h1>
            <form onSubmit={handleSubmit} className="register-form" action="">
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input ref={emailRef} type="email" id="email" onChange={(e) => onType(e, "email")} />
                </div>
                {emailError && <div className="error-message">{emailError}</div>}
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <div className="input-password">
                        <input
                            ref={passwordRef}
                            onChange={(e) => onType(e, "password")}
                            type={visiblePassword ? "text" : "password"}
                            id="password" />
                        <span onClick={() => setVisiblePassword(visiblePassword ? false : true)} className="material-symbols-outlined show-password">
                            {visiblePassword ? "visibility" : "visibility_off"}
                        </span>
                    </div>
                </div>
                {passwordError && <div className="error-message">{passwordError}</div>}
                <button type="submit">Log in</button>
            </form>
            <div className="ask-to-login">Don't have an account?<button onClick={() => navigate('/register')}>Sign Up</button></div>
        </div>
    )
}
