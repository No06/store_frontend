export class ProductCategory {
    id?: number
    name?: string = ""
    description?: string = ""
}

export interface ProductCategoryDTO {
    id: number,
    name: string,
    description : string
}