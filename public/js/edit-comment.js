document.querySelectorAll(".edit-comment").forEach((button) => {
  button.addEventListener("click", (event) => {
    const commentId = event.target.dataset.commentId;
    const commentElement = event.target.closest("li");
    const commentText = commentElement.querySelector(".col").innerText.trim();

    const editCommentModal = document.querySelector("#edit-comment-modal");
    editCommentModal.querySelector("#edit-comment-id").value = commentId;
    editCommentModal.querySelector("#edit-comment-body").value = commentText;
  });
});

document
  .querySelector("#edit-comment-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const commentId = event.target.elements.comment_id.value;
    const newCommentText = event.target.elements.edit_comment_body.value;

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_text: newCommentText }),
      });

      if (!response.ok) {
        alert("can not edit  comment");
        throw new Error(`Failed to update the comment: ${response.statusText}`);
      }

      // After the server updates the comment, update the comment text in the DOM.
      const commentElement = document
        .querySelector(`[data-comment-id="${commentId}"]`)
        .closest("li");
      commentElement.querySelector(".col").innerText = newCommentText;
    } catch (error) {
      console.error(`Error updating the comment: ${error.message}`);
    }
  });
