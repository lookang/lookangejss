// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Google Analytics initialization
    // Added as requested in the user instructions
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-S9EWRY1CPJ');
    
    // Get DOM elements
    const modal = document.getElementById('infoModal');
    const closeBtn = document.querySelector('.close-btn');
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    // Quiz elements
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const scoreContainer = document.getElementById('score-container');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restart-btn');
    
    // Reflection elements
    const saveReflectionBtn = document.getElementById('save-reflection');
    const reflectionText = document.getElementById('reflection-text');
    const savedMessage = document.getElementById('saved-message');
    
    // Event information for modals
    const eventInfo = {
        lastSupper: {
            title: "The Last Supper",
            content: `
                <p>The Last Supper was the final meal Jesus shared with his apostles in Jerusalem before his crucifixion. During this meal, several significant events took place:</p>
                <ul>
                    <li>Jesus washed the disciples' feet, teaching them about humility and service</li>
                    <li>He predicted his betrayal by Judas Iscariot</li>
                    <li>He established the Eucharist (Communion), instructing his followers to remember him by sharing bread and wine</li>
                    <li>He gave his disciples a new commandment to love one another</li>
                </ul>
                <p>This event is commemorated on Holy Thursday, the day before Good Friday, but it sets the stage for the events that follow.</p>
                <p>Biblical reference: Matthew 26:17-30, Mark 14:12-26, Luke 22:7-39, John 13:1-17:26</p>
            `
        },
        gethsemane: {
            title: "Garden of Gethsemane",
            content: `
                <p>After the Last Supper, Jesus and his disciples went to the Garden of Gethsemane on the Mount of Olives. This was a pivotal moment in Jesus's journey:</p>
                <ul>
                    <li>Jesus prayed intensely, asking God if there was another way, but ultimately submitting to God's will</li>
                    <li>He experienced great anguish, even sweating drops like blood</li>
                    <li>The disciples fell asleep despite Jesus asking them to keep watch</li>
                    <li>Judas arrived with soldiers and identified Jesus with a kiss, leading to his arrest</li>
                </ul>
                <p>This moment shows both Jesus's human struggle and his divine obedience to God's plan.</p>
                <p>Biblical reference: Matthew 26:36-56, Mark 14:32-52, Luke 22:39-53, John 18:1-11</p>
            `
        },
        trial: {
            title: "The Trial of Jesus",
            content: `
                <p>After his arrest, Jesus faced a series of trials before different authorities:</p>
                <ul>
                    <li>First, he was taken to Annas, a former high priest</li>
                    <li>Then to Caiaphas, the current high priest, and the Sanhedrin (Jewish council)</li>
                    <li>He was accused of blasphemy for claiming to be the Son of God</li>
                    <li>Early Friday morning, he was taken to Pontius Pilate, the Roman governor</li>
                    <li>Pilate sent him to Herod Antipas, who returned him to Pilate</li>
                    <li>Though Pilate found no fault in Jesus, he gave in to the crowd's demands for crucifixion</li>
                </ul>
                <p>During this time, Peter denied knowing Jesus three times, as Jesus had predicted.</p>
                <p>Biblical reference: Matthew 26:57-27:26, Mark 14:53-15:15, Luke 22:54-23:25, John 18:12-19:16</p>
            `
        },
        crucifixion: {
            title: "The Crucifixion",
            content: `
                <p>The crucifixion is the central event of Good Friday and the Christian faith:</p>
                <ul>
                    <li>Jesus was forced to carry his cross to Golgotha (the "place of the skull")</li>
                    <li>He was nailed to the cross between two criminals</li>
                    <li>From the cross, Jesus spoke seven times, including "Father, forgive them" and "It is finished"</li>
                    <li>Darkness covered the land from noon until 3 PM</li>
                    <li>At his death, the temple curtain tore from top to bottom, symbolizing new access to God</li>
                    <li>Jesus was buried before sunset in a new tomb provided by Joseph of Arimathea</li>
                </ul>
                <p>Christians believe Jesus's death was the ultimate sacrifice that atoned for humanity's sins.</p>
                <p>Biblical reference: Matthew 27:32-66, Mark 15:21-47, Luke 23:26-56, John 19:17-42</p>
            `
        }
    };
    
    // Quiz questions
    const questions = [
        {
            question: "What did Jesus establish during the Last Supper?",
            answers: [
                { text: "The Eucharist (Communion)", correct: true },
                { text: "Baptism", correct: false },
                { text: "Marriage", correct: false },
                { text: "Confession", correct: false }
            ]
        },
        {
            question: "Where did Jesus pray before his arrest?",
            answers: [
                { text: "Mount Sinai", correct: false },
                { text: "Garden of Eden", correct: false },
                { text: "Garden of Gethsemane", correct: true },
                { text: "Temple of Jerusalem", correct: false }
            ]
        },
        {
            question: "Who denied knowing Jesus three times?",
            answers: [
                { text: "John", correct: false },
                { text: "Peter", correct: true },
                { text: "Judas", correct: false },
                { text: "Thomas", correct: false }
            ]
        },
        {
            question: "Who was the Roman governor who sentenced Jesus to crucifixion?",
            answers: [
                { text: "Herod", correct: false },
                { text: "Caesar", correct: false },
                { text: "Pontius Pilate", correct: true },
                { text: "Caiaphas", correct: false }
            ]
        },
        {
            question: "What happened in the temple at the moment of Jesus's death?",
            answers: [
                { text: "The curtain tore from top to bottom", correct: true },
                { text: "The altar crumbled", correct: false },
                { text: "The priests converted", correct: false },
                { text: "The candles went out", correct: false }
            ]
        }
    ];
    
    // Modal functionality
    // Show modal with event information when "Learn More" is clicked
    learnMoreBtns.forEach(button => {
        button.addEventListener('click', function() {
            const eventType = this.getAttribute('data-event');
            const info = eventInfo[eventType];
            
            modalTitle.textContent = info.title;
            modalContent.innerHTML = info.content;
            modal.style.display = 'block';
        });
    });
    
    // Close modal when the X is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
    
    // Quiz functionality
    let shuffledQuestions, currentQuestionIndex, score;
    
    // Start the quiz when the start button is clicked
    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    restartButton.addEventListener('click', startQuiz);
    
    // Initialize the quiz
    function startQuiz() {
        startButton.classList.add('hide');
        scoreContainer.classList.add('hide');
        score = 0;
        
        // Shuffle questions for variety
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        questionContainer.classList.remove('hide');
        setNextQuestion();
    }
    
    // Set up the next question
    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }
    
    // Display the current question and its answer options
    function showQuestion(question) {
        questionText.innerText = question.question;
        
        // Create buttons for each answer option
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }
    
    // Reset the question container for the next question
    function resetState() {
        clearStatusClass(document.body);
        nextButton.classList.add('hide');
        
        // Remove all existing answer buttons
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }
    
    // Handle when an answer is selected
    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        
        // Update score if answer is correct
        if (correct) {
            score++;
        }
        
        // Apply styling based on whether answer is correct or wrong
        setStatusClass(document.body, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
        });
        
        // Show next button or end quiz if all questions answered
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            startButton.innerText = 'Restart';
            startButton.classList.remove('hide');
            
            // Show final score
            questionContainer.classList.add('hide');
            scoreElement.innerText = score;
            scoreContainer.classList.remove('hide');
        }
    }
    
    // Apply correct/wrong styling to elements
    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }
    
    // Remove correct/wrong styling
    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }
    
    // Reflection functionality
    // Save reflection to localStorage when button is clicked
    saveReflectionBtn.addEventListener('click', function() {
        const reflection = reflectionText.value;
        
        if (reflection.trim() !== '') {
            // Save to localStorage (will persist between sessions)
            localStorage.setItem('goodFridayReflection', reflection);
            
            // Show saved message
            savedMessage.classList.remove('hide');
            
            // Hide message after 3 seconds
            setTimeout(() => {
                savedMessage.classList.add('hide');
            }, 3000);
        }
    });
    
    // Load any previously saved reflection from localStorage
    if (localStorage.getItem('goodFridayReflection')) {
        reflectionText.value = localStorage.getItem('goodFridayReflection');
    }
});