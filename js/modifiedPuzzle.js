function Utility(){
  this.generateRandomNumber = function(minValue, maxValue){
    return Math.floor(Math.random() * maxValue);
  };
  this.playAudio = function(audioPath){
    new Audio(audioPath).play();
  };
  this.sampleEasyBoardTests = function(){
    if(puzzleGame.puzzleWidth == 3){
      return [[1,2,3],[4,0,6],[7,5,8]];
    }
    else if(puzzleGame.puzzleWidth == 4){
      return [[1,2,3,4],[5,6,7,8],[9,10,0,12],[13,14,11,15]];
    }
    else if(puzzleGame.puzzleWidth == 5){
      return [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,0,20],[21,22,23,19,24]];
    }
    else{
      return null;
    }
  };
  this.terminateGame = function(theStatus){
    if(theStatus == "success"){
      this.playAudio("sounds/Firework.mp3");
    }
    clearInterval(timer);
    playerManager.storeGameStats(theStatus);
    document.getElementById("pname").focus();
    document.getElementById("pname").value = "";
    document.getElementById("pname").blur();
    document.getElementById("plevel").value = "---";
    document.getElementById("moves").value = "";
    document.getElementById("sec").value = "";
    document.getElementById("min").value = "";
    document.getElementById("hours").value = "";
    document.getElementById("pname").disabled = false;
    document.getElementById("plevel").disabled = false;
    this.enableButton(document.getElementById("cancelButton").id, false, document.getElementById("cancelButton").className);
    for(var i=0; i<document.getElementsByClassName('puzzleBoard')[0].children.length; i++){
      document.getElementsByClassName('puzzleBoard')[0].children[i].style.display = "none";
    }
  };
  this.cancelPuzzlePlay = function(){
    if(document.getElementById("cancelButton").style.backgroundColor == "red"){
      this.terminateGame("cancelled");
    }
  };
  this.checkFormFilled = function(){
    if(document.getElementById("pname").value != ""){
      if(document.getElementById("plevel").value != "---"){
        this.enableButton(document.getElementById("playButton").id, true, document.getElementById("playButton").className);
      }
      else{
        this.enableButton(document.getElementById("playButton").id, false, document.getElementById("playButton").className);
      }
    }
    else{
      this.enableButton(document.getElementById("playButton").id, false, document.getElementById("playButton").className);
    }
  };
  this.enableButton = function(btnId, theStatus, btnClass){
    if(theStatus){
      if(btnId == "playButton"){
        document.getElementById(btnId).setAttribute("class", "btnNow greenButton");
        document.getElementById(btnId).setAttribute("className", "btnNow greenButton");
        document.getElementById(btnId).style.cursor = "pointer";
        document.getElementById(btnId).style.backgroundColor = "green";
        document.getElementById(btnId).disabled = false;
      }
      else{
        document.getElementById(btnId).setAttribute("class", "btnNow redButton");
        document.getElementById(btnId).setAttribute("className", "btnNow redButton");
        document.getElementById(btnId).style.cursor = "pointer";
        document.getElementById(btnId).style.backgroundColor = "red";
        document.getElementById(btnId).disabled = false;
      }
    }
    else{
      if(btnClass == "btnNow greenButton" || btnClass == "btnNow redButton"){
        document.getElementById(btnId).setAttribute("class", btnClass+" btnNowDisabled");
        document.getElementById(btnId).setAttribute("className", btnClass+" btnNowDisabled");
        document.getElementById(btnId).style.cursor = "no-drop";
        document.getElementById(btnId).style.backgroundColor = "gray";
        document.getElementById(btnId).disabled = true;
      }
      else{
        document.getElementById(btnId).setAttribute("class", btnClass);
        document.getElementById(btnId).setAttribute("className", btnClass);
        document.getElementById(btnId).style.cursor = "no-drop";
        document.getElementById(btnId).style.backgroundColor = "gray";
        document.getElementById(btnId).disabled = true;
      }
    }
  };
  this.showChrono = function(){
    if(document.getElementById("sec").value == "" || document.getElementById("min").value == "" || document.getElementById("hours").value == ""){
      document.getElementById("sec").value = 0;
      document.getElementById("min").value = 0;
      document.getElementById("hours").value = 0;
    }
    else if(document.getElementById("sec").value < 59){
      document.getElementById("sec").stepUp(1);
    }
    else{
      if(document.getElementById("min").value < 59){
        document.getElementById("sec").value = 0;
        document.getElementById("min").stepUp(1);
      }
      else{
        document.getElementById("sec").value = 0;
        document.getElementById("min").value = 0;
        document.getElementById("hours").stepUp(1);
      }
    }
  };
  this.showStats = function(){
    var tableRow = document.getElementById("stats").insertRow(-1);
    var tableGameCounter = tableRow.insertCell(0);
    var tablePlayerName = tableRow.insertCell(1);
    var tableDimension = tableRow.insertCell(2);
    var tableTheStatus = tableRow.insertCell(3);
    var tableNberMoves = tableRow.insertCell(4);
    var tableGameDuration = tableRow.insertCell(5);
    tableGameCounter.innerHTML = playerManager.listPlayers[playerManager.listPlayers.length-1].gameCounter;
    tablePlayerName.innerHTML = playerManager.listPlayers[playerManager.listPlayers.length-1].name;
    tableDimension.innerHTML = playerManager.listPlayers[playerManager.listPlayers.length-1].dimension;
    tableTheStatus.innerHTML = playerManager.listPlayers[playerManager.listPlayers.length-1].theStatus;
    tableNberMoves.innerHTML = playerManager.listPlayers[playerManager.listPlayers.length-1].nberMoves;
    tableGameDuration.innerHTML = playerManager.listPlayers[playerManager.listPlayers.length-1].duration;
  };
}
function Player(theStatus, gameCounter, name, dimension, nberMoves, duration){
  this.theStatus = theStatus;
  this.gameCounter = gameCounter;
  this.name = name;
  this.dimension = dimension;
  this.nberMoves = nberMoves;
  this.duration = duration;
}
function PlayerManager(){
  this.listPlayers = [];
  this.gameCounter = 0;
  this.gameDuration;
  this.nberMoves;
  this.storeGameStats = function(theStatus){
    var playerName = document.getElementById("pname").value;
    var gameDimension = document.getElementById("plevel").value;
    this.nberMoves = document.getElementById("moves").value;
    this.gameDuration = (document.getElementById("hours").value + "h" + document.getElementById("min").value + "min" + document.getElementById("sec").value + "sec");
    var player = new Player(theStatus, this.gameCounter, playerName, gameDimension, this.nberMoves, this.gameDuration);
    this.listPlayers.push(player);
    util.showStats();
    this.nberMoves = "";
    this.gameDuration = "";
  };
}
function Tile(row, col, tileType, indexNumber){
  this.row = row;
  this.col = col;
  this.tileType = tileType;
  this.indexNumber = indexNumber;
}
function PuzzleGame(puzzleLevel){
  this.puzzleWidth = puzzleLevel;
  this.puzzleBoard = [];
  this.goalState = [];
  this.indexOf = function(indexNum){
    for(var i=0; i<this.puzzleBoard.length; i++){
      if(this.puzzleBoard[i].indexNumber == indexNum){
        return i;
      }
    }
    return -1;
  }
  this.createGoalState = function(){
    if(this.puzzleWidth == 3){
      this.goalState.push(new Array(1,2,3));
      this.goalState.push(new Array(4,5,6));
      this.goalState.push(new Array(7,8,0));
    }
    else if(this.puzzleWidth == 4){
      this.goalState.push(new Array(1,2,3,4));
      this.goalState.push(new Array(5,6,7,8));
      this.goalState.push(new Array(9,10,11,12));
      this.goalState.push(new Array(13,14,15,0));
    }
    else if(this.puzzleWidth == 5){
      this.goalState.push(new Array(1,2,3,4,5));
      this.goalState.push(new Array(6,7,8,9,10));
      this.goalState.push(new Array(11,12,13,14,15));
      this.goalState.push(new Array(16,17,18,19,20));
      this.goalState.push(new Array(21,22,23,24,0));
    }
    else{
      this.goalState = null;
    }
  };
  this.createBoardStructure = function(testing){
    if(testing){
      var easyBoardState = util.sampleEasyBoardTests();
      for(var i=0; i<easyBoardState.length; i++){
        for(var j=0; j<easyBoardState[i].length; j++){
          var tileValue = easyBoardState[i][j];
          var tileCol = j;
          var tileRow = easyBoardState[i];
          if(tileValue == 0){
            puzzleGame.puzzleBoard.push(new Tile(tileRow.length-2, tileCol, "emptyTile", tileValue));
          }
          else{
            if(tileRow.length == 3){
              if(tileValue == 5 || tileValue == 8 || tileValue == 7){
                puzzleGame.puzzleBoard.push(new Tile(tileRow.length-1, tileCol, "filledType", tileValue));
              }
              else{
                var rowNum = tileRow.length-1;
                var lastRowValue = 7;
                while(lastRowValue > tileValue){
                  rowNum--;
                  lastRowValue-=tileRow.length;
                }
                puzzleGame.puzzleBoard.push(new Tile(rowNum, tileCol, "filledType", tileValue));
              }
            }
            else if(tileRow.length == 4){
              if(tileValue == 11 || tileValue == 15 || tileValue == 13 || tileValue == 14){
                puzzleGame.puzzleBoard.push(new Tile(tileRow.length-1, tileCol, "filledType", tileValue));
              }
              else{
                var rowNum = tileRow.length-1;
                var lastRowValue = 13;
                while(lastRowValue > tileValue){
                  rowNum--;
                  lastRowValue-=tileRow.length;
                }
                puzzleGame.puzzleBoard.push(new Tile(rowNum, tileCol, "filledType", tileValue));
              }
            }
            else if(tileRow.length == 5){
              if(tileValue == 19 || tileValue == 24 || tileValue == 21 || tileValue == 22 || tileValue == 23){
                puzzleGame.puzzleBoard.push(new Tile(tileRow.length-1, tileCol, "filledType", tileValue));
              }
              else{
                var rowNum = tileRow.length-1;
                var lastRowValue = 21;
                while(lastRowValue > tileValue){
                  rowNum--;
                  lastRowValue-=tileRow.length;
                }
                puzzleGame.puzzleBoard.push(new Tile(rowNum, tileCol, "filledType", tileValue));
              }
            }
          }
        }
      }
    }
    else{
      var randomNumbers = [];
      var randomNum;
      while(randomNumbers.length < this.puzzleWidth*this.puzzleWidth){
        var rNum = util.generateRandomNumber(i, this.puzzleWidth*this.puzzleWidth);
        if(randomNumbers.indexOf(rNum) === -1){
          randomNumbers.push(rNum);
        }
      }
      for(var i=0; i<this.puzzleWidth; i++){
        for(var j=this.puzzleWidth*i; j<this.puzzleWidth*(i+1); j++){
          randomNum = randomNumbers[j];
          if(randomNum == 0){
            this.puzzleBoard.push(new Tile(i, j-this.puzzleWidth*i, "emptyTile", randomNum));
          }
          else{
            this.puzzleBoard.push(new Tile(i, j-this.puzzleWidth*i, "filledType", randomNum));
          }
        }
      }
    }
    this.drawPuzzleBoard();
  };
  this.drawPuzzleBoard = function(){
    var theTile;
    var theLevel = this.puzzleWidth;
    for(var i=0; i<this.puzzleBoard.length; i++){
      theTile = this.puzzleBoard[i];
      if(theLevel == 3){
        if(theTile.tileType == "emptyTile"){
          document.getElementsByClassName('levelThreeBoard board')[0].getElementsByTagName("DIV")[i].getElementsByTagName("P")[0].innerHTML = "\u00A0";
          document.getElementsByClassName('levelThreeBoard board')[0].getElementsByTagName("DIV")[i].setAttribute("class", "tile empty");
          document.getElementsByClassName('levelThreeBoard board')[0].getElementsByTagName("DIV")[i].setAttribute("className", "tile empty");
          document.getElementsByClassName('levelThreeBoard board')[0].getElementsByTagName("DIV")[i].getElementsByTagName("P")[0].style.cursor = "default";
          document.getElementsByClassName('levelThreeBoard board')[0].getElementsByTagName("DIV")[i].style.cursor = "default";
        }
        else{
          document.getElementsByClassName('levelThreeBoard board')[0].getElementsByTagName("DIV")[i].getElementsByTagName("P")[0].innerHTML = theTile.indexNumber;
          document.getElementsByClassName('levelThreeBoard board')[0].getElementsByTagName("DIV")[i].setAttribute("class", "tile");
          document.getElementsByClassName('levelThreeBoard board')[0].getElementsByTagName("DIV")[i].setAttribute("className", "tile");
          document.getElementsByClassName('levelThreeBoard board')[0].getElementsByTagName("DIV")[i].getElementsByTagName("P")[0].style.width = "100%";
          document.getElementsByClassName('levelThreeBoard board')[0].getElementsByTagName("DIV")[i].getElementsByTagName("P")[0].style.cursor = "pointer";
          document.getElementsByClassName('levelThreeBoard board')[0].getElementsByTagName("DIV")[i].style.cursor = "pointer";
        }
        document.getElementsByClassName('levelThreeBoard board')[0].style.display = "block";
      }
      else if(theLevel == 4){
        if(theTile.tileType == "emptyTile"){
          document.getElementsByClassName('levelFourBoard board')[0].getElementsByTagName("DIV")[i].getElementsByTagName("P")[0].innerHTML = "\u00A0";
          document.getElementsByClassName('levelFourBoard board')[0].getElementsByTagName("DIV")[i].setAttribute("class", "tile2 empty");
          document.getElementsByClassName('levelFourBoard board')[0].getElementsByTagName("DIV")[i].setAttribute("className", "tile2 empty");
          document.getElementsByClassName('levelFourBoard board')[0].getElementsByTagName("DIV")[i].getElementsByTagName("P")[0].style.cursor = "default";
          document.getElementsByClassName('levelFourBoard board')[0].getElementsByTagName("DIV")[i].style.cursor = "default";
        }
        else{
          document.getElementsByClassName('levelFourBoard board')[0].getElementsByTagName("DIV")[i].getElementsByTagName("P")[0].innerHTML = theTile.indexNumber;
          document.getElementsByClassName('levelFourBoard board')[0].getElementsByTagName("DIV")[i].setAttribute("class", "tile2");
          document.getElementsByClassName('levelFourBoard board')[0].getElementsByTagName("DIV")[i].setAttribute("className", "tile2");
          document.getElementsByClassName('levelFourBoard board')[0].getElementsByTagName("DIV")[i].getElementsByTagName("P")[0].style.width = "100%";
          document.getElementsByClassName('levelFourBoard board')[0].getElementsByTagName("DIV")[i].getElementsByTagName("P")[0].style.cursor = "pointer";
          document.getElementsByClassName('levelFourBoard board')[0].getElementsByTagName("DIV")[i].style.cursor = "pointer";
        }
        document.getElementsByClassName('levelFourBoard board')[0].style.display = "block";
      }
      else if(theLevel == 5){
        if(theTile.tileType == "emptyTile"){
          document.getElementsByClassName('levelFiveBoard board')[0].getElementsByTagName("DIV")[i].getElementsByTagName("P")[0].innerHTML = "\u00A0";
          document.getElementsByClassName('levelFiveBoard board')[0].getElementsByTagName("DIV")[i].setAttribute("class", "tile3 empty");
          document.getElementsByClassName('levelFiveBoard board')[0].getElementsByTagName("DIV")[i].setAttribute("className", "tile3 empty");
          document.getElementsByClassName('levelFiveBoard board')[0].getElementsByTagName("DIV")[i].getElementsByTagName("P")[0].style.cursor = "default";
          document.getElementsByClassName('levelFiveBoard board')[0].getElementsByTagName("DIV")[i].style.cursor = "default";
        }
        else{
          document.getElementsByClassName('levelFiveBoard board')[0].getElementsByTagName("DIV")[i].getElementsByTagName("P")[0].innerHTML = theTile.indexNumber;
          document.getElementsByClassName('levelFiveBoard board')[0].getElementsByTagName("DIV")[i].setAttribute("class", "tile3");
          document.getElementsByClassName('levelFiveBoard board')[0].getElementsByTagName("DIV")[i].setAttribute("className", "tile3");
          document.getElementsByClassName('levelFiveBoard board')[0].getElementsByTagName("DIV")[i].getElementsByTagName("P")[0].style.width = "100%";
          document.getElementsByClassName('levelFiveBoard board')[0].getElementsByTagName("DIV")[i].getElementsByTagName("P")[0].style.cursor = "pointer";
          document.getElementsByClassName('levelFiveBoard board')[0].getElementsByTagName("DIV")[i].style.cursor = "pointer";
        }
        document.getElementsByClassName('levelFiveBoard board')[0].style.display = "block";
      }
    }
  };
  this.swap2Tiles = function(indexTile1, indexTile2){
    var firstTile = this.puzzleBoard[indexTile1];
    var secondTile = this.puzzleBoard[indexTile2];
    var firstRow = this.puzzleBoard[indexTile1].row;
    var firstCol = this.puzzleBoard[indexTile1].col;
    var secondRow = this.puzzleBoard[indexTile2].row;
    var secondCol = this.puzzleBoard[indexTile2].col;
    this.puzzleBoard[indexTile1].row = secondRow;
    this.puzzleBoard[indexTile1].col = secondCol;
    this.puzzleBoard[indexTile2].row = firstRow;
    this.puzzleBoard[indexTile2].col = firstCol;
    this.puzzleBoard[indexTile1] = secondTile;
    this.puzzleBoard[indexTile2] = firstTile;

  };
  this.match2States = function(state1, state2){
    for(var i=0; i<state1.length; i++){
      for(var j=0; j<state1[i].length; j++){
        if(state1[i][j] != state2[i][j]){
          return false;
        }
      }
    }
    return true;
  };
  this.getNeighboursIndicesArr = function(arrayIndex){
    var leftN;
    var rightN;
    var topN;
    var bottomN;
    if(this.puzzleBoard[arrayIndex].col != 0){
      leftN = this.puzzleBoard[arrayIndex - 1].indexNumber;
    }
    else{
      leftN = -1;
    }
    if(this.puzzleBoard[arrayIndex].col != this.puzzleWidth - 1){
      rightN = this.puzzleBoard[arrayIndex + 1].indexNumber;
    }
    else{
      rightN = -1;
    }
    if(this.puzzleBoard[arrayIndex].row != 0){
      topN = this.puzzleBoard[arrayIndex - this.puzzleWidth].indexNumber;
    }
    else{
      topN = -1;
    }
    if(this.puzzleBoard[arrayIndex].row != this.puzzleWidth - 1){
      bottomN = this.puzzleBoard[arrayIndex + this.puzzleWidth].indexNumber;
    }
    else{
      bottomN = -1;
    }
    return [leftN, topN, rightN, bottomN];
  };
  this.processClickTile = function(arrayIndex){
    var neighbours = this.getNeighboursIndicesArr(arrayIndex);
    var isN0 = false;
    var n0;
    for(var i=0; i<neighbours.length; i++){
      if(neighbours[i] == 0){
        isN0 = true;
        n0 = i;
        break;
      }
      else{
        n0 = -1;
      }
    }
    if(isN0){
      this.swap2Tiles(this.indexOf(this.puzzleBoard[arrayIndex].indexNumber), this.indexOf(neighbours[n0]));
      document.getElementById("moves").stepUp(1);
      playerManager.nberMoves = document.getElementById("moves").value;
      this.drawPuzzleBoard();
      if(this.computeNumberMisplaced()){
        util.terminateGame("success");
      }
    }
    else{
      util.playAudio("sounds/beep-07.mp3");
    }
  };
  this.computeNumberMisplaced = function(){
    var wrongPlaces = 0;
    var oneDGoalState = [];
    for(var i=0; i<this.goalState.length; i++){
      for(var j=0; j<this.goalState[i].length; j++){
        oneDGoalState.push(this.goalState[i][j]);
      }
    }
    for(var i=0; i<this.puzzleBoard.length; i++){
      if(this.puzzleBoard[i].indexNumber != oneDGoalState[i]){
        wrongPlaces++;
      }
    }
    if(wrongPlaces == 0){
      return true;
    }
    else{
      return false;
    }
  };
}

