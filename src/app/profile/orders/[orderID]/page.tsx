import dynamic from "next/dynamic"

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

export default function OrderInformation() {

  return (
    <div className="absolute z-10 container mx-auto bg-[#131316] bottom-0 flex justify-center items-center h-[calc(100vh-64px)] xl:h-[calc(100vh-102px)]">
      <OrderSymmary modal={false} />
    </div>
  )
      
}