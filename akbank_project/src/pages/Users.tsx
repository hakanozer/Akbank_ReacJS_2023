import React, { useEffect, useState, useRef } from 'react'
import { allUser } from '../service'
import { User } from '../models/IUsers'
import {Helmet} from 'react-helmet'

function Users() {

  const [search, setSearch] = useState('')
  const [arrUser, setArrUser] = useState<User[]>([])
  const [arrUserBack, setArrUserBack] = useState<User[]>([])
  const [singleUser, setSingleUser] = useState<User>()
  const refSearch = useRef<HTMLInputElement>(null)
  

  useEffect(() => {
    allUser().then(res => {
      const dt = res.data
      setArrUser(dt.users)
      //setSingleUser(dt.users[0])
      if( refSearch && refSearch.current ) {
        refSearch.current.focus()
      }
      setArrUserBack(dt.users)
    })
  }, [])

  useEffect(() => {
    setArrUser(arrUserBack)
    if(search !== '') {
      const newArr = arrUserBack.filter( item => 
        item.firstName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        item.lastName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        item.username.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        item.phone.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
      )
      setArrUser(newArr)
    }
  }, [search])

  const selectItem = (item: User) => {
    setSingleUser(item)
  }

  return (
    <>
    <Helmet>
      <title>Users</title>
      <meta name='description' content='App Users'></meta>
    </Helmet>
    <div className='row'>
      <div className='col-sm-3 mb-3 mt-3'>
        <input ref={refSearch} onChange={(evt) => setSearch(evt.target.value)} type='search' className='form-control' placeholder='User Search' />
      </div>
    </div>
    <h2>User List</h2>
    <table className="table table-hover">
    <thead>
      <tr>
        <th scope="col">#ID</th>
        <th scope="col">Profile</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">User</th>
        <th scope="col">Password</th>
        <th scope="col">Phone</th>
      </tr>
    </thead>
    <tbody>

      { arrUser.map((item, index) => 
        <tr onClick={() => selectItem(item)} data-bs-toggle="modal" data-bs-target="#exampleModal" key={index} role='button'>
          <th scope="row">{item.id}</th>  
          <td>
            <img src={item.image} className='img-thumbnail' width={70} />
          </td>
          <td>{item.firstName + ' ' + item.lastName }</td>
          <td>{item.email}</td>
          <td>{item.username}</td>
          <td>{item.password}</td>
          <td>{item.phone}</td>
        </tr>
      )}
    </tbody>
  </table>

    
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          { singleUser && 
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{singleUser.firstName + ' ' + singleUser.lastName}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>{singleUser.email}</div>
              <div>{singleUser.phone}</div>
              <div>{singleUser.gender}</div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
          }
        </div>
      </div>
    

    </>
  )
}

export default Users