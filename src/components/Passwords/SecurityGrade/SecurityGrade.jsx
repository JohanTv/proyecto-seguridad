import React from 'react'

export function SecurityGrade({grade, passwords}) {
  console.log(grade, passwords);
  return (
    <div className="securityContainer" id={grade}>
        <div className='title'>{grade}</div>
        <div className="passListSecurity">
          {passwords.map((password)=>{return <div> {password.name} </div>})}
        </div>
    </div>
  )
}
