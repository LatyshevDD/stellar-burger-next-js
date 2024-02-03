import dynamic from "next/dynamic"
import Image from "next/image"

const IngredientDetails = dynamic(() => import('@/components/ingredient_details/ingredient_details'), {ssr: false})

export default function Ingredient() {

  return (
    <div className="flex justify-center items-center h-[var(--main-height-beforexl)] xl:h-[var(--main-height-overxl)]">
      <IngredientDetails fullWidth={true} />
    </div>
  )
      
}