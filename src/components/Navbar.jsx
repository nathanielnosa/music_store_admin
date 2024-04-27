import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaBell, FaList, FaEnvelopeOpen, FaMoon, FaSun, FaBars, FaEnvelopeOpenText } from 'react-icons/fa'

const Navbar = ({ toggleSidebar }) => {
  const headerRef = useRef();
  const [showitem, setShowItem] = useState(false)
  // const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  // const dispatch = useDispatch()
  // const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])
  const toggleInfo = () => {
    setShowItem(!showitem)
  }
  return (
    <div className="container-fluid bg-black py-2">
      <div className="row align-items-center">
        <div className="col-md-6">
          <div className="left-items d-flex gap-3 align-items-center">
            <FaBars onClick={toggleSidebar} cursor={'pointer'} size={20} color="white" />
            <Link className="text-decoration-none text-white">Dashboard</Link>
            <Link className="text-decoration-none text-white">Users</Link>
            <Link className="text-decoration-none text-white">Settings</Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="cursor-pointer text-white text-end d-flex align-items-center gap-3 justify-content-end">
            <FaBell />
            <FaEnvelopeOpenText />
            <div className="overflow-hidden" onClick={toggleInfo}>
              <img className='rounded-circle img-fluid' width={40} src="https://randomuser.me/api/portraits/women/94.jpg" alt="" />
            </div>
          </div>
          {
            showitem && (
              <div className="text-white d-flex align-items-center gap-3 justify-content-end">
                <div className=" w-25">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <Link to={'/login'} className='text-decoration-none text-dark'>Login</Link>
                    </li>
                    <li className="list-group-item">
                      <Link className='text-decoration-none text-dark'>Logout</Link>
                    </li>
                  </ul>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>

  )
}

export default Navbar