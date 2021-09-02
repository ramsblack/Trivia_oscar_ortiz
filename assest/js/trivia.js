//https://opentdb.com/api.php?amount=""&difficulty=medium&type=multiple
//https://opentdb.com/api_category.php

let mainForm = document.getElementById("Trivia-form");
let fmCategory = document.getElementById("cat-options");
let next = document.getElementById("sig");
let container = document.getElementById("container");
let ul = document.getElementById("res-item");
let qbutton = document.getElementById("q-button");
let correctAnswer;
let score = 0;
let one = 0;
let preguntas;
let answer = new Array();
let categoryL;
let categories;



const categoryList = (consCat) => {
  fetch(consCat)
    .then((response) => response.json())
    .then((resultado) => fetchAPITrivia(resultado.results))
    .catch((error) => console.log(error));
};

const fetchAPITrivia = (e) => {
  e.preventDefault();

  let amount = document.getElementById("trivia-amount").value;
  let dificult = document.getElementById("dificult-select").value;
  let type = document.getElementById("type").value;

  const API = `https://opentdb.com/api.php?amount=${amount}&difficulty=${dificult}&type=${type}`;
  urlAPI(API);
};

const urlAPI = (consAPI) => {
  fetch(consAPI)
    .then((response) => response.json()) // llamamos la api por su url
    .then((resultado) => fllQuestions(resultado.results))
    .catch((error) => console.log(error));
};

const fllQuestions = (qAPI) => {
  preguntas = qAPI;
  mostQuestions();
};

//se consume la api de las categorias

const categoList = async e => {
  e.preventDefault();
  const APICat = `https://opentdb.com/api_category.php`
  console.log(APICat);
};

const listCat = (catList) =>{
  fetch(catList)
  .then((response) => response.json())
  .then((resultado) => fllCategory(resultado))
  .catch((error) => console.log(error));
};

const fllCategory = (lCat) => {
  categories = lCat
  
  //createListCategory();
};



const mostQuestions = () => {
  correctAnswer = preguntas[one].correct_answer; // Acemos que las preguntas se muestren una a una
  answer = organizarList(
    preguntas[one].correct_answer,
    preguntas[one].incorrect_answers
  );

  if (preguntas[one].incorrect_answers.length > 1) {
    container.innerHTML = `
    <h2 class="cont-preg">${preguntas[one].question}</h2>
    <ul class="res-button" id="res-item">
    <li><button class="quest" id="q-button" onClick="checkAnswer(this)">
    ${answer[0]}</button></li>
    <li><button class="quest" id="q-button" onClick="checkAnswer(this)">
    ${answer[1]}</button></li>
    <li><button class="quest" id="q-button" onClick="checkAnswer(this)">
    ${answer[2]}</button></li>
    <li><button class="quest" id="q-button" onClick="checkAnswer(this)">
    ${answer[3]}</button></li>
    </ul>
    `;
  } else {
    container.innerHTML = `
    <h2 class="cont-preg">${preguntas[one].question}</h2>
    <ul class="boo-button" id="res-item">
    <li><button class="quest" id="q-button" onClick="checkAnswer(this)">
    ${answer[0]}</button></li>
    <li><button class="quest" id="q-button" onClick="checkAnswer(this)">
    ${answer[1]}</button></li>
    </ul>
    `;
  };
  organizarList();
};

function organizarList(correct, incorrect)
{
  let arreglo= new Array();
  arreglo.push(correct);
  for(i=0;i<incorrect.length;i++)
        {
            arreglo.push(incorrect[i]);
        }
    return arreglo.sort();
};


const checkAnswer = (button) => {
  if (button.innerText === correctAnswer) {
    score++;

    console.log("Esta bien");
  } else {
    console.log("mal");
  }
  if (preguntas.length - 1 !== one) {
    one++;
    mostQuestions();
  } else {
    alert(`Se acabo el juego su score es ${score}`);
  };
};


mainForm.onsubmit = categoList;
mainForm.onsubmit = fetchAPITrivia;

