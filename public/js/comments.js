const commentForm = document.querySelector('.comment-form');
//add functionality to submit button
commentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // get comment form content
  const remark = commentForm.querySelector('textarea[name="remark"]').value;
  const blogId = commentForm.querySelector('input[name="blogId"]').value;
console.log(remark, blogId)
  try {
    // send comment to backend
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ remark, blog_id: blogId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // refresh page after submit to autoload new comment
      document.location.reload();

    } else {

      // if nonerror failure show this
      alert('Failed to add thiscomment');
    }
  } catch (err) {
    //display errors
    alert('Failed to add mycomment');
    console.log(err)

  }
});

document.querySelector('#remark').addEventListener('submit', (e) => {
  e.preventDefault();
});