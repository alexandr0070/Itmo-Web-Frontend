document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("table-form");
    const tableContainer = document.getElementById("table-container");
    const saveButton = document.getElementById("save-settings");

    loadSettings();
    loadSchedule();

    saveButton.addEventListener("click", saveSettings);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const weekType = document.getElementById("week-type").value;
        const maxLessons = document.getElementById("max-lessons").value;
        const language = document.getElementById("language").value;

        generateTable(weekType, maxLessons, language);
    });

    function loadSettings() {
        const savedSettings = JSON.parse(localStorage.getItem("scheduleSettings"));
        if (savedSettings) {
            document.getElementById("week-type").value = savedSettings.weekType || "5";
            document.getElementById("max-lessons").value = savedSettings.maxLessons || "6";
            document.getElementById("language").value = savedSettings.language || "en";
        }
    }

    function saveSettings() {
        const weekType = document.getElementById("week-type").value;
        const maxLessons = document.getElementById("max-lessons").value;
        const language = document.getElementById("language").value;

        const settings = { weekType, maxLessons, language };
        localStorage.setItem("scheduleSettings", JSON.stringify(settings));
        alert("Settings saved!");
    }

    function generateTable(weekType, maxLessons, language) {
        tableContainer.innerHTML = "";

        const table = document.createElement("table");
        table.classList.add("schedule-table");

        const days = language === "en"
            ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", ...(weekType === "6" ? ["Saturday"] : [])]
            : ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", ...(weekType === "6" ? ["Суббота"] : [])];

        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `<th>Day</th>` + Array.from({ length: maxLessons }, (_, i) => `<th>Lesson ${i + 1}</th>`).join("");
        table.appendChild(headerRow);

        days.forEach((day) => {
            const row = document.createElement("tr");

            const dayCell = document.createElement("td");
            dayCell.textContent = day;
            row.appendChild(dayCell);

            for (let i = 0; i < maxLessons; i++) {
                const lessonCell = document.createElement("td");
                lessonCell.contentEditable = "true";
                lessonCell.classList.add("editable-cell");

                lessonCell.addEventListener("input", saveSchedule);

                row.appendChild(lessonCell);
            }

            table.appendChild(row);
        });

        tableContainer.appendChild(table);
    }

    function saveSchedule() {
        const rows = tableContainer.querySelectorAll("tr");
        const schedule = Array.from(rows).slice(1).map(row => {
            const cells = row.querySelectorAll("td");
            return Array.from(cells).slice(1).map(cell => cell.textContent.trim());
        });


        localStorage.setItem("savedSchedule", JSON.stringify(schedule));
    }

    function loadSchedule() {
        const savedSchedule = JSON.parse(localStorage.getItem("savedSchedule"));
        if (!savedSchedule) return;

        const weekType = document.getElementById("week-type").value;
        const maxLessons = document.getElementById("max-lessons").value;
        const language = document.getElementById("language").value;

        generateTable(weekType, maxLessons, language);

        const rows = tableContainer.querySelectorAll("tr");
        Array.from(rows).slice(1).forEach((row, rowIndex) => {
            const cells = row.querySelectorAll("td");
            Array.from(cells).slice(1).forEach((cell, cellIndex) => {
                cell.textContent = savedSchedule[rowIndex]?.[cellIndex] || "";
            });
        });
    }
});
