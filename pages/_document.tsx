import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class WebsiteDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          />

          <meta name="theme-color" content="#54c3ff" />

          <link rel="icon" href="/favicon.ico" />
          <title>Nation3 governance dashboard</title>
        </Head>

        <body className="bg-white dark:bg-slate-800 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default WebsiteDocument
