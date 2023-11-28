import Image from "next/image"
import spinner_image from '../_images/spinner-solid.svg'

export default function Loading() {
  return (
    <main className='flex justify-center items-center h-[calc(100vh-64px)] xl:h-[calc(100vh-102px)]'>
      <div className="animate-spin">
        <Image
          src={spinner_image}
          alt='Изображение спиннера'
          width={70}
          height={70} 
        />
      </div>
    </main>
  )
}