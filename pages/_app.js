import { Provider } from 'react-redux'
import Head from 'next/head'

import store from '../redux'
import MainLayout from '../layouts/MainLayout'
import { RefreshContextProvider } from '../contexts/RefreshContext'

import 'react-notifications/lib/notifications.css'
import '../styles/main.scss'

import {NotificationContainer, NotificationManager} from 'react-notifications'

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
        <NotificationContainer/>
      </Provider>
    </>
  )
}

export default MyApp
