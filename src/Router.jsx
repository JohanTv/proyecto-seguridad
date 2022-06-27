import React, { useState } from 'react'
import {Route, Routes, BrowserRouter} from "react-router-dom"
import { PasswordsList } from "./components/Passwords/PasswordsList"
import { NewPassword } from "./components/Passwords/NewPassword"
import {Error} from "./views/Error"
import {AppPage} from "./views/AppPage"
import {UserPage} from "./components/User/UserPage"
import { PasswordsReport } from './components/Passwords/PasswordsReport'
import { LandingPage } from './views/LandingPage'
import { currentUser } from './contexts/currentUser'


export function Router() {
    const [user, setUser] = useState(null);
    return (
        <BrowserRouter>
            <currentUser.Provider value={{user, setUser}}>
                <Routes>
                    {/* <Route path="/" element={<NavBar/>}> */}
                        <Route index element={<LandingPage/>}/>
                        <Route path="app" element={<AppPage/>}/>
                        <Route path="passwords" element={<PasswordsList />}/>
                        <Route path="passwords-report" element={<PasswordsReport />}/>
                        <Route path="passwords/new" element={ <NewPassword/> }/>
                        <Route path="/user/:username" element={<UserPage/>}/>
                    {/* </Route> */}
                    <Route path="*" element={<Error errorNo={404}/>}/>
                </Routes>
            </currentUser.Provider>
        </BrowserRouter>
    )
}
