import { useEffect, useMemo, useState } from "react"
import Chart from "../components/Chart"
import WidgetLg from "../components/WidgetLg"
import WidgetSm from "../components/WidgetSm"
import FeaturedInfo from "../components/FeaturedInfo"

const Dashboard = () => {
  const [userStats, setUserStats] = useState([])
  const MONTHS = useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ], [])
  const userData = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user);
  const token = userData.currentUser.access_token
  useEffect(() => {
    const getStats = async () => {
      try {
        const fetchStats = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/stats`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        const results = await fetchStats.json()
        results.map((item) => {
          setUserStats(prev => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total }
          ])
        })
      } catch (error) {
        console.log(error.message);
      }
    }
    getStats()
  }, [MONTHS])
  return (
    <section id="dashboard">
      {/* row one */}
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-4">
            <FeaturedInfo />
          </div>
          <div className="col-md-4">
            <FeaturedInfo />
          </div>
          <div className="col-md-4">
            <FeaturedInfo />

          </div>
        </div>
      </div>
      {/* row two */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
          </div>
        </div>
      </div>
      {/* row three */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <WidgetSm />
          </div>
          <div className="col-md-8">
            <WidgetLg />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard