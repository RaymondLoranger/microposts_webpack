class UI {
  constructor() {
    this.posts = document.querySelector('#posts')
    this.title = document.querySelector('#title')
    this.body = document.querySelector('#body')
    this.id = document.querySelector('#id')
    this.postSubmit = document.querySelector('.post-submit')
    this.editCancel = document.querySelector('.edit-cancel')
    this.alert = document.querySelector('#alert')
    this.message = document.querySelector('#message')
  }

  showPosts(posts) {
    let html = ''
    posts.forEach(post => {
      html += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `
    })
    this.posts.innerHTML = html
  }

  showAlert(message, className) {
    this.alert.className = className
    this.message.textContent = message
    setTimeout(_ => this.clearAlert(), 3000)
  }

  clearAlert() {
    this.alert.className = 'd-none'
  }

  clearFields() {
    this.title.value = ''
    this.body.value = ''
    this.id.value = ''
  }

  fillForm(post) {
    this.title.value = post.title
    this.body.value = post.body
    this.id.value = post.id
    this.changeFormState('edit')
  }

  changeFormState(state) {
    if (state === 'edit') {
      this.postSubmit.textContent = 'Update Post'
      this.postSubmit.classList.remove('btn-primary')
      this.postSubmit.classList.add('btn-warning')
      this.editCancel.classList.remove('d-none')
      ui.title.focus()
    } else {
      this.postSubmit.textContent = 'Post It'
      this.postSubmit.classList.remove('btn-warning')
      this.postSubmit.classList.add('btn-primary')
      this.editCancel.classList.add('d-none')
      this.clearFields()
    }
  }
}

export const ui = new UI