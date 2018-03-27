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
        {symbol: 'jackpot0',
         value: 10,
         imgUrl: 'https://image.flaticon.com/icons/svg/616/616462.svg'
        },
        {symbol: 'coolcat1',
         value: 4,
         imgUrl: 'https://cdn.iconscout.com/public/images/icon/premium/png-512/cat-pet-animal-domestic-feline-sunglasses-disguise-incognito-tie-formal-official-bodyguard-spy-3a683f7c4cd93367-512x512.png'
        },
        {symbol: 'cat2',
         value: 3,
         imgUrl: 'https://image.flaticon.com/icons/svg/12/12160.svg'
        },
        {symbol: 'dog3',
         value: 2,
         imgUrl: 'https://image.flaticon.com/icons/png/512/616/616408.png'
        },
        {symbol: 'iceCream4',
         value: 2,
         imgUrl: 'https://cdn.vectorstock.com/i/1000x1000/78/37/ice-cream-with-kawaii-face-design-vector-10657837.jpg'
        },
        {symbol: 'popsicle5',
         value: 1,
         imgUrl: 'https://image.flaticon.com/icons/svg/284/284763.svg'
        },
        // {symbol: 'cake6',
        //  value: 10
        // },
        // {symbol: 'pizza7',
        //  value: 10
        // },
        // {symbol: 'taco8',
        //  value: 10
        // },
        // {symbol: 'boba9',
        //  value: 10
        // },
        // {symbol: 'heart10',
        //  value: 5
        // },
        // {symbol: 'star11',
        //  value: 5
        // } 
]


/*----- cached element references -----*/
var playButton = document.getElementById('play');
var cashOut = document.getElementById('cash');
var display = document.getElementById('display');
var winAlert = document.getElementById('winAlert');
var td1 = document.getElementById('td1');
var td2 = document.getElementById('td2');
var td3 = document.getElementById('td3');

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
}
/// set slot machine visual contents to blank //

/// on click function for the pull///
function handleClick() {
    if (money >= 2) {
        money -= 2;
        slotState[0] = symArr[weight[getRandomIndex(weight.length)]];
        slotState[1] = symArr[weight[getRandomIndex(weight.length)]];
        slotState[2] = symArr[weight[getRandomIndex(weight.length)]];
        // var randomSymbolValue = randomSymbol.value;
        //console.log(slotState);
    } else {alert('yous a broke bloke')}
    render();
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
    display.textContent = 'Balance: $' + money;
    console.log(slotState[0], slotState[1], slotState[2])
    td1.style.background = 'url(' + slotState[0].imgUrl + ')';
    td1.style.background = 'url(' + slotState[0].imgUrl + ')';
    td2.style.background = 'url(' + slotState[1].imgUrl + ')';
    td2.style.backgroundSize = 'cover';
    td3.style.backgroundSize = 'cover';
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
        winAlert.textContent = 'nothing for you T_T';
    } 
}
console.log('hi');

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
