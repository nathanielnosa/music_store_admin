import { getProductFailed, getProductStart, getProductSuccess, deleteProductFailed, deleteProductStart, deleteProductSuccess, updateProductSuccess, updateProductStart, addProductStart, addProductSuccess, addProductFailed, updateProductFailed } from "./ProductRedux";
import { getUserFailed, getUserStart, getUserSuccess, loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, formData, token) => {
  dispatch(loginStart());

  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      throw new Error('Failed to log in');
    }
    const result = await response.json();
    dispatch(loginSuccess(result)); // Assuming result is already the user data
    return result; // Return the result for further handling if needed

  } catch (error) {
    dispatch(loginFailure());
    throw error; // Re-throw the error for handling in the Login component
  }
};
// :::::::::::::::::::USERS ::::::::::::::
// :::::::::::::::::::USERS ::::::::::::::

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user`);
    if (!response.ok) {
      throw new Error('Failed to get user');
    }
    const result = await response.json();
    dispatch(getUserSuccess(result));
    return result;
  } catch (error) {
    dispatch(getUserFailed());
    throw error;
  }
}
// :::::::::::::::::::PRODUCTS ::::::::::::::
// :::::::::::::::::::PRODUCTS ::::::::::::::
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/product`);
    if (!response.ok) {
      throw new Error('Failed to get music');
    }
    const result = await response.json();
    dispatch(getProductSuccess(result));
    return result;
  } catch (error) {
    dispatch(getProductFailed());
    throw error;
  }
}

export const deleteProducts = async (id, dispatch, token) => {
  dispatch(deleteProductStart());
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/product/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      throw new Error('Failed to get music');
    }
    const result = await response.json();
    dispatch(deleteProductSuccess(result));
    return result;
  } catch (error) {
    dispatch(deleteProductFailed());
    throw error;
  }
}

export const updateProducts = async (id, product, dispatch, token) => {
  dispatch(updateProductStart());
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/product/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(product)
    });
    if (!response.ok) {
      throw new Error('Failed to get music');
    }
    const result = await response.json();
    dispatch(updateProductSuccess(result));
    return result;
  } catch (error) {
    dispatch(updateProductFailed());
    throw error;
  }
}

export const addProducts = async (product, dispatch, token) => {
  dispatch(addProductStart());
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(product)

    });
    if (!response.ok) {
      throw new Error('Failed to get music');
    }
    const result = await response.json();
    dispatch(addProductSuccess(result));
    return result;
  } catch (error) {
    dispatch(addProductFailed());
    throw error;
  }
}