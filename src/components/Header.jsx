import React, {Fragment} from 'react'
import { Login } from './User/Login'
import { User } from './User/User'
import { NewUser } from './User/NewUser'
import {createAuth, validate} from '../lib/cryptography'
import { Logout } from './User/Logout'
import { USER } from '../env/localStorageVars'

export function Header({usuario, setUser, usuarios, setUsuarios}) {
    
    const login = (loginData) => {
        const usernameInp = loginData.username
        const passwordInp = loginData.password
        if(!(usernameInp in usuarios)){
            const nuevoUsuarios = usuarios
            createAuth(passwordInp).then((vaultKey) => {
                nuevoUsuarios[usernameInp] = {username: usernameInp, password: vaultKey.hash, salt: vaultKey.salt, loginCount: 1}
                setUsuarios(nuevoUsuarios)
                setUser(nuevoUsuarios[usernameInp])
            })
        }
        else{
            validate(passwordInp, usuarios[usernameInp].password, usuarios[usernameInp].salt)
            .then((result) => {
                if(result){
                    let currUser = usuarios[usernameInp] 
                    const nuevosUsuarios = {...usuarios}
                    currUser = {...currUser, loginCount: currUser.loginCount+1}
                    nuevosUsuarios[usernameInp] = currUser
                    setUsuarios(nuevosUsuarios)
                    setUser(currUser)
                }
                else{
                    alert("Wrong password")
                }
            })
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem(USER)
    }

    if (usuario){
        let content;
        if(usuario.loginCount === 1)
            content = <NewUser username={usuario.username}/>
        else
            content = <User username={usuario.username}/>
        return (
        <Fragment>
            <div className="header">
                {content}
                {/* <Link to="/">To root</Link> */}
                <Logout logout={logout}></Logout>
            </div>
        </Fragment>
        )
    }
    else{
        return (<Login verification = {login}/>)
    }   
}
