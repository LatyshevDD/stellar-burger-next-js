import { IngredientProps } from '../../types/types'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { useDrag } from 'react-dnd'
import { getCountOfIngredient } from '@/utils/utils'
import { addBurgerIngredient, addBun } from '@/redux/burgerDataSlice'
import { useCallback, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Ingredient({ingredientData}: IngredientProps) {

  const dispatch = useAppDispatch()

  const burgerData = useAppSelector(state => state.burgerData)
  
  let ingredientCount = useMemo(
    () => {
      if (ingredientData.type === 'bun') {
        return getCountOfIngredient(ingredientData, burgerData.bun)
      } else {
        return getCountOfIngredient(ingredientData, burgerData.ingredients)
      }
    }, [burgerData, ingredientData]
  )

  
  const handleAddButton = useCallback(() => {
    if (ingredientData.type === 'bun') {
      return dispatch(addBun(ingredientData))
    }

    return dispatch(addBurgerIngredient(ingredientData))
  }, [ingredientData, dispatch])

  const [, drag] = useDrag(() => ({
    type: 'ingredient',
    item: ingredientData,
  }))

  return (
    <li className='flex flex-col items-center relative transition-opacity hover:opacity-75' ref={drag}>
      <Link href={`/ingredients/${ingredientData._id}`}>
        <Image width={240} height={120} src={ingredientData.image} alt={ingredientData.name} />
        <div className='flex justify-center gap-2 mt-1 mb-2'>
          <p className="font-ice leading-5 md:leading-6 text-[22px] md:text-[28px]">{ingredientData.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="font-jet text-sm leading-5 md:leading-6 md:text-base text-center">
          {ingredientData.name}
        </p>
      </Link>
      <button 
        className='sm:invisible mt-9 font-jet text-sm leading-5 text-[#4C4CFF] transition-opacity hover:opacity-75'
        onClick={handleAddButton}
        >
        Добавить
      </button>
      {
        ingredientCount > 0 
        &&
        <Counter count={ingredientCount} size="default" extraClass='absolute top-0 right-0' />
      }
    </li>
  )

}
