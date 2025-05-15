<script lang="ts" setup>
import { nonull } from '@/utils/formRules'
import type { Goods } from '../../entities/Goods';
import type { PropType } from 'vue';
import type { CarouselSaveDTO } from '../../entities/dto/CarouselSaveDTO';
import { computed, reactive } from 'vue';

const props = defineProps({
    dto: {
        type: Object as PropType<CarouselSaveDTO>,
        default: () => ({
            id: null,
            title: null,
            description: null,
            subDescription: null,
            goodsId: null
        })
    },
    goodsList: {
        type: Array<Goods>,
        required: true
    }
})

const isModify = computed(() => {
    return props.dto.id != null
})
const carouselSaveDTO = reactive(props.dto)
const emit = defineEmits(['submit'])
</script>

<template>
    <v-dialog activator="parent" width="auto" min-width="300">
        <v-card>
            <v-card-title>{{ isModify ? '修改轮播图' : '添加轮播图' }}</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="() => emit('submit', carouselSaveDTO)">
                    <v-row>
                        <v-col>
                            <v-text-field name="title" label="标题" :rules="[nonull]" counter="16" v-model="carouselSaveDTO.title" />
                            <v-select name="goods" label="商品" :items="goodsList" item-title="name" item-value="id" :rules="[nonull]" v-model="carouselSaveDTO.goodsId" />
                            <v-text-field name="description" label="描述" counter="30" v-model="carouselSaveDTO.description" />
                            <v-text-field name="subDescription" label="副描述" counter="30" v-model="carouselSaveDTO.subDescription" />
                            <div class="text-end">
                                <v-btn class="text-end" type="submit" color="primary">添加</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                    <slot name="action" />
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>