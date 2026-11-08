async function getCases() {
    const response = await fetch("data/cases.json");

    if (!response.ok) {
        throw new Error("Unable to load civic cases.");
    }

    return await response.json();
}


async function loadCases() {

    const casesSection = document.getElementById("cases");
    const casesContainer = document.getElementById("casesContainer");

    casesSection.classList.remove("hidden");

    casesSection.scrollIntoView({
        behavior: "smooth"
    });

    try {

        const cases = await getCases();

        casesContainer.innerHTML = "";

        cases.forEach(function (civicCase) {

            const card = document.createElement("div");

            card.className = "case-card";

            card.innerHTML = `
                <h3>${civicCase.problem}</h3>

                <p>
                    <strong>Location:</strong>
                    ${civicCase.location}
                </p>

                <p>
                    <strong>Before:</strong>
                    ${civicCase.before}
                </p>

                <p>
                    <strong>Action:</strong>
                    ${civicCase.action}
                </p>

                <p>
                    <strong>Expected:</strong>
                    ${civicCase.expected}
                </p>

                <p>
                    <strong>Actual:</strong>
                    ${civicCase.after}
                </p>

                <button onclick="verifyCase(${civicCase.id})">
                    Verify Fix
                </button>
            `;

            casesContainer.appendChild(card);
        });

    } catch (error) {

        casesContainer.innerHTML =
            "<p>Unable to load civic cases.</p>";

        console.error(error);
    }
}


async function verifyCase(caseId) {

    try {

        const cases = await getCases();

        const selectedCase = cases.find(function (civicCase) {

            return civicCase.id === caseId;

        });

        if (!selectedCase) {
            return;
        }

        const resultSection =
            document.getElementById("resultSection");

        const resultContainer =
            document.getElementById("resultContainer");

        resultSection.classList.remove("hidden");

        const resultClass =
            selectedCase.status === "FIX-FAIL"
                ? "result-fail"
                : "result-verified";

        resultContainer.innerHTML = `

            <div class="result-card ${resultClass}">

                <div class="result-status">
                    ${selectedCase.status}
                </div>

                <div class="result-row">
                    <span class="result-label">Problem:</span>
                    ${selectedCase.problem}
                </div>

                <div class="result-row">
                    <span class="result-label">Before:</span>
                    ${selectedCase.before}
                </div>

                <div class="result-row">
                    <span class="result-label">Action:</span>
                    ${selectedCase.action}
                </div>

                <div class="result-row">
                    <span class="result-label">Expected outcome:</span>
                    ${selectedCase.expected}
                </div>

                <div class="result-row">
                    <span class="result-label">Actual outcome:</span>
                    ${selectedCase.after}
                </div>

                <div class="result-row">
                    <span class="result-label">Analysis:</span>
                    ${selectedCase.reason}
                </div>

                <div class="next-action">
                    <strong>Recommended next action</strong>
                    <p>${selectedCase.recommendation}</p>
                </div>

            </div>
        `;

        resultSection.scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {

        console.error(error);

    }
}