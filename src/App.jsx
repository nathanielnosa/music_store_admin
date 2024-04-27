import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import { useState } from 'react'


const App = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <>
      {/* side bar */}
      <div className="container-fluid px-0">
        <div className="row g-0">
          <div className={`col-md-2 border-end border-light ${showSidebar ? '' : 'd-none'} `}>
            <SideBar />
          </div>
          <div className={`col-md-10 ${showSidebar ? '' : 'col-md-12'}`}>
            {/* navbar */}
            <Navbar toggleSidebar={toggleSidebar} />
            <Outlet />
            {/* footer */}
            <Footer />
          </div>
        </div>
      </div>

    </>
  )
}

export default App