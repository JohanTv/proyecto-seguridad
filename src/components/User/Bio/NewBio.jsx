import React from 'react'

export function NewBio({currentBio, submitBio}) {
    let bio = currentBio
    var prevText = (currentBio !=="") ? "Escribe algo nuevo sobre ti" : "Escribe sobre ti"

    const buildBio = () => {
        submitBio(bio)
    }

    return (
        <div>
            {prevText}
            <input type="text"  onChange={e => bio=e.currentTarget.value } placeholder="bio"/>
            <button type="submit" onClick={buildBio}>Subir bio</button>
        </div>
    )
}
