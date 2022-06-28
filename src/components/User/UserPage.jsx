import React, { Fragment, useState, useEffect } from 'react'
import { Bio } from './Bio/Bio'
import { NewBio } from './Bio/NewBio'
import { NavLink } from 'react-router-dom'

const BIO = "BIOS"

export function UserPage({usuario}) {
    const [bios, setBios] = useState({})
    const updateBio = (content) => {
        // if(usuario in bios)
        let newBios = {...bios}
        newBios[usuario.username] = content
        setBios(newBios)
    }
    
    useEffect(() => {
        const storedBios = JSON.parse(localStorage.getItem(BIO))
        if(storedBios){
            setBios(storedBios)
        }
    }, [])

    useEffect(() => {
        if(bios)
            localStorage.setItem(BIO, JSON.stringify(bios))
    }, [bios])

    let content;
    if(usuario){
        if(!(usuario.username in bios)){
            content = <NewBio currentBio={""} submitBio={updateBio}/>
        }
        else{
            const bio = bios[usuario.username]
            content = (<Fragment><h3>Información de {usuario.username}</h3>
                <Bio bio={bio}/>
                <NewBio currentBio={bio} submitBio={updateBio}/></Fragment>)
        }
        return (
            <Fragment>
                {content}
                <div><NavLink to="/passwords" style={({ isActive }) => isActive ? {color: 'red'} : {color: 'blue'}} activeclassname="active">To passwords</NavLink></div>
                <div><NavLink to="/passwords-report" style={({ isActive }) => isActive ? {color: 'red'} : {color: 'blue'}} activeclassname="active">Get passwords report</NavLink></div>
            </Fragment>
        )
    }
}
