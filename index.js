let stone = null;
let stacks = {
  'top-row': [],
  'middle-row': [],
  'bottom-row': [4, 3, 2, 1],
};
let startStack = null;
let endStack = null;

const selectRow = (row) => {
  const currentStone = row.lastElementChild;
  console.log(stacks);
  if (!stone) {
    startStack = row.id;
    pickUpStone(currentStone);
  } else {
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

const setStack = (rowID) => {
  switch (rowID) {
    case 'top-row':
      return 'a'
      break;
    case 'middle-row':
      return 'b'
      break;
    case 'bottom-row':
      return 'c'
      break;
  }
}

const movePiece = (start, end) => {
  if (isLegal(start, end)) {
    stacks[end].push(stacks[start].pop());
    dropStone(document.querySelector(`#${end}`));
    if (checkForWin(end)) {
      window.alert('You win!');
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
    console.log('Display error message')
    return false;
  }
};

const checkForWin = (end) => {
  if (stacks[end].toString() === "4,3,2,1") {
    return true;
  } else {
    return false;
  }
};
