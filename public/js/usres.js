// Signup form handler function
async function SignUp_New_USer(event) {
  event.preventDefault();

  const name = document.querySelector("#yourName").value.trim();
  const email = document.querySelector("#yourEmail").value.trim();
  const password = document.querySelector("#yourPassword").value.trim();
  if (password.trim().length >= 8) {
    if (name && email && password) {

      const response = await fetch("/controllers/user_Register", {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });


      if (response.ok) {
        console.log("success");
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
  }
  else {
    alert("Password must be between 8 and 20 characters long");
  }
}


document.querySelector("#signup-form")
  .addEventListener("submit", SignUp_New_USer);