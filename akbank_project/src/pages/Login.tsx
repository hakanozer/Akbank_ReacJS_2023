import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { citiesArr } from '../models/citiesData'
import { auth } from '../service'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [username, setUserName] = useState('kminchelle')
  const [password, setPassword] = useState('0lelplR')

  const fncLogin = ( evt: React.FormEvent ) => {
    evt.preventDefault()
    if ( username === '' ) {
        toast.error('UserName Empty!')
    }else if ( password === '') {
        toast.error('Password Empty!')
    }else {
        auth(username, password).then(res => {
            // eslint-disable-next-line
            const dt = res.data
            navigate('/product')
        }).catch(err => {
            toast.error(err.message)
        })
    }
  }

  return (
    <>
        <div className="row">
            <div className='col-sm-4'></div>
            <div className='col-sm-4'>
                <h2>User Login</h2>
                <form onSubmit={fncLogin} >
                    <div className='mb-3'>
                        <input value={username} onChange={(evt) => setUserName(evt.target.value)} placeholder='Username' className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <input value={password} onChange={(evt) => setPassword(evt.target.value)} type='password' placeholder='Password' className='form-control' />
                    </div>
                    <div className='mb-3'>
                    <select className="form-select">
                        <option value="">Citiy Select</option>
                        { citiesArr.map((item, index) => 
                            <option key={index} value={item.id}>{item.title} - {item.total}</option>
                        )}
                    </select>
                    </div>
                    <button className='btn btn-success'>Send</button>
                </form>
                { citiesArr.map( (item, index ) =>
                    <div key={index}>{/* {item.id} - {item.title} - {item.total} */}</div>
                )}
            </div>
            <div className='col-sm-4'></div>
        </div>
    </>
  )
}

export default Login

