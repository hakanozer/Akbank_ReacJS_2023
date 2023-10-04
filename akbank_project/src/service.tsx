import axios from 'axios'
import { IUser } from './models/IUser'
import { IProduct, IProducts } from './models/IProducts'

const base_url = 'https://dummyjson.com/'
const config = axios.create({
    baseURL: base_url,
    timeout: 15000,
    //headers: { token: 'token1234', key: 'key1234' },
    //auth: { username: 'ali01', password: 'ali12345'}
})

// User Auth
export const auth = ( username: string, password: string ) => {
    const sendObj = {
        username: username,
        password: password
    }
    return config.post<IUser>('auth/login', sendObj )
}


// All Product
export const allProduct = (skip: number = 0) => {
    const sendObj = {
        limit: 10,
        skip: skip
    }
    return config.get<IProducts>('products', {params: sendObj})
}

// Single Product
export const singleProduct = (id: number) => {
    return config.get<IProduct>('products/'+id)
}