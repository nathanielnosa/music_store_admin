import Chart from "../components/Chart"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from "react"

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import app from "../firebase";
import { updateProducts } from "../redux/apiCalls";
import { useDispatch } from "react-redux";

const UpdateProduct = () => {
  const location = useLocation()
  const productId = location.pathname.split("/")[2]
  const [proStats, setProStats] = useState([])
  const product = useSelector(state => state.product.products.find(product => product._id === productId))

  const userData = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user);
  const token = userData.currentUser.access_token

  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)

  const dispatch = useDispatch()
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

  useEffect(() => {
    const getIncomes = async () => {
      try {
        const fetchIncome = await fetch(`${import.meta.env.VITE_SERVER_URL}/order/income?pid=${productId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        const result = await fetchIncome.json()
        const lists = result.sort((a, b) => (a._id - b._id))
        lists.map((item) => (
          setProStats((prev) => [
            ...prev,
            { name: MONTHS[items._id - 1], Sales: item.total }
          ])
        ))
      } catch (error) {
        console.log(error);
      }
    }
    getIncomes()
  }, [productId, MONTHS])

  const handleChange = (e) => {
    setInputs(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  console.log(inputs)
  const handleSubmit = (e) => {
    const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.access_token;
    e.preventDefault();
    const fileName = new Date().getTime + file.name
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      switch (snapshot.state) {
        case "paused":
          console.log("upload is paused");
          break;
        case "running":
          console.log("upload is running");
          break;
        default:
      }
    },
      (error) => {
        // setFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, image: downloadURL }
          updateProducts(productId, product, dispatch, token)
        });
      }
    )
  }

  return (
    <section id="update">
      <div className="container-fluid">
        <div className="row my-1">
          <div className="col-md-12">
            <div className="card border-0">
              <div className="d-flex justify-content-between">
                <h3>Product</h3>
                <Link className="btn btn-success" to={"/create-product"}>Create</Link>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <Chart data={proStats} dataKey="Sales" title="Sales Performance" />
                  </div>
                  <div className="col-md-6">
                    <div className="card overflow-hidden">
                      <div className="card-img">
                        <img src={product?.image} className="img-fluid" alt={product?.title} />
                      </div>
                      <div className="card-body">
                        <h6><strong>Product:</strong> {product?.title}</h6>
                        <p><strong>Id</strong>{product?._id}</p>
                        <p><strong>Stock</strong>{product?.inStock}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form>
          <div className="row my-1 mb-5">
            <div className="col-md-6">
              <div className="card shadow">
                <div className="card-body">
                  <div className="card-header"><h6>Update Product</h6></div>
                  <div className="form-group my-2">
                    <label htmlFor="">Product Name</label>
                    <input onChange={handleChange} name="title" type="text" placeholder={product?.title} className="form-control" />
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="">Description</label>
                    <textarea onChange={handleChange} name="description" cols={1} rows={3} type="text" placeholder={product?.description} className="form-control" />
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="">Price</label>
                    <input onChange={handleChange} name="price" type="number" placeholder={product?.price} className="form-control" />
                  </div>
                  <div className="select-group my-2">
                    <label >In Stock</label>
                    <input name="inStock" handleChange={handleChange} type="text" placeholder={product?.inStock} className="form-control" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="card px-3 py-2">
                <div className="card-img d-flex align-items-center justify-content-evenly">
                  <img name="image" src={product?.image} width={250} alt={product?.title} />
                  <div className="publish display-6 text-start border">
                    <label htmlFor="file">
                      <i className="bi bi-upload"></i>
                    </label>
                    <input type="file" onChange={e => setFile(e.target.files[0])} id="file" style={{ display: "none" }} />
                  </div>
                </div>
                <div className="d-grid my-3">
                  <button onClick={handleSubmit} className="btn btn-primary">Update</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default UpdateProduct