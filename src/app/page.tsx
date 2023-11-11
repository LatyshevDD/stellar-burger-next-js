import BurgerIngredients from "@/components/burger_ingredients/burger_ingredients"

export default function Home() {
  return (
    <main className='grid grid-cols-2 grid-rows-1 gap-10 w-[78%] mx-auto h-[calc(100vh-64px)] lg:h-[calc(100vh-102px)]'>
      <BurgerIngredients/>
    </main>
  )
}
