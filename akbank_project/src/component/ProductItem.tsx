import React from 'react'
import { IProduct } from '../models/IProducts'
import { useNavigate } from 'react-router-dom'

function ProductItem(item: {pro: IProduct}) {
  
  const navigate = useNavigate()

  return (
    <>
    <div
    onClick={ ()=> navigate('/productDetail/'+item.pro.id) }
    className="card mb-3" role='button'>
        <img src={item.pro.thumbnail} style={{height: 250,}} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{item.pro.title}</h5>
            <h4>{item.pro.price}₺</h4>
            <p className="card-text">{item.pro.description}</p>
        </div>
    </div>
    </>
  )
}

export default ProductItem