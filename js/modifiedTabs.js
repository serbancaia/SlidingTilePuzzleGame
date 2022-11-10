document.getElementById("playerInfoTab").addEventListener('click', firstTabClick);
document.getElementById("gameStatsTab").addEventListener('click', secondTabClick);

function firstTabClick(){
  if(document.getElementById("playerInfoTab").className == "tabBtnDef tabBtn"){
    document.getElementsByClassName('gameStats')[0].style.display = "none";
    document.getElementsByClassName('gameSetup')[0].style.display = "block";
    document.getElementById("playerInfoTab").style.backgroundColor = document.getElementById("gameStatsTab").style.backgroundColor;
    document.getElementById("gameStatsTab").style.backgroundColor = "white";
    document.getElementById("gameStatsTab").setAttribute("class", "tabBtnDef tabBtn");
    document.getElementById("gameStatsTab").setAttribute("className", "tabBtnDef tabBtn");
    document.getElementById("playerInfoTab").setAttribute("class", "tabBtnDef tabBtnClicked");
    document.getElementById("playerInfoTab").setAttribute("className", "tabBtnDef tabBtnClicked");
  }
}

function secondTabClick(){
  if(document.getElementById("gameStatsTab").className == "tabBtnDef tabBtn"){
    document.getElementsByClassName('gameSetup')[0].style.display = "none";
    document.getElementsByClassName('gameStats')[0].style.display = "block";
    document.getElementById("gameStatsTab").style.backgroundColor = document.getElementById("playerInfoTab").style.backgroundColor;
    document.getElementById("playerInfoTab").style.backgroundColor = "white";
    document.getElementById("playerInfoTab").setAttribute("class", "tabBtnDef tabBtn");
    document.getElementById("playerInfoTab").setAttribute("className", "tabBtnDef tabBtn");
    document.getElementById("gameStatsTab").setAttribute("class", "tabBtnDef tabBtnClicked");
    document.getElementById("gameStatsTab").setAttribute("className", "tabBtnDef tabBtnClicked");
  }
}
