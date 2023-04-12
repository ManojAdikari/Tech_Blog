// Login form handler function
async function login_to_system(event) {
  event.preventDefault();

  const email = document.querySelector("#yourUsername").value.trim();
  const password = document.querySelector("#yourPassword").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

// Signup form handler function
async function SignUp_New_USer(event) {
  event.preventDefault();

  const name = document.querySelector("#yourName").value.trim();
  const email = document.querySelector("#yourEmail").value.trim();
  const password = document.querySelector("#yourPassword").value.trim();

  if (name && email && password) {
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("success");
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}


if(document.location.pathname=="/registeraccount")
{
  document.querySelector("#signup-form")
  .addEventListener("submit", SignUp_New_USer);
}
if(document.location.pathname=="/login")
{
  document.querySelector("#login-form")
  .addEventListener("submit", login_to_system);
}
