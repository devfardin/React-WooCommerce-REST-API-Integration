import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import { useEffect, useState } from 'react'
const Main = () => {
  const [siteData, setSiteData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch('http://e-commerce.local/wp-json/wp-react-connect/v1/hello')
      .then(res => res.json())
      .then(data => {
        setSiteData(data);
        setLoading(false);
      })
  }, [] )
  
  return (
    <div>
      <Navbar siteData={siteData} />
      <div className='py-8 min-h-[calc(100vh-68px)] bg-bodycolor'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Main
