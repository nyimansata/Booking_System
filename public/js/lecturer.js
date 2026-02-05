async function loadAppointments() {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/v1/appointments/lecturer", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const appointments = await res.json();
  const container = document.querySelector(".appointment-list");
  container.innerHTML = "";

  appointments.forEach((a) => {
    const card = document.createElement("div");
    card.className = "appointment-card";

    card.innerHTML = `
      <h3>${a.student.Name}</h3>
      <p>${new Date(a.dateTime).toLocaleString()}</p>
      <p>${a.message}</p>
      <p>Status: ${a.status}</p>

      <button onclick="updateStatus('${a._id}', 'approved')">Approve</button>
      <button onclick="updateStatus('${a._id}', 'rejected')">Reject</button>
    `;

    container.appendChild(card);
  });
}

async function updateStatus(id, status) {
  const token = localStorage.getItem("token");

  await fetch(`/api/v1/appointments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  loadAppointments();
}

document.addEventListener("DOMContentLoaded", loadAppointments);
