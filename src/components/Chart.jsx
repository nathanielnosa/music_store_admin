import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({ title, data, dataKey, grid }) => {
  return (

    <div className="card">
      <h5 className="px-3 py-2">{title}</h5>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey={dataKey} stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>


  )
}

export default Chart