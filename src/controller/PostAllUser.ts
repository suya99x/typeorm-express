import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User"

const userRepository = AppDataSource.getRepository(User)

export async function postAllUserAction(req: Request, res: Response) {
    const newUser = userRepository.create(req.body)
     // save received post
    await userRepository.save(newUser);

    // return saved post back
    res.send(newUser);
}