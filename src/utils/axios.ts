import type { Product } from "@/entities/Product"
import axios from "axios";
import * as qs from 'qs';

export const url = "http://localhost:8080"
export const saveProduct = (product: Product, token: string | null) => (
    axios.put(url+'/product/save', product, {
        headers: {
            token: token
        }
    })
)
export const delProductById = (id: number, token: string | null) => (
    axios.delete(url+"/product/delete/"+id, {
        headers: {
			token: token
		}
    })
)
export const checkToken = (token: string) => (
    axios.get(url+"/auth/checkToken", {
        headers: {
            token: token
        }
    })
)
export const login = (data: string) => (
    axios.post(url+"/auth/login", data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
)
export const getAllProduct = () => {
    return axios.get(url+"/product/getAll")
}
export const getAllProductBySpec = (params: Object) => {
    return axios.get(url + "/product/getAllBySpec", {
        params: params,
        paramsSerializer: params => {
            return qs.stringify(params, {arrayFormat: 'comma'})
        }
    })
}
export const getAllProductCategory = () => {
    return axios.get(url+"/product/getAllCategory")
}
export const getCountProductsByCategory = () => {
    return axios.get(url+"/product/getCountProductsByCategory")
}
export const getProductById = (id: string) => {
    return axios.get(url+"/product/getById/"+id)
}