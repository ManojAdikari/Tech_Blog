const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) {
    alert("Please fill in both fields");
    return;
  }

  const response = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({ title, content }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to create a new post");
  }
};

document
  .getElementById("new-post-form")
  .addEventListener("submit", newPostHandler);
