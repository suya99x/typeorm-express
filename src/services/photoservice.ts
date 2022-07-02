import { AppDataSource } from "../data-source"
import { Photo } from "../entity/photo"
import { User } from "../entity/User"

const PhotoRepository = AppDataSource.getRepository(Photo)
const userRepository = AppDataSource.getRepository(User)


export const findAll = async () => {
    // const result = await AppDataSource.manager.find(Book)
    const result = await PhotoRepository.find()
    return result
}


export const findById = async (id) => {

    const photo = await PhotoRepository.findOneBy({ id: id })
    if (photo) {
        return photo
    }
    else {
        return null
    }
}


export const postPhoto = async (data) => {
    const photo = PhotoRepository.create(data)
    const result = await PhotoRepository.save(photo)
    return result
}

export const putPhoto = async (id, data) => {
    const photo = await AppDataSource.manager.findOneBy(Photo, { id: id })
    if (photo) {
        //const book = await  AppDataSource.manager.update(Book, id, data)
        const newphoto = await PhotoRepository.update(id, data)
        const updatephoto = await PhotoRepository.findBy({ id: id })
        return updatephoto 
    }
    else {
        return null
    }

}


export const deletePhoto = async (id) => {
    const photo = await PhotoRepository.findOneBy({ id: id })
    if (photo) {
        //const book = await  AppDataSource.manager.delete(Book, id)
        const deletephoto = await PhotoRepository.remove(photo)
        return deletephoto
    }
    else {
        return null
    }

}