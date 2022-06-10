import React, {useState, useEffect } from 'react'

export function Login({verification}) {
    const [loginData, setloginData] = useState();
    var user = "";
    var pass = "";

    const sendData = (() => {
        if(user !== "" && pass !== "")
            setloginData({username: user, password: pass})
        else
            alert("Missing username and/or password")
    })
    
    useEffect(() => {
        if(loginData){
            verification(loginData)
        }
    }, [loginData, verification])

    return (
        <div className="login-box">
            <input className="input-box" type="text" onChange={(e) => {user=e.currentTarget.value}} placeholder="nombre de usuario"/>
            <input className="input-box" type="password" onChange={(e) => {pass=e.currentTarget.value}} placeholder="contraseña"/>
            <button onClick={sendData}>Ingresar </button>
        </div>
    )
}
