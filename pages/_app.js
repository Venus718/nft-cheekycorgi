import Head from 'next/head'
import '../styles/main.scss'
import MainLayout from '../layouts/MainLayout'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <link rel="stylesheet" type="text/css" href="/attendance.css" />
      </Head>

      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  )
}

export default MyApp
