import Sidebar from '@/components/Sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import SupabaseProvider from '@/providers/SupabaseProviders'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/components/ToasterProvider'
import getSongsByUserId from '@/action/getSongsByUserId'
import Player from '@/components/Player'
 

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify App',
  description: 'listen to music',
}
export const revalidate=0;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs= await getSongsByUserId()
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider/> 
             <Sidebar songs={userSongs}>
              {children}
            </Sidebar> 
            <Player/>
          </UserProvider> 
        </SupabaseProvider>
        </body>
    </html>
  )
}
