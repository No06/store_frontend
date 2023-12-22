import type { AxiosError } from "axios";
import { defineStore } from "pinia";
import { ref, computed } from 'vue';

export const useSnackBarStore = defineStore('snackBarStore', () => {
    const errorMsg = ref("")
    const showErrorSnackBar = computed({
        get: () => errorMsg.value != "",
        set: (newVal) => {
            if (!newVal) errorMsg.value = ""
        }
    })
    const successMsg = ref("")
    const showSuccessSnackBar = computed({
        get: () => successMsg.value != "",
        set: (newVal) => {
            if (!newVal) successMsg.value = ""
        }
    })
    const showAxiosError = (e: AxiosError) => {
        const data = e.response?.data as any
        if (data.message) {
            errorMsg.value = e.code + ": " + data.message;
        } else {
            errorMsg.value = e.message
        }
    }
    return { errorMsg, showErrorSnackBar, successMsg, showSuccessSnackBar, showAxiosError }
})