'use client'

import Modal from "@/components/modal/modal"
import dynamic from "next/dynamic"

const OrderDetails = dynamic(
  () => import('@/components/order_details/order_details'),
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

export default function Order() {
  return (
    <>
      <div className="hidden xl:block">
        <Modal>
          <OrderDetails />
        </Modal>
      </div>
      <div className="xl:hidden">
        <OrderDetails />
      </div>
    </>
  )
}