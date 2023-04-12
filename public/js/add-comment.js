
const addCommentHandler = async (event) => {
  event.preventDefault();

  console.log("addCommentHandler triggered");

  const comment_text = document.querySelector("#comment-body").value.trim();
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (comment_text) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        comment_text,
        post_id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/post/" + post_id);
    } else {
      alert(response.statusText);
    }
  }
};
document
  .querySelector("#add-comment-form")
  .addEventListener("submit", addCommentHandler);
