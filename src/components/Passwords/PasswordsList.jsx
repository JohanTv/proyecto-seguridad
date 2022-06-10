import React, { useState, useEffect } from 'react'
import { validate, encryptPassword } from '../../lib/cryptography'
import { NewPassword } from './NewPassword'
import { PasswordInfo } from './PasswordInfo'

const PASSWORDS = "PASSLIST"
const CURRENTUSER = "retoLuiseUsuario"

export function PasswordsList() {
    const [passwords, setPasswords] = useState([])
    const [user, setUser] = useState([])
    useEffect(() => {
        const storedPasswords = JSON.parse(localStorage.getItem(PASSWORDS))
        if(storedPasswords){
            setPasswords(storedPasswords)
        }
        const currentUser = JSON.parse(localStorage.getItem(CURRENTUSER))
        if(currentUser){
            setUser(currentUser)
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
                encryptPassword(masterPassword, user.salt, pass.password)
                .then((encrypted) => {
                    pass.password = encrypted.cipherText
                    pass.salt = encrypted.salt
                    setPasswords([...passwords, pass])
                })
            }else{
                alert("Wrong password!")
            }
        })
    }

    return (
        <div>
            <h1>Passwords</h1>
            <NewPassword addPass={addPassword}/>
            { passwords && passwords.map((pass, index) => (
                <PasswordInfo key={index} password={pass}/>
            ))}
        </div>
    )
}