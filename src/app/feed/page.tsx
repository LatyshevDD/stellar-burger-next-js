'use client'

import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/redux/store"
import dynamic from "next/dynamic"

const Order = dynamic(
  () => import('../../components/order/order'),
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

export default function Feed() {

  const { orders, total, totalToday} = useAppSelector(state => state.feedData)
  const dispatch = useAppDispatch()

  useEffect(
    () => { 
      dispatch({type: 'FEED_WS_CONNECTION_START', payload: 'wss://norma.nomoreparties.space/orders/all'})
    },
    [dispatch]
  )

  return (
    <main className='flex xl:pb-10 gap-16 xl:w-[80%] mx-auto h-[calc(100vh-64px)] xl:h-[calc(100vh-102px)]'>
      <section className="flex flex-col overflow-hidden w-[48%]">
        <p className="font-jet text-center leading-8 md:text-left md:leading-10 text-[28px] md:text-[36px] mt-[16px] mb-[8px] md:mt-[40px] md:mb-[20px]">
          Лента заказов
        </p>
        <ul className="custom-scroll flex flex-col gap-4 pr-2 overflow-auto overflow-x-hidden">
          {
            orders.length > 0
            &&
            orders.map(order => <Order key={order._id} order={order}/>)
          }
        </ul>
      </section>
      <section className="w-[50%]">

      </section>

    </main>
  )
}

