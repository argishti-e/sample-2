const form = document.querySelector('#task-form')

form.addEventListener('submit', async event => {
	event.preventDefault()

	const data = {
		title: document.querySelector('#title').value,
		description: document.querySelector('#description').value,
		taskDate: document.querySelector('#taskDate').value,
	}
	const message = document.querySelector('#message')
	const token = localStorage.getItem('token')

	if (!token) {
		alert('No token found. Please login first.')
		location.href = '/users/login'
		return
	}

	try {
		await axios.post('/post/createPost', data, {
			headers: { 'x-token': token },
		})

		message.textContent = 'Task created successfully!'
		setTimeout(() => {
			location.href = '/users/profile'
			message.textContent = ''
		}, 3000)
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
		} else {
			console.error('Error without response:', error.message)
		}
	}
})
