import React, { Fragment } from 'react'
import { Header } from '../components/Header'
import { UserPage } from '../components/User/UserPage'
import { Footer } from '../components/Footer'

export function AppPage({user, setUser, usuarios, setUsuarios}) {
    

    return (
        <Fragment>
            <Header usuario={user} setUser={setUser} usuarios={usuarios} setUsuarios={setUsuarios}/>
            <UserPage usuario={user}/>
            {user && <Footer/>}
        </Fragment>
    )
}
