import dynamic from "next/dynamic"
import Image from "next/image"

const IngredientDetails = dynamic(() => import('@/components/ingredient_details/ingredient_details'), {ssr: false})

export default function Ingredient() {

  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)] xl:h-[calc(100vh-102px)]">
      <IngredientDetails fullWidth={true} />
    </div>
  )
      
}