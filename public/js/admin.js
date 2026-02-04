const form = document.getElementById("lectureForm");
let editingLecturerId = null;

/* ---------------- ADD LECTURER ---------------- */
// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const data = {
//     name: form.querySelector("input[type='text']").value,
//     email: form.querySelector("input[type='email']").value,
//     department: form.querySelectorAll("input[type='text']")[1].value,
//     subject: form.querySelectorAll("input[type='text']")[2].value,
//     dateTime: form.querySelector("input[type='datetime-local']").value,
//   };

//   const res = await fetch("http://localhost:5000/api/v1/teachers", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

//   if (res.ok) {
//     alert("Lecture added successfully");
//     form.reset();
//     loadLecturers();
//   }
// });

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.querySelector("input[type='text']").value,
    email: form.querySelector("input[type='email']").value,
    department: form.querySelectorAll("input[type='text']")[1].value,
    subject: form.querySelectorAll("input[type='text']")[2].value,
    dateTime: form.querySelector("input[type='datetime-local']").value,
  };

  const url = editingLecturerId
    ? `http://localhost:5000/api/v1/teachers/${editingLecturerId}`
    : "http://localhost:5000/api/v1/teachers";

  const method = editingLecturerId ? "PATCH" : "POST";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    alert(
      editingLecturerId
        ? "Lecturer updated successfully"
        : "Lecture added successfully ",
    );

    form.reset();
    editingLecturerId = null;
    form.querySelector("button[type='submit']").textContent = "Add Lecturer";

    loadLecturers();
  }
});

/* ---------------- LOAD PENDING LECTURERS ---------------- */
document.addEventListener("DOMContentLoaded", loadLecturers);

async function loadLecturers() {
  const res = await fetch("http://localhost:5000/api/v1/teachers");
  const lecturers = await res.json();

  const pendingList = document.getElementById("pendingList");
  pendingList.innerHTML = "";

  const pendingLecturers = lecturers.filter((lec) => !lec.approved);

  if (!pendingLecturers.length) {
    pendingList.innerHTML = "<p>No pending lecturers</p>";
    return;
  }

  pendingLecturers.forEach((lec) => {
    const card = document.createElement("div");
    card.className = "pending-card";

    card.innerHTML = `
  <div class="card-header">
    <h3>${lec.name}</h3>
    <span class="badge pending">Pending</span>
  </div>

  <div class="card-body">
    <p><strong>Email:</strong> ${lec.email}</p>
    <p><strong>Department:</strong> ${lec.department}</p>
    <p><strong>Subject:</strong> ${lec.subject}</p>
    <p><strong>Available At:</strong> ${new Date(lec.dateTime).toLocaleString()}</p>
  </div>

  <div class="card-actions">
    <button class="btn approve" onclick="approveLecturer('${lec._id}')">Approve</button>
    <button class="btn edit" onclick="editLecturer('${lec._id}')">Edit</button>
    <button class="btn delete" onclick="deleteLecturer('${lec._id}')">Delete</button>
  </div>
`;

    pendingList.appendChild(card);
  });
}

/* ---------------- APPROVE LECTURER ---------------- */
async function approveLecturer(id) {
  console.log("Approving:", id);

  const res = await fetch(`http://localhost:5000/api/v1/teachers/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ approved: true }),
  });

  if (res.ok) {
    alert("Lecturer approved");
    loadLecturers();
  }
}

/* ---------------- DELETE LECTURER ---------------- */
async function deleteLecturer(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this lecturer?",
  );

  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:5000/api/v1/teachers/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const err = await res.text();
      alert(err);
      return;
    }

    alert("Lecturer deleted");
    loadLecturers();
  } catch (error) {
    console.error("Delete failed:", error);
  }
}

/* ---------------- EDIT LECTURER ---------------- */
async function editLecturer(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/teachers/${id}`);
    const lecturer = await res.json();

    // Fill form inputs
    form.querySelector("input[type='text']").value = lecturer.name;
    form.querySelector("input[type='email']").value = lecturer.email;
    form.querySelectorAll("input[type='text']")[1].value = lecturer.department;
    form.querySelectorAll("input[type='text']")[2].value = lecturer.subject;
    form.querySelector("input[type='datetime-local']").value =
      lecturer.dateTime.slice(0, 16);

    // Switch to edit mode
    // editingLecturerId = id;
    // form.querySelector("button[type='submit']").textContent = "Update Lecturer";
    editingLecturerId = id;
    form.querySelector("button[type='submit']").textContent = "Update Lecturer";

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error("Failed to load lecturer for edit:", error);
  }
}

// logout function
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  window.location.href = "/";
};

window.approveLecturer = approveLecturer;
window.deleteLecturer = deleteLecturer;
window.editLecturer = editLecturer;
window.logout = logout;
