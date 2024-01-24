'use client'

import { useState, useEffect } from "react"
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { getIngredientById, getCountOfIngredientWithIndexes } from "@/utils/utils"
import { useAppSelector } from "@/redux/store"
import { getOrder } from "@/utils/api"
import { useParams } from "next/navigation"
import { IngredientType, WebSocketOrderType } from "@/types/types"

export default function OrderSymmary({modal}: {modal: boolean}) {

  const params = useParams()
  const { orderID } = params

  const { ingrediences } = useAppSelector(state => state.ingrediencesData)

  const [order, setOrder] = useState<{data: WebSocketOrderType | null, error: boolean}>({data: null, error: false})

  useEffect(() => {
    if (typeof orderID === 'string') {
      getOrder(orderID)
      .then(res => {
        setOrder({...order, data: res.orders[0]})})
    }
  }, [order, orderID])

  let selectedIngrediences: IngredientType[] = [], orderPrice: number = 0
  if(order.data && ingrediences != null) {
        selectedIngrediences = order.data.ingredients.map(item => getIngredientById(ingrediences, item))
        orderPrice = selectedIngrediences.reduce((sum, item) => {
          return sum + item.price
        }, 0)
  }

  const date = () => {
    const dateFromServer = order.data != null ? order.data.createdAt : ''
    return <FormattedDate date={new Date(dateFromServer)} className='font-jet text-[16px] leading-6 text_color_inactive'/>
  }

  return (
    <section className={`flex flex-col ${modal ? 'w-full max-h-[650px] p-10' : 'w-[35% h-[57%]]'}`}>
      <p className="font-ice text-center text-[28px] leading-6 mb-10">
        {`#${order.data != null && order.data.number}`}
      </p>
      <p className="font-jet text-left text-[28px] font-bold leading-8 mb-3">
        {order.data != null && order.data.name}
      </p>
      <p  className="font-jet text-[16px] leading-6 font-normal text_color_inactive mb-[60px]">
        {order.data != null && order.data.status === 'done' ? 'Выполнен' : 'Готовится'}
      </p>
      <p className="font-jet text-[24px] font-bold leading-8 mb-6">
        Состав:
      </p>
      <ul className="max-h-[320px] flex flex-col gap-4 overflow-auto overflow-x-hidden mb-10 custom-scroll">
        {
          selectedIngrediences
          &&
          selectedIngrediences.map((item, index, array) => {
            const { count, indexes } = getCountOfIngredientWithIndexes(item, array)
            if(count > 1 && index === indexes[0]) {
              return (
                <li className="flex gap-4" key={index}>
                  <div 
                    className="w-[64px] h-[64px] rounded-[100px] bg-[#131316] bg-no-repeat bg-center 
                    bg-[size:115px_64px] border-2 border-solid border-[#801AB2]" 
                    style={{backgroundImage: `url(${item.image_mobile})`}}>
                  </div>
                  <p className="grow self-center font-jet text-[16px] font-normal leading-6">
                    {item.name}
                  </p>
                  <div className="flex gap-2 self-center justify-end pr-6">
                    <p className="font-ice text-[28px] font-normal leading-6">
                      {`${count}x${item.price}`}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              )
            }
            if(count > 1 && index !== indexes[0]) {
              return null
            }
            return (
              <li className="flex gap-4" key={index}>
                <div 
                  className="w-[64px] h-[64px] rounded-[100px] bg-[#131316] bg-no-repeat bg-center 
                  bg-[size:115px_64px] border-2 border-solid border-[#801AB2]" 
                  style={{backgroundImage: `url(${item.image_mobile})`}}>
                </div>
                <p className="grow self-center font-jet text-[16px] font-normal leading-6">
                  {item.name}
                </p>
                <div className="flex gap-2 self-center justify-end pr-6">
                  <p className="font-ice text-[28px] font-normal leading-6">
                    {`${count}x${item.price}`}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            )
          })
        }
      </ul>
      <div className="flex justify-between">
        {date()}
        <div className="flex gap-2">
          <p className="font-ice text-[28px] font-normal leading-6">
            {orderPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  )
}