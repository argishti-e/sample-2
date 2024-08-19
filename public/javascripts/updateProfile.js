const form = document.getElementById('update-profile-form')
form.addEventListener('submit', async e => {
	e.preventDefault()

	const data = {
		firstName: document.querySelector('#firstName').value,
		lastName: document.querySelector('#lastName').value,
		email: document.querySelector('#email').value,
		password: document.querySelector('#password').value,
	}

	const messageElement = document.getElementById('message')

	try {
		const response = await axios.put('/users/updateUserProfile', data, {
			headers: {
				'x-token': localStorage.getItem('token'),
			},
		})

		if (response.data.status === 'success') {
			messageElement.textContent = 'Profile updated successfully!'
			messageElement.className = 'success'
		} else {
			messageElement.textContent =
				response.data.message || 'Failed to update profile.'
			messageElement.className = 'error'
		}
	} catch (error) {
		const fields = error.response.data.fields
		if (fields) {
			Object.keys(fields).forEach(key => {
				const messages = fields[key]
				const errorSpan = document.querySelector(`#${key}-error`)
				if (errorSpan) {
					errorSpan.textContent = messages
				}
			})
		}
	}
})
