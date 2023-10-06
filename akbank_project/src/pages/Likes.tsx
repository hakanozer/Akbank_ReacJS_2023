import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { StateType } from '../useRedux/Store'
import ProductItem from '../component/ProductItem'
import {Helmet} from 'react-helmet'
import { DataContext } from '../DataContext'
//import unlike from '../assets/unlike.png'
const unlike = require('../assets/unlike.png')
function Likes() {

  // Context
  const { getItem, setItem } = useContext(DataContext)
    
  const likesData = useSelector( (obj: StateType) => obj.LikesReducer )
  
  return (
    <>
    <Helmet>
      <title>Likes</title>
      <meta name='description' content='App Likes'></meta>
    </Helmet>
      <h2>{getItem.title}</h2>
      {likesData.length === 0 &&
      <div className='text-center'>
        <img src={unlike} style={{width: 75}} />
      </div>
      }
      
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