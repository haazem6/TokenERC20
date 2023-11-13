import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

// Importing required modules and components
import { ConnectKitProvider } from 'connectkit'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import * as React from 'react'
import { WagmiConfig } from 'wagmi'

// Importing the client from 'wagmi' module
import { client } from '../wagmi'

// Defining the main component of the application
export default function App({ Component, pageProps }: AppProps) {

  // State to track whether the component is mounted
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  // Rendering the main component with necessary providers and configurations
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider 
        customTheme={{
          "--ck-connectbutton-color": "var(--bs-primary)"
        }}
      >
        {/* Setting up the title of the application */}
        <NextHead>
          <title>Token ERC-20</title>
        </NextHead>

        {/* Wrapping the application content with background color */}
        <div style={{ backgroundColor: "#f2f4f6" }}>
          {/* Rendering the main component after it's mounted */}
          {mounted && <Component {...pageProps} />}
        </div>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
