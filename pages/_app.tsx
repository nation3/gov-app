import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Flowbite } from 'flowbite-react'

function MyApp({ Component, pageProps }: AppProps) {
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
