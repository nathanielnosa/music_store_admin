import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts, deleteProducts } from "../redux/apiCalls"
import { Link } from "react-router-dom"
import { FaTrash } from "react-icons/fa"
import { toast } from "react-hot-toast";

const Products = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.product.products)
  useEffect(() => {
    getProducts(dispatch)
  }, [dispatch])

  const handleDelete = async (id) => {
    const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.access_token;
    try {
      await deleteProducts(id, dispatch, token);
      getProducts(dispatch);
    } catch (error) {
      toast.error("Failed to delete product:", error);
    }
  }
  return (
    <section id="products">
      <div className="container py-2">
        <div className="row">
          <div className="col-md-12">
            <table className="table table-responsive table-bordered table-hover table-dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>In Stock</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td><img src={product.image} alt="" width={70} className="img-fluid" /></td>
                      <td>{product.inStock}</td>
                      <td>{product.isAvailable ? (<div className="bg-success text-center text-white p-2 px-1 rounded">Available</div>) : (<div className="bg-danger p-2 rounded text-center text-white">Not Available</div>)}</td>
                      <td><h3>${product.price}</h3></td>
                      <td>
                        <Link onClick={() => handleDelete(product._id)} className="text-decoration-none text-danger"> <FaTrash size={20} /> </Link>
                      </td>
                      <td>
                        <Link to={"/update-products/" + product._id} className="text-decoration-none text-white bg-info rounded px-3 py-2"> Edit </Link>
                      </td>
                    </tr>

                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products