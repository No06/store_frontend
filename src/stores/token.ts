import { defineStore } from 'pinia'
import jwt_decode from 'jwt-decode';
import { ref } from 'vue';

export const useTokenStore = defineStore('tokenStore', () => {
    const tokenName = "token";
    const token = ref(localStorage.getItem(tokenName))
    function update(newToken : string) {
        localStorage.setItem(tokenName, newToken);
    }
    function remove() {
        localStorage.removeItem(tokenName)
    }
    function decodeToken() {
        return jwt_decode<any>(token.value!)
    }
    return { token, update, remove, decodeToken }
})