const postButtons = document.querySelector('#user-posts');
const createPostBtn = document.querySelector('#new-post-btn');
const updateBtn = document.querySelector('#update-post-btn');
const deleteBtn = document.querySelector('#delete-post-btn');


let id = 0;

const editPostHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute('data-id')) {
    id = event.target.getAttribute('data-id');

    const title = document.querySelector('#new-post-title');
    const body = document.querySelector('#new-post-body');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    post = await response.json();

    title.value = post.title;
    body.value = post.body;

    createPostBtn.classList.add('hidden');
    updateBtn.classList.remove('hidden');
    deleteBtn.classList.remove('hidden');

  };
};



const updatePostHandle = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#new-post-title').value;
  const body = document.querySelector('#new-post-body').value;

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, body }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to update project');
  }

};

const newFormHandler = async (event) => {
  console.log('hi')
  event.preventDefault();

  const title = document.querySelector('#new-post-title').value;
  const body = document.querySelector('#new-post-body').value;

  if (title && body) {
    const response = await fetch(`/api/posts/`, {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create project');
    }
  };
}



const delButtonHandler = async (event) => {
  event.preventDefault();

  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete post');
  }
};

postButtons.addEventListener('click', editPostHandler);
createPostBtn.addEventListener('click', newFormHandler);
deleteBtn.addEventListener('click', delButtonHandler);
updateBtn.addEventListener('click', updatePostHandle);
