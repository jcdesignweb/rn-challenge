import './index.scss'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import AuthService from '@/services/auth.service'
import { Link } from 'react-router-dom'
import { isLogged } from '@/redux/state/app.state';

export function Header() {
    const dispatch = useDispatch()

    const logout = (event: any) => {
        event.preventDefault();

        AuthService.logout()

        dispatch(
            isLogged(false)
        )

        
    }

    const [name, setName] = useState(AuthService.getEmail());

    return (
        <header>
            <ul id="dropdown-user" className="dropdown-content">
                <li><a href="#!" onClick={logout}>Salir</a></li>
            </ul>
            <nav>

                <div className="nav-wrapper">
                    <Link to="/" className="logo">
                        <img src="/assets/img/logo.png" height="60" />
                    </Link>
                    <ul id="nav-mobile" className="right hide-on-small-only">
                        <li><Link to="/calculate">Nearest calculation</Link></li>
                        <li><a className="dropdown-trigger" href="#!" data-target="dropdown-user">
                            {name}<i className="material-icons right">arrow_drop_down</i></a></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}