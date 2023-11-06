let letters = document.querySelector(".letters");
let ch = "";
for (let i = 65; i < 91; i++) {
letters.innerHTML += `<span class="letter"> ${String.fromCharCode(
  i
)} </span>`;
}

let tab = []
fetch('./country.json')
  .then(response => response.json())
  .then(data => {
    // console.log(data)
    tab.push(data)
    tab.forEach((el,i)=>{
      hangman(el[Math.ceil(Math.random() * 66)])
    })
  })
  .catch(error => console.log("Error:", error));
// hagman

function hangman(country) {
document.querySelector(".guess").innerHTML = `<span>country start with :&nbsp;</span>
<span>${country[0].toUpperCase()}__
${country[Math.ceil(Math.random() * (country.length - 1))].toUpperCase() === country[country.length -1].toUpperCase() ? country[country.length -1].toUpperCase(): country[Math.ceil(Math.random() * (country.length - 1))].toUpperCase()+"__"} </span>`;
let letter = document.querySelectorAll(".letter");
let word = document.querySelector(".word");
for (let i = 0; i < country.length; i++) {
  word.innerHTML += `<input type="text" disabled>`;
}

let i = 0;
letter.forEach((letter) => {
  letter.addEventListener("click", () => {
    letter.style.transform = "translateY(20px)";
    letter.style.opacity = "0";
    letter.style.visibility = "hidden";
    if (country.toUpperCase().includes(letter.innerText)) {
      // keyboard animation
      letter.style.backgroundColor = "#A7D397";
      letter.style.transform = "translateY(0)";
      letter.style.opacity = "1";
      letter.style.visibility = "visible";
      letter.style.cursor = "no-drop";

      // resullt value
      ch += letter.innerText;
      let inputs = document.querySelectorAll("input");
      inputs[country.toUpperCase().indexOf(letter.innerText)].value =
        letter.innerText;
      // condition  to win
      if (ch.length === country.length) {
        function randomInRange(min, max) {
          letters.style.visibility = "hidden";
          return Math.random() * (max - min) + min;
        }
        confetti({
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          particleCount: randomInRange(50, 100),
          origin: { y: 0.6 },
        });
        setTimeout(()=>{
          document.body.innerHTML = `<div class="containerB"><div class="button" onclick="playAgain()">
      <div class="box">P</div>
      <div class="box">L</div>
      <div class="box">A</div>
      <div class="box">Y</div>
      <div class="box">!</div>
      </div> </div>`;
        },1000)
      }
    } else {
      i++;
      if (i > 10) {
        document.body.innerHTML = ` <h1 class="GO">Game Over </br> <span>Loser</span></h1>
        <div class="containerB"><div class="button" onclick="playAgain()">
      <div class="box">P</div>
      <div class="box">L</div>
      <div class="box">A</div>
      <div class="box">Y</div>
      <div class="box">!</div>
      </div> </div>`;
      }
    }
    switch (i) {
      case 1:
        let footCorp = document.querySelector("main .hangman .foot");
        footCorp.style.width = "80px";
        break;
      case 2:
        let poteauCorp = document.querySelector(
          "main .hangman .foot .poteau"
        );
        poteauCorp.style.height = "150px";
        break;
      case 3:
        let headPoteauCorp = document.querySelector(
          "main .hangman .foot .poteau .headPoteau"
        );
        headPoteauCorp.style.width = "100px";
        break;
      case 4:
        let hagHead = document.querySelector(
          "main .hangman .foot .poteau .headPoteau .hagHead"
        );
        hagHead.style.opacity = 1;
        hagHead.style.transform = "translateY(0)";
        break;
      case 5:
        let hagBody = document.querySelector(
          "main .hangman .foot .poteau .headPoteau .hagHead .hagBody"
        );
        hagBody.style.height = "50px";
        break;
      case 6:
        let hagHandone = document.querySelector(".hagHandone");
        hagHandone.style.right = "10px";
        hagHandone.style.height = "30px";
        break;
      case 7:
        let hagHandTwo = document.querySelector(".hagHandTwo");
        hagHandTwo.style.left = "10px";
        hagHandTwo.style.height = "30px";
        hagHandTwo.style.transform = "rotate(-45deg)";
        break;
      case 8:
        let hagFeetOne = document.querySelector(".hagFeetOne");
        hagFeetOne.style.height = "30px";
        hagFeetOne.style.left = "10px";
        break;
      case 9:
        let hagFeetTwo = document.querySelector(".hagFeetTwo");
        hagFeetTwo.style.height = "30px";
        hagFeetTwo.style.right = "10px";
        break;
      case 10:
        let corde = document.querySelector(".corde");
        corde.style.height = "50px";
        break;
    }
  });
});
}
// hagman();

function playAgain(){
  location.reload();
}


