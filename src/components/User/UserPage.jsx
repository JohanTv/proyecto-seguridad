import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Bio } from './Bio/Bio'
import { NewBio } from './Bio/NewBio'

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

    console.log(usuario)
    if(usuario){
        console.log("???")
        if(!(usuario.username in bios)){
            return(<NewBio currentBio={""} submitBio={updateBio}/>)
        }
        const bio = bios[usuario.username]
        return (
            <Fragment>
                <h1>Infrmación de {userNameParams}</h1>
                <Bio bio={bio}/>
                <NewBio currentBio={bio} submitBio={updateBio}/>
            </Fragment>
        )
    }
}
