'use client'

import Modal from "@/components/modal/modal"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import close_image from '../../../_images/modal_close.png'

const OrderDetails = dynamic(() => import('@/components/order_details/order_details'))

export default function Order() {

  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  return (
    <>
      <div className="hidden xl:block">
        <Modal onClose={onDismiss}>
          <OrderDetails />
        </Modal>
      </div>
      <div className="container absolute top-0 flex flex-col z-10 xl:hidden h-screen bg-[#131316]">
        <div className='flex items-center justify-between px-2 py-4'>
          <p className="text text_type_main-medium">
            Заказ
          </p>
          <button onClick={onDismiss}>
            <Image
              src={close_image}
              alt='Закрыть модальное окно'
            />
          </button>
        </div>
        <div className="self-center">
          <OrderDetails />
        </div>
      </div>
    </>
  )
}