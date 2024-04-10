import { FormEvent, RefObject, ChangeEvent, useState, useRef, useEffect } from 'react'
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
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (authContext && !authContext.auth) return;
        navigate("/");
    }, [authContext, navigate]);
    async function login() {
        try {
            setLoading(true)
            if (!emailRef.current || !passwordRef.current) return;
            const res = await Axios.post("/login", { email: emailRef.current.value, password: passwordRef.current.value }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });
            if (!res.data) return;
            const data = res.data;
            localStorage.setItem("accessToken", res.data.accessToken);
            authContext?.setAuth(() => data.success);
            const dataUsername = data ? data.user.username : "";
            const isEmailVerified = data ? data.user.isEmailVerified : false;
            userContext?.setUser(() => {
                return { username: dataUsername ?? "", email: emailRef.current?.value ?? "", isEmailVerified };
            });
            if (!isEmailVerified) return navigate("/verifyEmail");
            navigate("/");
        } catch (err) {
            setPasswordError("Email or password incorrect");
            setLoading(false);
        }
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!emailRef.current || !passwordRef.current) return;
        const areFieldsValid = validateForm(emailRef.current.value, passwordRef.current.value);
        if (!areFieldsValid.isValid) {
            const { emailError, passwordError } = areFieldsValid.errorMessages;
            if (emailError) {
                emailRef.current.classList.add("invalid");
                setEmailError(emailError);
            }
            if (passwordError) {
                passwordRef.current.parentElement?.classList.add("invalid");
                setPasswordError(passwordError)
            }
            return;
        }
        await login();
    }
    function onType(e: ChangeEvent<HTMLInputElement>, type: string) {
        if (type === "password") {
            e.currentTarget.parentElement?.classList.remove("invalid");
        } else {
            e.currentTarget.classList.remove("invalid");
        }
        switch (type) {
            case "email":
                setEmailError("");
                break;
            case "password":
                setPasswordError("");
                break;
        }
    }
    return (
        <div className="form">
            <h1 className="form-title">Welcome Back</h1>
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
                        <span onClick={() => setVisiblePassword(visiblePassword ? false : true)} className="show-password">

                            {visiblePassword ?
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_iconCarrier"> <g id="Edit / Show"> <g id="Vector"> <path d="M3.5868 13.7788C5.36623 15.5478 8.46953 17.9999 12.0002 17.9999C15.5308 17.9999 18.6335 15.5478 20.413 13.7788C20.8823 13.3123 21.1177 13.0782 21.2671 12.6201C21.3738 12.2933 21.3738 11.7067 21.2671 11.3799C21.1177 10.9218 20.8823 10.6877 20.413 10.2211C18.6335 8.45208 15.5308 6 12.0002 6C8.46953 6 5.36623 8.45208 3.5868 10.2211C3.11714 10.688 2.88229 10.9216 2.7328 11.3799C2.62618 11.7067 2.62618 12.2933 2.7328 12.6201C2.88229 13.0784 3.11714 13.3119 3.5868 13.7788Z" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round" /> <path d="M10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12Z" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round" /> </g> </g> </g>

                                </svg>

                                :
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

                                    <g id="SVGRepo_iconCarrier"> <g id="Edit / Hide"> <path id="Vector" d="M3.99989 4L19.9999 20M16.4999 16.7559C15.1473 17.4845 13.6185 17.9999 11.9999 17.9999C8.46924 17.9999 5.36624 15.5478 3.5868 13.7788C3.1171 13.3119 2.88229 13.0784 2.7328 12.6201C2.62619 12.2933 2.62616 11.7066 2.7328 11.3797C2.88233 10.9215 3.11763 10.6875 3.58827 10.2197C4.48515 9.32821 5.71801 8.26359 7.17219 7.42676M19.4999 14.6335C19.8329 14.3405 20.138 14.0523 20.4117 13.7803L20.4146 13.7772C20.8832 13.3114 21.1182 13.0779 21.2674 12.6206C21.374 12.2938 21.3738 11.7068 21.2672 11.38C21.1178 10.9219 20.8827 10.6877 20.4133 10.2211C18.6338 8.45208 15.5305 6 11.9999 6C11.6624 6 11.3288 6.02241 10.9999 6.06448M13.3228 13.5C12.9702 13.8112 12.5071 14 11.9999 14C10.8953 14 9.99989 13.1046 9.99989 12C9.99989 11.4605 10.2135 10.9711 10.5608 10.6113" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round" /> </g> </g>

                                </svg>
                            }
                        </span>
                    </div>
                </div>
                {passwordError && <div className="error-message">{passwordError}</div>}
                {loading ? <div className='submit' ><div className='submit-loader'></div></div> : <button className='submit' type="submit">Log in</button>}
            </form>
            <div className="ask-to-login">Don't have an account?<button onClick={() => navigate('/register')}>Sign Up</button></div>
        </div>
    )
}
