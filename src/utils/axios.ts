import type { Cart } from "@/entities/Cart";
import type { Product } from "@/entities/Product"
import axios from "axios";
import * as qs from 'qs';
import { useTokenStore } from '@/stores/token_store';
import type { UserAddress } from "@/entities/UserAddress";
import type { ProductCategoryDTO } from "@/entities/ProductCategory";
import type { UserDTO } from "@/entities/User";

const userPath = "/user/"
const productPath = "/product/"
const cartPath = "/cart/"
const userAddressPath = "/address/"
const jwtHeaderPrefix = "Bearer "
const authHeader = () => {
    const tokenStore = useTokenStore()
    const token = tokenStore.token;
    return {
        Authorization: jwtHeaderPrefix + token
    };
}

export const url = "http://192.168.1.117:8080"

// User
const userUrl = url + userPath;
export const checkToken = () => axios.get(userUrl+"checkToken", {
    headers: authHeader()
})
export const userLogin = (data: {username: string, password: string}) => axios.post(userUrl+"login", data)
export const userRegister = (data: {username: string, password: string}) => axios.post(userUrl+"register", data)
export const getUserDefaultAddressByUserId = () => axios.get(userUrl + "get/defaultAddress", {
    headers: authHeader()
})
export const updateUserDefaultAddress = (addressId: Number) => axios.put(userUrl+"update/defaultAddress", null, {
    params: {
        addressId: addressId
    },
    headers: authHeader()
})
export const getUserPage = (page: number, size: number) => axios.get(userUrl+"get/page", {
    params: {
        page: page,
        size: size
    },
    headers: authHeader()
})
export const getAllUser = () => axios.get(userUrl+"getAll", {
    headers: authHeader()
})
export const removeUserById = (id: number) => axios.delete(userUrl+"remove/byId/"+id, {
    headers: authHeader()
})
export const saveUser = (user: UserDTO) => axios.put(userUrl+"save", user, {
    headers: authHeader()
})

// Product
const productUrl = url + productPath;
export const saveProduct = (product: Product) => (
    axios.put(productUrl+'save', product, {
        headers: authHeader()
    })
)
export const delProductById = (id: number) => (
    axios.delete(productUrl+"delete/"+id, {
        headers: authHeader()
    })
)
export const getAllProduct = () => axios.get(productUrl+"getAll")
export const getAllProdItemsBySpec = (params: Object) => {
    return axios.get(productUrl+"getAllItemBySpec", {
        params: params,
        paramsSerializer: params => {
            return qs.stringify(params, {arrayFormat: 'comma'})
        }
    })
}
export const getAllProdByPage = (page: number, size: number, name?: string, categoryId?: number) => {
    return axios.get(productUrl + "findAllByPage", {
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
export const getCountProductsByCategory = () => {
    return axios.get(productUrl+"getCountByCategory")
}
export const getProductById = (id: number) => {
    return axios.get(productUrl+"getById/"+id)
}
export const getProductItemById = (id: number) => {
    return axios.get(productUrl+"getItemById/"+id)
}
export const getProdCount = () => axios.get(productUrl+"getCount")
export const getProductCountByCategoryId = (categoryId: number) => {
    return axios.get(productUrl+"get/count/byCategoryId/"+categoryId)
}

// ProductCategory
const productCategoryUrl = url + "/product/category/"
export const getAllProductCategory = () => {
    return axios.get(productCategoryUrl+"getAll")
}
export const saveProductCategory = (category: ProductCategoryDTO) => {
    return axios.put(productCategoryUrl+"save", category, {
        headers: authHeader()
    })
}
export const getPage = (page: number, size: number) => {
    return axios.get(productCategoryUrl+"getPage", {
        params: {
            page: page,
            size: size
        },
        headers: authHeader()
    })
}
export const removeProductCategoryById = (id: number) => {
    return axios.delete(productCategoryUrl+"remove/byId/"+id, {
        headers: authHeader()
    })
}

// Cart
const cartUrl = url + cartPath;
export const getCartQuantityCount = () => axios.get(cartUrl+"quantityCount", {
    headers: authHeader()
})
export const getCartCount = () => axios.get(cartUrl+"count", {
    headers: authHeader()
})
export const addCart = (productId: number, quantity: number | null) => axios.put(cartUrl+"add", null, {
    params: {
        productId: productId,
        quantity: quantity,
    },
    headers: authHeader()
})
export const getCartByUserId = () => axios.get(cartUrl+"list", {
    headers: authHeader()
})
export const updateCart = (cart: Cart) => axios.patch(cartUrl+"update", cart, {
    headers: authHeader()
})
export const deleteCart = (productId: number) => axios.delete(cartUrl+"delete", {
    params: {
        productId: productId
    },
    headers: authHeader()
})
export const clearCart = () => axios.delete(cartUrl+"clear" , {
    headers: authHeader()
})
export const getAllCarousel = () => axios.get(url+"/carousel"+"/list")

// UserAddress
const userAddressUrl = url+userAddressPath;
export const getUserAddressByUserId = () => axios.get(userAddressUrl+"get/byUser", {
    headers: authHeader()
});
export const saveUserAddress = (address: UserAddress) => axios.put(userAddressUrl+"save", address, {
    headers: authHeader()
})
export const saveAllUserAddress = (addressList: Array<UserAddress>) => axios.put(
    userAddressUrl+"saveAll",
    addressList, {
        headers: authHeader()
    }
)
export const deleteUserAddressById = (id: Number) => axios.delete(userAddressUrl+"delete", {
    params: {
        id: id
    },
    headers: authHeader()
})