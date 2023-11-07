import ticketsModel from "../../models/ticket.js"

export default class TicketManager{
    constructor(){
    }

    createTicket = async (amount, purchaser) =>{
        if (amount > 0){
            return await ticketsModel.create({amount, purchaser})
        }
        else{
            return "Error, ticket without value"
        }
    }

    getTicket = async (code) =>{
        return await ticketsModel.findOne({ code: code })
    }

}