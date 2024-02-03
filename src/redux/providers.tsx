'use client'

import { Provider } from "react-redux"
import { store } from "./store"
import { DndProvider } from 'react-dnd'
import { MultiBackend } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        {children}
      </DndProvider>
    </Provider>
      )
}