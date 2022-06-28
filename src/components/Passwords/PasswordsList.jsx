import React, { useState, useEffect, useContext } from 'react'
import { validate, encryptPassword } from '../../lib/cryptography'
import { NewPassword } from './NewPassword'
import { PasswordInfo } from './PasswordInfo'
import { Navigate, NavLink } from 'react-router-dom'
import { currentUser } from '../../contexts/UsersContext'
import { PASSWORDS } from '../../env/localStorageVars'

export function PasswordsList() {
    const [loading, setLoading] = useState(true)
    const [passwords, setPasswords] = useState()
    const user = useContext(currentUser)['user']
    useEffect(() => {
        const storedPasswords = JSON.parse(localStorage.getItem(PASSWORDS))
        if(storedPasswords){
            setPasswords(storedPasswords)
        }
    }, [])

    useEffect(() => {
        if(passwords)
            localStorage.setItem(PASSWORDS, JSON.stringify(passwords))
    }, [passwords])

    const addPassword = (pass) => {
        const masterPassword = prompt('Enter Master Password')
        validate(masterPassword, user.password, user.salt)
        .then((result) => {
            if(result){
                // Johan: Encriptamos también el nivel de seguridad? Como para que no sepan abiertamente el nivel de seguridad de la contraseña
                encryptPassword(masterPassword, user.salt, pass.password)
                .then((encrypted) => {
                    pass.password = encrypted.cipherText
                    pass.salt = encrypted.salt
                    const newPasswords = {...passwords}
                    let newPassList = []
                    if(passwords && (user.username in passwords)){
                        newPassList = [...passwords[user.username], pass]
                    }
                    else{
                        newPassList = [pass]
                    }
                    newPasswords[user.username] = newPassList
                    setPasswords(newPasswords)
                })
            }else{
                alert("Wrong password!")
            }
        })
    }
    if(loading){
        console.log(user)
        setLoading(false)   
        return null
    }
    else{
        if(!user){
        return <Navigate to='/app' />
        }
        return (
            <div>
                <h1>Passwords</h1>
                <NavLink to="/app" style={({ isActive }) => isActive ? {color: 'red'} : {color: 'blue'}} activeclassname="active">Home</NavLink>
                <NewPassword addPass={addPassword}/>
                { passwords  && passwords[user.username] && passwords[user.username].map((pass, index) => (
                    <PasswordInfo key={index} password={pass}/>
                ))}
            </div>
        )
    }
}