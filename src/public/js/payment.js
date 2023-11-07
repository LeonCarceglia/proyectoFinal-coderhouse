const stripe = Stripe('pk_test_51O9BU0HHFXlbaGmo7LBS2zzGiC7Ztukgo2xhj7p4mWuIeb9yFrLA29jYFPWRFPxk3fMahEa6BfQf5vCH7Ha9uC1u00bkaBT37w')
const amountField = document.getElementById('amount')
const codeField = document.getElementById('code')
let elements
initialize()
checkStatus()

document
    .querySelector("#payment-form")
    .addEventListener("submit", handleSubmit)


async function initialize() {
    const response = await fetch("/api/carts/generateTokenPayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            amount: amountField.value,
            code: codeField.value
        }),
    })
    const clientSecret = (await response.json()).data
    console.log(clientSecret)
    const appearance = {
        theme: 'stripe',
    }
    elements = stripe.elements({ appearance, clientSecret })

    const paymentElementOptions = {
        layout: "tabs",
    }

    const paymentElement = elements.create("payment", paymentElementOptions)
    paymentElement.mount("#payment-element")
}

async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
  
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/paymentSucces",
      },
    })
    if (error.type === "card_error" || error.type === "validation_error") {
      showMessage(error.message)
    } else {
      showMessage("An unexpected error occurred.")
    }
  
    setLoading(false)
  }

  async function checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    )
  
    if (!clientSecret) {
      return
    }
  
    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret)
  
    switch (paymentIntent.status) {
      case "succeeded":
        showMessage("Payment succeeded!")
        break
      case "processing":
        showMessage("Your payment is processing.")
        break
      case "requires_payment_method":
        showMessage("Your payment was not successful, please try again.")
        break
      default:
        showMessage("Something went wrong.")
        break
    }
  }


  function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message")
  
    messageContainer.classList.remove("hidden")
    messageContainer.textContent = messageText
  
    setTimeout(function () {
      messageContainer.classList.add("hidden")
      messageContainer.textContent = ""
    }, 4000)
  }
  
  function setLoading(isLoading) {
    if (isLoading) {
      document.querySelector("#submit").disabled = true
      document.querySelector("#spinner").classList.remove("hidden")
      document.querySelector("#button-text").classList.add("hidden")
    } else {
      document.querySelector("#submit").disabled = false
      document.querySelector("#spinner").classList.add("hidden")
      document.querySelector("#button-text").classList.remove("hidden")
    }
  }