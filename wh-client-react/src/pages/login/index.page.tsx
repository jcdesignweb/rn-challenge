import React, { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import AuthService from '@/services/auth.service';
import './index.scss'
import { isLogged, setAuthorization } from '@/redux/state/app.state';
import User from '@/models/user.model';

export const Login = () => {
    const dispatch = useDispatch()

    const [dni, setDni] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const login = async () => {

        // const user: User|boolean = await
        AuthService.login(dni, password).then(({ success, response }: any) => {

            if (success) {

                AuthService.setSessionData(response)

                dispatch(isLogged(true))
                dispatch(setAuthorization(response))
            }

        }).catch(responseErr => {

            setError(responseErr.error)
        })



    }

    return (
        <div id="login" className='container'>
            <br /><br /><br />
            <div className='row center'>
                <img className="logo" src='./assets/img/logo.png' width="300" />
            </div>
            <br />
            <div className='row'>
                <div className='col l8 offset-l2'>
                    <div className='container'>


                        <div className="input-field">
                            <input
                                id="dni"
                                type="text"
                                className="validate"
                                name="E-mail"
                                onChange={ev => { setDni(ev.target.value) }}
                                defaultValue={dni}
                            />
                            <label className="active" htmlFor="dni">E-mail</label>
                        </div>
                        <br />
                        <div className="input-field">
                            <input type="password"
                                name="password"
                                id="password"
                                onChange={ev => { setPassword(ev.target.value) }}
                                defaultValue={password} />
                            <label className="active" htmlFor="password">Contraseña</label>
                        </div>


                        <br />
                        <div className='center'>
                            <button className='btn waves-effect waves-light btnLogin' onClick={login}>
                                Ingresar
                                <i className="material-icons right">send</i>
                            </button>
                        </div>

                        <div className='row error'>
                            {error}
                        </div>

                    </div>
                </div>

            </div>



        </div>
    )
}

export default Login

