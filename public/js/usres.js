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

async function login_to_system(event) {
  event.preventDefault();

  const email = document.querySelector("#yourUsername").value.trim();
  const password = document.querySelector("#yourPassword").value.trim();

  if (email && password) {
    const response = await fetch("/controllers/user_login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
     
     // req.session.logged_in = true;
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