var util;
var playerManager;
var puzzleGame;
var listPlayerArr = [];
var timer;
var puzzLevel;

function pLevelIntConverter(puzLevel){
  if(puzLevel == "Three"){
    return 3;
  }
  else if(puzLevel == "Four"){
    return 4;
  }
  else if(puzLevel == "Five"){
    return 5;
  }
  else{
    return null;
  }
}

function toCancelPuzzlePlay(){
  util.cancelPuzzlePlay();
}

function toCheckFormFilled(){
  util.checkFormFilled();
}

function tileClick(){
  if(event.currentTarget.parentElement.style.display == "block"){
    if(event.currentTarget.className != "tile empty"){
      var tileIndex = Number(event.currentTarget.children[0].innerHTML);
      puzzleGame.processClickTile(puzzleGame.indexOf(tileIndex));
    }
  }
}

function mainProgram(){
  if(document.getElementById("playButton").style.backgroundColor == "green"){
    util.enableButton(document.getElementById("cancelButton").id, true, document.getElementById("cancelButton").className);
    util.enableButton(document.getElementById("playButton").id, false, document.getElementById("playButton").className);
    document.getElementById("pname").disabled = true;
    document.getElementById("plevel").disabled = true;
    playerManager.gameCounter++;
    puzzLevel = pLevelIntConverter(document.getElementById("plevel").value);
    puzzleGame = new PuzzleGame(puzzLevel);
    puzzleGame.createGoalState();
    puzzleGame.createBoardStructure(false);
    document.getElementById("moves").value = 0;
    util.showChrono();
    timer = setInterval(function(){util.showChrono()}, 1000);
  }
}

