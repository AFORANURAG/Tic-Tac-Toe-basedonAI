var origboard;
const huPlayer="O"
const aiPlayer="X"
const winCombos=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[6,4,2]
]
var cell=document.querySelectorAll(".cell")
startGame()
function startGame(){
    document.querySelector(".endgame").style.display="none"
    origboard=Array.from(Array(9).keys())
    console.log(origboard)
    for(let i=0;i<cell.length;i++){
        cell[i].innerText=""
        cell[i].style.removeProperty("background-color")
        cell[i].addEventListener("click",turnClick,false);
    }

}
function turnClick(square){
  if(typeof origboard[square.target.id]=="number"){
    turn(square.target.id,huPlayer)
    if(!checkTie()) turn(bestSpot(),aiPlayer)
  }  

}
function turn(squareId,player){
    origboard[squareId]=player
document.getElementById(squareId).innerText=player
let gameWon=checkWin(origboard,player)
if(gameWon) gameOver(gameWon)
}

function checkWin(board,player){
    let plays=board.reduce((a,e,i)=>
(e===player)?a.concat(i):a,[])
       
let gameWon=null;
for(let [index,win] of winCombos.entries()){
    if(win.every(el=>plays.indexOf(el)>-1)){
         gameWon={
            index:index,
            player:player
         }
         break
    }
}
return gameWon
}

function gameOver(gameWon){
for(let index of winCombos[gameWon.index]){
 document.getElementById(index).style.backgroundColor=gameWon.player==huPlayer?"blue":"red"
declareWinner(gameWon.player==huPlayer?"You win":"You loose")
}

for(let i=0;i<cell.length;i++){
    cell[i].removeEventListener("click",turnClick,false)
}
}

function checkTie(){
    if(emptySquares().length==0){
        for(let i=1;i<cell.length;i++){
            cell[i].style.backgroundColor="orange";
            cell[i].removeEventListener("click",turnClick,false);
        }
        declareWinner("Tie Game")
    return true
    }
return false
}

function declareWinner(who){
    document.querySelector(".endgame").style.display="block"
    document.querySelector(".endgame .text").innerText=who

}



function emptySquares(){
  return origboard.filter(s=>typeof s==="number")  
}


function bestSpot(){
    return emptySquares()[0]
}
