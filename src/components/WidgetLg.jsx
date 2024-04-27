import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { format } from "timeago.js"
const WidgetLg = () => {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.access_token;
    const getOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/order`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        const results = await response.json()
        setOrders(results)
      } catch (error) {
        console.log(error)
      }
    }
    getOrders()
  }, [])
  return (
    <section id="newuser" className="my-2">
      <div className="card shadow px-2">
        <h5 className="px-3 py-2">Latest Transactions</h5>
        <table className="table table-responsive table-hover">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <h5>{order.userId}</h5>
                  </td>
                  <td>{format(order.createdAt)}</td>
                  <td>${order.amount}</td>
                  <td>{
                    order.status === "pending"
                      ? <div className="rounded bg-danger text-white px-2 py-1">{order.status}</div>
                      : order.status === "delivered"
                        ? <div className="rounded bg-primary text-white px-2 py-1">{order.status}</div>
                        : order.status === "success"
                          ? <div className="rounded bg-success text-white px-2 py-1">{order.status}</div>
                          : <div className="rounded bg-secondary">{order.status}</div>
                  }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}
export default WidgetLg