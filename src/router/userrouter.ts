import { Router, Request, Response } from "express"
import { Index } from "typeorm"
import { AppDataSource } from "../data-source"
import { Profile } from "../entity/profile"
import { User } from "../entity/User"
import { deleteuser, findAll, findById, postuser, putuser } from "../services/userservice"

const profileRepository = AppDataSource.getRepository(Profile)

export const userRouter: Router = Router()

userRouter.get("/", async (req: Request, res: Response) => {

    try {
        const result = await findAll()
        res.send(result).status(200)
    }
    catch (error) {
        const result = "Sorry, Not found" + error
        res.send(result).status(404)

    }

})

userRouter.get("/:id", async (req: Request, res: Response) => {
   
    try {
        const id = req.params.id
        const result = await findById(id)
        if (result) {
            res.send(result).status(200)
        }
        else {
            res.status(404).send("Sorry,Data not found ")
        }
    }
    catch (error) {
        const result = "Sorry, Not found" + error
        res.send(result).status(404)

    }

})


userRouter.post("/", async (req: Request, res: Response) => {
    try {
        const user = new User()
        user.firstName =req.body.firstName
        user.lastName =req.body.lastName
        user.profile =req.body.profile
        user.photos =req.body.photos

        const profile = await profileRepository.find({
            where: {
                id : req.body.profile
        }
        })
       console.log(profile)
       const result = profile.find(({id})=> id)
       console.log(result.id)
       if(req.body.profile == result.id){
            return res.send("profile has already been linked")
       }
        else{
           const postedData = await postuser(user)
           res.send(postedData).status(200)
        }
     

    }
    catch (error) {
        const result = "Sorry, Not found" + error
        res.send(result).status(404)

    }
})


userRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        //const date = req.body.date
        //const book = req.body
        // book.date = Date(date) body-parser is it?
        const postedData = await putuser(id, req.body)
        if (postedData) {
            res.send(postedData).status(200)
        }
        else {
            res.status(404).send("Sorry, Data Not Found")
        }
    }
    catch (error) {
        const result = "Sorry, Not updated " + error
        res.status(502).send(result)

    }
})



userRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        // book.date = Date(date) body-parser is it?
        const postedData = await deleteuser(id)
        if (postedData) {
            res.json({ "message": "Data Deleted", "data": postedData }).status(200)
        }
        else {
            res.status(404).send("Sorry, Data Not Found")
        }
    }
    catch (error) {
        const result = "Sorry, Not updated " + error
        res.status(502).send(result)

    }
})