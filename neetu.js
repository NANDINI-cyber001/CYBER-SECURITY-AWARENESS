document.addEventListener('DOMContentLoaded', function() {
    let score = 0;
    const startScreen = document.getElementById("start-screen");
    const gameScreen = document.getElementById("game-screen");
    const endScreen = document.getElementById("end-screen");
    const scoreDisplay = document.getElementById("score");
    const finalScoreDisplay = document.getElementById("final-score");
    const phaseTitle = document.getElementById("phase-title");
    const questionText = document.getElementById("question-text");
    const choicesDiv = document.getElementById("choices");
    
    const phases = {
        ransomware: {
            title: "Ransomware Mission",
            tasks: [
                {
                    question: "A ransomware attack is spreading through the network. What will you do?",
                    choices: [
                        { text: "Scan the network for infected devices", points: 10 },
                        { text: "Shut down all servers", points: -5 },
                        { text: "Ignore the alert", points: -10 }
                    ]
                },
                {
                    question: "You receive a ransom demand. What do you do next?",
                    choices: [
                        { text: "Pay the ransom", points: -10 },
                        { text: "Notify authorities and disconnect the affected systems", points: 10 },
                        { text: "Try to decrypt the files yourself", points: -5 }
                    ]
                },
                {
                    question: "The ransomware has encrypted critical company files. What is your next step?",
                    choices: [
                        { text: "Restore from backups", points: 10 },
                        { text: "Attempt to crack the encryption key", points: -5 },
                        { text: "Reinstall the operating system", points: -10 }
                    ]
                }
            ]
        },
        phishing: {
            title: "Phishing Mission",
            tasks: [
                {
                    question: "A phishing email has been detected. How do you respond?",
                    choices: [
                        { text: "Analyze the email's metadata", points: 10 },
                        { text: "Respond to the email asking for more info", points: -5 },
                        { text: "Ignore the email", points: -10 }
                    ]
                },
                {
                    question: "You discover a spear-phishing attempt targeting your CEO. What action do you take?",
                    choices: [
                        { text: "Alert the CEO and IT department immediately", points: 10 },
                        { text: "Do nothing, it's a harmless email", points: -5 },
                        { text: "Open the email to investigate", points: -10 }
                    ]
                },
                {
                    question: "The phishing email was clicked. What should you do to mitigate the damage?",
                    choices: [
                        { text: "Isolate the infected computer from the network", points: 10 },
                        { text: "Do nothing, the employee is trusted", points: -10 },
                        { text: "Delete the email from the inbox", points: -5 }
                    ]
                }
            ]
        },
        malware: {
            title: "Malware Mission",
            tasks: [
                {
                    question: "You suspect malware in the system. What do you do?",
                    choices: [
                        { text: "Perform a full system scan", points: 10 },
                        { text: "Delete suspicious files", points: -5 },
                        { text: "Manually inspect running processes", points: 0 }
                    ]
                },
                {
                    question: "The malware has infected multiple systems. What is your next step?",
                    choices: [
                        { text: "Isolate the infected systems and block external connections", points: 10 },
                        { text: "Attempt to clean the systems manually", points: -5 },
                        { text: "Ignore the issue and hope it resolves itself", points: -10 }
                    ]
                },
                {
                    question: "The malware is a Trojan horse, and it's stealing data. What do you do?",
                    choices: [
                        { text: "Install antivirus software and run a deep scan", points: 10 },
                        { text: "Disconnect the systems from the network", points: 5 },
                        { text: "Shut down the network completely", points: -5 }
                    ]
                }
            ]
        }
    };
    
    // Starts the game for the selected phase
    function startGame(phase) {
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        currentTaskIndex = 0;  // Reset task index
        startScreen.style.display = "none"; // Hide the start screen
        gameScreen.style.display = "block"; // Show the game screen
    
        const currentPhase = phases[phase];
        phaseTitle.textContent = currentPhase.title;
    
        displayTask(currentPhase, currentTaskIndex);
    }
    
    // Displays the next task in the phase
    let currentTaskIndex = 0;
    
    function displayTask(phase, taskIndex) {
        if (taskIndex < phase.tasks.length) {
            const task = phase.tasks[taskIndex];
            questionText.textContent = task.question;
    
            choicesDiv.innerHTML = "";
            task.choices.forEach((choice) => {
                const button = document.createElement("button");
                button.textContent = choice.text;
                button.onclick = () => makeChoice(choice.points, phase, taskIndex);
                choicesDiv.appendChild(button);
            });
        } else {
            endGame();
        }
    }
    
    // Handles the choice selection and updates the score
    function makeChoice(points, phase, taskIndex) {
        score += points;
        scoreDisplay.textContent = `Score: ${score}`;
    
        // Move to the next task in the phase
        currentTaskIndex++;
        displayTask(phase, currentTaskIndex);
    }
    
    // Ends the game and shows the final score
    function endGame() {
        gameScreen.style.display = "none"; // Hide the game screen
        endScreen.style.display = "block"; // Show the end screen
        finalScoreDisplay.textContent = `Your final score: ${score}`;
    }
    
    // Event listeners for the buttons on the start screen
    document.getElementById("ransomware-btn").onclick = () => startGame("ransomware");
    document.getElementById("phishing-btn").onclick = () => startGame("phishing");
    document.getElementById("malware-btn").onclick = () => startGame("malware");
    
    // Event listener for the "Play Again" button
    document.getElementById("play-again-btn").onclick = () => {
        // Reset score and task index
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        currentTaskIndex = 0;
    
        // Hide the end screen and show the start screen
        endScreen.style.display = "none";
        startScreen.style.display = "block";
    };
});