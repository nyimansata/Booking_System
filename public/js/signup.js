const form = document.getElementById("signupForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const Name = form.Name.value;
  const Email = form.Email.value;
  const Password = form.Password.value;
  const role = form.role.value;

  try {
    const res = await fetch("/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Name, Email, Password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    // save token
    localStorage.setItem("token", data.token);

    // redirect by role
    if (role === "Admin") window.location.href = "/admin";
    if (role === "Student") window.location.href = "/student";
    if (role === "Lecturer") window.location.href = "/lecturer";
  } catch (err) {
    alert("Signup failed");
  }
});
