'use client'

import { useRef, useState, useMemo, useCallback } from "react"
import { Tab, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { BUN, MAIN, SAUCE } from "@/utils/constants"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { openSmallBurgerConstructorMenu } from "@/redux/burgerDataSlice"
import dynamic from "next/dynamic"

const Ingredient = dynamic(
  () => import('../ingredient/ingredient'),
  {
    loading: () => {
      return (
        <div className="w-full h-full flex gap-2 justify-center items-center">
          <p className="font-jet text-sm xl:text-base animate-pulse">
            Загрузка
          </p>
          <div className="border-4 border-b-transparent rounded-full w-5 h-5 animate-spin"></div>
        </div>
      )
    },
  }
)
  

export default function BurgerIngredients() {

  const ingrediences = useAppSelector((state) => state.ingrediencesData.ingrediences)
  const burgerData = useAppSelector((state) => state.burgerData)
  const dispatch = useAppDispatch()

  const [current, setCurrent] = useState(BUN)

  const ingredientsContainer = useRef<HTMLDivElement>(null)
  const bunRef = useRef<HTMLParagraphElement>(null)
  const sauceRef = useRef<HTMLParagraphElement>(null)
  const mainRef = useRef<HTMLParagraphElement>(null)

  const ingredients = useMemo(() => burgerData.ingredients, [burgerData])
  const bun = useMemo(() => burgerData.bun, [burgerData])

  const totalPrice = useMemo(() => {
    let ingrediencePrice = 0;
    let bunPrice = 0;
    if (ingredients.length > 0) {
      ingrediencePrice = ingredients.reduce((sum, item) => {return sum + item.price}, 0)
    }
    if (bun.length > 0) {
      bunPrice = bun[0].price * 2;
    }
    return ingrediencePrice + bunPrice;
  },
    [ingredients, bun]
  )

  const buns = useMemo(
    () => { 
      if(ingrediences != null) {
        return ingrediences.filter((item) => item.type === BUN)
      }
    }, [ingrediences]
  )

  const mains = useMemo(
    () => {
      if(ingrediences != null) {
        return ingrediences.filter((item) => item.type === MAIN)
      }
    }, 
    [ingrediences]
  )
  const sauces = useMemo(
    () => {
      if(ingrediences != null) {
        return ingrediences.filter((item) => item.type === SAUCE)
      }
    },
    [ingrediences]
  )
  
  const handleScroll = useCallback(
    () => {
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
    },
    [ingredientsContainer, bunRef, sauceRef, mainRef]
  )
    

  return (
    <section className="flex flex-col overflow-hidden">
      <p className="font-jet text-center leading-8 md:text-left md:leading-10 text-[28px] md:text-[36px] mt-4 mb-2 md:mt-10 md:mb-5">
        Соберите бургер
      </p>
      <nav className="grid w-full grid-cols-3">
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
      <div className="overflow-auto overflow-x-hidden mt-5 md:mt-10 custom-scroll" onScroll={handleScroll} ref={ingredientsContainer}>
        <p className="text text_type_main-medium mb-4 md:mb-6 ml-2 md:ml-0" ref={bunRef}>
          Булки
        </p>
        <ul className='grid grid-cols-2 auto-rows-auto gap-4 md:gap-6'>
          {
            buns &&
            buns.map(item => (<Ingredient ingredientData={item} key={item._id}/>))
          }
        </ul>
        <p className="text text_type_main-medium mb-4 md:mb-6 ml-2 md:ml-0" ref={sauceRef}>
          Соусы
        </p>
        <ul className='grid grid-cols-2 auto-rows-auto gap-4 md:gap-6'>
          {
            sauces &&
            sauces.map(item => (<Ingredient ingredientData={item} key={item._id}/>))
          }
        </ul>
        <p className="text text_type_main-medium mb-4 md:mb-6 ml-2 md:ml-0" ref={mainRef}>
          Начинки
        </p>
        <ul className='grid grid-cols-2 auto-rows-auto gap-4 md:gap-6'>
          {
            mains &&
            mains.map(item => (<Ingredient ingredientData={item} key={item._id}/>))
          }
        </ul>
      </div>
      {/* Кнопка заказа на маленьких разрешениях */}
      <div className="flex mt-2 gap-4 rounded-2xl bg-[#1C1C21] xl:hidden">
        <div className="flex items-center gap-4 my-4 mx-auto">
          <div className="flex gap-2">
            <p className="font-ice text-[22px] leading-6">
              {totalPrice}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <Button 
            htmlType="button" 
            type="primary" 
            size="small" 
            extraClass="ml-2"
            onClick={() => dispatch(openSmallBurgerConstructorMenu())}
            >
              Смотреть заказ
          </Button>
        </div>
      </div>
    </section>
  )

}