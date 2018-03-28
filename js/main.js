//// ^_^ SLOT MACHINE PSUEDO CODE ^_^ ////
/*----- constants -----*/
var weight = [5,5,5,5,5,4,4,4,4,3,3,3,2,2,1,1,0];
/*----- app's state (variables) -----*/
var slotState;
///var slot machine board state(3 reel box thingies)///
///var slot machine contents (DOM) (image or text or whateva)///
var money;
var display; 

var symArr = [
        {symbol: 'UNICORN',
         value: 10,
         imgUrl: 'https://image.flaticon.com/icons/svg/616/616462.svg'
        },
        {symbol: 'COOL CAT',
         value: 4,
         imgUrl: 'https://image.flaticon.com/icons/png/512/252/252208.png'
        },
        {symbol: 'CAT',
         value: 3,
         imgUrl: 'http://www.iconarchive.com/download/i78374/iconka/meow/cat-purr.ico'
        },
        {symbol: 'DOG',
         value: 2,
         imgUrl: 'https://image.flaticon.com/icons/png/512/616/616408.png'
        },
        {symbol: 'ICE CREAM',
         value: 2,
         imgUrl: 'https://image.flaticon.com/icons/svg/786/786894.svg'
        },
        {symbol: 'POPSICLE',
         value: 1,
         imgUrl: 'https://image.flaticon.com/icons/svg/284/284763.svg'
        },
]


/*----- cached element references -----*/
var playButton = document.getElementById('play');
var cashOut = document.getElementById('cash');
var display = document.getElementById('display');
var winAlert = document.getElementById('winAlert');
var td1 = document.getElementById('td1');
var td2 = document.getElementById('td2');
var td3 = document.getElementById('td3');
var defaultImg = 'https://image.flaticon.com/icons/svg/258/258349.svg';

/*----- event listeners -----*/
playButton.addEventListener('click', handleClick);
cashOut.addEventListener('click', cashClick);
// run init, cash animation or something.

/*----- functions -----*/
//run the init function//

///INITIALIZE DEFAULTS///
initialize();

function initialize() {
    slotState = [null, null, null];
    money = 10;
    display.textContent = 'Balance: $' + money;
    td1.style.background = 'url(' + defaultImg + ')';
    td2.style.background = 'url(' + defaultImg + ')';
    td3.style.background = 'url(' + defaultImg + ')';
}
/// set slot machine visual contents to blank //

/// on click function for the pull///
function handleClick() {
    if (money >= 2) {
        money -= 2;
        // setInterval(flash, 1000);
        // console.log(symArr[getRandomIndex(symArr.length - 1)].imgUrl);
        // function flash() {
        //     td1.style.background = 'url(' + symArr[getRandomIndex(symArr.length - 1).imgUrl] + ')';
        //     td2.style.background = 'url(' + symArr[getRandomIndex(symArr.length - 1).imgUrl] + ')';
        //     td3.style.background = 'url(' + symArr[getRandomIndex(symArr.length - 1).imgUrl] + ')';
        // }
        
        slotState[1] = symArr[weight[getRandomIndex(weight.length)]];
        slotState[2] = symArr[weight[getRandomIndex(weight.length)]];
        // var randomSymbolValue = randomSymbol.value;
        } else {document.querySelector('h4').textContent = '★·.·´¯`·.·★Insufficent funds★·.·´¯`·.·★'}
    render();
}

function workSlot1() {
    slotState[0] = symArr[weight[getRandomIndex(weight.length)]];
}

function getRandomIndex(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function cashClick() {
    alert('$' + money + ' cash MONEIZZZZZZZ for you dog!!');
    money -= money;
    display.textContent = 'Balance: $' + money;
    //cash falling animation?
}

function render() {
    console.log(slotState[0], slotState[1], slotState[2])
    td1.style.background = 'url(' + slotState[0].imgUrl + ')';
    td2.style.background = 'url(' + slotState[1].imgUrl + ')';
    td3.style.background = 'url(' + slotState[2].imgUrl + ')';
    td1.style.backgroundSize = 'cover';
    td2.style.backgroundSize = 'cover';
    td3.style.backgroundSize = 'cover';
    if (slotState[0] === slotState[1] && slotState[1] ===slotState[2]) {
        money += 3 * slotState[0].value;
        winAlert.textContent = 'you got a FULL ' + slotState[0].symbol + ' match!';
    } else if (slotState[0] === slotState[1] || slotState[0] === slotState[2]) {
        money += 2 * slotState[0].value;
        winAlert.textContent = 'you got a double ' + slotState[0].symbol + ' match!';
    } else if (slotState[1] === slotState[2]) {
        money += 2 * slotState[1].value;
        winAlert.textContent = 'you got a double ' + slotState[1].symbol + ' match!';
    } else {
        winAlert.textContent = 'nothing for you ●﹏●';
    } 
    display.textContent = 'Balance: $' + money;
}


//play random gif(or like sprites?) of slot reels spinning//
//!!time this out for 2 sec each!!! randomize board state from the 12 values//
///will be changing pix from the dom//
//will be changing the board state variable to object prop?//
//run da render funciton

// on click funtion for cashout
// play money dropping everywhere
// run init??? or like .... idkman (the 10$ start)

/// the render function //

// if object prop of 1st reel === object prop 2nd of reel && object prop of 2nd reel === object prop of 3rd reel;
//return moneyz aka object props value 
// so like money = money + object prop value....
// change money display to mirror
