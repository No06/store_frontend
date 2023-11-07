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
    return { errorMsg, showErrorSnackBar, successMsg, showSuccessSnackBar }
})