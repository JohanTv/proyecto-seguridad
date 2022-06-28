import React from 'react'

export function SecurityGrade({grade, passwords}) {
  return (

    <div className="securityContainer" id={grade}>
        <div className='title'>{grade}</div>
        {passwords.map((password)=>{console.log("xd",password); return password.passName})}
    </div>
  )
}
