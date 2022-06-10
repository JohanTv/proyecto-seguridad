import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Bio } from './Bio/Bio'
import { NewBio } from './Bio/NewBio'
import { NavLink } from 'react-router-dom'

const BIO = "retoLuiseBios"

export function UserPage({usuario}) {
    const [bios, setBios] = useState({})
    const params = useParams()
    const userNameParams = params.username
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
            // return(
            // <Fragment>
                content = <NewBio currentBio={""} submitBio={updateBio}/>
                {/* <NavLink to="/passwords" style={({ isActive }) => isActive ? {color: 'red'} : {color: 'blue'}} activeclassname="active">To passwords</NavLink> */}
            // </Fragment>
            // )
        }
        else{
            const bio = bios[usuario.username]
            content = (<Fragment><h3>Información de {userNameParams}</h3>
                <Bio bio={bio}/>
                <NewBio currentBio={bio} submitBio={updateBio}/></Fragment>)
        }
        return (
            <Fragment>
                {content}
                <NavLink to="/passwords" style={({ isActive }) => isActive ? {color: 'red'} : {color: 'blue'}} activeclassname="active">To passwords</NavLink>
            </Fragment>
        )
    }
}