function init(){
  util = new Utility();
  playerManager = new PlayerManager();
  document.getElementById("playButton").addEventListener('click', mainProgram);
  document.getElementById("cancelButton").addEventListener('click', toCancelPuzzlePlay);
  document.getElementById("pname").addEventListener('input', toCheckFormFilled);
  document.getElementById("pname").addEventListener('blur', toCheckFormFilled);
  document.getElementById("plevel").addEventListener('change', toCheckFormFilled);
}

document.getElementsByClassName('levelThreeBoard board')[0].children[0].addEventListener("click", tileClick);
document.getElementsByClassName('levelThreeBoard board')[0].children[1].addEventListener("click", tileClick);
document.getElementsByClassName('levelThreeBoard board')[0].children[2].addEventListener("click", tileClick);
document.getElementsByClassName('levelThreeBoard board')[0].children[3].addEventListener("click", tileClick);
document.getElementsByClassName('levelThreeBoard board')[0].children[4].addEventListener("click", tileClick);
document.getElementsByClassName('levelThreeBoard board')[0].children[5].addEventListener("click", tileClick);
document.getElementsByClassName('levelThreeBoard board')[0].children[6].addEventListener("click", tileClick);
document.getElementsByClassName('levelThreeBoard board')[0].children[7].addEventListener("click", tileClick);
document.getElementsByClassName('levelThreeBoard board')[0].children[8].addEventListener("click", tileClick);

