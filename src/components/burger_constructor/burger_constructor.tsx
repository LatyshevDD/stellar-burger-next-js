'use client'

import { useMemo, useCallback } from "react"
import { ConstructorElement, CurrencyIcon, Button, CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { addBun, addBurgerIngredient } from "@/redux/burgerDataSlice"
import { getOrderData } from "@/redux/orderDataSlice"
import { useDrop } from "react-dnd"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { IngredientType } from "@/types/types"
import { closeSmallBurgerConstructorMenu } from "@/redux/burgerDataSlice"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

const BurgerIngredient = dynamic(
  () => import('../burger_ingredient/burger_ingredient'),
  {
    ssr: false,
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

export default function BurgerConstructor() {

  const burgerData = useAppSelector((state) => state.burgerData)
  const user = useAppSelector((store) => store.userData.user)
  const dispatch = useAppDispatch()
  const router = useRouter()

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

  const handleGetOrder = useCallback(
    () => {
      const totalIngrediences: IngredientType[] = [...bun,...ingredients]

      if(!user) {
        return router.replace('/login?from=/')
      }
  
      if (totalIngrediences.length >= 1) {
        dispatch(getOrderData(totalIngrediences))
        router.push('/order')
      }
    },[bun, ingredients, router, dispatch, user] 
  )


  return (
    <>
      {/* Секция для экранов с шириной более 1280px */}
      <section className="mt-25 hidden xl:block overflow-hidden" ref={drop}>
        <div className="flex flex-col gap-4 h-[74%]">
        {
          bun.length > 0 && (
            <div className="pl-6 pr-2" key={bun[0].key_1}>
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
            ingredients.map((item) => (<BurgerIngredient type='largeScreen' ingredientData={item} key={item.key}/>))
          }
        </ul>
        {
          bun.length > 0 && (
            <div className="pl-6 pr-2" key={bun[0].key_2}>
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
        <div className='flex gap-10 justify-end items-center mt-10'>
          <div className='flex gap-2'>
            <p className="text text_type_digits-default">
              {totalPrice}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <Button 
            htmlType="button" 
            type="primary" 
            size="large" 
            onClick={handleGetOrder}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {/* Секция для экранов с шириной менее 1280px */}
      <section className={`${burgerData.smallBurgerConstructorMenu ? 'flex' : 'hidden'} flex-col xl:hidden h-full absolute top-0 z-10 bg-[#131316] transition-all container mx-auto overflow-hidden`}>
        <div className='flex items-center justify-between px-2 py-4'>
          <p className="text text_type_main-medium">
            Заказ
          </p>
          <CloseIcon type='primary' onClick={() => dispatch(closeSmallBurgerConstructorMenu())} />
        </div>
        <ul className="flex flex-col w-full overflow-auto overflow-x-hidden grow">
          {
            bun.length > 0 && <BurgerIngredient type='smallScreen' ingredientData={bun[0]} key={bun[0].key}/>
          }
          {
            ingredients.map((item) => (<BurgerIngredient type='smallScreen' ingredientData={item} key={item.key}/>))
          }
          {
            bun.length > 0 && <BurgerIngredient type='smallScreen' ingredientData={bun[0]} key={bun[0].key}/>
          }
        </ul>
        <div className="flex mt-2 gap-4 rounded-2xl bg-[#1C1C21]">
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
            onClick={handleGetOrder}
            >
              Смотреть заказ
          </Button>
        </div>
      </div>
      </section>
    </>
  )
}