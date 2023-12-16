import { useRef, useEffect, useCallback } from "react"
import close_image from '../../_images/modal_close.png'
import { ModalPropsType } from "@/types/types"
import { useAppSelector } from "@/redux/store"
import Image from "next/image"

export default function Modal({children, onClose}: ModalPropsType) {

  const orderDataSpinnerActive = useAppSelector((store) => store.orderData.spinnerActive)

  const modal = useRef<HTMLDivElement>(null)

  const handleEscClose = useCallback(
    (e: KeyboardEvent) => {
      if(orderDataSpinnerActive) {
        return
      }
      if (e.key === "Escape") {
        onClose()
      }
    }, [onClose, orderDataSpinnerActive]
  )

  const overlayClosePopup = useCallback(
    (e: MouseEvent) => {
      let screenWidth = window.screen.width
      if(orderDataSpinnerActive) {
        return
      }
      if (e.target instanceof Node) {
        if (modal.current  && !modal.current.contains(e.target) && screenWidth > 1280) {
          onClose()  
        }
        return;
      }
    }, [onClose, orderDataSpinnerActive]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', overlayClosePopup);
    return () => {
    document.removeEventListener('keydown', handleEscClose);
    document.removeEventListener('click', overlayClosePopup);
    }
  })

  return (
    <section className='absolute top-0 left-0 w-screen h-screen flex justify-center items-center z-10 bg-[#00000099]'>
      <div className='relative bg-[#1C1C21] border-solid border-[#4c4cff33] rounded-[40px]' ref={modal}>
        {children}
        <button 
        className='flex justify-center items-center bg-transparent cursor-default transition-opacity absolute top-[60px] 
        right-[40px] translate-x-[-50%] translate-y-[-50%] hover:opacity-60' 
        onClick={ 
          () => {
            if(orderDataSpinnerActive) {
              return
            }
            onClose()
          }  
        }
        >
        <Image
          src={close_image}
          alt='Закрыть модальное окно'
        />
      </button>
    </div>
  </section> 
  )
}
