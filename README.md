# Quiz Application
 
A browser-based interactive quiz application built as a web development assignment to demonstrate conceptual understanding of HTML, CSS, and JavaScript.
 
---
 
## Objective
 
To build an interactive multiple-choice quiz that demonstrates core front-end web development concepts including DOM manipulation, event handling, timer logic, score calculation, and responsive design — all within a single HTML file without any frameworks or external dependencies.
 
---
 
## Technologies Used
 
| Technology | Purpose |
|---|---|
| HTML5 | Page structure, screen sections, button elements |
| CSS3 | Layout, responsive design, visual state styling |
| JavaScript (Vanilla) | DOM manipulation, timer, score logic, interactivity |
 
---
 
## Features Implemented
 
- **Multiple-Choice Questions** — 5 questions with 4 options each, rendered dynamically from a JavaScript data array. Correct answers highlight green; wrong answers highlight red, with an explanation shown after each selection.
- **Score Calculation** — Score increments on each correct answer and is displayed at the end as `X / 5` along with a percentage and a performance message.
- **Timer Functionality** — A 15-second countdown per question using `setInterval`. The timer badge turns red when 5 or fewer seconds remain. On timeout, the correct answer is revealed automatically.
- **Progress Tracking** — A progress bar fills as questions are answered. A counter shows the current position (e.g., Question 2 of 5).
- **Final Results Screen** — Displays the score, percentage, and contextual feedback. A Try Again button resets the app to the start screen.
- **Responsive Design** —  layout using Flexbox, `clamp()` for scalable font sizes, and a media query for mobile screens (max-width: 480px).
---
 
## Project Structure
 
The entire application is a single self-contained file:
 
```
quiz-app.html
├── <style>   — CSS: layout, responsive rules, state classes
├── HTML      — Three screen divs: Start, Quiz, Results
└── <script>  — JS: data array, state variables, all logic
```
 
---
 
## Steps to Run the Application
 
### Option 1 — Open Directly (Simplest)
 
1. Download or save `quiz-app.html` to your computer.
2. Double-click the file to open it in your browser.
3. Click **Start Quiz** to begin.
### Option 2 — VS Code Live Server
 
1. Open the project folder in Visual Studio Code.
2. Install the **Live Server** extension if not already installed.
3. Right-click `quiz-app.html` in the Explorer panel.
4. Select **Open with Live Server**.
5. The app will open at `http://127.0.0.1:5500/quiz-app.html`.
