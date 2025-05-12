import type { Goods } from "@/entities/Goods"
import axios from "axios";
import * as qs from 'qs';
import { useTokenStore } from '@/stores/token_store';
import type { UserAddress } from "@/entities/UserAddress";
import type { GoodsCategory } from "@/entities/GoodsCategory";
import type { User } from "@/entities/User";
import type { UpdateCartDTO } from "@/entities/dto/UpdateCartDTO";
import type { CarouselSaveDTO } from "@/entities/dto/CarouselSaveDTO";

const userPath = "/user/"
const goodsPath = "/goods/"
const cartPath = "/cart/"
const userAddressPath = "/address/"
const carouselPath = "/carousel/"
const jwtHeaderPrefix = "Bearer "
const authHeader = () => {
    const tokenStore = useTokenStore()
    const token = tokenStore.token;
    return {
        Authorization: jwtHeaderPrefix + token
    };
}

export const url = "http://127.0.0.1:8081"

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
export const saveUser = (user: User) => axios.put(userUrl+"save", user, {
    headers: authHeader()
})

// Goods
const goodsUrl = url + goodsPath;
export const saveGoods = (goods: Goods) => (
    axios.put(goodsUrl+'save', goods, {
        headers: authHeader()
    })
)
export const delGoodsById = (id: number) => (
    axios.delete(goodsUrl+"delete/"+id, {
        headers: authHeader()
    })
)
export const getAllGoods = () => axios.get(goodsUrl+"getAll")
export const getAllGoodsShowItemBySpec = (params: Object) => {
    return axios.get(goodsUrl+"getAllItemBySpec", {
        params: params,
        paramsSerializer: params => {
            return qs.stringify(params, {arrayFormat: 'comma'})
        }
    })
}
export const getAllGoodsByPage = (page: number, size: number, name?: string, categoryId?: number) => {
    return axios.get(goodsUrl + "findAllByPage", {
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
export const getCountGoodsByCategory = () => {
    return axios.get(goodsUrl+"getCountByCategory")
}
export const getGoodsById = (id: number) => {
    return axios.get(goodsUrl+"getById/"+id)
}
export const getGoodsShowItemById = (id: number) => {
    return axios.get(goodsUrl+"getItemById/"+id)
}
export const getGoodsCount = () => axios.get(goodsUrl+"getCount")
export const getGoodsCountByCategoryId = (categoryId: number) => {
    return axios.get(goodsUrl+"get/count/byCategoryId/"+categoryId)
}

// GoodsCategory
const goodsCategoryUrl = url + "/goods/category/"
export const getAllGoodsCategory = () => {
    return axios.get(goodsCategoryUrl+"getAll")
}
export const saveGoodsCategory = (category: GoodsCategory) => {
    return axios.put(goodsCategoryUrl+"save", category, {
        headers: authHeader()
    })
}
export const getPage = (page: number, size: number) => {
    return axios.get(goodsCategoryUrl+"getPage", {
        params: {
            page: page,
            size: size
        },
        headers: authHeader()
    })
}
export const removeGoodsCategoryById = (id: number) => {
    return axios.delete(goodsCategoryUrl+"remove/byId/"+id, {
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
export const addCart = (goodsId: number, quantity: number | null) => axios.put(cartUrl+"add", null, {
    params: {
        goodsId: goodsId,
        quantity: quantity,
    },
    headers: authHeader()
})
export const getCartByUserId = () => axios.get(cartUrl+"list", {
    headers: authHeader()
})
export const updateCart = (cart: UpdateCartDTO) => axios.patch(cartUrl+"update", cart, {
    headers: authHeader()
})
export const deleteCart = (goodsId: number) => axios.delete(cartUrl+"delete", {
    params: {
        goodsId: goodsId
    },
    headers: authHeader()
})
export const clearCart = () => axios.delete(cartUrl+"clear" , {
    headers: authHeader()
})

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

// Carousel
const carouselUrl = url + carouselPath;
export const getAllCarousel = () => axios.get(carouselUrl+"list")
export const getAllCarouselByPage = (page: number, size: number) => axios.get(carouselUrl+"page", {
    params: {
        page: page,
        size: size
    }
})
export const saveCarousel = (carousel: CarouselSaveDTO) => axios.put(carouselUrl+"save", carousel, {
    headers: authHeader()
})
export const deleteCarouselById = (id: number) => axios.delete(carouselUrl+"delete", {
    params: {
        id: id
    },
    headers: authHeader()
})