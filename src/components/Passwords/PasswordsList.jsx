import React, { useState, useEffect } from 'react'
import { NewPassword } from './NewPassword'
import { PasswordInfo } from './PasswordInfo'

const PASSWORDS = "PASSLIST"

export function PasswordsList() {
    const [passwords, setPasswords] = useState([])
    
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


    const addPassword = (pass) => { // Acá hacer la encriptación correcta y agregar el valor ya hasheado y todo
        setPasswords([...passwords, pass])
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