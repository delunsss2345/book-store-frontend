export type VariantItem = {
    id: bigint,
    price: string,
    format: string,
    currencyCode: string,
    stock: number,
    book: {
        id: bigint,
        coverImageUrl: string,
        translations: [
            {
                title: string,
                description: string,
                slug: string
            }
        ]
    }
}