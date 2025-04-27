import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode';
import { ref } from 'vue';

export const useTokenStore = defineStore('tokenStore', () => {
    const tokenName = "jwt";
    const token = ref(localStorage.getItem(tokenName))
    function update(newToken : string) {
        localStorage.setItem(tokenName, newToken)
        token.value = newToken
    }
    function remove() {
        localStorage.removeItem(tokenName)
        token.value = null
    }
    function decodeToken() {
        let decodeToken;
        try {
            decodeToken = jwtDecode<any>(token.value!)
        } catch {
            return Object
        }
        return decodeToken
    }
    return { token, update, remove, decodeToken }
})