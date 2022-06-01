import React from 'react'

export function Logout({logout}) {
    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}
