import { IngredientType, WebSocketOrderType } from "../types/types"

export function getIngrediencesId(array: IngredientType[]): String[] {
  return array.reduce((total: String[], item) => {
    if (item) {
      return [...total, item._id]
    }
    else {
      return total
    }
    
  }, [])
}

export function getCountOfIngredient(ingredient: IngredientType, array: IngredientType[]) {
  const count = array.reduce((total, item) => {
    if (item._id === ingredient._id) {
      return total += 1
    } 
    return total
  }, 0)
  
  return count
}

export function getCountOfIngredientWithIndexes(ingredient: IngredientType, array: IngredientType[]) {
  const count = array.reduce((total:  {count: number, indexes: number[]}, item, index: number) => {
    if (item._id === ingredient._id) {
      total.count += 1
      total.indexes.push(index)
      return total
    } 
    return total
  }, {count: 0, indexes: []})
  
  return count
}

export function getIngredientById(array: IngredientType[], id: string) {
  return array.find(item => item._id === id) as IngredientType
}

export function checkArrayProperties(array: String[]) {
  let result = true
  array.forEach(element => {
    if(!element) {
      result = false
    }
  })
  return result
}

export function checkOrdersIngredients(array: WebSocketOrderType[]) {
  return array.filter(item => {
    return checkArrayProperties(item.ingredients)
  })
}

export function isEmptyObj(obj: Object) {
  return Object.keys(obj).length === 0;
}