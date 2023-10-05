import React from 'react'
import { useSelector } from 'react-redux'
import { StateType } from '../useRedux/Store'
import ProductItem from '../component/ProductItem'

function Likes() {

  const likesData = useSelector( (obj: StateType) => obj.LikesReducer )
  
  return (
    <>
      <div className='row'>
        {likesData.map((item, index) =>
          <div className='col-sm-4' key={index} >
            <ProductItem pro={item}  />
          </div>
        )}
      </div>
    </>
  )

}

export default Likes