import { useDrag, useDrop } from "react-dnd"
import { deleteIngredient, sortIngredients } from "@/redux/burgerDataSlice"
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { IngredientProps, IngredientType } from "@/types/types"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { useMemo } from "react"

export default function BurgerIngredient({ingredientData}: IngredientProps) {

  const ingrediences: IngredientType[] = useAppSelector(state => state.burgerData.ingredients)
  const dispatch = useAppDispatch()

  const dropIndex = useMemo(
    () => ingrediences.findIndex(item => item.key === ingredientData.key),
    [ingrediences, ingredientData]
  ) 
  const [{isDragging}, drag, preview] = useDrag(() => ({
    type: 'burgerIngredient',
    item: ingredientData,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const [, drop] = useDrop(() => ({
    accept: 'burgerIngredient',
    hover: (item: IngredientType) => {
      const dragIndex = ingrediences.findIndex(ingredient => ingredient.key === item.key)
      dispatch(sortIngredients({dragIndex: dragIndex, dropIndex:dropIndex}))
    },
    drop: (item: IngredientType) => {
      const dragIndex = ingrediences.findIndex(ingredient => ingredient.key === item.key)
      dispatch(sortIngredients({dragIndex: dragIndex, dropIndex:dropIndex}))
    }
  }), [ingrediences])
  
  return (
    <div ref={preview}>
      <li className={`${isDragging ? 'opacity-0' : 'opacity-100'} flex items-center mr-2`} ref={drop}>
        <div ref={drag}>
          <DragIcon type="primary"/>
        </div>
        <ConstructorElement
          text={ingredientData.name}
          price={ingredientData.price}
          thumbnail={ingredientData.image}
          handleClose={() => {
            dispatch(deleteIngredient(ingredientData))
          }}
        />
      </li>
    </div>
    
  )
}