import type { Metadata } from 'next'
import './styles/globals.css'
import AppHeader from '../components/AppHeader/app_header'
import { Providers } from '@/redux/providers'
import { JetBrains_Mono, Iceland } from 'next/font/google'

const jetBrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})
 
const iceLand = Iceland({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-iceland',
})
 

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children, order, ingredients, modals
}: {
  children: React.ReactNode,
  order: React.ReactNode,
  ingredients: React.ReactNode,
  modals: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="ru" className={`${jetBrains.variable} ${iceLand.variable}`}>
        <body className='container mx-auto'>
            <AppHeader />
            {children}
            {order}
            {ingredients}
            {modals}
        </body>
      </html>
    </Providers>
  )
}