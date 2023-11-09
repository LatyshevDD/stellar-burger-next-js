import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IngrediencesDataType, IngredientType, IngrediencesSetErrorPayload } from '../types/types'

const initialState: IngrediencesDataType = {
  ingrediences: null, 
  hasError: false, 
  errorMessage: ''
}

export const ingrediencesDataSlice = createSlice({
  name: 'ingrediencesData',
  initialState,
  reducers: {
    setIngrediences: (state, action: PayloadAction<IngredientType[]>) => {
      return {
        ...state,
        ingrediences: action.payload
      }
    },
    setError: (state, action: PayloadAction<IngrediencesSetErrorPayload>) => {
      return {
        ...state,
        hasError: action.payload.hasError, 
        errorMessage: action.payload.errorMessage     
      }
    },
  },
})

export const { setIngrediences, setError } = ingrediencesDataSlice.actions

export default ingrediencesDataSlice.reducer