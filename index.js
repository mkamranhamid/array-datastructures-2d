console.log("Lets get started");

var arr = [];
var main = {
    '0': [],
    '1': []
};
var config = {
    '0': 'box-container',
    '1': 'box-container1'
}
var appconfig = {
    '0': {
        'create': ['create-row', 'create-col', 'create-box'],
        'srch': ['srch-row', 'srch-col', 'search-box'],
        'upd': ['upd-row', 'upd-col', 'upd-num', 'update-box'],
        'dlt': ['dlt-row', 'dlt-col', 'delete-box'],
        'swap': ['swap-row1', 'swap-row2', 'swap-row-box'],
        'swapRow': ['swap-col-r1', 'swap-col-c1', 'swap-col-r2', 'swap-col-c2', 'swap-col-box'],
    },
    '1': {
        'create': ['create-row1', 'create-col1', 'create-box1'],
        'srch': ['srch-row1', 'srch-col1', 'search-box1'],
        'upd': ['upd-row1', 'upd-col1', 'upd-num1', 'update-box1'],
        'dlt': ['dlt-row1', 'dlt-col1', 'delete-box1'],
    },
}
var statsConfig = {
    '0': {
        'arrayLength': 'arrayLength',
        'isArrayEmpty': 'isArrayEmpty',
        'arrtype': 'arrtype',
        'isIdentical': 'isIdentical',
        'IsZero': 'IsZero',
        'IsAddible': 'IsAddible',
        'IsMultiplicable': 'IsMultiplicable',
        'IsSubtractable': 'IsSubtractable',
    },
    '1': {
        'arrayLength': 'arrayLength1',
        'isArrayEmpty': 'isArrayEmpty1',
        'arrtype': 'arrtype1',
        'isIdentical': 'isIdentical1',
        'IsZero': 'IsZero1',
        'IsAddible': 'IsAddible1',
        'IsMultiplicable': 'IsMultiplicable1',
        'IsSubtractable': 'IsSubtractable1',
    }
}
var size = {
    '0': { rows: null, cols: null },
    '1': { rows: null, cols: null }
};
// arrayInit(main[0], config[0], 0);

function arrayInit(arr, box, indx) {
    let arrayLength = document.getElementById(statsConfig[indx].arrayLength);
    let isArrayEmpty = document.getElementById(statsConfig[indx].isArrayEmpty);
    let arrtype = document.getElementById(statsConfig[indx].arrtype);
    let isIdentical = document.getElementById(statsConfig[indx].isIdentical);
    let IsZero = document.getElementById(statsConfig[indx].IsZero);
    let IsAddible = document.getElementById(statsConfig[0].IsAddible);
    let IsMultiplicable = document.getElementById(statsConfig[0].IsMultiplicable);
    let IsSubtractable = document.getElementById(statsConfig[0].IsSubtractable);
    let arraySize = calculateArrayLength(arr);
    size[indx] = arraySize;
    arrayLength.innerText = `${arraySize.rows},${arraySize.cols}`;
    isArrayEmpty.innerText = isEmpty(arr);
    arrtype.innerText = arrtypeCalculate(arraySize);
    isIdentical.innerText = isMatrixIdentity(arr, arrtypeCalculate(arraySize));
    IsZero.innerText = isMatrixZero(arr, arrtypeCalculate(arraySize));
    IsAddible.innerText = addableToArray2();
    IsMultiplicable.innerText = multiplicableToArray2();
    IsSubtractable.innerText = subtractableToArray2();

    createBoxes(arr, box);
}

function arrtypeCalculate(size) {
    if (size.rows == size.cols) return 'Square';
    return 'Rectangle';
}

function calculateArrayLength(arr) {
    let length = { rows: 0, cols: 0 };
    if (arr.length == 0) return length;
    length['rows'] = arr.length;
    length['cols'] = arr[0].length;
    return length;
}

function insertIntoArray(indx) {
    console.log("insertIntoArray");
    if (main[indx].length == 0) {
        alert("To insert into an array please perform 'Create Array' function first !!");
        return;
    };
    let cols = main[indx][0].length;
    let newArray = [...new Array(cols)].map((d, i) => {
        return i;
    });
    main[indx].push(newArray);
    arrayInit(main[indx], config[indx], indx);
}

