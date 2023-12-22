<script setup lang="ts">
import type { PropType } from 'vue';
import type { UserAddress } from '../../entities/UserAddress';
import { ref, toRef } from 'vue';
import { nonull } from '@/utils/formRules'
import { postive } from '../../utils/formRules';

const props = defineProps({
    address: {
        type: Object as PropType<UserAddress>,
        default: () => ({})
    },
    categorys: Array
})
const emit = defineEmits(['submit'])

const isValidated = ref(false)
const address = toRef(() => props.address)

function submit() {
    if (isValidated.value) {
        emit('submit', props.address)
    }
}
</script>

<template>
    <v-form v-model="isValidated" @submit.prevent="submit" required>
        <v-row>
            <v-col>
                <v-text-field label="收件人" v-model="address.name" :rules="[nonull]" counter="50"/>
                <v-text-field type="number" label="电话" v-model="address.phone" :rules="[nonull, postive]" counter="20"/>
                <v-textarea label="地址" v-model="address.address" counter="200" :rules="[nonull]"/>
            </v-col>
        </v-row>
        <slot name="action"/>
    </v-form>
</template>

<style scoped>

</style>