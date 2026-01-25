// document.addEventListener("DOMContentLoaded", loadTeachers);

// async function loadTeachers() {
//   try {
//     const res = await fetch("http://localhost:5000/api/v1/teachers");
//     const teachers = await res.json();

//     const teacherList = document.getElementById("teacherList");
//     teacherList.innerHTML = "";

//     if (!teachers.length) {
//       teacherList.innerHTML = "<p>No lecturers available</p>";
//       return;
//     }

//     teachers.forEach((teacher) => {
//       const card = document.createElement("div");
//       card.className = "teacher-card";

//       // 🔥 FORMAT DATE PROPERLY
//       const availability = new Date(teacher.dateTime).toLocaleString("en-US", {
//         weekday: "short",
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       });

//       card.innerHTML = `
//         <div class="teacher-info">
//           <img src="/assets/teacher.jpg" alt="Teacher" class="teacher-img" />

//           <div class="teacher-details">
//             <h3>${teacher.name}</h3>
//             <p><strong>Department:</strong> ${teacher.department}</p>
//             <p><strong>Subject:</strong> ${teacher.subject}</p>
//             <p><strong>Availability:</strong> ${availability}</p>
//           </div>
//         </div>

//         <button class="book-btn" onclick="bookLecture('${teacher._id}')">
//           Book Appointment
//         </button>
//       `;

//       teacherList.appendChild(card);
//     });
//   } catch (error) {
//     console.error("Error loading teachers:", error);
//   }
// }

// function bookLecture(id) {
//   alert("Booking lecture ID: " + id);
// }

document.addEventListener("DOMContentLoaded", loadTeachers);

async function loadTeachers() {
  try {
    const res = await fetch("http://localhost:5000/api/v1/teachers");
    const teachers = await res.json();

    const teacherList = document.getElementById("teacherList");
    teacherList.innerHTML = "";

    // ✅ SHOW ONLY APPROVED
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

function bookLecture(id) {
  alert("Booking lecture ID: " + id);
}