function updateArray(indx, key) {
    if (main[indx].length == 0) {
        alert('Either Row or Column not exist !!')
        return;
    }
    let row = document.getElementById(appconfig[indx][key][0]).value;
    let col = document.getElementById(appconfig[indx][key][1]).value;
    let num = document.getElementById(appconfig[indx][key][2]).value;
    row = parseInt(row) - 1;
    col = parseInt(col) - 1;
    num = parseInt(num);
    // if (!row || !col || !num) return;
    if (!ifIndexExist(main[indx], row, col)) {
        alert('Either Row or Column not valid !!');
        return;
    }
    // main[indx][row][col] = parseInt(num);
    let localMainRowArr = main[indx].slice();
    let replaceArr = localMainRowArr[row].slice();
    replaceArr.splice(col, 1, num);
    localMainRowArr.splice(row, 1, replaceArr);
    main[indx] = localMainRowArr;
    showToggler(appconfig[indx][key][3]);
    /* row = parseInt(row);
    let replacerVal = document.getElementById(replacer).value;
    if (parseInt(indexVal) > (main[indx].length - 1)) {
        alert('Out of range!!')
        return;
    }
    main[indx][indexVal] = parseInt(replacerVal); */
    arrayInit(main[indx], config[indx], indx);
}

function ifIndexExist(arr, row, col) {
    let exist = { row: false, col: false };
    if ((arr.length - 1) >= row) {
        exist['row'] = true;
    }
    if ((arr[0] && arr[0].length - 1) >= col) {
        exist['col'] = true;
    }
    return (exist.row && exist.col);
}

function deleteFromArray(indx, deletionKey) {
    let row = document.getElementById(appconfig[indx][deletionKey][0]).value;
    let col = document.getElementById(appconfig[indx][deletionKey][1]).value;
    row = parseInt(row) - 1;
    col = parseInt(col) - 1;
    if (!ifIndexExist(main[indx], row, col)) {
        alert('Out of range!!')
        return;
    }
    let localMainArr = main[indx].slice();
    let replaceArr = localMainArr[row].slice();
    replaceArr.splice(col, 1, null);
    localMainArr.splice(row, 1, replaceArr);
    main[indx] = localMainArr;
    showToggler(appconfig[indx][deletionKey][2]);
    arrayInit(main[indx], config[indx], indx);
}

function searchInArray(indx, toSrch) {
    let row = document.getElementById(appconfig[indx][toSrch][0]).value;
    let col = document.getElementById(appconfig[indx][toSrch][1]).value;
    row = parseInt(row);
    col = parseInt(col);
    if (!row || !col) {
        alert('Either Row or Column not valid !!');
        return;
    };
    row = row;
    col = col;
    if (main[indx].length < row) {
        alert("Can't find the searched row!!");
        return;
    }
    if (main[indx][0].length < col) {
        alert("Can't find the searched col!!");
        return;
    }
    let indexOfBox = boxPositionCalculator(main[indx], row, col);
    if (indexOfBox == -1) {
        alert("Can't find the searched key!!");
        return;
    }
    let boxes = document.getElementById(config[indx]).children;
    removeClassIfExist(boxes);

    let targetBox = boxes[indexOfBox];
    targetBox.classList.add('search-border');
    showToggler(appconfig[indx][toSrch][2]);
}

function boxPositionCalculator(arr, row, col) {
    let indexOfBox = null;
    let rowLength = arr[0].length;
    indexOfBox = ((rowLength + 1) * (row - 1)) + col - 1;
    return indexOfBox;
}

function removeClassIfExist(elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('search-border');
    }
}

function isEmpty(arr) {
    return arr.length > 0 ? false : true;
}

function createBoxes(arr, box) {
    let boxContainer = document.getElementById(box);
    let boxes = arr.map((rows) => {
        let row = rows.map((cols) => {
            let box = `<div class="box"><div>${cols}</div></div>`;
            return box;
        });
        row.push(`<br/>`);
        row = row.join("");
        return row
    })
    boxes = boxes.join("");
    boxContainer.innerHTML = boxes;
}

