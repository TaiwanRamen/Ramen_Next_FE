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
        close: {
            day: {type: number},
            time: {type: string},
        },
        open: {
            day: {type: number},
            time: {type: string},
        }
    }],
    openPeriodText: [{
        type: string
    }],
    googleUrl: {type: string},
    storeUrl: {type: string}
    __v: number,
    storeRelations?:{
        author: string,
        comments: string[]
        followers: string[]
        owners: string[]
        reviews: string[]
    }
}
