import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

          <link rel="icon" type="image/png" href="/assets/images/logo/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/assets/images/logo/favicon.svg" />
          <link rel="shortcut icon" href="/assets/images/logo/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/logo/apple-touch-icon.png" />
          <meta name="apple-mobile-web-app-title" content="Easy Phone" />
          <link rel="manifest" href="/assets/images/logo/site.webmanifest" />

          <meta name="theme-color" content="#130028" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
