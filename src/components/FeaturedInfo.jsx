import { useEffect, useState } from "react"
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const FeaturedInfo = () => {

  const [income, setIncome] = useState([])
  const [percent, setPercent] = useState([])
  const userData = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user);
  const token = userData.currentUser.access_token

  useEffect(() => {
    const getIncomes = async () => {
      try {
        const fetchIncome = await fetch(`${import.meta.env.VITE_SERVER_URL}/order/income`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        const result = await fetchIncome.json()
        setIncome(result)
        setPercent((result[1].total * 100) / result[0].total - 100)
      } catch (error) {
        console.log(error);
      }
    }
    getIncomes()
  }, [])
  return (
    <div className="card px-3 shadow">
      <h3>Revenue</h3>
      <div className="card-body border-0">
        <div className="d-flex justify-content-between align-items-center ">
          <h1 className="fw-bold">${income[1]?.total}</h1>
          <div className="d-flex align-items-center justify-content-around ">
            <p className="lead" style={{ fontSize: '1.8rem' }}>% {Math.floor(percent)}</p>
            {percent < 0 ? <FaArrowDown color="red" /> : <FaArrowUp color="green" />}
          </div>
          <p className="lead">compared to last month</p>
        </div>
      </div>
    </div>
  )
}

export default FeaturedInfo