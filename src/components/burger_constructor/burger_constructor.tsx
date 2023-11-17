'use client'

import { useMemo } from "react"
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { addBun, addBurgerIngredient } from "@/redux/burgerDataSlice"
import { getOrderData } from "@/redux/orderDataSlice"
import { useDrop } from "react-dnd"
import BurgerIngredient from "../burger_ingredient/burger_ingredient"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { IngredientType } from "@/types/types"

export default function BurgerConstructor() {

  const burgerData = useAppSelector((state) => state.burgerData)
  const dispatch = useAppDispatch()

  const [, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item: IngredientType) => {
      if (item.type === 'bun') {
        dispatch(addBun(item))
      } else {
        dispatch(addBurgerIngredient(item))
      }
    }
  }))

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

  const handleGetOrder = () => {
    const totalIngrediences: IngredientType[] = [...bun,...ingredients]

    if (totalIngrediences.length >= 1) {
      // navigate('/order',{state: { background: location } })
      dispatch(getOrderData(totalIngrediences))
    }
  } 

  return (
    <section className="mt-25 hidden lg:block overflow-hidden" ref={drop}>
      <div className="flex flex-col gap-4 h-[74%]">
      {
        bun.length > 0 && (
          <div className="pl-6 pr-2">
            <ConstructorElement
              type="top"
              text={bun[0].name + ' ' + '(верх)'}
              price={bun[0].price}
              thumbnail={bun[0].image}
              isLocked
              extraClass='!text-sm !xl:text-base'
            />
          </div>  
        )
      }
      <ul className="flex flex-col max-h-[80%] gap-4 custom-scroll overflow-auto overflow-x-hidden">
        {
          ingredients.map((item) => (<BurgerIngredient ingredientData={item} key={item.key}/>))
        }
      </ul>
      {
        bun.length > 0 && (
          <div className="pl-6 pr-2">
            <ConstructorElement
              type="bottom"
              text={bun[0].name + ' ' + '(низ)'}
              price={bun[0].price}
              thumbnail={bun[0].image}
              isLocked
              extraClass='!text-sm !xl:text-base'
            />
          </div>  
        )
      }
      </div>
    </section>
  )
}