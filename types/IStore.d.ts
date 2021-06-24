export interface IStore {
    _id: string,
    name: string,
    googleImages: string[],
    region: string,
    city: string,
    descriptionHTML: string,
    address: string,
    location: { type: string, coordinates: number[], geoHash: string },
    rating: number
    createdAt: string,
    updatedAt: string,
    tags: string[],
    phoneNumber: "",
    openPeriod: [{
        period: [{
            open: string,
            close: string
        }]
    }],
    openPeriodText: string,
    googleUrl: string,
    storeUrl: string,
    __v: number,
    storeRelations?: {
        author: string,
        comments: string[]
        followers: string[]
        owners: string[]
        reviews: string[]
    }
}
