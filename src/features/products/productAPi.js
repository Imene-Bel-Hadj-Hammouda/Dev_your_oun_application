import { axioswithjwt } from "../config/axios";

import requests from "../config/requests";

export function Create(data) {
  return axioswithjwt
    .post(requests.productsapi, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export function GetAll() {
  return axioswithjwt
    .get(requests.productsapi)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export function DeleteProduct(id) {
  return axioswithjwt
    .delete(requests.productsapi+'/'+id)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export function UpdateImage(data) {
  return axioswithjwt
    .put(requests.productsapi+'/image/'+data.id , data.data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export function UpdateProductInfo(data) {
  return axioswithjwt
    .put(requests.productsapi + "/" + data.id, data.data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}