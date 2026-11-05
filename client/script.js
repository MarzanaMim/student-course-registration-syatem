// ===================== AUTH =====================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "login.html";
    });
}

// ===================== LOAD STUDENTS =====================

async function loadStudents() {

    const table = document.getElementById("studentTable");

    if (!table) return;

    const students = await getStudents();

    table.innerHTML = "";

    if (!Array.isArray(students)) return;

    document.getElementById("totalStudents").innerText = students.length;

    students.forEach(student => {

        table.innerHTML += `
        <tr>
            <td>${student.studentName}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>
                <button class="btn btn-sm btn-danger"
                onclick="deleteStudent('${student._id}')">
                Delete
                </button>
            </td>
        </tr>
        `;

    });

}

// ===================== DELETE =====================

async function deleteStudent(id) {

    if (!confirm("Delete this student?")) return;

    await removeStudent(id);

    loadStudents();

}

// ===================== ADD =====================

const addBtn = document.getElementById("addStudentBtn");

if (addBtn) {

    addBtn.addEventListener("click", async () => {

        const studentName = prompt("Student Name");

        if (!studentName) return;

        const studentId = prompt("Student ID");

        if (!studentId) return;

        const email = prompt("Email");

        if (!email) return;

        const course = prompt("Department");

        if (!course) return;

        await addStudent({
            studentName,
            studentId,
            email,
            course
        });

        loadStudents();

    });

}

// ===================== DASHBOARD =====================

document.getElementById("totalCourses").innerText = 0;
document.getElementById("totalRegistrations").innerText = 0;

// ===================== START =====================

loadStudents();