import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Flowbite } from 'flowbite-react'

import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from 'wagmi'

import { publicProvider } from 'wagmi/providers/public'

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
])

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

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
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
      />
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </Flowbite>
  )
}

export default MyApp
