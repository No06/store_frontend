import { defineStore } from "pinia";
import { ref, computed } from 'vue';

export const useDialogStore = defineStore('dialogStore', () => {
    const isSubmited = ref(false)
    const warningMsg = ref("")
    const showWarningDialog = computed({
        get: () => warningMsg.value != '',
        set: (newVal) => {
            if (!newVal) warningMsg.value = ""
        }
    })
    const errorMsg = ref("")
    const showErrorDialog = computed({
        get: () => errorMsg.value != "",
        set: (newVal) => {
            if (!newVal) errorMsg.value = ""
        }
    })
    return {isSubmited, warningMsg, showWarningDialog, errorMsg, showErrorDialog};
})