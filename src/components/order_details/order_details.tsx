import orderAccept_modal from '../../_images/order_accept.png'
import orderAccept_modal_off from '../../_images/order_acept_svg.svg'
import { useAppSelector } from '@/redux/store'
import Image from 'next/image'

export default function OrderDetails() {

  const orderNumber = useAppSelector((state) => state.orderData.order.number)
  
  return (
    <div className='flex flex-col items-center pr-12 pl-12 pt-15 pb-15 xl:pr-25 xl:pl-25 xl:pt-30 xl:pb-30'>
      <p className="text text_type_digits-large text-[#4C4CFF] xl:text-[#F2F2F3]">
        123
        {orderNumber}
      </p>
      <p className="text text_type_main-medium mt-8 mb-10 text-center">
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
      <p className="text text_type_main-default mt-10 text-center">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2 text-center">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}