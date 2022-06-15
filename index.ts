import axiod from "https://deno.land/x/axiod/mod.ts";

const MAX_TRIES = 6;
let previous_answer: string[] = [];

const fetchRandomWord = async () => {
  try {
    const request = await axiod.get(
      "https://random-word-api.herokuapp.com/word",
    );
    if (request?.data[0]) {
      return request?.data[0].toUpperCase();
    }
    return "HELLO";
  } catch (_e) {
    return "HELLO";
  }
};

let wordleWord = await fetchRandomWord();

const getWord = async () => {
  const word = await window.prompt("Introduce your word");
  if (!word) {
    return { error: "Please introduce a word", word: "" };
  }
  if (word.length !== wordleWord.length) {
    return {
      error: `Your word should be ${wordleWord.length} characters long`,
      word: "",
    };
  }
  if (!/^[a-zA-Z]+$/.test(word)) {
    return { error: "Your word should contain only letters", word: "" };
  }
  return { error: null, word: word.toUpperCase() };
};

const getAnswer = async () => {
  const answer = await prompt("Do you wanna play again? [y/n]");
  if (!answer) {
    return { error: "Please introduce your answer", answer: "" };
  }
  if (!/^(y|n|Y|N)$/.test(answer)) {
    return { error: "Please answer with y/n", answer: "" };
  }
  return { error: null, answer };
};

const colorLetter = (letter: string, index: number) => {
  if (wordleWord[index] === letter) {
    return `\x1b[42m ${letter} \x1b[0m`;
  }
  if (wordleWord.includes(letter)) {
    return `\x1b[43m ${letter} \x1b[0m`;
  }
  return `\x1b[1m ${letter} \x1b[0m`;
};

const printGrid = () => {
  console.clear();
  for (let i = 0; i < previous_answer.length; i++) {
    let row = "";
    [...previous_answer[i]].forEach((letter, index) =>
      row += " |" + colorLetter(letter, index) + "| "
    );
    console.log(row);
  }
  for (let i = MAX_TRIES - previous_answer.length; i >= 0; i--) {
    let row = "";
    [...wordleWord].forEach(() => row += " | _ | ");
    console.log(row);
  }
};

const checkStatus = (guess: string) => {
  printGrid();
  if (guess === wordleWord) {
    console.log("you did it");
    return true;
  }
  if (previous_answer.length > MAX_TRIES) {
    console.log("out of tries, the word is:", wordleWord);
    return true;
  }
  return false;
};

const main = async () => {
  printGrid();
  let guess = "";
  while (guess === "") {
    const { error, word } = await getWord();
    if (error) {
      console.error(error);
      continue;
    }
    guess = word;
  }
  previous_answer.push(guess);
  const isDone = checkStatus(guess);
  if (!isDone) {
    main();
  } else {
    let isPlayAgain = "";
    while (isPlayAgain === "") {
      const { error, answer } = await getAnswer();
      if (error) {
        console.error(error);
        continue;
      }
      isPlayAgain = answer;
    }
    if (/^(y|Y)$/.test(isPlayAgain)) {
      previous_answer = [];
      wordleWord = await fetchRandomWord();
      main();
    }
  }
};

main();
