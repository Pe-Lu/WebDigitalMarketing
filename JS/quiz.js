const quizData = [
    {
      question: 'Frage 1',
      options: ['Antwort 1', 'Antwort 2', 'Antwort 3', 'Antwort 4'],
      answer: 'Antwort 1',
    },
    {
      question: 'Frage 2',
      options: ['Antwort 1', 'Antwort 2', 'Antwort 3', 'Antwort 4'],
      answer: 'Antwort 1'
    },
    {
      question: 'Frage 3',
      options: ['Antwort 1', 'Antwort 2', 'Antwort 3', 'Antwort 4'],
      answer: 'Antwort 1'
    },
    {
      question: 'Frage 4',
      options: ['Antwort 1', 'Antwort 2', 'Antwort 3', 'Antwort 4'],
      answer: 'Antwort 1'
    },
    {
      question: 'Frage 5',
      options: ['Antwort 1', 'Antwort 2', 'Antwort 3', 'Antwort 4'],
      answer: 'Antwort 1'
    },
    {
      question: 'Frage 6',
      options: ['Antwort 1', 'Antwort 2', 'Antwort 3', 'Antwort 4'],
      answer: 'Antwort 1'
    },
    {
      question: 'Frage 7',
      options: ['Antwort 1', 'Antwort 2', 'Antwort 3', 'Antwort 4'],
      answer: 'Antwort 1'
    },
    {
      question: 'Frage 8',
      options: ['Antwort 1', 'Antwort 2', 'Antwort 3', 'Antwort 4'],
      answer: 'Antwort 1'
    },
    {
      question: 'Frage 9',
      options: ['Antwort 1', 'Antwort 2', 'Antwort 3', 'Antwort 4'],
      answer: 'Antwort 1'
      ,
    },
    {
      question: 'Frage 10',
      options: ['Antwort 1', 'Antwort 2', 'Antwort 3', 'Antwort 4'],
      answer: 'Antwort 1'
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `Du hast ${score} von ${quizData.length} Punkten!
    Ein Fach aus der Richtung Bioingenieurwissenschaften passt zu ${score/quizData.length*100}% zu dir!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Frage:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Deine Antwort:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Richtige Antwort:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>Du hast ${score} von ${quizData.length} Punkten!
      Ein Fach aus der Richtung Bioingenieurwesen passt zu ${score/quizData.length*100}% zu dir!</p>
      <p>Falsche Antworten:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();