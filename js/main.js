//// ^_^ SLOT MACHINE PSUEDO CODE ^_^ ////
/*----- constants -----*/
var weight = [5,5,5,5,5,4,4,4,4,3,3,3,2,2,1,1,0];
var numFlashes = 50;
var flashDuration = 70;

/*----- app's state (variables) -----*/
var slotState;
var startSlot;
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
];
var sounds = [
    {name: 'loseSound',
     soundUrl: './media/loser.mp3'
    },
    {name: 'playSound',
     soundUrl: ''}
]

/*----- cached element references -----*/
var playButton = document.getElementById('play');
var cashOut = document.getElementById('cash');
var display = document.getElementById('display');
var winAlert = document.getElementById('winAlert');
var td1 = document.getElementById('td1');
var td2 = document.getElementById('td2');
var td3 = document.getElementById('td3');
var reels = [td1, td2, td3];
var defaultImg = 'https://image.flaticon.com/icons/svg/258/258349.svg';
var backgroundMusic = document.getElementById('backgroundMusic');
/*----- event listeners -----*/
playButton.addEventListener('click', handleClick);
cashOut.addEventListener('click', cashClick);

/*----- functions -----*/

initialize();

function initialize() {
    slotState = [null, null, null];
    money = 10;
    display.textContent = 'Balance: $' + money;
    td1.style.background = 'url(' + defaultImg + ')';
    td2.style.background = 'url(' + defaultImg + ')';
    td3.style.background = 'url(' + defaultImg + ')';
    backgroundMusic.volume = 0.05;
}

function handleClick() {
    if (money >= 2) {
        money -= 2;
        for (var i = 0; i < 3; i++) {
            slotState[i] = symArr[weight[getRandomBetween(0, weight.length - 1)]];
        }
        // setTimeout(function() {
            // for (var i = 0; i < 3; i++) {
            //     slotState[i] = symArr[weight[getRandomBetween(0, weight.length - 1)]];
                // renderSlot(i, 500 + i * 500);
            // }
            // }, numFlashes * flashDuration - 1000);
            doFlashing(slotState);
    } else {
        document.querySelector('h4').textContent = '★·.·´¯`·.·★Insufficent funds★·.·´¯`·.·★';
    }
}

function renderSlot(slotIdx, timeout) {
    setTimeout(function() {
        reels[slotIdx].style.background = 'url(' + slotState[slotIdx].imgUrl + ')';
        reels[slotIdx].style.backgroundSize = 'cover';
        if (slotIdx === 2) render();
    }, timeout);
}

function doFlashing(slots) {
    var count = 0;
    startSlot = 0;
    
    // var timerId = setInterval(function() {
    //     var slotIdx = getRandomBetween(startSlot, 2);
    //     var symIdx = getRandomBetween(0, symArr.length - 1);
    //     reels[slotIdx].style.background = 'url(' + symArr[symIdx].imgUrl + ')';
    //     count++;
    //     if (count === numFlashes) clearInterval(timerId);
    // }, flashDuration);
    // setTimeout(function() {
    //     startSlot = 1;
    // }, numFlashes * flashDuration - 1050);
    // setTimeout(function() {
    //     startSlot = 2;
    // }, numFlashes * flashDuration - 550);
    var timerId = setInterval(function() {
        var slotIdx = getRandomBetween(startSlot, 2);
        var symIdx = getRandomBetween(0, symArr.length - 1);
        reels[0].style.background = 'url(' + symArr[symIdx].imgUrl + ')';
        reels[0].style.backgroundSize = 'cover';
    }, 70);
    var timerIdB = setInterval(function() {
        var slotIdx = getRandomBetween(startSlot, 2);
        var symIdx = getRandomBetween(0, symArr.length - 1);
        reels[1].style.background = 'url(' + symArr[symIdx].imgUrl + ')';
        reels[1].style.backgroundSize = 'cover';
    }, 70);
    var timerIdC = setInterval(function() {
        var slotIdx = getRandomBetween(startSlot, 2);
        var symIdx = getRandomBetween(0, symArr.length - 1);
        reels[2].style.background = 'url(' + symArr[symIdx].imgUrl + ')';
        reels[2].style.backgroundSize = 'cover';
    }, 70);
    var timerIds = [timerId, timerIdB, timerIdC];
    console.log(arguments);
    var args = arguments[0];
    for (var i = 0; i <= 2; i++) {
        // console.log(i)
        (function(ind) {
            setTimeout(function() {
                clearInterval(timerIds[ind]);
                reels[ind].style.background = 'url(' + args[ind].imgUrl + ')';
                reels[ind].style.backgroundSize = 'cover';
            }, ((ind * 1000) + 1000))
        })(i)
        // setTimeout(function() {
        //     clearInterval(timerIds[i]);
        //         console.log(i)
        //     reels[i].style.background = 'url(' + a.imgUrl + ')';
        //     reels[i].style.backgroundSize = 'cover';
        // }, ((i * 1000) + 1000))
    }

    // setTimeout(function() {
    //     clearInterval(timerId);
    //     reels[0].style.background = 'url(' + a.imgUrl + ')';
    //     reels[0].style.backgroundSize = 'cover';
    // }, 1000)
    // setTimeout(function() {
    //     clearInterval(timerIdB);
    //     reels[1].style.background = 'url(' + b.imgUrl + ')';
    //     reels[1].style.backgroundSize = 'cover';
    // }, 2000)
    // setTimeout(function() {
    //     clearInterval(timerIdC);
    //     reels[2].style.background = 'url(' + c.imgUrl + ')';
    //     reels[2].style.backgroundSize = 'cover';
    setTimeout(function() {
        render();
    }, 3000);
    // }, 3000)
}

function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cashClick() {
    alert('$' + money + ' cash MONEIZZZZZZZ for you dog!!');
    money -= money;
    display.textContent = 'Balance: $' + money;
    //cash falling animation?
}


function render() {
    console.log(slotState[0], slotState[1], slotState[2])
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
