import React from 'react'
import { Logout } from './User/Logout'
export function Footer({logout}) {
    return (
            <Logout logout={logout}></Logout>
    )
}
