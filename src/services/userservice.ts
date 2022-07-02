import { Index } from "typeorm"
import { AppDataSource } from "../data-source"
import { Profile } from "../entity/profile"
import { User } from "../entity/User"

const userRepository = AppDataSource.getRepository(User)

export const findAll = async () => {

    const result = await userRepository.find({
        relations: {
            profile: true,
            photos:true,
        },
    })
    return result
}


export const findById = async (id) => {

    const user = await userRepository.findBy({ id: id })
    if (user) {
        return user
    }
    else {
        return null
    }
}


export const postuser = async (data) => {

    const user = userRepository.create(data)
    const result = await userRepository.save(user)
    return result
}


export const putuser = async (id, data) => {
    const user = await userRepository.findOneBy({ id: id })
   
    if (user) {
        const putdata = userRepository.create({ ...data, "id": id })
        const updateprofile = userRepository.save(putdata)

        return updateprofile
    }
    else {
        return null
    }

}


export const deleteuser = async (id) => {
    const user = await userRepository.findOneBy({ id: id })
    if (user) {
        const book = await userRepository.remove(user)

        return user
    }
    else {
        return null
    }

}