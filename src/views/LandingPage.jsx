import React, { useContext } from 'react'
import { currentUser } from '../contexts/UsersContext'

export function LandingPage() {
    const currUser = useContext(currentUser)
    console.log(currUser.user)
  return (
    <div>LandingPage {currUser.user && currUser.user.username}</div>
  )
}
