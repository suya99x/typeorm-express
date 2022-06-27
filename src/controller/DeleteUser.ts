import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User"

const userRepository = AppDataSource.getRepository(User)

export async function deleteUserAction(req: Request, res: Response) {
const userToRemove = await userRepository.findOneBy({
    id: Number(req.params.id),
})
await userRepository.remove(userToRemove)
console.log("user has been deleted")
    res.send(userToRemove);
}