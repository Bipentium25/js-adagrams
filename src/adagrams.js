export const drawLetters = () => {
  const letterCounts = {
    A: 9, B: 2, C: 2, D: 4, E: 12, F: 2,
    G: 3, H: 2, I: 9, J: 1, K: 1, L: 4,
    M: 2, N: 6, O: 8, P: 2, Q: 1, R: 6,
    S: 4, T: 6, U: 4, V: 2, W: 2, X: 1,
    Y: 2, Z: 1,
  };

  const letterPool = [];
  for (const letter in letterCounts){
    for(let i = 0; i < letterCounts[letter]; i++){
      letterPool.push(letter);
    }
  }

  const myHand = [];
  for (let i = 0; i < 10; i++){
    const last = letterPool.length-1;
    let letterIndex = Math.floor(Math.random()*letterPool.length);
    // eslint-disable-next-line no-self-assign
    letterPool[letterIndex], letterPool[last] = letterPool[last],letterPool[letterIndex];
    myHand.push( letterPool[last]);
    letterPool.pop();
  }

  return myHand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
  let handDict = {};
  for (const letter of lettersInHand){
    if (letter in handDict){
      handDict[letter] += 1;
    }else{
      handDict[letter] = 1;
    }
  }

  const upperStr = input.toUpperCase();
  for (const letter of upperStr){
    if (handDict[letter] < 1 || !handDict[letter]){
      return false;
    }else{
      handDict[letter] -= 1;
    }
  }return true;
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
  if (!word) return 0;

  const letterScores = {
    A: 1, B: 3, C: 3, D: 2, E: 1,
    F: 4, G: 2, H: 4, I: 1, J: 8,
    K: 5, L: 1, M: 3, N: 1, O: 1,
    P: 3, Q: 10, R: 1, S: 1, T: 1,
    U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
  };

  let totalScore = 0;
  const wordUpper = word.toUpperCase();
  for (const letter of wordUpper){
    totalScore += letterScores[letter];
  }
  if(word.length >6 && word.length < 11 ){
    totalScore += 8;
  }

  return totalScore;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
  let maxWord = {word:words[0], score:scoreWord(words[0])};

  for(const word of words){
    const wordUpper = word.toUpperCase();

    if (wordUpper.length === 10){
      maxWord.word = wordUpper;
      maxWord.score = scoreWord(wordUpper);
      return maxWord;
    }else{
      const currentScore = scoreWord(wordUpper);
      if (currentScore > maxWord.score){
        maxWord.word = wordUpper;
        maxWord.score = currentScore;
      }else if(currentScore === maxWord.score && wordUpper.length < maxWord.word.length){
        maxWord.word = wordUpper;
        maxWord.score = scoreWord(wordUpper);
      }
    }
  }return maxWord;
};
