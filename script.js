// Fetch weather data from OpenWeatherMap API
function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = '7aa51698d25bb176003c74356496affe';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherDetails = `
        <h2>${data.name}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].main}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      `;
      document.getElementById('weatherInfo').innerHTML = weatherDetails;
    })
    .catch(error => {
      document.getElementById('weatherInfo').innerHTML = '<p>City not found. Try again.</p>';
    });
}

// Image Carousel
const images = [
'https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D' ,
 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1675827055668-2dae1b8ac181?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1561471026-0bbb77535d25?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D',
  'https://media.istockphoto.com/id/2178662971/photo/snow-covered-branches-of-the-pine-trees-in-the-winter-mountain-forest-winter-nature-landscape.webp?a=1&b=1&s=612x612&w=0&k=20&c=HoB0tHdrjMbLKO7Wltic3aKGa2XFHrPpIKQJEEo5HRQ='

];


let currentIndex = 0;

function showImage(index) {
  const img = document.getElementById('carouselImage');
  img.src = images[index];
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

showImage(currentIndex);




// Quiz 
const quizQuestions = [
  {
    question: "What instrument is used to measure temperature?",
    options: ["Thermometer", "Barometer", "Anemometer"],
    correct: "Thermometer"
  },
  {
    question: "Which gas is most abundant in the Earth’s atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide"],
    correct: "Nitrogen"
  },
  {
    question: "What type of cloud produces thunderstorms?",
    options: ["Cumulonimbus", "Cirrus", "Stratus"],
    correct: "Cumulonimbus"
  },
  {
    question: "Which scale is used to measure hurricane intensity?",
    options: ["Richter Scale", "Beaufort Scale", "Saffir-Simpson Scale"],
    correct: "Saffir-Simpson Scale"
  }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  const quizContainer = document.getElementById("quiz-container");
  const questionData = quizQuestions[currentQuestionIndex];
  
  let optionsHTML = "";
  questionData.options.forEach(option => {
    optionsHTML += `<label><input type="radio" name="option" value="${option}"> ${option}</label><br>`;
  });

  quizContainer.innerHTML = `
    <p><strong>Q${currentQuestionIndex + 1}: ${questionData.question}</strong></p>
    ${optionsHTML}
  `;
  document.getElementById("quiz-result").textContent = "";
}

function nextQuestion() {
  const selectedOption = document.querySelector('input[name="option"]:checked');

  if (!selectedOption) {
    alert("Please select an option!");
    return;
  }

  const answer = selectedOption.value;
  if (answer === quizQuestions[currentQuestionIndex].correct) {
    score++;
    document.getElementById("quiz-result").textContent = "✅ Correct!";
  } else {
    document.getElementById("quiz-result").textContent = `❌ Incorrect! Correct Answer: ${quizQuestions[currentQuestionIndex].correct}`;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    setTimeout(loadQuestion, 1000);
  } else {
    setTimeout(() => {
      document.getElementById("quiz-container").innerHTML = `<h3>Your Final Score: ${score} / ${quizQuestions.length}</h3>`;
      document.getElementById("quiz-result").textContent = "";
      document.querySelector('.quiz-section button').style.display = "none";
    }, 1000);
  }
}


loadQuestion();
