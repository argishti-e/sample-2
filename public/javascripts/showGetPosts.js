const postsContainer = document.getElementById('posts-container')
const errorMessage = document.getElementById('error-message')
const token = localStorage.getItem('token')

const getPost = async () => {
	try {
		const response = await axios.get('/post/getPosts', {
			headers: { 'x-token': token },
		})

		if (response.data.status === 'success') {
			const posts = response.data.posts

			posts.forEach(post => {
				const postElement = document.createElement('div')
				postElement.classList.add('post')

				postElement.innerHTML = `
								<p class="post-author">Post ID: ${post.id}</p>
								<p class="post-author">User ID:${post.user_id}</p>
								<h2 class="post-title">Post title: ${post.title}</h2>
								<p class="post-description">Post description:${post.description}</p>
								<p class="post-date"><strong>Date:</strong> ${new Date(
									post.task_date
								).toLocaleDateString()}</p>
							`

				postsContainer.appendChild(postElement)
			})
		} else {
			errorMessage.textContent = 'Failed to load posts.'
		}
	} catch (error) {
		console.error('Error fetching posts:', error)
		errorMessage.textContent = 'An error occurred while fetching posts.'
	}
}

getPost()
