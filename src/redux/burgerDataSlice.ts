import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'
import { BurgerDataType, IngredientType, sortIngredientsPayloadType } from '../types/types'

const initialState: BurgerDataType = {
  bun: [],
  ingredients: [],
  smallBurgerConstructorMenu: false
}

export const burgerDataSlice = createSlice({
  name: 'burgerData',
  initialState,
  reducers: {
    addBurgerIngredient: {
      reducer: (state, action: PayloadAction<IngredientType>) => {
        return {
          ...state,
          ingredients: [
            ...state.ingredients,
            action.payload
          ]
        }
      },
      prepare: (item: IngredientType) => {
        const key = nanoid()
        return {
          payload: {
            ...item,
            key: key
          }
        }
      }
    }, 
    addBun: {
      reducer: (state, action: PayloadAction<IngredientType>) => {
        if (!(state.bun.length > 0)) {
          return {
            ...state, 
            bun: [
              action.payload
            ]
          }
        }
        else {
          if ('_id' in state.bun && state.bun._id === action.payload._id) {
            return {
              ...state
            };
          }
          else {
            return {
              ...state, 
              bun: [
                action.payload
              ]
            };
          }  
        }
      },
      prepare: (item: IngredientType) => {
        const key_1 = nanoid()
        const key_2= nanoid()
        return {
          payload: {
            ...item,
            key_1: key_1,
            key_2: key_2
          }
        }
      }
    },
    deleteIngredient: (state, action: PayloadAction<IngredientType>) => {
      return {
        ...state,
        ingredients: state.ingredients.filter(item => item.key !== action.payload.key),
      }
    },
    sortIngredients: (state, action: PayloadAction<sortIngredientsPayloadType>) => {

      const ingrediences = [...state.ingredients]
      ingrediences.splice(
        action.payload.dropIndex,
        0,
        ingrediences.splice(action.payload.dragIndex, 1)[0] 
      )
      return {
        ...state,
        ingredients: ingrediences,
      }
    },
    openSmallBurgerConstructorMenu: (state) => {
      return {
        ...state,
        smallBurgerConstructorMenu: true
      }
    },
    closeSmallBurgerConstructorMenu: (state) => {
      return {
        ...state,
        smallBurgerConstructorMenu: false
      }
    },
  },
})

export const { addBurgerIngredient, addBun, deleteIngredient, sortIngredients, openSmallBurgerConstructorMenu, closeSmallBurgerConstructorMenu } = burgerDataSlice.actions

export default burgerDataSlice.reducer