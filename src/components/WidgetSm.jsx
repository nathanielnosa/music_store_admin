import { useEffect, useState } from "react"
import { FaEye } from "react-icons/fa"
import { Link } from "react-router-dom"

const WidgetSm = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.access_token;
    const getUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/?new=true`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        const results = await response.json()
        console.log("Fetched users:", results);
        setUsers(results)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [])
  return (
    <section id="newuser" className="my-2">
      <div className="card shadow px-2">
        <h5 className="px-3 py-2">New Members</h5>
        <ul className="list-group border-0">

          {
            users.map((user) => (

              <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center border-0">
                <div className="overflow-hidden">
                  <img src={user.image} alt="" width={60} className="img-fluid rounded-circle" />
                </div>
                <div className="info">
                  <h6>{user.firstname} {user.lastname}</h6>
                </div>
                <Link className="btn btn-sm btn-info d-flex gap-2 align-items-center fw-bold">
                  <FaEye /> Display
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}

export default WidgetSm