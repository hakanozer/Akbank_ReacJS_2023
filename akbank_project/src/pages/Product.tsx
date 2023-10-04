import React, { useEffect, useState } from 'react'
import { allProduct } from '../service'
import { toast } from 'react-toastify'
import { IProduct } from '../models/IProducts'
import ProductItem from '../component/ProductItem'

function Product() {

  const [data, setData] = useState('')
  const [password, setPassword] = useState('')

  const [ arr, setArr ] = useState<IProduct[]>([])

  const productAll = (skip: number) => {
    allProduct(skip).then(res => {
      const dt = res.data
      setArr(dt.products)
    }).catch(err => {
      toast.error(err.message)
    })
  }

  useEffect( () => {
    productAll(0)
  }, [])

  useEffect( () => {
    if ( data !== '')
    console.log("username", data)
  }, [data])
  

  return (
    <>
      <div className='row'>
        {arr.map((item, index) =>
          <div className='col-sm-4' key={index} >
            <ProductItem pro={item}  />
          </div>
        )}
      </div>
    </>
  )
}

export default Product