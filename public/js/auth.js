const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const Email = form.Email.value;
  const Password = form.Password.value;

  try {
    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email, Password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);

    // ROLE-BASED NAVIGATION
    if (data.role === "Admin") {
      window.location.href = "/admin";
    } else if (data.role === "Student") {
      window.location.href = "/student";
    } else if (data.role === "Lecturer") {
      window.location.href = "/lecturer";
    }
  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
});
