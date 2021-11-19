import { Provider } from 'react-redux'
import Head from 'next/head'

import store from '../redux'
import MainLayout from '../layouts/MainLayout'
import { RefreshContextProvider } from '../contexts/RefreshContext'

import '../styles/main.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <link rel="stylesheet" type="text/css" href="/attendance.css" />
      </Head>
      <Provider store={store}>
        <RefreshContextProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </RefreshContextProvider>
      </Provider>
    </>
  )
}

export default MyApp
