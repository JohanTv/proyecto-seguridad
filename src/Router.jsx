import React from 'react'
import {Route, Routes, BrowserRouter} from "react-router-dom"
import { PasswordsList } from "./components/Passwords/PasswordsList"
import { NewPassword } from "./components/Passwords/NewPassword"
import {Error} from "./views/Error"
import {LandingPage} from "./views/LandingPage"
import {UserPage} from "./components/User/UserPage"
import { NavBar } from './components/NavBar'

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<NavBar/>}> */}
                    <Route index element={<LandingPage/>}/>
                    <Route path="passwords" element={<PasswordsList />}/>
                    <Route path="passwords/new" element={ <NewPassword/> }/>
                    <Route path="/user/:username" element={<UserPage/>}/>
                {/* </Route> */}
                <Route path="*" element={<Error errorNo={404}/>}/>
            </Routes>
        </BrowserRouter>
    )
}
