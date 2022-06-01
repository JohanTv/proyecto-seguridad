import React from 'react'
import { Login } from './User/Login'
import { User } from './User/User'
import { NewUser } from './User/NewUser'

export function Header({usuario, setUser, usuarios, setUsuarios}) {

    const login = (loginData) => {
        const usernameInp = loginData.username
        const passwordInp = loginData.password
        if(!(usernameInp in usuarios)){
            // const newUser={`${usernameInp}`: {password: passwordInp, bio: ""}}
            const nuevoUsuarios = usuarios
            nuevoUsuarios[usernameInp] = {username: usernameInp, password: passwordInp, loginCount: 1}
            setUsuarios(nuevoUsuarios)
            setUser(nuevoUsuarios[usernameInp])
        }
        else{
            if(usuarios[usernameInp].password === passwordInp){
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
        }
    }

    if (usuario){
        console.log("Usuario existe", usuario)
        if(usuario.loginCount === 1){
            return (<NewUser username={usuario.username}/>)
        }
        return (<User username={usuario.username}/>)
    }
    else{
        return (<Login verification = {login}/>)
    }   
}
