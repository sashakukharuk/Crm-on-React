import {CategoriesType} from "../../../State/categories-reducer";
import {instance} from "./request";

export const requestCategoriesApi = {
    getCategories (token: string | null) {
        return instance.get('/api/category', {
            headers: {
                Authorization: token
            }
        }).then(res => res.data)
    },
    getByIdCategory (token: string | null, categoryId: string) {
        return instance.get(`/api/category/${categoryId}`, {
            headers: {
                Authorization: token
            }
        })
    },

    postCategories (token: string | null, image: File | null, categories: CategoriesType) {
        const fd = new FormData()
        if (image) {
            fd.append('image', image, image.name)
        }
        fd.append('name', categories.name)

        return instance.post('/api/category', fd, {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: token
            }
        })
    },

    patchByIdCategory (token: string | null, image: File | null, categories: CategoriesType, categoryId: string) {
        const fd = new FormData()
        if (image) {
            fd.append('image', image, image.name)
        }
        fd.append('name', categories.name)

        return instance.patch(`/api/category/${categoryId}`, fd, {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: token
            }
        })
    },

    deleteByIdCategory (token: string | null, categoryId: string) {
        return instance.delete(`/api/category/${categoryId}`, {
            headers: {
                Authorization: token
            }
        })
    }
}
