import React, { useRef } from 'react'

const getSafeScore = () => {};

export function NewPassword({addPass}) {
    const passName = useRef(0);
    const userName = useRef(0)
    const password = useRef(0);
    const buildPass = () => {
        const newPass = {passName: passName.current.value,
                         userName: userName.current.value,
                         password: password.current.value,
                         safeScore: getSafeScore() // TODO: Johan implementar este metodo
                        }
        console.log(newPass)
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
