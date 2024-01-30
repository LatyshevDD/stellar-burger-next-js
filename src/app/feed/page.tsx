'use client'

import { useState } from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { useAppSelector } from "@/redux/store"
import dynamic from "next/dynamic"

const Order = dynamic(
  () => import('../../components/order/order'),
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

export default function Feed() {

  const { orders, total, totalToday} = useAppSelector(state => state.feedData)
  const [tab, setTab] = useState('Заказы')

  return (
    <main className='flex flex-col lg:flex-row lg:pb-10 lg:gap-16 xl:w-[80%] mx-auto h-[calc(100vh-64px)] xl:h-[calc(100vh-102px)] overflow-hidden'>

      {/* Секция с информацией о заказах и ингридиентах */}
      <section className="flex flex-col overflow-hidden w-full lg:w-[48%]">
        <p className="font-jet text-center leading-8 lg:text-left lg:leading-10 text-[28px] lg:text-[36px] mt-[16px] mb-[8px] lg:mt-[40px] lg:mb-[20px]">
          Лента заказов
        </p>
        {/* Навигационное меню для ширины экрана менее 1024px(lg) */}
        <nav className="grid grid-cols-2 lg:hidden mb-[20px]">
          <Tab 
            value="Заказы" 
            active={tab === "Заказы"} 
            onClick={() => setTab("Заказы")}
          >
            Заказы
          </Tab>
          <Tab 
            value="Статистика" 
            active={tab === "Статистика"} 
            onClick={() => setTab("Статистика")}
          >
            Статистика
          </Tab>
        </nav>
        <ul className={`${tab === "Заказы" ? "flex" : "hidden"} custom-scroll lg:flex flex-col gap-4 lg:pr-2 overflow-auto overflow-x-hidden`}>
          {
            orders.length > 0
            &&
            orders.map(order => <Order key={order._id} order={order}/>)
          }
        </ul>
      </section>

      {/* Секция со статистикой о заказах */}
      <section className={`${tab === "Статистика" ? "flex" : "hidden"} lg:flex flex-col gap-[24px] lg:gap-[60px] w-full lg:w-[50%] lg:mt-[40px] px-2 lg:px-0 overflow-auto`}>
        <div className="flex gap-[36px] max-h-[206px] lg:overflow-hidden lg:max-h-[176px]">
          <div className="flex flex-col gap-6 w-[50%]">
            <p className="font-jet text-[20px] leading-6 lg:text-[24px] lg:leading-8">
              Готовы:
            </p>
            <div className='grid grid-flow-col gap-2 grid-cols-[repeat(auto-fill,55px)] lg:grid-cols-[repeat(auto-fill,72px)] grid-rows-[repeat(10,auto)] h-[73%] overflow-auto'>
              {
                orders.map(order => {
                  if(order.status === 'done') {
                    return <p className="font-ice leading-6 text-[22px] lg:text-[28px] text-[#00CCCC]" key={order._id}>{order.number}</p>
                  }
                })
              }
            </div>
          </div>
          <div className="flex flex-col gap-6 w-[50%]">
            <p className="font-jet text-[20px] leading-6 lg:text-[24px] lg:leading-8">
              В работе:
            </p>
            <div className='grid grid-flow-col gap-2 grid-cols-[repeat(auto-fill,55px)] lg:grid-cols-[repeat(auto-fill,72px)] grid-rows-[repeat(10,auto)] h-[73%] overflow-auto'>
              {
                orders.map(order => {
                  if(order.status !== 'done') {
                    return <p className="font-ice leading-6 text-[22px] lg:text-[28px]" key={order._id}>{order.number}</p>
                  }
                })
              }
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <p className='font-jet text-[20px] leading-6 lg:text-[24px] lg:leading-8'>
              Выполнено за все время:
          </p>
          <p className="font-ice text-[72px] leading-[80px] lg:text-[144px] lg:leading-[120px] [text-shadow:0px_4px_32px_rgba(51,51,255,0.50),0px_0px_8px_rgba(51,51,255,0.25),0px_0px_16px_rgba(51,51,255,0.25)]">
            {total}
          </p>
        </div>
        <div className='flex flex-col'>
          <p className='font-jet text-[20px] leading-6 lg:text-[24px] lg:leading-8'>
              Выполнено за сегодня:
          </p>
          <p className="font-ice text-[72px] leading-[80px] lg:text-[144px] lg:leading-[120px] [text-shadow:0px_4px_32px_rgba(51,51,255,0.50),0px_0px_8px_rgba(51,51,255,0.25),0px_0px_16px_rgba(51,51,255,0.25)]">
            {totalToday}
          </p>
        </div>
      </section>
    </main>
  )
}

