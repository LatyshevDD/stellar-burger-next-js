'use client'

import { useRef, useState } from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { BUN, MAIN, SAUCE } from "@/utils/constants"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import Ingredient from "../ingredient/ingredient"

export default function BurgerIngredients() {

  const ingrediences = useAppSelector((state) => state.ingrediencesData.ingrediences)
  const dispatch = useAppDispatch()

  const [current, setCurrent] = useState(BUN)

  const ingredientsContainer = useRef<HTMLDivElement>(null)
  const bunRef = useRef<HTMLParagraphElement>(null)
  const sauceRef = useRef<HTMLParagraphElement>(null)
  const mainRef = useRef<HTMLParagraphElement>(null)

  const buns = ingrediences != null &&  ingrediences.filter((item) => item.type === BUN)
  const mains = ingrediences != null &&  ingrediences.filter((item) => item.type === MAIN)
  const sauces = ingrediences != null &&  ingrediences.filter((item) => item.type === SAUCE)

  const handleScroll = () => {
    const containerScroll = ingredientsContainer.current != null ? ingredientsContainer.current.getBoundingClientRect().top : 0
    const bunScroll = bunRef.current != null ?  bunRef.current.getBoundingClientRect().top - containerScroll : 0
    const sauceScroll = sauceRef.current != null ?  sauceRef.current.getBoundingClientRect().top - containerScroll : 0
    const mainScroll = mainRef.current != null ? mainRef.current.getBoundingClientRect().top - containerScroll : 0
    const maxOffset = -30
    if (bunScroll <= 0 && bunScroll > maxOffset) {
      setCurrent(BUN)
    }
    else if (sauceScroll <= 0 && sauceScroll > maxOffset) {
      setCurrent(SAUCE)
    }
    else if (mainScroll <= 0 && mainScroll > maxOffset) {
      setCurrent(MAIN)
    }
  }

  return (
    <section className="flex flex-col">
      <p className="text text_type_main-large mt-10 mb-5">
        Соберите бургер
      </p>
      <nav className="grid grid-cols-3">
      <Tab 
          value={BUN} 
          active={current === BUN} 
          onClick={
            () => {
              setCurrent(BUN);
              bunRef.current !=null && bunRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }
        >
          Булки
        </Tab>
        <Tab 
          value="sauce" 
          active={current === SAUCE} 
          onClick={
            () => {
              setCurrent(SAUCE);
              sauceRef.current != null && sauceRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }
        >
          Соусы
        </Tab>
        <Tab 
          value="main" 
          active={current === MAIN} 
          onClick={
            () => {
              setCurrent(MAIN);
              mainRef.current != null && mainRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }
        >
          Начинки
        </Tab>
      </nav>
      <div className="overflow-auto overflow-x-hidden mt-10 custom-scroll">
        <p className="text text_type_main-medium mb-6" ref={bunRef}>
          Булки
        </p>
        <ul className='grid grid-cols-2 auto-rows-auto gap-6'>
          {
            buns &&
            buns.map(item => (<Ingredient ingredientData={item} key={item._id}/>))
          }
        </ul>
      </div>

    </section>
  )

}