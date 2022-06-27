import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User"

const userRepository = AppDataSource.getRepository(User)

export async function getAllUserAction(req: Request, res: Response) {
const users = await userRepository.find()
    res.send(users);
}