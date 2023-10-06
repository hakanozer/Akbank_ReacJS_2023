import { IProduct } from "../models/IProducts";
import { storeLikes } from "../util";
import { LikesEnum } from "./LikesEnum";

export interface ILikeAction {
    type: LikesEnum,
    payload: IProduct
}

export const LikesReducer = (state: IProduct[] = [], action: ILikeAction) => {
    switch (action.type) {
        case LikesEnum.LIKE_ADD:
            const addIndex = state.findIndex(item => item.id === action.payload.id)
            if ( addIndex === -1 ) {
                const newArr = [...state, action.payload]
                storeLikes(newArr)
                return newArr
            }
            return state
        case LikesEnum.LIKE_REMOVE:
            const removeIndex = state.findIndex(item => item.id === action.payload.id)
            if ( removeIndex > -1 ) {
                const removeArr = Object.assign([], state)
                removeArr.splice(removeIndex, 1)
                storeLikes(removeArr)
                return removeArr
            }
            return state
        default:
            return state;
    }
}