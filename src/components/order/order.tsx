import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useAppSelector } from "@/redux/store"
import { getIngredientById } from "@/utils/utils"
import Link from "next/link"
import { OrderPropsType } from "@/types/types"
import { usePathname } from "next/navigation"

export default function Order({order}: OrderPropsType) {

  const pathname = usePathname()
  const { ingrediences } = useAppSelector(state => state.ingrediencesData)

  const selectedIngrediences = ingrediences != null && order.ingredients.map(item => getIngredientById(ingrediences, item))
  const orderPrice = selectedIngrediences &&  selectedIngrediences.reduce((sum, item) => {
    return sum + item.price
  }, 0)

  const date = () => {
    const dateFromServer = order.createdAt
    return <FormattedDate date={new Date(dateFromServer)} className='font-jet text-[14px] leading-5 lg:text-[16px] lg:leading-6 text_color_inactive'/>
  }

  let url: string = ""
  
  if(pathname === '/feed') {
    url = `/feed/${order.number}`
  }
  if(pathname === '/profile/orders') {
    url = `/profile/orders/${order.number}`
  }
  
  return (
    <li>
      <Link href={url}>
        <div className="flex flex-col items-center p-[16px] lg:p-[24px] bg-[#1c1c21] rounded-[40px] gap-4 lg:gap-6">
          <div className="flex justify-between w-full">
            <p className="font-jet leading-8 text-[22px] lg:text-[28px]">
              {`#${order.number}`}
            </p>
            {
              date()
            }
          </div>
          {
            pathname === '/feed'
            &&
            <p className="w-full text-left font-jet text-[20px] leading-6 lg:text-[24px] lg:leading-8">
              {order.name}
            </p>
          }
          {
            pathname === '/profile/orders'
            &&
            <div className='flex flex-col gap-2 w-full '>
              <p className="w-full text-left font-jet text-[20px] leading-6 lg:text-[24px] lg:leading-8">
                {order.name}
              </p>
              <p className="font-jet text-[14px] leading-5 lg:text-[16px] lg:leading-6">
                {order.status === 'done' ? 'Создан' : 'Готовится'}
              </p>
            </div>
          }
          <div className="flex justify-between w-full">
            <ul className="flex">
              {
                selectedIngrediences &&
                selectedIngrediences.map((item, index, array) => {
                  if(index <= 4) {
                    const zIndex = 6 - index
                    return (
                      <li 
                        className='w-[32px] h-[32px] sm:w-[64px] sm:h-[64px] bg-[#131316] bg-no-repeat bg-center bg-[size:57px_32px] 
                        sm:bg-[size:115px_64px] rounded-[100px] border-2 border-solid border-[#801AB2] first:ml-0 ml-[-10px] sm:ml-[-20px]' 
                        key={index} 
                        style={{zIndex: zIndex, backgroundImage: `url(${item.image_mobile})`}}>
                      </li>
                    ) 
                  }
                  return  null
                })
              }
              {
                selectedIngrediences && selectedIngrediences.length > 5
                &&
                (
                  <li 
                    className='flex justify-center items-center relative w-[32px] h-[32px] sm:w-[64px] sm:h-[64px] bg-[#131316] bg-no-repeat bg-center bg-[size:57px_32px] 
                    sm:bg-[size:115px_64px] rounded-[100px] border-2 border-solid border-[#801AB2] first:ml-0 ml-[-10px] sm:ml-[-20px] after:content-[""] after:block after:w-[64px]
                    after:h-[64px] after:rounded-[100px] after:absolute after:top-0 after:left-0 after:z-10 after:bg-[#1C1C21] after:opacity-60' 
                    style={{zIndex: 1, backgroundImage: `url(${selectedIngrediences[5].image_mobile})`}}
                  >
                    <p className="z-[11] text text_type_main-default">
                    {`+${selectedIngrediences.length - 5}`}
                    </p>
                  </li>
                )
              } 
            </ul>
            <div className='flex items-center gap-2'>
              <p className="font-ice leading-6 text-[22px] sm:text-[28px]">{orderPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}