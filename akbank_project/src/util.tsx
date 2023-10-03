import * as CryptoJS from 'crypto-js'

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