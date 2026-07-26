import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import BottomNav from '../components/BottomNav/BottomNav'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
        <BottomNav />
    </>
  )
}

export default Layout
