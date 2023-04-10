const logout = async () => {
  const response = await fetch("/controllers/user_Register/logout", {
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
  };
  
  document.querySelector('#logout').addEventListener('click', logout);