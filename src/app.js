/**
 * ┌───────────────────────────────────┐
 * │ Run from two Git Bash terminals:  │
 * │ ► npm run json:server             │
 * │ ► npm start                       │
 * │                                   │
 * │ @version 1.0.0                    │
 * │ @author  Raymond Loranger         │
 * │ @license MIT                      │
 * └───────────────────────────────────┘
 **/

// NOTE: .js required with ES Modules
import { http } from './http'
import { ui } from './ui'

const url = 'http://localhost:3000/posts'

// Get Posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts)

// Listen for submit post
ui.postSubmit.addEventListener('click', submitPost)

// Listen for delete
ui.posts.addEventListener('click', deletePost)

// Listen for edit state
ui.posts.addEventListener('click', enableEdit)

// Listen for cancel edit
ui.editCancel.addEventListener('click', cancelEdit)

// Get Posts
function getPosts() {
  ui.title.focus()
  http.get(url)
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err))
}

// Submit Post
function submitPost() {
  const data = {
    title: ui.title.value.trim(),
    body: ui.body.value.trim()
  }
  if (data.title && data.body) {
    if (ui.id.value) {
      // Update post
      http.put(`${url}/${ui.id.value}`, data)
        .then(_data => {
          ui.showAlert('Post updated.', 'alert alert-success')
          ui.changeFormState('add')
          getPosts()
        })
        .catch(err => console.log(err))
    } else {
      // Create post
      http.post(url, data)
        .then(_data => {
          ui.showAlert('Post added.', 'alert alert-success')
          ui.clearFields()
          getPosts()
        })
        .catch(err => console.log(err))
    }
  } else {
    ui.showAlert('Please fill in all fields.', 'alert alert-danger')
  }
}

// Delete Post
function deletePost(e) {
  let id = null
  if (e.target.classList.contains('fa-remove')) { // Click
    id = e.target.parentElement.dataset.id
  } else if (e.target.classList.contains('delete')) { // Enter
    id = e.target.dataset.id
  }
  if (id) {
    if (confirm('Are you sure?')) {
      http.delete(`${url}/${id}`)
        .then(data => {
          ui.showAlert('Post removed', 'alert alert-success')
          getPosts()
        })
        .catch(err => console.log(err))
    }
  }
}

// Enable Edit State
function enableEdit(e) {
  let sibling = null
  if (e.target.classList.contains('fa-pencil')) { // Click
    sibling = e.target.parentElement
  } else if (e.target.classList.contains('edit')) { // Enter
    sibling = e.target
  }
  if (sibling) {
    const post = {
      id: sibling.dataset.id,
      title: sibling.previousElementSibling.previousElementSibling.textContent,
      body: sibling.previousElementSibling.textContent
    }
    ui.fillForm(post)
  }
}

// Cancel Edit State
function cancelEdit() {
  ui.changeFormState('add')
}