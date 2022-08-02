import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Flowbite } from 'flowbite-react'
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    query.addListener((q) => setDarkMode(q.matches))
    query.matches !== darkMode && setDarkMode(query.matches)
    if (darkMode || query.matches) {
      localStorage.setItem('theme', 'dark')
      document.documentElement.classList.add('dark')
    } else {
      localStorage.setItem('theme', 'light')
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <Flowbite
      theme={{
        theme: {
          button: {
            color: {
              info: 'text-white bg-n3blue border border-transparent hover:bg-sky-500 disabled:hover:bg-sky-300 transition',
            },
          },
          badge: {
            color: {
              info: 'bg-sky-100 text-sky-800 group-hover:bg-sky-200',
            },
          },
        },
      }}
    >
      <div className="flex justify-center items-center py-8">
        <Component {...pageProps} />
      </div>
    </Flowbite>
  )
}

export default MyApp
