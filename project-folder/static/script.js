console.log("JavaScript Loaded!");  // Debugging to check if script loads

function getCourses() {
    console.log("Fetching courses...");

    const skillLevel = document.getElementById("skillLevel").value;

    fetch("/get_courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill_level: skillLevel })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Courses received:", data);
        displayCourses(data.recommended_courses);
    })
    .catch(error => {
        console.error("Error fetching courses:", error);
    });
}

function displayCourses(courses) {
    const coursesDiv = document.getElementById("courses");
    coursesDiv.innerHTML = "<h2>Recommended Courses:</h2><ul>" +
        courses.map(course => `
            <li>${course} 
                <button onclick="downloadFile('${course}')">Download</button>
            </li>`).join('') +
        "</ul>";
}

function downloadFile(courseName) {
    console.log("Downloading:", courseName);
    const encodedCourse = encodeURIComponent(courseName);

  fetch(`/download/${encodedCourse}`)
    .then(response => response.json())
    .then(data => {
        if (data.file_url) {
            window.location.href = data.file_url;  // Redirect user to the file
        } else {
            alert("File not found!");
        }
    })
        .catch(error => {
            console.error("Error downloading file:", error);
        });
}
