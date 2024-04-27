import { AiFillDashboard, AiFillProfile } from "react-icons/ai";
import { BsBarChartFill, BsChatLeftDotsFill } from "react-icons/bs";
import { FaDollarSign, FaEnvelope, FaSignOutAlt, FaTwitch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <section id="sidebar" style={{ height: '100%', background: '#000' }}>
      <div className="container-fluid px-2">
        <div className="logo py-2 border-bottom border-white">
          <h3 className="text-white">Maudib</h3>
        </div>
        <div className="dashboard rounded my-2 mb-5 d-flex align-items-center px-3 py-2 gap-3 bg-dark text-white">
          <AiFillDashboard size={25} />
          <h5>
            <Link to={'/'} className="text-white text-decoration-none">Dashboard</Link>
          </h5>
        </div>
        <div className="quick mb-5">
          <h6 className="text-light">Quick Menu</h6>
          <div className="container px-3 bg-dark rounded py-3">
            <div className="item-one mb-3">
              <Link to={"/users"} className="text-decoration-none text-white  d-flex align-items-center gap-2"><FaUser /> Users </Link>
            </div>
            <div className="item-one mb-3">
              <Link to={"/products"} className="text-decoration-none text-white  d-flex align-items-center gap-2"><AiFillProfile /> Products </Link>
            </div>
            <div className="item-one mb-3">
              <Link className="text-decoration-none text-white  d-flex align-items-center gap-2"><FaDollarSign /> Transactions </Link>
            </div>
            <div className="item-one mb-3">
              <Link className="text-decoration-none text-white  d-flex align-items-center gap-2"><BsBarChartFill /> Reports </Link>
            </div>
          </div>
        </div>
        <div className="quick">
          <h6 className="text-light">Notification</h6>
          <div className="container px-3 bg-dark rounded py-3">
            <div className="item-one mb-3">
              <Link className="text-decoration-none text-white  d-flex align-items-center gap-2"><FaEnvelope /> Mail </Link>
            </div>
            <div className="item-one mb-3">
              <Link className="text-decoration-none text-white  d-flex align-items-center gap-2"><FaTwitch /> Feedback </Link>
            </div>
            <div className="item-one mb-3">
              <Link className="text-decoration-none text-white  d-flex align-items-center gap-2"><BsChatLeftDotsFill /> Message </Link>
            </div>

          </div>
        </div>
        <h6 className="" style={{ position: 'fixed', bottom: '-0px' }}>
          <Link className="text-decoration-none text-danger justify-content-end  d-flex align-items-center gap-2"><FaSignOutAlt /> Logout </Link>
        </h6>
      </div>
    </section>
  )
}

export default SideBar