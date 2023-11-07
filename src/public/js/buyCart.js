document.addEventListener('DOMContentLoaded', function () {
    const purchaseForm = document.getElementById('purchaseForm')

    purchaseForm.addEventListener('submit', async function (event) {
        event.preventDefault()
        try {
            const response = await fetch(purchaseForm.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            })
            const data = await response.json()
            const ticketCode = data.data.code
            console.log(ticketCode)
            window.location.href = `/payment/${ticketCode}`
        } catch (error) {
            throw error
        }
    })
})
