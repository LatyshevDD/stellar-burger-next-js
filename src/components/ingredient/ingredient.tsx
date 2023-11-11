import { IngredientProps } from '../../types/types'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { useDrag } from 'react-dnd'
import { getCountOfIngredient } from '@/utils/utils'
import Link from 'next/link'
import Image from 'next/image'

export default function Ingredient({ingredientData}: IngredientProps) {

  const dispatch = useAppDispatch()

  const burgerData = useAppSelector(state => state.burgerData)
  
  let ingredientCount: number

  if (ingredientData.type === 'bun') {
    ingredientCount = getCountOfIngredient(ingredientData, burgerData.bun)
  } else {
    ingredientCount = getCountOfIngredient(ingredientData, burgerData.ingredients)
  }

  const [, drag] = useDrag(() => ({
    type: 'ingredient',
    item: ingredientData,
  }))

  return (
    <li className='flex flex-col items-center relative' ref={drag}>
      <Link href={`/ingredients/${ingredientData._id}`}>
        <Image width={240} height={120} src={ingredientData.image} alt={ingredientData.name} />
        <div className='flex justify-center gap-2 mt-1 mb-2'>
          <p className="text text_type_digits-default">{ingredientData.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text-center text_type_main-default">
          {ingredientData.name}
        </p>
      </Link>
      {
        ingredientCount > 0 
        &&
        <Counter count={ingredientCount} size="default" extraClass='absolute top-0 right-0' />
      }
    </li>
  )

}
