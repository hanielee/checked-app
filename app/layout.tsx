import './globals.css'
import { Inter } from 'next/font/google' //global font 
import NavBar from './components/navigation-bar/NavBar'
import Script from 'next/script';


const font = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Checked ✓',
  description: 'Checked ✓ is a user-friendly platform designed to help people discover, rate, and review local restaurants, cafes, bars, and other places in Malaysia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const map_key = process.env.MAPS_KEY;
  return (
    <html lang="en">
      <body className={font.className}>
      <NavBar />

      <script src={`https://maps.googleapis.com/maps/api/js?key=${map_key}&libraries=places`} async />
        {children}
        </body>
    </html>
  )
}
