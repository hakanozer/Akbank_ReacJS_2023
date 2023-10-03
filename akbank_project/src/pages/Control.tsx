import React from 'react'
import { IUser } from '../models/IUser'
import { Navigate } from 'react-router-dom'
import { decrypt } from '../util'
import NavBar from '../component/NavBar'

function Control(item: { page: JSX.Element }) {

  var user: IUser | null = null
  const stUser = localStorage.getItem('user')
  try {
    if ( stUser ) {
        const plainText = decrypt(stUser)
        user = JSON.parse(plainText) as IUser
        // RestApi
    }
  } catch (error) {
    localStorage.removeItem('user')
  }


  return (
    user === null
    ?
    <Navigate to='/' replace={true} />
    :
    <>
    <NavBar user={user}/>
    { item.page }
    </>
  )
}

export default Control