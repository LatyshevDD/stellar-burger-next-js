import dynamic from "next/dynamic"

const OrderSymmary = dynamic(
  () => import('../../../components/order_symmary/order_symmary'),
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

export default function OrderInformation() {

  return (
    <div className="flex justify-center items-center h-[var(--main-height-beforexl)] xl:h-[var(--main-height-overxl)]">
      <OrderSymmary modal={false} />
    </div>
  )
      
}