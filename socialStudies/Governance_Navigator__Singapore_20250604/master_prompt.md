# Master Prompt for Governance Navigator: Singapore Quiz Game

Create a simple, interactive web-based quiz game titled "Governance Navigator: Singapore" that teaches users about the three branches of government in Singapore: Legislature, Executive, and Judiciary.

The game should have the following features:

1.  **Main Menu Screen:**
    *   A prominent title: "Singapore's branches of government and their functions".
    *   Buttons for each branch: "Legislature", "Executive", "Judiciary".
    *   A "Final Review Quiz" button.

2.  **Branch Exploration Screen (for each branch):**
    *   Displays the name of the selected branch.
    *   Shows information about the branch's composition and function. This information should be presented clearly, possibly using a simple infographic style or distinct panels.
        *   **Legislature:**
            *   Composition: President, Parliament
            *   Function: Makes and passes laws
        *   **Executive:**
            *   Composition: President, Cabinet (led by the Prime Minister)
            *   Function: Enforces and implements laws passed by the Legislature. Formulates and implements government policies. Responsible for day-to-day administration.
        *   **Judiciary:**
            *   Composition: Supreme Court, State Courts and Family Justice Courts
            *   Function: Administers justice by interpreting and applying laws. Makes formal judgements on disputes.
    *   After viewing the information, the user should be presented with a question about the branch's composition, followed by a scenario-based question about its function.
    *   Provide immediate feedback (correct/incorrect) for each answer.
    *   A "Next" button to proceed through the phases (composition to function, then back to main menu).

3.  **Final Review Quiz Screen:**
    *   A multi-question quiz covering all three branches and general concepts.
    *   Questions should include:
        *   Matching primary function to the correct branch (e.g., "Makes and passes laws" -> Legislature).
        *   A question about the limitation of power (e.g., "Do the three branches of government have unlimited power...?").
    *   Display the user's score.
    *   Provide immediate feedback for each answer.
    *   A "Next Question" button to advance.
    *   A "Back to Menu" button at the end of the quiz.

**Technical Requirements:**

*   Use HTML for structure, CSS for styling, and JavaScript for interactivity.
*   Ensure a clean, user-friendly interface.
*   Implement responsive design principles (though a simple layout is sufficient).
*   The main title bar should be hidden to save space.
*   The "submit-branch-answer" button should have a more visible color (e.g., blue).
*   The "next-phase-button" should be visible and have a distinct color (e.g., green).

**Files to be created:**

*   `index.html`
*   `styles.css`
*   `script.js`
