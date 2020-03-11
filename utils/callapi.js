import { URL_API } from "./../constants/config.js";

const callApi = (uri, method, data) => {
  return axios({
    method,
    url: `${URL_API}/${uri}`,
    data
  });
};

const getListProduct = () => {
  return axios({
    method: "GET",
    url: `${URL_API}/SanPham`
  });
};

const addProduct = product => {
  return axios({
    method: "POST",
    url: `${URL_API}/SanPham`,
    data: product
  });
};

const deleteProduct = id => {
  return axios({
    method: "DELETE",
    url: `${URL_API}/SanPham/${id}`
  });
};

const getProductById = id => {
  return axios({
    method: "GET",
    url: `${URL_API}/SanPham/${id}`
  });
};

const updateProduct = (id, product) => {
  return axios({
    method: "PUT",
    url: `${URL_API}/SanPham/${id}`,
    data: product
  });
};

export {
  callApi,
  getListProduct,
  addProduct,
  deleteProduct,
  getProductById,
  updateProduct
};
