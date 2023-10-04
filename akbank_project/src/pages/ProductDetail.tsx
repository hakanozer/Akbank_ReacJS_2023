import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { singleProduct } from '../service'
import { toast } from 'react-toastify'
import { IProduct } from '../models/IProducts'

function ProductDetail() {

  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState<IProduct>()
  const [bigImage, setBigImage] = useState('')

  useEffect(() => {
    const pid = params.pid
    if (pid) {
        const numPid = Number(pid)
        if( !Number.isNaN(numPid) ) {
            if ( numPid > 0 ) {
                singleProduct(numPid).then(res => {
                    const dt = res.data
                    setBigImage(dt.images[0])
                    setItem(dt)
                }).catch(err => {
                    toast.error(err.message)
                })
            }else {
                navigate("/product", {replace: true})
            }
        }else {
            navigate("/product", {replace: true})
        }
    }
    //console.log(location.state)
  },[])
    
  return (
    <>
    { item &&
        <div className='row mt-3'>
            <div className='col-sm-6'>
                <h2>{item.title}</h2>
                <h3><span className="badge bg-secondary">{item.price}₺</span></h3>
                <p>{item.description}</p>
            </div>
            <div className='col-sm-6'>
                <img src={bigImage} className='img-fluid' role='button' data-bs-toggle="modal" data-bs-target="#modalID" />
                <div className='row mt-3'>
                    { item.images.map((path, index) => 
                        <img onClick={() => setBigImage(path)} role='button' key={index} src={path} className='img-thumbnail col-2 p-2 m-1' style={{height: 90,}} />
                    )}
                </div>
            </div>
            
            <div className="modal fade" id='modalID' tabIndex={-1}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <img src={bigImage} className='img-fluid' />
                    </div>
                </div>
            </div>

        </div>
    }
    </>
    
  )

}

export default ProductDetail