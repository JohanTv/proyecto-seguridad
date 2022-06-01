import React, { Fragment, useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { UserPage } from '../components/User/UserPage'
import { Footer } from '../components/Footer'

const USERS = "retoLuiseUsuarios"
const USER = "retoLuiseUsuario"

export function LandingPage() {
    const [usuarios, setUsuarios] = useState({})
    const [user, setUser] = useState()
    console.log(usuarios)

    useEffect(() => {
        const storedUsuarios = JSON.parse(localStorage.getItem(USERS))
        const storedUser = JSON.parse(localStorage.getItem(USER))
        if(storedUsuarios){
            setUsuarios(storedUsuarios)
            if(storedUser)
                setUser(storedUser)
        }
    }, [])

    useEffect(() => {
        if(usuarios)
            localStorage.setItem(USERS, JSON.stringify(usuarios))
        if(user)
            localStorage.setItem(USER, JSON.stringify(user))
    }, [user, usuarios])

    const logout = () => {
        setUser(null)
        localStorage.removeItem(USER)
    }

    return (
        <Fragment>
            <Header usuario={user} setUser={setUser} usuarios={usuarios} setUsuarios={setUsuarios}/>
            <UserPage usuario={user}/>
            {user && <Footer logout={logout}/>}
        </Fragment>
    )
}
