document.addEventListener("DOMContentLoaded", loadTeachers);

async function loadTeachers() {
  try {
    const res = await fetch("http://localhost:5000/api/v1/teachers");
    const teachers = await res.json();

    const teacherList = document.getElementById("teacherList");
    teacherList.innerHTML = "";

    // SHOW ONLY APPROVED
    const approvedTeachers = teachers.filter((t) => t.approved === true);

    if (!approvedTeachers.length) {
      teacherList.innerHTML = "<p>No approved lecturers available</p>";
      return;
    }

    approvedTeachers.forEach((teacher) => {
      const card = document.createElement("div");
      card.className = "teacher-card";

      const availability = new Date(teacher.dateTime).toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      card.innerHTML = `
        <div class="teacher-info">
          <img src="/assets/teacher.jpg" class="teacher-img" />

          <div class="teacher-details">
            <h3>${teacher.name}</h3>
            <p><strong>Department:</strong> ${teacher.department}</p>
            <p><strong>Subject:</strong> ${teacher.subject}</p>
            <p><strong>Availability:</strong> ${availability}</p>
          </div>
        </div>

        <button class="book-btn" onclick="bookLecture('${teacher._id}')">
          Book Appointment
        </button>
      `;

      teacherList.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading teachers:", error);
  }
}

// logout function
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  window.location.href = "/";
};

window.logout = logout;

// modal handling

let selectedLecturerId = null;
const token = localStorage.getItem("token");

function bookLecture(id) {
  selectedLecturerId = id;
  document.getElementById("bookingModal").style.display = "block";
}

function closeModal() {
  document.getElementById("bookingModal").style.display = "none";
}

async function submitAppointment() {
  const dateTime = document.getElementById("appointmentDate").value;
  const message = document.getElementById("appointmentMessage").value;

  if (!dateTime || !message) {
    alert("Please fill all fields");
    return;
  }

  const res = await fetch("/api/v1/appointments/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      lecturerId: selectedLecturerId,
      dateTime,
      message,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    alert(err.message || "Something went wrong");
    return;
  }

  alert("Appointment sent");
  closeModal();
}
