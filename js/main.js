/*----- constants -----*/
var weight = [5, 5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 2, 2, 1, 1, 0];
var numFlashes = 50;
var flashDuration = 70;

/*----- app's state (variables) -----*/
var slotState;
var startSlot;
var money;
var display;
var symArr = [
    {
        symbol: 'UNICORN',
        value: 10,
        imgUrl: 'https://image.flaticon.com/icons/svg/616/616462.svg'
    },
    {
        symbol: 'COOL CAT',
        value: 4,
        imgUrl: 'https://image.flaticon.com/icons/png/512/252/252208.png'
    },
    {
        symbol: 'CAT',
        value: 3,
        imgUrl: 'https://image.flaticon.com/icons/png/512/720/720925.png'
    },
    {
        symbol: 'DOG',
        value: 2,
        imgUrl: 'https://image.flaticon.com/icons/png/512/616/616408.png'
    },
    {
        symbol: 'ICE CREAM',
        value: 2,
        imgUrl: 'https://image.flaticon.com/icons/svg/786/786894.svg'
    },
    {
        symbol: 'POPSICLE',
        value: 1,
        imgUrl: 'https://image.flaticon.com/icons/svg/284/284763.svg'
    },
];

/*----- cached element references -----*/
var playButton = document.getElementById('play');
var cashOut = document.getElementById('cash');
var resetButton = document.getElementById('reset');
var display = document.getElementById('display');
var winAlert = document.getElementById('winAlert');
var td1 = document.getElementById('td1');
var td2 = document.getElementById('td2');
var td3 = document.getElementById('td3');
var h4 = document.querySelector('h4');
var backgroundMusic = document.getElementById('backgroundMusic');
var defaultImg = 'https://image.flaticon.com/icons/svg/258/258349.svg';
var reels = [td1, td2, td3];
/*----- event listeners -----*/
playButton.addEventListener('click', handleClick);
cashOut.addEventListener('click', cashClick);
resetButton.addEventListener('click', initialize);

/*----- functions -----*/

initialize();

function initialize() {
    slotState = [null, null, null];
    money = 10;
    display.textContent = 'Balance: $' + money;
    td1.style.background = 'url(' + defaultImg + ')';
    td2.style.background = 'url(' + defaultImg + ')';
    td3.style.background = 'url(' + defaultImg + ')';
    backgroundMusic.volume = 0.3;
    h4.textContent = '★·.·´¯`·.·★Only $2 to play!★·.·´¯`·.·★';
    winAlert.textContent = "Try your luck!"
}

function handleClick() {
    if (money >= 2) {
        money -= 2;
        yaySound.pause();
        pullingSound.play();
        setTimeout(function () {
            slotSound.play();
        }, 300);
        for (var i = 0; i < 3; i++) {
            slotState[i] = symArr[weight[getRandomBetween(0, weight.length - 1)]];
        }
        doFlashing(slotState);
    } else {
        h4.textContent = '★·.·´¯`·.·★Insufficent funds★·.·´¯`·.·★';
        loserSound.play();
    }
}

function renderSlot(slotIdx, timeout) {
    setTimeout(function () {
        reels[slotIdx].style.background = 'url(' + slotState[slotIdx].imgUrl + ')';
        reels[slotIdx].style.backgroundSize = 'cover';
        if (slotIdx === 2) render();
    }, timeout);
}

function doFlashing(slots) {
    var timerIdArr = [];
    for (i = 0; i < 3; i++) {
        let ii = i;
        timerIdArr.push(setInterval(function () {
            var count = 0;
            var startSlot = 0;
            var slotIdx = getRandomBetween(startSlot, 2);
            var symIdx = getRandomBetween(0, symArr.length - 1);
            console.log(ii);
            reels[ii].style.background = 'url(' + symArr[symIdx].imgUrl + ')';
            reels[ii].style.backgroundSize = 'cover';
        }, 70))
    }
    console.log(arguments);
    var args = arguments[0];
    for (var i = 0; i <= 2; i++) {
        (function (idx) {
            setTimeout(function () {
                clearInterval(timerIdArr[idx]);
                reels[idx].style.background = 'url(' + args[idx].imgUrl + ')';
                reels[idx].style.backgroundSize = 'cover';
            }, ((idx * 1000) + 1000))
        })(i)
    }
    setTimeout(function () {
        render();
    }, 3000);
}

function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cashClick() {
    winAlert.textContent = '$' + money + ' cash MONEIZZZZZZZ for you dog!!';
    money -= money;
    display.textContent = 'Balance: $' + money;
    moneySound.play();
}

function render() {
    console.log(slotState[0], slotState[1], slotState[2])
    if (slotState[0] === slotState[1] && slotState[1] === slotState[2]) {
        money += 4 * slotState[0].value;
        winAlert.textContent = 'you got a FULL ' + slotState[0].symbol + ' match!';
        jackpotSound.play();
    } else if (slotState[0] === slotState[1] || slotState[0] === slotState[2]) {
        money += 2 * slotState[0].value;
        winAlert.textContent = 'you got a double ' + slotState[0].symbol + ' match!';
        yaySound.currentTime = 0;
        yaySound.play();
    } else if (slotState[1] === slotState[2]) {
        money += 2 * slotState[1].value;
        winAlert.textContent = 'you got a double ' + slotState[1].symbol + ' match!';
        yaySound.currentTime = 0;
        yaySound.play();
    } else {
        winAlert.textContent = 'nothing for you ●﹏●';
        var meowSound = new Audio("./media/cat-meow-mp3.mp3");
        meowSound.volume = .5;
        meowSound.play();
    }
    display.textContent = 'Balance: $' + money;
}
