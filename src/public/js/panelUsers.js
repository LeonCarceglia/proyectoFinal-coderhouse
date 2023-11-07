document.addEventListener('DOMContentLoaded', function () {
    const deleteForms = document.querySelectorAll('form[id^="deleteUserForm"]')
    deleteForms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const userId = form.getAttribute('data-user-id')
            fetch(`/api/users/${userId}`, {
                method: 'DELETE'
            })
            .then( window.location.href = '/panelUsers?message=deleted')
           
        })
    })

    const modifyRoleForms = document.querySelectorAll('form[id^="modifyRoleForm"]')
    modifyRoleForms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault()
            const userId = form.getAttribute('data-user-id')
            const newRole = form.querySelector('#role').value
            fetch(`/api/users/modifyRole/${userId}`, {
                method: 'PUT',
                body: JSON.stringify({ role: newRole }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then( window.location.href = '/panelUsers')
        })
    })
})
