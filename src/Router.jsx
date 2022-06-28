import React, { useState, useEffect } from 'react'
import {Route, Routes, BrowserRouter} from "react-router-dom"
import { PasswordsList } from "./components/Passwords/PasswordsList"
import { NewPassword } from "./components/Passwords/NewPassword"
import {Error} from "./views/Error"
import {AppPage} from "./views/AppPage"
import {UserPage} from "./components/User/UserPage"
import { PasswordsReport } from './components/Passwords/PasswordsReport'
import { LandingPage } from './views/LandingPage'
import { currentUser, userList } from './contexts/UsersContext'
import { USER, USERS } from './env/localStorageVars'


export function Router() {
    const [usuarios, setUsuarios] = useState({})
    const [user, setUser] = useState(null);

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

    return (
        <BrowserRouter>
            <currentUser.Provider value={{user, setUser}}>
                <userList.Provider value={{usuarios, setUsuarios}}>
                    <Routes>
                        {/* <Route path="/" element={<NavBar/>}> */}
                            <Route index element={<LandingPage/>}/>
                            <Route path="app" element={<AppPage user={user} setUser={setUser} usuarios={usuarios} setUsuarios={setUsuarios}/>}/>
                            <Route path="passwords" element={<PasswordsList />}/>
                            <Route path="passwords-report" element={<PasswordsReport />}/>
                            <Route path="passwords/new" element={ <NewPassword/> }/>
                            <Route path="/user/:username" element={<UserPage/>}/>
                        {/* </Route> */}
                        <Route path="*" element={<Error errorNo={404}/>}/>
                    </Routes>
                </userList.Provider>
            </currentUser.Provider>
        </BrowserRouter>
    )
}
