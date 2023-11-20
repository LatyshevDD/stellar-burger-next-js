import orderAccept from '../../_images/order_accept.png'
import { useAppSelector } from '@/redux/store'
import Image from 'next/image'

export default function OrderDetails() {

  const orderNumber = useAppSelector((state) => state.orderData.order.number)
  
  return (
    <div className='flex flex-col items-center pr-12 pl-12 pt-15 pb-15 xl:pr-25 xl:pl-25 xl:pt-30 xl:pb-30'>
      <p className="text text_type_digits-large">
        123
        {/* {orderNumber} */}
      </p>
      <p className="text text_type_main-medium mt-8">
        идентификатор заказа
      </p>
      <Image 
        src={orderAccept} 
        alt="Подтверждение заказа"
      />
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}