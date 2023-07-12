import {RefObject, useEffect, useRef, useState} from 'react'
import useUser from '../../hooks/useUser';
import './UserDisplay.css'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function UserDisplay() {
    const userContext = useUser();
    const authContext = useAuth();
    const [displayUser, setDisplayUser] = useState<Boolean>(false);
    const menuRef:RefObject<HTMLDivElement> = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        const handler = (e:MouseEvent) => {
            if(!menuRef.current || !e.target) return;
            if(!menuRef.current.contains(e.target as Node)) {
                setDisplayUser(false);
            }
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })
    function onLogout (){
        localStorage.clear();
        authContext?.setAuth(false);
        userContext?.setUser({username: "", email: ""});
        navigate("/login");
    }
    return (
        <div ref={menuRef} className='user-menu'>
            <div onClick={() => setDisplayUser(() => !displayUser)} className='user'>{userContext?.user.username[0]}</div>
            <div className={`user-display ${displayUser ? "active" : "inactive"}`}>
                <div className='user-title'>Username</div>
                <div className='user-info'>{userContext?.user.username}</div>
                <div className='user-title'>Gmail</div>
                <div className='user-info'>{userContext?.user.email}</div>
                <button onClick={() => onLogout()} className="logout"><i className="fa-solid fa-right-from-bracket"></i>Log out</button>
            </div>
        </div>
    )
}
