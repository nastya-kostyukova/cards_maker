const imageUtils = require('./image-utils.js');
const Promise = require('bluebird');
const fs = require('fs');

module.exports = function * parseInput() {
  const readData = fs.readFileSync('input.txt', 'utf8').toString();
  const startIndex = readData.indexOf('А1');
  const dataToParse = readData.substring(~startIndex ? startIndex : 0).split('\n');

  const result = [];
  let rowIndex = 1;
  let questionData = { question: [], answers: [] };
  let isQuestion = true;
  let isAnswer = false;

  while (rowIndex <= (dataToParse.length - 1)) {
    const currentRow = dataToParse[rowIndex];
    const answerMatch = /\d\) /.exec(currentRow.trim());
    isAnswer = answerMatch && answerMatch.index === 0;
    if (isAnswer) {
      isQuestion = false;
    }

    if (isQuestion) {
      questionData.question = (questionData.question || []).concat(currentRow);
    } else if (isAnswer) {
      questionData.answers = (questionData.answers || []).concat(currentRow);
      isQuestion = false;
    } else {
      if (questionData.question) {
        result.push(questionData);
      }
      questionData = { question: '', answers: [] };
      const questionMatch = /А\d+/.exec(currentRow.trim());
      isQuestion = questionMatch && questionMatch.index === 0;
    }
    rowIndex++;
  }

  result.forEach((data, index) => {
    const params = JSON.stringify(data).replace(/"/g, '\\\'');
    const url = `http://localhost:4000/card?data="${params}"`;
    setTimeout(() => {
      return imageUtils.htmlToImage(url, `cards/card_${index + 1}.png`);
    }, 0);
  });
}
