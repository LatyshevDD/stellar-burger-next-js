import BurgerIngredients from "@/components/burger_ingredients/burger_ingredients"
import BurgerConstructor from "@/components/burger_constructor/burger_constructor"

export default function Home() {
  return (
    <main className='grid grid-cols-1 lg:pb-10 lg:grid-cols-2 lg:grid-rows-1 gap-10 lg:w-[80%] mx-auto h-[calc(100vh-64px)] lg:h-[calc(100vh-102px)]'>
      <BurgerIngredients/>
      <BurgerConstructor/>
    </main>
  )
}
