import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { currentUser } from '../../contexts/UsersContext'
import { PASSWORDS } from '../../env/localStorageVars'


export function PasswordsReport() {
    const user = useContext(currentUser)['user']
    const [passwords, setPasswords] = useState();
    useEffect(() => {
        const storedPasswords = JSON.parse(localStorage.getItem(PASSWORDS))
        if(storedPasswords){
            setPasswords(storedPasswords[user.username])
        }
    }, [user])
    console.log(passwords)
    console.log(user)
    return (
        <div>
            <h1>Passwords Report</h1>
            <NavLink to="/app" style={({ isActive }) => isActive ? {color: 'red'} : {color: 'blue'}} activeclassname="active">Home</NavLink>
            { passwords  && passwords[user.username] && passwords[user.username].map((pass, index) => (
                "xd"
            ))}
        </div>
    )
}
