import { useDrag, useDrop } from "react-dnd"
import { deleteIngredient, sortIngredients } from "@/redux/burgerDataSlice"
import { DragIcon, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { IngredientProps, IngredientType } from "@/types/types"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { useMemo } from "react"
import Image from "next/image"

export default function BurgerIngredient({ingredientData, type}: IngredientProps) {

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
    <>
      {
        type === 'largeScreen' &&
        (
          <li ref={preview} className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'} opacity-100`}>
            <div className={`${isDragging ? 'opacity-0' : 'opacity-100'} flex items-center mr-2`} ref={drop}>
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
                extraClass='!text-sm !xl:text-base'
              />
            </div>
          </li>
        )
      }
      {
        type === 'smallScreen' &&
        (
          <li ref={preview} className="opacity-100">
            <div className={`${isDragging ? 'opacity-0' : 'opacity-100'} flex items-center gap-2`} ref={drop}>
              <div ref={drag}>
                <DragIcon type="primary"/>
              </div>
                <div className="flex justify-between items-center gap-2 border-b border-[#2F2F37] min-h-[72px] grow">
                  <Image 
                    src={ingredientData.image_mobile}
                    alt='Изображение ингридиента'
                    width={52}
                    height={40}
                    style={{alignSelf: "stretch", objectFit:'cover'}}
                  />
                  <p className="font-jet text-sm md:text-base grow"> {ingredientData.name} </p>
                  <div className='flex justify-center gap-2 mr-2'>
                    <p className="font-ice leading-5 md:leading-6 text-[22px] md:text-[28px]">{ingredientData.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              </div>
          </li>
        )
      }
    </>
  )
}