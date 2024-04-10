import { RefObject, useEffect, useRef, useState } from 'react'
import useUser from '../../hooks/useUser';
import './UserDisplay.css'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function UserDisplay() {
    const userContext = useUser();
    const authContext = useAuth();
    const [displayUser, setDisplayUser] = useState<boolean>(false);
    const menuRef: RefObject<HTMLDivElement> = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!menuRef.current || !e.target) return;
            if (!menuRef.current.contains(e.target as Node)) {
                setDisplayUser(false);
            }
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    });
    function onLogout() {
        localStorage.clear();
        authContext?.setAuth(false);
        userContext?.setUser({ username: "", email: "", isEmailVerified: false });
        navigate("/login");
    }
    return (
        <div ref={menuRef} className='user-menu'>
            <button onClick={() => setDisplayUser(() => !displayUser)} className='user'>{userContext?.user.username[0]}</button>
            <div className={`user-display ${displayUser ? "active" : "inactive"}`}>
                <div className="user-info">
                    <svg className='user-icon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_iconCarrier"> <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>

                    </svg>
                    <p>{userContext?.user.username}</p>

                </div>
                <div className='user-info'>
                    <svg className='user-icon' viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#000000" stroke-width="1.6320000000000001" stroke-linecap="round" stroke-linejoin="round"></path> <rect x="3" y="5" width="18" height="14" rx="2" stroke="#000000" stroke-width="1.6320000000000001" stroke-linecap="round"></rect></g></svg>
                    <p>{userContext?.user.email}</p>

                </div>
                <div className="line-through"></div>
                <button onClick={() => onLogout()} className="logout"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H15M8 8L4 12M4 12L8 16M4 12L16 12" stroke="#000000" stroke-width="1.9919999999999998" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>Log out</button>
            </div>
        </div>
    )
}
