export class ProductCategoryVO {
    id?: number
    name?: string = ""
    description?: string = ""
}

export interface ProductCategoryDTO {
    id: number,
    name: string,
    description : string
}