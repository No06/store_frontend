import type { Product } from "@/entities/Product"
import axios from "axios";
import * as qs from 'qs';

const productPath = "/product/"
const cartPath = "/cart/"
const jwtHeaderPrefix = "Bearer "
const authHeader = (token?: string | null) => {
    return {
      Authorization: jwtHeaderPrefix + token
    };
  }

export const url = "http://localhost:8080"
export const saveProduct = (product: Product, token?: string | null) => (
    axios.put(url+productPath+'save', product, {
        headers: authHeader(token)
    })
)
export const delProductById = (id: number, token?: string | null) => (
    axios.delete(url+productPath+"delete/"+id, {
        headers: authHeader(token)
    })
)
export const checkToken = (token?: string | null) => axios.get(url+"/auth/checkToken", {
    headers: authHeader(token)
})
export const userLogin = (data: User) => axios.post(url+"/auth/login", data)
export const userRegister = (data: User) => axios.post(url+"/auth"+"/register", data)
export const getAllProduct = () => axios.get(url+productPath+"getAll")
export const getAllProdItemsBySpec = (params: Object) => {
    return axios.get(url + productPath+"getAllItemBySpec", {
        params: params,
        paramsSerializer: params => {
            return qs.stringify(params, {arrayFormat: 'comma'})
        }
    })
}
export const getAllProdByPage = (page: number, size: number, name?: string, categoryId?: number) => {
    return axios.get(url + productPath + "findAllByPage", {
        params: {
            page: page,
            size: size,
            name: name,
            category_id: categoryId
        },
        paramsSerializer: params => {
            return qs.stringify(params, {arrayFormat: 'comma'})
        }
    })
}
export const getAllProductCategory = () => {
    return axios.get(url+productPath+"getAllCategory")
}
export const getCountProductsByCategory = () => {
    return axios.get(url+productPath+"getCountByCategory")
}
export const getProductById = (id: number) => {
    return axios.get(url+productPath+"getById/"+id)
}
export const getProductItemById = (id: number) => {
    return axios.get(url+productPath+"getItemById/"+id)
}
export const getProdCount = () => axios.get(url+productPath+"getCount")

export const getCartQuantityCount = (token?: string | null) => axios.get(url+cartPath+"quantityCount", {
    headers: authHeader(token)
})
export const getCartCount = (token?: string | null) => axios.get(url+cartPath+"count", {
    headers: authHeader(token)
})
export const addCart = (productId: number, quantity: number, token?: string | null | null) => axios.put(url+cartPath+"add", null, {
    params: {
        productId: productId,
        quantity: quantity,
    },
    headers: authHeader(token)
})
export const getCartByUserId = (token?: string | null) => axios.get(url+cartPath+"list", {
    headers: authHeader(token)
})
export const updateCartQuantity = (productId: number, quantity: number, token?: string | null) => axios.put(url+cartPath+"update", null, {
    params: {
        productId: productId,
        quantity: quantity,
    },
    headers: authHeader(token)
})
export const deleteCart = (productId: number, token?: string | null) => axios.delete(url+cartPath+"delete", {
    params: {
        productId: productId
    },
    headers: authHeader(token)
})
export const clearCart = (token?: string | null) => axios.delete(url+cartPath+"clear" , {
    headers: authHeader(token)
})

export const getAllCarousel = () => axios.get(url+"/carousel"+"/list")