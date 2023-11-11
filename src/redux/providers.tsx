'use client'

import { Provider } from "react-redux"
import { store } from "./store"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        {children}
      </DndProvider>
    </Provider>
      )
}