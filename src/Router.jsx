import React from 'react'
import {Route, Routes, BrowserRouter} from "react-router-dom"
import { Passwords } from "./views/Passwords"
import {Error} from "./views/Error"
import {LandingPage} from "./views/LandingPage"
import {UserPage} from "./components/User/UserPage"
import { NavBar } from './components/NavBar'

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar/>}>
                    <Route index element={<LandingPage/>}/>
                    <Route path="/passwords" element={<Passwords/>}/>
                    <Route path="/user/:username" element={<UserPage/>}/>
                </Route>
                <Route path="*" element={<Error errorNo={404}/>}/>
            </Routes>
        </BrowserRouter>
    )
}
