import React, { useRef, useState } from 'react'
import { generateRandomPassword, getSafeScore } from '../../lib/cryptography'

const levels = ["Alto","Medio","Bajo"]

export function NewPassword({addPass}) {
    const passName = useRef(0);
    const userName = useRef(0)
    const password = useRef(0);
    const [securityGrade, setGrade] = useState();
    const buildPass = () => {
        const newPass = {passName: passName.current.value,
                         userName: userName.current.value,
                         password: password.current.value,
                         safeScore: getSafeScore(password.current.value, levels)
                        }
        addPass(newPass)
        passName.current.value = ""
        userName.current.value = ""
        password.current.value = ""
    };

    const checkPass = () => {
        const pass = password.current.value;
        if(pass && pass.length > 0){
            setGrade(`Password's safety level: ${getSafeScore(pass, levels)}`)
        }
        else{
            setGrade()
        }
    }

    const generatePass = () => {
        const pass = password.current.value; 
        if(pass && pass.length > 0){
            if (!window.confirm("Esta acción reemplazará la contraseña que tiene actualmente, está seguro que quiere continuar?")) {
                return;
            }
        }
        password.current.value = generateRandomPassword(10)
        checkPass()
        alert('Contraseña generada');
    }

    return (
        <div>
            <input ref={passName} type="text" placeholder="Nombre de contraseña"/>
            <input ref={userName} type="text" placeholder="Nombre de usuario/identificador"/>
            <input ref={password} onInput={checkPass} type="password" placeholder="Contraseña"/>
            <a>{securityGrade}</a>
            <div>
                <button type="submit" onClick={buildPass}>Ingresar registro</button>
                <button type="submit" onClick={generatePass}>Generar contraseña segura</button>
            </div>
        </div>
    )
}
