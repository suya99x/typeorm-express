import { Router, Request, Response } from "express"
import { PhotoContract } from "../contract/photoContract"
import { postPhoto, putPhoto, deletePhoto, findAll, findById } from "../services/photoservice"


export const photoRouter: Router = Router()

photoRouter.get("/", async (req: Request, res: Response) => {

    try {
        const result = await findAll()
        res.send(result).status(200)
    }
    catch (error) {
        const result = "Sorry, Not found" + error
        res.send(result).status(404)

    }

})


photoRouter.get("/:id", async (req: Request, res: Response) => {

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

photoRouter.post("/", async (req: Request, res: Response) => {
    try {
        const data: PhotoContract = req.body
        const postedData = await postPhoto(data)
        res.send(postedData).status(200)

    }
    catch (error) {
        const result = "Sorry, Not found" + error
        res.send(result).status(404)

    }
})



photoRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const postedData = await putPhoto(id, req.body)
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




photoRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const postedData = await deletePhoto(id)
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