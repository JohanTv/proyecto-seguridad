import React, {Fragment, useContext} from 'react'
import { Login } from './User/Login'
import { User } from './User/User'
import { NewUser } from './User/NewUser'
import {createAuth, validate} from '../lib/cryptography'
import { currentUser } from '../contexts/currentUser'
import { useEffect } from 'react'

export function Header({usuario, setUser, usuarios, setUsuarios}) {
    const curreUser = useContext(currentUser)
    useEffect(() => {
        console.log("it is happening", usuario)
        if (usuario){
            console.log("!")
            console.log(usuario)
            curreUser.setUser(usuario)
            console.log("?")
            console.log(curreUser.user)
        }
    }, [usuario])
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

    if (usuario){
        console.log("in if", curreUser.user)
        if(usuario.loginCount === 1){
            return (
            <Fragment>
                <div className="header">
                    <input type="text" defaultValue={curreUser.user && curreUser.user.username}/>
                    <NewUser username={usuario.username}/>
                </div>
            </Fragment>
            
            )
        }
        return (
        <Fragment>
            <div className="header">
                <User username={usuario.username}/>
            </div>
        </Fragment>
        )
    }
    else{
        return (<Login verification = {login}/>)
    }   
}
