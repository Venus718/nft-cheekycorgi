import MainNav from '../components/MainNav'
import MainFooter from '../components/MainFooter'
import { useRouter } from 'next/router'

export default function MainLayout({children}) {
  const router = useRouter()

  return (
    <>
      <MainNav />
      {children}
      {
        router.pathname != '/' && (
          <MainFooter />
        )
      }
    </>
  )
}
