import React, { useEffect, useState, useContext } from 'react'
import { allProduct } from '../service'
import { toast } from 'react-toastify'
import { IProduct } from '../models/IProducts'
import ProductItem from '../component/ProductItem'
import {Helmet} from 'react-helmet'
import { DataContext, IContext } from '../DataContext'

function Product() {

  // Context
  const { getItem, setItem } = useContext(DataContext)

  const [data, setData] = useState('')
  const [password, setPassword] = useState('')
  const [pageCountArr, setPageCountArr] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(0)

  const [ arr, setArr ] = useState<IProduct[]>([])

  const productAll = (skip: number) => {
    setArr([])
    setCurrentPage(skip / 10)
    allProduct(skip).then(res => {
      const dt = res.data

      // PageCount
      const mode = dt.total % dt.limit
      const count = dt.total / dt.limit
      var endCount = 0
      if (mode === 0) {
        endCount = (count)
      }else {
        endCount = ( Math.round(count)+1 )
      }
      const arr:number[] = []
      for (let i = 0; i < endCount; i++) {
        arr.push(i)
      }
      setPageCountArr(arr)

      setArr(dt.products)
    }).catch(err => {
      toast.error(err.message)
    })
  }

  useEffect( () => {
    productAll(0)
    const sendObj: IContext = {
      title: 'Product',
      color: 'red'
    }
    setItem(sendObj)
  }, [])

  useEffect( () => {
    if ( data !== '')
    console.log("username", data)
  }, [data])
  

  return (
    <>
        <Helmet>
            <title>Products</title>
            <meta name='description' content='App Products'></meta>
        </Helmet>
      <nav className='mt-2'>
        <ul className="pagination justify-content-end">
          {pageCountArr.map((item, index) => 
            <li onClick={() => productAll(index * 10)} key={index} className={item === currentPage ? 'page-item active': 'page-item'}><a className="page-link" role='button'>{(item + 1)}</a></li>
          )}
        </ul>
      </nav>
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