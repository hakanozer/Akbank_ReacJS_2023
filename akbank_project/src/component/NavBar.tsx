import React, { useEffect, useContext } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { IUser } from '../models/IUser'
import { useSelector, useDispatch } from 'react-redux'
import { StateType } from '../useRedux/Store'
import { dataLikes } from '../util'
import { ILikeAction } from '../useRedux/LikesReducer'
import { LikesEnum } from '../useRedux/LikesEnum'
import { DataContext } from '../DataContext'


function NavBar( item: {user: IUser} ) {

  // Context Using
  const { getItem, setItem } = useContext(DataContext)

  const likesData = useSelector( (obj: StateType) => obj.LikesReducer )
  const dispatch = useDispatch()
  useEffect(() => {
    dataLikes().forEach((item, index) => {
      const sendObj: ILikeAction = {
        type: LikesEnum.LIKE_ADD,
        payload: item
      }
      dispatch(sendObj)
    })
  }, [])

  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('user')
    navigate('/', {replace: true})
  }   

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
        <a className="navbar-brand" style={{color: getItem.color}}>{getItem.title}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <NavLink to={'/product'} reloadDocument className="nav-link" aria-current="page">Product</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to={'/users'} reloadDocument className="nav-link">Users</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to={'/likes'} className="nav-link">Likes</NavLink>
            </li>
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Profile
            </a>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" role='button' onClick={logout}>Logout</a></li>
            </ul>
            </li>
            <li className="nav-item">
            <a className="nav-link disabled" aria-disabled="true">{item.user.firstName} {item.user.lastName} ({likesData.length}) </a>
            </li>
        </ul>
        <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        </div>
    </div>
    </nav>
  )
}

export default NavBar