document.getElementsByClassName('levelFourBoard board')[0].children[0].addEventListener("click", tileClick);
document.getElementsByClassName('levelFourBoard board')[0].children[1].addEventListener("click", tileClick);
document.getElementsByClassName('levelFourBoard board')[0].children[2].addEventListener("click", tileClick);
document.getElementsByClassName('levelFourBoard board')[0].children[3].addEventListener("click", tileClick);
document.getElementsByClassName('levelFourBoard board')[0].children[4].addEventListener("click", tileClick);
document.getElementsByClassName('levelFourBoard board')[0].children[5].addEventListener("click", tileClick);
document.getElementsByClassName('levelFourBoard board')[0].children[6].addEventListener("click", tileClick);
document.getElementsByClassName('levelFourBoard board')[0].children[7].addEventListener("click", tileClick);
document.getElementsByClassName('levelFourBoard board')[0].children[8].addEventListener("click", tileClick);
document.getElementsByClassName('levelFourBoard board')[0].children[9].addEventListener("click", tileClick);
document.getElementsByClassName('levelFourBoard board')[0].children[10].addEventListener("click", tileClick);
document.getElementsByClassName('levelFourBoard board')[0].children[11].addEventListener("click", tileClick);
document.getElementsByClassName('levelFourBoard board')[0].children[12].addEventListener("click", tileClick);
document.getElementsByClassName('levelFourBoard board')[0].children[13].addEventListener("click", tileClick);
document.getElementsByClassName('levelFourBoard board')[0].children[14].addEventListener("click", tileClick);
document.getElementsByClassName('levelFourBoard board')[0].children[15].addEventListener("click", tileClick);

document.getElementsByClassName('levelFiveBoard board')[0].children[0].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[1].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[2].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[3].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[4].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[5].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[6].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[7].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[8].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[9].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[10].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[11].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[12].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[13].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[14].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[15].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[16].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[17].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[18].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[19].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[20].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[21].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[22].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[23].addEventListener("click", tileClick);
document.getElementsByClassName('levelFiveBoard board')[0].children[24].addEventListener("click", tileClick);

document.addEventListener("DOMContentLoaded", init);
