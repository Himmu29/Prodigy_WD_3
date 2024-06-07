let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset-btn");
let newgamebtn = document.querySelector(".new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // player O's turn

const resetgame = () => {
    turn0 = true;
    enableBoxes();
    boxes.forEach(box => {
        box.innerText = "";
    });
    msgcontainer.classList.add("hide");
    console.log("Game reset");
};

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            console.log("Box was clicked");
            box.innerText = turn0 ? "O" : "X";
            turn0 = !turn0;
            box.disabled = true;
            checkWinner();
        }
    });
});

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
    });
    console.log("Boxes enabled");
};

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
    console.log("Boxes disabled");
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
    console.log(`Winner is ${winner}`);
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("Winner found", pos1val);
                showWinner(pos1val);
                return; // exit the function once a winner is found
            }
        }
    }
    // Check for a tie
    if ([...boxes].every(box => box.innerText !== "")) {
        msg.innerText = "It's a Tie!";
        msgcontainer.classList.remove("hide");
        console.log("It's a Tie!");
    }
};

// Add event listeners for reset and new game buttons
resetbtn.addEventListener("click", resetgame);
newgamebtn.addEventListener("click", resetgame);