function showToggler(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function createArray(indx) {
    main[indx] = [];
    let newArray = [];
    let rows = document.getElementById(appconfig[indx]['create'][0]).value;
    let cols = document.getElementById(appconfig[indx]['create'][1]).value;
    cols = parseInt(cols);
    rows = parseInt(rows);
    console.log("ROWS ::", rows, " COLS ::", cols);
    /* let newArray = [...new Array(cols)].map((d, i) => {
        return i;
    }); */
    for (let x = 0; x < cols; x++) {
        newArray.push(x);
    }
    for (let i = 0; i < rows; i++) {
        main[indx].push(newArray);
    }
    console.log(" main[indx] ::", main[indx]);
    // main[indx] = newArray;
    arrayInit(main[indx], config[indx], indx);
    showToggler(appconfig[indx]['create'][2]);
}

function mergeArray() {
    if (main[0].length == 0 || main[1].length == 0) {
        alert('Both array must have index greater than 1');
        return
    }
    let confirmation = confirm('This action is unrevertable. Are you sure you want to do this ?');
    if (!confirmation) return;
    main[0] = main[0].concat(main[1]);
    arrayInit(main[0], config[0], 0);
    main[1] = [];
    arrayInit(main[1], config[1], 1);
}

function findOrder(array) {
    var asc = true;
    var desc = true;
    if (array.length < 2) {
        return 'array is too small'
    }
    for (var i = 1, len = array.length; i < len; i++) {
        //if current element is bigger than previous array is not descending
        if (array[i] > array[i - 1]) {
            desc = false;
            //if current element is smaller than previous array is not ascending
        } else if (array[i] < array[i - 1]) {
            asc = false;
        }

        if (!asc && !desc) {
            return '0'
        }
    }

    if (asc && desc) {
        return 'array values are equal'
    } else if (asc) {
        return '1'
    } else {
        return '2'
    }
}

function isMatrixIdentity(arr, matrixType) {
    if (matrixType != 'Square') return false;
    let identity = true;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][i] != 1) {
            identity = false;
            break;
        }
        for (let j = 0; j < arr[i].length; j++) {
            if ((j != i)) {
                if (arr[i][j] != 0) {
                    identity = false;
                    break;
                }
            }
        }
        if (!identity) break;
    }
    return identity;
}

function isMatrixZero(arr, matrixType) {
    if (matrixType != 'Square') return false;
    let zero = true;
    for (let i = 0; i < arr.length; i++) {
        let rowStringified = arr[i].join('+');
        let evaluatedStr = eval(rowStringified);
        if (evaluatedStr != 0) {
            zero = false;
            break;
        }
    }
    return zero;
}

function rotateLeft(indx) {
    if (main[indx].length < 2) {
        alert("Can't perform action on the following array");
        return;
    }
    let localMainArr = main[indx].slice();
    for (let i = 0; i < localMainArr.length; i++) {
        let row = localMainArr[i].slice();
        let valAtFirstIndex = row[0];
        row.splice(0, 1);
        row.push(valAtFirstIndex);
        localMainArr.splice(i, 1, row);

    }
    main[indx] = localMainArr;
    arrayInit(main[indx], config[indx], indx);
}

function rotateRight(indx) {
    if (main[indx].length < 2) {
        alert("Can't perform action on the following array");
        return;
    }
    let localMainArr = main[indx].slice();
    for (let i = 0; i < localMainArr.length; i++) {
        let replaceArr = localMainArr[i].slice();
        let lastIndex = replaceArr.length - 1;
        let valAtLastIndex = replaceArr[lastIndex];
        replaceArr.splice(lastIndex, 1);
        replaceArr.unshift(valAtLastIndex);
        localMainArr.splice(i, 1, replaceArr);

    }
    main[indx] = localMainArr;
    arrayInit(main[indx], config[indx], indx);
}

