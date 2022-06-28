import React, { useRef } from 'react'
import { getSafeScore } from '../../lib/cryptography'

const levels = ["Alto","Medio","Bajo"]

export function NewPassword({addPass}) {
    const passName = useRef(0);
    const userName = useRef(0)
    const password = useRef(0);
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

    return (
        <div>
            <input ref={passName} type="text" placeholder="Nombre de contraseña"/>
            <input ref={userName} type="text" placeholder="Nombre de usuario/identificador"/>
            <input ref={password} type="password" placeholder="Contraseña"/>
            <button type="submit" onClick={buildPass}>Ingresar registro</button>
        </div>
    )
}
