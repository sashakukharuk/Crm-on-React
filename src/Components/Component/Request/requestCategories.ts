import {CategoriesType} from "../../../State/categories-reducer";
import {instance} from "./request";

export const requestCategoriesApi = {
    getCategories (token: string | null) {
        return instance.get('category', {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    },
    getByIdCategory (token: string | null, categoryId: string) {
        return instance.get(`category/${categoryId}`, {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    },

    postCategories (token: string | null, image: File | null, categories: CategoriesType) {
        const fd = new FormData()
        if (image) {
            fd.append('image', image, image.name)
        }
        fd.append('name', categories.name)

        return instance.post('category', fd, {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: token
            }
        }).then(res => res.data)
    },

    patchByIdCategory (token: string | null, image: File | null, categories: CategoriesType, categoryId: string) {
        const fd = new FormData()
        if (image) {
            fd.append('image', image, image.name)
        }
        fd.append('name', categories.name)

        return instance.patch(`category/${categoryId}`, fd, {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: token
            }
        }).then(res => res.data)
    },

    deleteByIdCategory (token: string | null, categoryId: string) {
        return instance.delete(`category/${categoryId}`, {
            headers: {
                Authorization: token
            }
        })
    }
}