function swapRow(indx, key) {
    let row1 = document.getElementById(appconfig[indx][key][0]).value;
    let row2 = document.getElementById(appconfig[indx][key][1]).value;
    if (!row1 || !row2) {
        alert('Either Row # 1 or Row # 2 is not valid !!');
        return;
    }
    row1 = parseInt(row1) - 1;
    row2 = parseInt(row2) - 1;
    if ((row1 > main[indx].length - 1) && (row2 > main[indx].length - 1)) {
        alert('Either Row # 1 or Row # 2 is not valid !!');
        return;
    }
    let localMainArr = main[indx].slice();
    let swap1 = localMainArr[row1];
    let swap2 = localMainArr[row2];
    localMainArr.splice(row1, 1, swap2);
    localMainArr.splice(row2, 1, swap1);
    main[indx] = localMainArr;
    arrayInit(main[indx], config[indx], indx);
    showToggler(appconfig[indx][key][2]);
}

function swapCol(indx, key) {
    let row1 = document.getElementById(appconfig[indx][key][0]).value;
    let col1 = document.getElementById(appconfig[indx][key][1]).value;
    let row2 = document.getElementById(appconfig[indx][key][2]).value;
    let col2 = document.getElementById(appconfig[indx][key][3]).value;
    if (!row1 || !row2 || !col1 || !col2) {
        alert('Either Row # 1 or Row # 2 is not valid !!');
        return;
    }
    row1 = parseInt(row1) - 1;
    col1 = parseInt(col1) - 1;
    row2 = parseInt(row2) - 1;
    col2 = parseInt(col2) - 1;
    if (!ifIndexExist(main[indx], row1, col1) || !ifIndexExist(main[indx], row2, col2)) {
        alert('Either Row or Column not valid !!');
        return;
    }
    let localMainArr = main[indx].slice();
    let swap1 = localMainArr[row1].slice();
    let swap2 = localMainArr[row2].slice();
    let valAtSwap1 = swap1[col1];
    let valAtSwap2 = swap2[col2];
    swap1.splice(col1, 1, valAtSwap2);
    swap2.splice(col2, 1, valAtSwap1);
    localMainArr.splice(row1, 1, swap1);
    localMainArr.splice(row2, 1, swap2);
    main[indx] = localMainArr;
    arrayInit(main[indx], config[indx], indx);
    showToggler(appconfig[indx][key][4]);
}
function addableToArray2() {
    if (main[0].length > 0 && main[1].length > 0) {
        if ((size[0].rows == size[1].rows) && (size[0].cols == size[1].cols)) {
            return true;
        }
    }
    return false;
}

function subtractableToArray2() {
    if (main[0].length > 0 && main[1].length > 0) {
        if ((size[0].rows == size[1].rows) && (size[0].cols == size[1].cols)) {
            return true;
        }
    }
    return false;
}

function multiplicableToArray2() {
    if (main[0].length > 0 && main[1].length > 0) {
        if (size[0].cols == size[1].rows) {
            return true;
        }
    }
    return false;
}
function checkForUpperBound(arr) {
    let upperBound = true;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][i + 1] == 0) {
            upperBound = false;
            break;
        }
        for (let j = 0; j < arr[i].length; j++) {
            if ((j != i) && j != (i + 1)) {
                if (arr[i][j] != 0) {
                    upperBound = false;
                    break;
                }
            }
        }
    }
    return upperBound;
}
function checkForLowerBound(arr) {
    let lowerBound = true;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i][i - 1] == 0) {
            lowerBound = false;
            break;
        }
        for (let j = 0; j < arr[i].length; j++) {
            if ((j != i) && j != (i - 1)) {
                if (arr[i][j] != 0) {
                    lowerBound = false;
                    break;
                }
            }
        }
    }
    return lowerBound;
}
function biDiagnalMatrix() {
    // if (matrixType != 'Square') return false;
    let arr = main[0];
    let bidiagnal = true;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][i] == 0) {
            bidiagnal = false;
            break;
        }

        if (!bidiagnal) break;
    }
    return bidiagnal;
}

function func1() {
    console.log(" func1 called");
    return;
}

function func2() {
    console.log(" func2 called");
}