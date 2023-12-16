'use client'

import { getIngredientById } from '../../utils/utils'
import { useAppSelector } from '@/redux/store'
import { useParams } from 'next/navigation'
import { IngredientType } from '../../types/types'
import Image from 'next/image'


export default function IngredientDetails() {

  const params = useParams()
  const { ingredientID } = params
  const ingrediences = useAppSelector(state => state.ingrediencesData.ingrediences)

  let ingredient: IngredientType | undefined
  
  if (ingrediences != null && ingrediences.length > 0) {
     ingredient = (ingredientID !== undefined && typeof ingredientID === 'string') ? getIngredientById(ingrediences, ingredientID) : undefined
  }

  return (
    <main>
      <div className='flex flex-col items-center  xl:w-[40vw] h-[65vh] 2xl:h-[55vh] px-2 hl:px-0'>
      {
        ingredient
        &&
        <>
          <p className='hidden xl:block self-start font-jet text-4xl pb-[16px] pt-[40px] pl-[40px]'>
            Детали ингредиента
          </p>
          <Image 
            src={ingredient.image_large} 
            alt="Изображение ингредиента"
            width={480}
            height={240}
          />
          <p className="font-jet text-center text-2xl mt-[16px]">
            {ingredient.name}
          </p>
          <ul className='flex justify-center gap-5 mt-[32px] flex-wrap xl:flex-nowrap px-[32px] xl:px-[0px]'>
            <li className='flex flex-1 xl:flex-auto flex-col gap-2 items-center justify-between'>
              <p className="font-jet text-center text-base text_color_inactive">
                Калории,ккал
              </p>
              <p className="font-jet text-base text_color_inactive">
                {ingredient.calories}
              </p>
            </li>
            <li className='flex flex-1 xl:flex-auto flex-col gap-2 items-center justify-between'>
              <p className="font-jet text-center text-base text_color_inactive">
                Белки, г
              </p>
              <p className="font-jet text-base text_color_inactive">
                {ingredient.proteins}
              </p>
            </li>
            <li className='flex flex-1 xl:flex-auto flex-col gap-2 items-center justify-between'>
              <p className="font-jet text-center text-base text_color_inactive">
                Жиры, г
              </p>
              <p className="font-jet text-base text_color_inactive">
                {ingredient.fat}
              </p>
            </li>
            <li className='flex flex-1 xl:flex-auto flex-col gap-2 items-center justify-between'>
              <p className="font-jet text-center text-base text_color_inactive">
                Углеводы, г
              </p>
              <p className="font-jet text-base text_color_inactive">
                {ingredient.carbohydrates}
              </p>
            </li>
            </ul>
        </> 
      }  
      </div>
    </main>    
  )
}