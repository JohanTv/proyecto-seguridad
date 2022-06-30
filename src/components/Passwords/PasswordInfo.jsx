import React, {useRef, Fragment, useState, useEffect} from 'react'
import { validate, decryptPassword } from '../../lib/cryptography'
import { USER } from '../../env/localStorageVars'

export function PasswordInfo({password}) {
    const passDiv = useRef(0)
    const showButton = useRef(0)
    const [show, setShow] = useState(true)
    const [user, setUser] = useState([])
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem(USER))
        if(currentUser){
            setUser(currentUser)
        }
    }, [])
    const showPass = () => {
        if(show){
            const masterPassword = prompt('Enter Master Password')
            validate(masterPassword, user.password, user.salt)
            .then((result) => {
                if(result){
                    decryptPassword(masterPassword, user.salt, password.password, password.salt)
                    .then((decrypted) => {
                        passDiv.current.innerHTML += `${decrypted}`
                        showButton.current.innerHTML = 'Hide password'
                    })
                }else{
                    alert("Wrong password!")
                }
            })
        }
        else{
            passDiv.current.innerHTML = 'Password: '
            showButton.current.innerHTML = 'Show password'
        }
        setShow(!show)
    }

    return (
        <Fragment>
            <div className="singlePass">
                <div className="passName">
                    {password.passName}
                </div>
                <div className="passInfo">
                    <div>Usuario de ingreso: {password.userName}</div>
                    <div ref={passDiv} className="passContainer">Password: </div>
                    <button ref={showButton} onClick={showPass}>Show password</button>
                </div>
            </div>
        </Fragment>
    )
}
