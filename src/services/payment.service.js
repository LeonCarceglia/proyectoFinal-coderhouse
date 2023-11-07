import Stripe from "stripe"

export default class PaymentService {
  constructor() {
    this.stripe = new Stripe(
      "sk_test_51O9BU0HHFXlbaGmokyYQndZoAJp305bPOPocnM7XLpAVWz3HkEQ7hsSJMMsWBl1eA57X2nbpgaOZRtYO1d7bwSCX007eR4TVcP"
    )
  }

  async createPaymentIntent(data) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create(data)
      return paymentIntent
    } catch (error) {
      throw error
    }
  }
}
