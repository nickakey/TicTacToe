const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



const boardData =  {
  1: {a: '_', b: '_', c: '_'},
  2: {a: '_', b: '_', c: '_'},
  3: {a: '_', b: '_', c: '_'}
}


boardVisual = (
  `
      a b c
  1: |${boardData['1']['a']}|${boardData['1']['b']}|${boardData['1']['c']}|
  2: |${boardData['2']['a']}|${boardData['2']['b']}|${boardData['2']['c']}|
  3: |${boardData['3']['a']}|${boardData['3']['b']}|${boardData['3']['c']}|`
)

var refreshBoard = function(){ 
  boardVisual = (
    `
        a b c
    1: |${boardData['1']['a']}|${boardData['1']['b']}|${boardData['1']['c']}|
    2: |${boardData['2']['a']}|${boardData['2']['b']}|${boardData['2']['c']}|
    3: |${boardData['3']['a']}|${boardData['3']['b']}|${boardData['3']['c']}|

    `
  )
}

const playersToPieces = {
  'x': '1',
  'o': '2'
}

const findRowMatches = function(){
  let win = false;
  for(let key in boardData){
    if(boardData[key]['a'] === boardData[key]['b'] && boardData[key]['b'] === boardData[key]['c'] && boardData[key]['a'] !== '_')
      win = boardData[key]['a'];
  }
  return win;
}

const findHorizontalMatches = function(){
  let lettersToNumbers = {1: 'a', 2: 'b', 3: 'c'};
  let win = false;
  for(let i = 1; i < 4; i++){
    if(boardData[1][lettersToNumbers[i]] === boardData[2][lettersToNumbers[i]] && boardData[2][lettersToNumbers[i]] === boardData[3][lettersToNumbers[i]] && boardData[3][lettersToNumbers[i]] !== '_')
      win = boardData[1][lettersToNumbers[i]];
  }
  return win;
}

const findDiagMatches = function(){
  let win = false;
  if(boardData[1]['a'] === boardData[2]['b'] && boardData[2]['b'] === boardData[3]['c'] && boardData[3]['c'] !== '_'){
    win = boardData[1]['a']
  }
  return win;
}

const winChecker = function(){
  let winner = false;
  if(findRowMatches() !== false){
    return playersToPieces[findRowMatches()];
  } 
  if(findHorizontalMatches() !== false){
    return playersToPieces[findHorizontalMatches()]
  } 
  if(findDiagMatches() !== false){
    return playersToPieces[findDiagMatches()]
  } 
  return false;
}


const PromptMove = function(player = '1', piece = 'x'){
  if(winChecker() !== false){
    return console.log(`Player ${winChecker()} wins!`)
  }
  refreshBoard();
  console.log(boardVisual);
  rl.question(`Player ${player}, what row would you like to place a piece? `, (row)=>{
    rl.question(`Player ${player}, what column would you like to place a piece? `, (column)=>{
      boardData[row][column] = piece;
      if(player === '1'){
        PromptMove('2', 'o');
      } else {
        PromptMove('1', 'x')
      }
    })
  })
}


PromptMove()
