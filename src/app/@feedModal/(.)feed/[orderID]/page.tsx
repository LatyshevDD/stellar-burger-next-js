'use client'

import Modal from "@/components/modal/modal"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import close_image from '../../../../_images/modal_close.png'

const OrderSymmary = dynamic(
  () => import('../../../../components/order_symmary/order_symmary'),
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

export default function FeedModal() {
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  return (
    <>
      <div className="hidden xl:block">
        <Modal onClose={onDismiss}>  
          <OrderSymmary modal={true} />
        </Modal>
      </div>
      <div className="container absolute top-0 flex flex-col z-10 xl:hidden h-full bg-[#131316] overflow-hidden">
        <div className='flex items-center justify-end px-2 py-4'>
          <button onClick={onDismiss}>
            <Image
              src={close_image}
              alt='Закрыть модальное окно'
            />
          </button>
        </div>
        <p className="font-jet text-[28px] font-bold leading-8 px-2 mb-[32px]">
          Детали заказа
        </p>
        <div className="w-full self-center">
          <OrderSymmary modal={true}/>
        </div>
      </div>
    </>
  )
}