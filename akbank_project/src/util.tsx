import * as CryptoJS from 'crypto-js'
import { IProduct } from './models/IProducts'

const key = process.env.REACT_APP_KEY ? process.env.REACT_APP_KEY : 'key123'

export const encrypt = (plainText: string) => {
    const cipherText = CryptoJS.AES.encrypt(plainText, key).toString()
    return cipherText
}

export const decrypt = (cipherText: string) => {
    const byteArr = CryptoJS.AES.decrypt(cipherText, key )
    const plainText = byteArr.toString(CryptoJS.enc.Utf8)
    return plainText
}

export const storeLikes = (arr: IProduct[]) => {
    const jsonString = JSON.stringify(arr)
    localStorage.setItem('likes', jsonString)
}

export const dataLikes = () : IProduct[] => {
    var arr:IProduct[] = []
    try {
        const stData = localStorage.getItem('likes')
        if(stData) {
            const likesObj = JSON.parse(stData) as IProduct[]
            arr = likesObj
        }
    } catch (error) {
        localStorage.removeItem('likes')
    }
    return arr
}