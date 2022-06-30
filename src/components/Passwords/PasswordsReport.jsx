import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { currentUser } from '../../contexts/UsersContext'
import { PASSWORDS } from '../../env/localStorageVars'
import { SecurityGrade } from './SecurityGrade/SecurityGrade'
import { decryptPassword } from '../../lib/cryptography'

export function PasswordsReport() {
    const user = useContext(currentUser)['user']
    const levels = ["Alto","Medio","Bajo"]
    const [passwords, setPasswords] = useState();
    useEffect(() => {
        if(user){
            const storedPasswords = JSON.parse(localStorage.getItem(PASSWORDS))[user['username']]
            if(storedPasswords && user){
                const masterPassword = prompt('Enter Master Password')
                let mypasswords = [...storedPasswords]
                storedPasswords.forEach((pass,index) => {
                    decryptPassword(masterPassword, user.salt, pass.safeScore, user.salt).then((decrypted)=>{
                        mypasswords[index] = {'name': pass.passName, 'level' : decrypted}
                        console.log(mypasswords[index])
                        setPasswords(mypasswords)
                    })
                });
            }
        }
    }, [user])

    const isSecurityLevel = (pass, level) => {
        return pass.level===level
    }


    let content = null
    if(passwords){
        content =   <div className="SecurityGrades">
                        {levels.map((level)=>{
                            return <SecurityGrade key={level} grade={level} passwords={passwords.filter((pass) => isSecurityLevel(pass, level))}/>
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
