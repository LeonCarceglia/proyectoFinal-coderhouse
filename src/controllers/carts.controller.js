import { cartService } from "../services/index.js"
import { ticketService } from "../services/index.js"

const createCart = async (req, res) => {
    const cart = req.body
    const createdCart = await cartService.createCart(cart)
    res.status(201).json({ status: "ok", data: createdCart })
}

const getCarts = async (req, res) => {
    const carts = await cartService.getCarts()
    res.json({ status: "ok", data: carts })
}

const getCart = async (req, res) => {
    const { id } = req.params
    const cart = await cartService.getCart(id)
    res.json({ status: "ok", data: cart })
}

const addProductToCart = async (req, res) => {
    const ids = req.params
    const quantity = req.query.quantity
    const email = req.session.user.email
    const newCart = await cartService.addProductToCart(ids, quantity, email)
    res.status(201).json({ status: "ok", success: newCart })
}

const deleteProduct = async (req, res) => {
    const ids = req.params
    await cartService.deleteProduct(ids)
    res.sendStatus(204)
}

const updateCart = async (req, res) => {
    const { cid } = req.params
    const products = req.body
    const cartUpdated = await cartService.updateCart(cid, products)
    res.json({ status: "ok", data: cartUpdated })
}

const updateProductQuantity = async (req, res) => {
    const ids = req.params
    const { quantity } = req.body
    const cartUpdated = await cartService.updateProductQuantity(ids, quantity)
    res.json({ status: "ok", data: cartUpdated })
}

const deleteProducts = async (req, res) => {
    const { cid } = req.params
    await cartService.deleteProducts(cid)
    res.sendStatus(204)
}

const purchase = async (req, res) => {
    const { cid } = req.params
    const user = req.session.user
    const amount = await cartService.purchase(cid, req.logger)
    const ticket = await ticketService.createTicket(amount, user.email)
    res.json({ status: "ok", data: ticket })
}

const generateToken = async (req, res) => {
    const code = req.body.code
    const amount = req.body.amount
    const clientSecret = await cartService.tokenPayment(amount, code)
    res.json({ status: "ok", data: clientSecret })
}


export default {
    createCart,
    getCarts,
    getCart,
    addProductToCart,
    deleteProduct,
    updateCart,
    updateProductQuantity,
    deleteProducts,
    purchase,
    generateToken
}