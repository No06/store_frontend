import type { CartVO } from "@/entities/CartVO";
import type { Product } from "@/entities/Product"
import axios from "axios";
import * as qs from 'qs';
import { useTokenStore } from '@/stores/token_store';

const productPath = "/product/"
const cartPath = "/cart/"
const jwtHeaderPrefix = "Bearer "
const authHeader = () => {
    const tokenStore = useTokenStore()
    const token = tokenStore.token;
    return {
        Authorization: jwtHeaderPrefix + token
    };
}

export const url = "http://localhost:8080"
export const saveProduct = (product: Product) => (
    axios.put(url+productPath+'save', product, {
        headers: authHeader()
    })
)
export const delProductById = (id: number) => (
    axios.delete(url+productPath+"delete/"+id, {
        headers: authHeader()
    })
)
export const checkToken = () => axios.get(url+"/auth/checkToken", {
    headers: authHeader()
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

export const getCartQuantityCount = () => axios.get(url+cartPath+"quantityCount", {
    headers: authHeader()
})
export const getCartCount = () => axios.get(url+cartPath+"count", {
    headers: authHeader()
})
export const addCart = (productId: number, quantity: number | null) => axios.put(url+cartPath+"add", null, {
    params: {
        productId: productId,
        quantity: quantity,
    },
    headers: authHeader()
})
export const getCartByUserId = () => axios.get(url+cartPath+"list", {
    headers: authHeader()
})
export const updateCart = (cart: CartVO) => axios.patch(url+cartPath+"update", cart, {
    headers: authHeader()
})
export const deleteCart = (productId: number) => axios.delete(url+cartPath+"delete", {
    params: {
        productId: productId
    },
    headers: authHeader()
})
export const clearCart = () => axios.delete(url+cartPath+"clear" , {
    headers: authHeader()
})

export const getAllCarousel = () => axios.get(url+"/carousel"+"/list")