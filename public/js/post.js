const commentBtn = document.querySelector('#comment-btn');

const commentFormHandler = async (event) => {
    event.preventDefault();
    
    const body = document.querySelector('#new-comment').value.trim();
    const post_id = document.querySelector('#new-comment').getAttribute('data-id');

    if (body && post_id) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({body, post_id}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/post/${post_id}`)
            console.log('comment added succesfully!')
        } else {
            alert(response.statusText);
        }
    };
};


commentBtn.addEventListener('click', commentFormHandler);



