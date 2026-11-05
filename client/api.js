const BASE_URL = "http://localhost:5000/api";

const token = localStorage.getItem("token");

// ================= LOGIN =================

async function loginUser(data) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return await res.json();
}

// ================= SIGNUP =================

async function signupUser(data) {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return await res.json();
}

// ================= GET STUDENTS =================

async function getStudents() {

    const res = await fetch(`${BASE_URL}/students`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return await res.json();
}

// ================= ADD STUDENT =================

async function addStudent(data) {

    const res = await fetch(`${BASE_URL}/students`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify(data)

    });

    return await res.json();

}

// ================= UPDATE STUDENT =================

async function editStudent(id, data) {

    const res = await fetch(`${BASE_URL}/students/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify(data)

    });

    return await res.json();

}

// ================= DELETE STUDENT =================

async function removeStudent(id) {

    const res = await fetch(`${BASE_URL}/students/${id}`, {

        method: "DELETE",

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    return await res.json();

}