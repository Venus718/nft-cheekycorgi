import { Provider } from 'react-redux'
import Head from 'next/head'

import store from '../redux'
import '../styles/main.scss'
import MainLayout from '../layouts/MainLayout'
import { RefreshContextProvider } from '../contexts/RefreshContext'

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
