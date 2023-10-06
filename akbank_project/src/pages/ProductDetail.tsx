import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { singleProduct } from '../service'
import { toast } from 'react-toastify'
import { IProduct } from '../models/IProducts'
import { useSelector, useDispatch } from 'react-redux'
import { StateType } from '../useRedux/Store'
import { ILikeAction } from '../useRedux/LikesReducer'
import { LikesEnum } from '../useRedux/LikesEnum'
import {Helmet} from 'react-helmet'

function ProductDetail() {

  // Use Redux
  const likesData = useSelector( (obj: StateType) => obj.LikesReducer )
  const dispatch = useDispatch() 

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
                    const index = likesData.findIndex(itemx => itemx.id === dt.id)
                    if (index > -1) {
                        setIsLike(true)
                    }
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

  const [isLike, setIsLike] = useState(false)
  const fncIsLike = () => {
    const status = !isLike
    if ( status ) {
        // Like Add
        const sendObj: ILikeAction = {
            type: LikesEnum.LIKE_ADD,
            payload: item!
        }
        dispatch(sendObj)
    }else {
        // Like Remove
        const sendObj: ILikeAction = {
            type: LikesEnum.LIKE_REMOVE,
            payload: item!
        }
        dispatch(sendObj)
    }
    setIsLike(status)
  }


  return (
    <>
    { item &&
        <Helmet>
            <title>{item.title}</title>
            <meta name='description' content={item.description}></meta>
        </Helmet>
    }
    { item &&
        <div className='row mt-3'>
            <div className='col-sm-6'>
                <h2>{item.title}</h2>
                <h3><span className="badge bg-secondary">{item.price}₺</span></h3>
                <p>{item.description}</p>
                <i onClick={() => fncIsLike() } className="bi bi-star-fill" role='button' style={{fontSize: 25, color: isLike === true ? 'red': 'black'}}></i>
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