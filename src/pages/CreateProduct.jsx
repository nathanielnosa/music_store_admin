import { useState } from "react"

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import app from "../firebase";
import { addProducts } from "../redux/apiCalls";
import { useDispatch } from "react-redux";

const CreateProduct = () => {
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [collect, setCollect] = useState([])
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setInputs(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const handleCollect = (e) => {
    setCollect(e.target.value.split(","))
  }
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
          const product = { ...inputs, image: downloadURL, collections: collect }
          addProducts(product, dispatch, token)
        });
      }
    )
  }


  return (
    <section id="newproduct" className="py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div className="card">
              <div className="card-header text-center">
                <h4>New Products</h4>
              </div>
              <div className="card-body">
                <form action="">
                  <div className="form-group my-2">
                    <label htmlFor="">Title</label>
                    <input name="title" type="text" className="form-control" onChange={handleChange} />
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="">Description</label>
                    <input name="description" type="text" className="form-control" onChange={handleChange} />
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="">Price</label>
                    <input name="price" type="number" className="form-control" onChange={handleChange} />
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="">Collections</label>
                    <input name="collections" type="text" className="form-control"
                      onChange={handleCollect} />
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="">Artist</label>
                    <input name="artist" type="text" className="form-control" onChange={handleChange} />
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="">In-stock</label>
                    <input name="inStock" type="number" className="form-control" onChange={handleChange} />
                  </div>
                  <div className="form-group my-2">
                    <label htmlFor="">Image</label>
                    <input name="image" type="file" className="form-control"
                      onChange={e => setFile(e.target.files[0])} />
                  </div>
                  <div className="d-grid my-2">
                    <button onClick={handleSubmit} className="btn btn-dark">Add products</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreateProduct
