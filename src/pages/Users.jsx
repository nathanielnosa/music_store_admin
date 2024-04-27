import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsers, deleteProducts } from "../redux/apiCalls"
import { Link } from "react-router-dom"
import { FaTrash } from "react-icons/fa"
import { toast } from "react-hot-toast";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users); // Ensure correct path
  useEffect(() => {
    getUsers(dispatch); // Ensure `getUsers` is imported
  }, [dispatch]);
  console.log(users);

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
              {users && users.length > 0 ? (
                (<thead>
                  <tr>
                    <th>ID</th>
                    <th>Photo</th>
                    <th>Full name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th colSpan={2}>Actions</th>
                  </tr>
                </thead>)

                  (
                    <tbody>
                      {
                        users.map((user) => (
                          <tr key={user._id}>
                            <td>{user._id}</td>
                            <td><img src={user.image} alt="" width={70} className="img-fluid" /></td>
                            <td>{user.firstname} {user.lastname} </td>
                            <td>{user.username} </td>
                            <td>{user.email} </td>
                            <td>
                              <Link onClick={() => handleDelete(user._id)} className="text-decoration-none text-danger"> <FaTrash size={20} /> </Link>
                            </td>
                            <td>
                              <Link to={"/update-products/" + product._id} className="text-decoration-none text-white bg-info rounded px-3 py-2"> Edit </Link>
                            </td>
                          </tr>

                        ))
                      }
                    </tbody>
                  )
              ) : (
                <p className="lead bg-danger p-2 rounded text-white my-4">No users found</p> // Fallback message
              )}

            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Users