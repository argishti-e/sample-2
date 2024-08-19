const postContainer = document.getElementById('post-container')
const errorMessage = document.getElementById('error-message')
const token = localStorage.getItem('token')
const showGetSinglePost = async () => {
	try {
		const response = await axios.get('/post/getSinglePost', {
			headers: {
				'x-token': token,
			},
		})

		if (response.data.status === 'success') {
			const posts = response.data.posts

			posts.forEach(post => {
				const postElement = document.createElement('div')
				postElement.classList.add('post')
				postElement.innerHTML = `
                            <p class="post-author">Post ID: ${post.id}</p>
                            <p class="post-author">User ID: ${post.user_id}</p>
                            <h2 class="post-title">Post Title: ${
															post.title
														}</h2>
                            <p class="post-description">Post Description: ${
															post.description
														}</p>
                            <p class="post-date"><strong>Date:</strong> ${new Date(
															post.task_date
														).toLocaleDateString()}</p>
                            <button class="delete-button" data-id="${
															post.id
														}">Delete</button>
                        `
				postContainer.append(postElement)
			})

			document.querySelectorAll('.delete-button').forEach(button => {
				button.addEventListener('click', async () => {
					const postId = button.getAttribute('data-id')

					try {
						const response = await axios.delete(`/post/deletePost/${postId}`, {
							headers: {
								'x-token': token,
							},
						})

						if (response.status === 200) {
							button.parentElement.remove()
							errorMessage.textContent = 'Post deleted successfully!'
							errorMessage.className = 'success'
						} else {
							errorMessage.textContent = response.data.message
							errorMessage.className = 'error'
						}
					} catch (error) {
						console.error('Error deleting post:', error)
						errorMessage.textContent =
							'An error occurred while deleting the post.'
						errorMessage.className = 'error'
					}
				})
			})
		} else {
			errorMessage.textContent = 'Failed to load post.'
		}
	} catch (error) {
		console.error('Error fetching post:', error)
		errorMessage.textContent = 'An error occurred while fetching the post.'
	}
}

showGetSinglePost()
