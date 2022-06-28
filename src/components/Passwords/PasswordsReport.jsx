import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { currentUser } from '../../contexts/UsersContext'
import { PASSWORDS } from '../../env/localStorageVars'
import { SecurityGrade } from './SecurityGrade/SecurityGrade'

export function PasswordsReport() {
    const user = useContext(currentUser)['user']
    const levels = ["Alto","Medio","Bajo"]
    const [passwords, setPasswords] = useState();
    useEffect(() => {
        const storedPasswords = JSON.parse(localStorage.getItem(PASSWORDS))
        if(storedPasswords && user){
            console.log("???", user)
            setPasswords(storedPasswords[user.username])
        }
    }, [user])
    console.log("Pass", passwords)
    console.log("User", user)
    let content = null
    if(passwords){
        content =   <div className="SecurityGrades">
                        {levels.map((level)=>{
                            return <SecurityGrade key={level} grade={level} passwords={passwords.filter((pass) => pass.safeScore===level)}/>
                        })}
                    </div>
    }
    return (
        <div>
            <h1>Passwords Report</h1>
            <NavLink to="/app" style={({ isActive }) => isActive ? {color: 'red'} : {color: 'blue'}} activeclassname="active">Home</NavLink>
            {content}
            {/* { passwords && passwords.map((pass, index) => (
                pass.passName
            ))} */}
        </div>
    )
}
