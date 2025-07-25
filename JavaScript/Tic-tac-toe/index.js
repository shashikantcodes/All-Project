const boxes= document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGamebtn=document.querySelector(".btn");
const toggle=document.querySelector("[data-toggle]");


let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


// Lets create a function to initialise a game

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    // UI pe update krna hai
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        // One More thing is missing,Initialises box CSS Property again
        box.classList=`box box${index+1}`;


    });
    newGamebtn.classList.remove("active");
    gameInfo.innerText=`Current Player > ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer ==="X"){
        currentPlayer="O";
    }else{
        currentPlayer="X";
    }
    // Ui Update
    gameInfo.innerText=`Current Player > ${currentPlayer}`;
}

function CheckGameOver(){
    let answer="";

    
    winningPositions.forEach((position)=>{
    //    All 3 boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="")
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            
            
            // Check if  winner is X
            if(gameGrid[position[0]] ==="X")
                answer="X";
            else
            answer="O";

            // Disable Pointer Events

            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            // Now we know X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win"); 

        }
    });


    // Agar tumhra jo answr hai wo non emty hai
    // it means we have a winner

    if(answer !== ""){
        gameInfo.innerText=`Winner Player -${answer}`;
        toggle.classList.add("active"); 
        newGamebtn.classList.add("active");
       setTimeout(()=>{
           toggle.classList.remove("active");
        
       },3000);

       
        return;   
    }

    // we know no winener  is found, lets Check there is no tie
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box != "")
            fillCount++;
    });

    // Baord is filled,game is Tie

    if(fillCount === 9){
        gameInfo.innerText="Game Tied";
        toggle.classList.add("active");
        setTimeout(()=>{
            toggle.classList.remove("active");
           
        },3000);
        newGamebtn.classList.add("active");
         toggle.innerText="Punah Prayash Kare!!"
    }


}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        // Swap kro turn ko 
        swapTurn();
        // Check ko jeet to nhi gya
        CheckGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})

newGamebtn.addEventListener("click",initGame);