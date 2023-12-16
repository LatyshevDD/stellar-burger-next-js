import orderAccept_modal from '../../_images/order_accept.png'
import orderAccept_modal_off from '../../_images/order_acept_svg.svg'
import { useAppSelector } from '@/redux/store'
import Image from 'next/image'
import spinner_image from '../../_images/spinner-solid.svg'

export default function OrderDetails() {

  const orderNumber = useAppSelector((state) => state.orderData.order.number)
  const orderDataSpinnerActive = useAppSelector((store) => store.orderData.spinnerActive)
  
  return (
    <div className='flex flex-col justify-center items-center xl:w-[40vw] xl:h-[65vh]'>
      {
        orderDataSpinnerActive &&
        (
          <div className="flex justify-center items-center">
            <div className='animate-spin'>
              <Image
                src={spinner_image}
                alt='Изображение спиннера'
                width={70}
                height={70} 
              />
            </div>
          </div>
        ) 
      }
      {
        !orderDataSpinnerActive &&
        (
          <>
            <p className="font-ice text-[72px] text-[#4C4CFF] xl:text-[120px] xl:text-[#F2F2F3]">
              {orderNumber}
            </p>
            <p className="font-jet text-[20px] xl:text-[24px] mt-[0px] xl:mt-[32px] mb-[20px] xl:mb-[40px] text-center">
              идентификатор заказа
            </p>
            <div className='hidden xl:block'>
              <Image 
                src={orderAccept_modal} 
                alt="Подтверждение заказа"
              />
            </div>
            <div className='xl:hidden'>
              <Image 
                src={orderAccept_modal_off} 
                alt="Подтверждение заказа"
              />
            </div>
            <p className="font-jet text-sm xl:text-base mt-[20px] xl:mt-[40px] text-center">
              Ваш заказ начали готовить
            </p>
            <p className="font-jet text-sm xl:text-base text_color_inactive mt-2 text-center">
              Дождитесь готовности на орбитальной станции
            </p>
          </>
        )
      }
    </div>
  )
}