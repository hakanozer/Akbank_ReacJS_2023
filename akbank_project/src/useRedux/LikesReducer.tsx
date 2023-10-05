import { IProduct } from "../models/IProducts";
import { LikesEnum } from "./LikesEnum";

export interface ILikeAction {
    type: LikesEnum,
    payload: IProduct
}

export const LikesReducer = (state: IProduct[] = [], action: ILikeAction) => {
    switch (action.type) {
        case LikesEnum.LIKE_ADD:
            console.log(action.payload)
            const addIndex = state.findIndex(item => item.id === action.payload.id)
            if ( addIndex === -1 ) {
                const newArr = [...state, action.payload]
                return newArr
            }
            return state
        case LikesEnum.LIKE_REMOVE:
            const removeIndex = state.findIndex(item => item.id === action.payload.id)
            if ( removeIndex > -1 ) {
                const removeArr = Object.assign([], state)
                removeArr.splice(removeIndex, 1)
                return removeArr
            }
            return state
        default:
            return state;
    }
}