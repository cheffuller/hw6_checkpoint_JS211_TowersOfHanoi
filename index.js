// initializing of global variables and setting the 'stacks' array
// to the initial value.
let stone = null;
let startStack = null;
let endStack = null;
let stacks = {
  "left-tower": [],
  "middle-tower": [4, 3, 2, 1],
  "right-tower": [],
};

// function called when a row is clicked on.
// it determines the actions to take based on if there is or is not a stone value.
const selectRow = (row) => {
  const currentStone = row.lastElementChild;
  if (!stone && currentStone) {
    startStack = row.id;
    pickUpStone(currentStone);
  } else if (stone) {
    endStack = row.id;
    movePiece(startStack, endStack);
  }
};

// function that assigns the stone value to the selected row's top stone
// and then removes the stone element from the html.
const pickUpStone = (currentStone) => {
  stone = currentStone;
  currentStone.remove();
};

// function that adds the stone element to the html of the selected row
// and then clears the stone value.
const dropStone = (row) => {
  row.append(stone);
  stone = null;
};

// function to move a stone from one row to another if the move is legal
// and also calls the checkForWin function on completion of a legal move.
// if the move is not legal it drops the stone on the row it was originally on.
const movePiece = (start, end) => {
  if (isLegal(start, end)) {
    stacks[end].push(stacks[start].pop());
    dropStone(document.querySelector(`#${end}`));
    if (checkForWin(end)) {
      document.querySelector("#announce-game-won").innerHTML = "You Win!";
    }
  } else {
    dropStone(document.querySelector(`#${start}`));
  }
};

// function to check the stacks array to determine if the move is legal or
// not based on the stone size.
const isLegal = (start, end) => {
  if (
    stacks[end][stacks[end].length - 1] === undefined ||
    stacks[start][stacks[start].length - 1] <
      stacks[end][stacks[end].length - 1]
  ) {
    return true;
  } else {
    return false;
  }
};

// function to check if the winning conditions have been met.
const checkForWin = (end) => {
  if (end != "middle-tower" && stacks[end].toString() === "4,3,2,1") {
    return true;
  } else {
    return false;
  }
};

// function that adds the click event listener to the reset game button
const clickResetButton = () => {
  const resetButton = document.querySelector(".reset-button");
  resetButton.addEventListener("click", function () {
    location.reload();
  });
};

// The functions below handle the drag events, allowing the stones to be moved by dragging
// from one tower to another

// function that adds the click, dragover, and drop event listeners
//  to each of the tower row elements
const clickRowElements = () => {
  const rowElements = document.querySelectorAll(".row");
  rowElements.forEach((element) => {
    element.addEventListener("click", function () {
      selectRow(this);
    });
    element.addEventListener("drop", (e) => {
      drop_handler(e);
    });
    element.addEventListener("dragover", (e) => {
      dragover_handler(e);
    });
  });
};

// function to add event listeners to the draggable elements
const dragStartElements = () => {
  const stoneElements = document.querySelectorAll(".stone");
  stoneElements.forEach((element) => {
    element.addEventListener("dragstart", (e) => {
      dragstart_handler(e);
    });
  });
};

// function to handle the start of a dragging event
function dragstart_handler(ev) {
  ev.dataTransfer.setData("application/my-app", ev.target.id);
  ev.dataTransfer.effectAllowed = "move";
  startStack = ev.target.parentElement.id;
  stone = ev.target;
}

// function to handle dragging a stone over a different tower
function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

// function to move the stone in the html depending on certain conditions
function drop_handler(ev) {
  ev.preventDefault();
  endStack = ev.target.id;
  if (testStack(stone, startStack)) {
    movePiece(startStack, endStack);
  }
}

// function to test if the stone is the last element in the array corresponding
// to the starting tower row
const testStack = (stone, start) => {
  if (stacks[start][stacks[start].length - 1] == stone.id) {
    return true;
  } else {
    return false;
  }
};

dragStartElements();
clickRowElements();
clickResetButton();
