import { Html, Head, Main, NextScript } from 'next/document'
import { CssVarsProvider } from '@mui/joy/styles'
import CssBaseline from '@mui/joy/CssBaseline'
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <body>
        <CssVarsProvider>
          <CssBaseline />
          <Main />
          <NextScript />
        </CssVarsProvider>
      </body>
    </Html>
  )
}
