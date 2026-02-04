// logout function
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  window.location.href = "/";
};

window.logout = logout;
