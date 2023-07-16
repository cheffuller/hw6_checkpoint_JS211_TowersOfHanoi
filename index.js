let stone = null;
let startStack = null;
let endStack = null;
let stacks = {
  'top-row': [],
  'middle-row': [],
  'bottom-row': [4, 3, 2, 1],
};

const selectRow = (row) => {
  const currentStone = row.lastElementChild;
  console.log(row, currentStone)
  if (!stone && currentStone) {
    startStack = row.id;
    pickUpStone(currentStone);
  } else if (stone) {
    endStack = row.id;
    movePiece(startStack, endStack);
  }
};

const pickUpStone = (currentStone) => {
  stone = currentStone;
  currentStone.remove();
};

const dropStone = (row) => {
  row.append(stone);
  stone = null;
};

const movePiece = (start, end) => {
  if (isLegal(start, end)) {
    stacks[end].push(stacks[start].pop());
    dropStone(document.querySelector(`#${end}`));
    if (checkForWin(end)) {
      document.querySelector('#announce-game-won').innerHTML = "You Won!";
    };
  } else {
    dropStone(document.querySelector(`#${start}`));
  }
};

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

const checkForWin = (end) => {
  if (end != 'bottom-row' && stacks[end].toString() === "4,3,2,1") {
    return true;
  } else {
    return false;
  }
};

const rowElements = document.querySelectorAll('.row');
rowElements.forEach((element) => {
  console.log(element)
  element.addEventListener('click', function () {
    selectRow(this);
  })
});