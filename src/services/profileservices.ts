import { AppDataSource } from "../data-source"
import { Profile } from "../entity/profile"
import { User } from "../entity/User"

const userRepository = AppDataSource.getRepository(User)
const profileRepository = AppDataSource.getRepository(Profile)



export const findAll = async () => {

    const result = await profileRepository.find()
    return result
}


export const findById = async (id) => {

    const profile = await profileRepository.findBy({ id: id })
    if (profile) {
        return profile
    }
    else {
        return null
    }
}


export const postprofile = async (data) => {
    const profile = profileRepository.create(data)
    const result = await profileRepository.save(profile)
    return result
}


export const putprofile = async (id, data) => {
    const profile = await profileRepository.findOneBy({ id: id })

    if (profile) {
        const putdata= profileRepository.create({ ...data, "id": id })
        const updateprofile = profileRepository.save(putdata)

        return updateprofile
    }
    else {
        return null
    }

}


export const deleteprofile = async (id) => {
    const profile = await profileRepository.findOneBy({ id: id })
    if (profile) {
        const book = await profileRepository.remove(profile)

        return profile
    }
    else {
        return null
    }

}