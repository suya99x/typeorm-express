import { Router, Request, Response } from "express"
import { deleteprofile, findAll, findById, postprofile, putprofile } from "../services/profileservices"

export const profileRouter: Router = Router()

profileRouter.get("/", async (req: Request, res: Response) => {

    try {
        const result = await findAll()
        res.send(result).status(200)
    }
    catch (error) {
        const result = "Sorry, Not found" + error
        res.send(result).status(404)

    }

})

profileRouter.get("/:id", async (req: Request, res: Response) => {

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


profileRouter.post("/", async (req: Request, res: Response) => {
    try {
        const data = req.body
        const postedData = await postprofile(data)
        res.send(postedData).status(200)

    }
    catch (error) {
        const result = "Sorry, Not found" + error
        res.send(result).status(404)

    }
})


profileRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        //const date = req.body.date
        //const book = req.body
        // book.date = Date(date) body-parser is it?
        const postedData = await putprofile(id, req.body)
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



profileRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        // book.date = Date(date) body-parser is it?
        const postedData = await deleteprofile(id)
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