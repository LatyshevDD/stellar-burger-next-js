import { useState, useEffect } from 'react'
import { SyntheticEvent } from 'react'

// Хук возвращающий ширину экрана при ее изменении
export const useResize = () => {

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event: UIEvent) => {
      const w = event.target as Window
      setWidth(w.innerWidth)
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  return width
};