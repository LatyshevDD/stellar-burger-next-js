"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import dynamic from "next/dynamic"

const Order = dynamic(
  () => import('../../../components/order/order'),
  {
    ssr:false,
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

export default function ProfileOrders() {
  
  const dispatch = useAppDispatch()
  const { orders } = useAppSelector(state => state.profileOrdersData)


  useEffect(
    () => { 
      let token = localStorage.getItem('accessToken')
      dispatch({
        type: 'PROFILE_ORDERS_WS_CONNECTION_START', 
        payload: `wss://norma.nomoreparties.space/orders?token=${token != null ? token.split('Bearer ')[1] : ''}`})
    },
    []
  )


  return (
    <section className="flex flex-col grow custom-scroll overflow-auto overflow-x-hidden">
      <p className="font-jet font-bold text-center leading-8 lg:hidden text-[28px] mt-[16px] mb-[16px]">
          История заказов
        </p>
      <ul className="flex lg:flex flex-col gap-4 lg:pr-2">
        {
          orders.length > 0
          &&
          orders.map(order => <Order key={order._id} order={order}/>)
        }
      </ul>
    </section>
  )
}