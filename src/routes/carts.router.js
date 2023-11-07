import CustomRouter from "./router.js"
import cartsController from "../controllers/carts.controller.js"

export default class CartsRouter extends CustomRouter {
    init() {
        this.post("/", ["PUBLIC"], cartsController.createCart)

        this.get("/", ["PUBLIC"], cartsController.getCarts)

        this.get("/:id", ["PUBLIC"], cartsController.getCart)

        this.post("/:cid/product/:pid", ["USER", "PREMIUM", "ADMIN"], cartsController.addProductToCart)

        this.delete("/:cid/products/:pid", ["PUBLIC"], cartsController.deleteProduct)

        this.put("/:cid", ["PUBLIC"], cartsController.updateCart)

        this.put("/:cid/products/:pid", ["PUBLIC"], cartsController.updateProductQuantity)

        this.delete("/:cid", ["PUBLIC"], cartsController.deleteProducts)

        this.post("/:cid/purchase", ["PUBLIC"], cartsController.purchase)

        this.post("/generateTokenPayment", ["USER", "PREMIUM", "ADMIN"], cartsController.generateToken)
    }
}