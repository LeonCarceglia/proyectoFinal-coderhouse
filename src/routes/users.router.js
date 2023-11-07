import CustomRouter from "./router.js"
import userController from "../controllers/users.controller.js"

export default class UserRouter extends CustomRouter {
    init() {
        
        this.put("/premium/:uid", ["USER", "PREMIUM"], userController.premium)

        this.post("/:uid/documents",["PUBLIC","USER", "PREMIUM", "ADMIN"], userController.uploadDocuments)

        this.get("/", ["PUBLIC","USER", "PREMIUM", "ADMIN"], userController.getUsers)

        this.delete("/", ["ADMIN"], userController.deleteInactives)

        this.delete("/:uid", ["ADMIN"], userController.deleteUser)

        this.put("/modifyRole/:uid", ["ADMIN"], userController.modifyRole)
    }
}