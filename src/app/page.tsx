"use client"

import BurgerIngredients from "@/components/burger_ingredients/burger_ingredients"
import BurgerConstructor from "@/components/burger_constructor/burger_constructor"

export default function Home() {
    
  return (
    <main className='grid grid-cols-1 xl:pb-10 xl:grid-cols-2 xl:grid-rows-1 gap-10 xl:w-[80%] mx-auto h-[var(--main-height-beforexl)] xl:h-[var(--main-height-overxl)]'>
      <BurgerIngredients/>
      <BurgerConstructor/>
    </main>
  )
}
