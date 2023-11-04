import type { Product } from "@/entities/Product"
import axios from "axios";
import * as qs from 'qs';

const productPath = "/product/"

export const url = "http://localhost:8080"
export const saveProduct = (product: Product, token: string | null) => (
    axios.put(url+productPath+'save', product, {
        headers: {
            token: token
        }
    })
)
export const delProductById = (id: number, token: string | null) => (
    axios.delete(url+productPath+"delete/"+id, {
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
export const getCount = () => axios.get(url+productPath+"getCount")