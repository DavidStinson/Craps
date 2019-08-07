/*-------State Variables-------*/
let chipTotal, betTotal, point, die1Num, die1Text, die2Num, die2Text;
let payout = 0;
let pointActive = 0;  // 0 means no point is active, otherwise set to the value of point
let newPointActive = 0;

/*-------Constants-------*/
const sideObj = {
    anySeven: {name: "Any Seven", reverseName: "neveSyna", multiplier:4, currentBet:0, winnerIf:7, dieSpecific: 0},
    hardFour: {name: "Hard Four", reverseName: "ruoFdrah", multiplier:7, currentBet:0, winnerIf:4, dieSpecific: 1},
    hardTen: {name: "Hard Ten", reverseName: "neTdrah", multiplier:7, currentBet:0, winnerIf:10, dieSpecific: 1},
    hardSix: {name: "Hard Six", reverseName: "xiSdrah", multiplier:9, currentBet:0, winnerIf:6, dieSpecific: 1},
    hardEight: {name: "Hard Eight", reverseName: "thgiEdrah", multiplier:9, currentBet:0, winnerIf:8, dieSpecific: 1},
    anyThree: {name: "Any Three", reverseName: "eerhTyna", multiplier:15, currentBet:0, winnerIf:3, dieSpecific: 0},
    anyEleven: {name: "Any Eleven", reverseName: "nevelEyna", multiplier:15, currentBet:0, winnerIf:11, dieSpecific: 0},
    anyTwo: {name: "Any Two", reverseName: "owTyna", multiplier:30, currentBet:0, winnerIf:2, dieSpecific: 1},
    anyTwelve: {name: "Any Twelve", reverseName: "evlewTyna", multiplier:30, currentBet:0, winnerIf:12, dieSpecific: 1},
    anyCraps: {name: "Any Craps", reverseName: "sparCyna", multiplier:7, currentBet:0, winnerIf:[2, 3, 12], dieSpecific: 0}
}

const centerObj = {
    passLine: {name: "Pass Line", reverseName: "eniLssap", multiplier:1, currentBet:0, winnerIf:1},
    dontPass: {name: "Don't Pass", reverseName: "ssaPtnod", multiplier:1, currentBet:0, winnerIf:1},
    fieldBottom: {name: "Field", reverseName: "mottoBdleif", multiplier:1, currentBet:0, winnerIf:[2, 3, 4, 9, 10, 11, 12]},
    come: {name: "Come", reverseName: "emoc", multiplier:1, currentBet:0, winnerIf:1}
}

const pointObj = {
    dontCome: {name: "Don't Come", reverseName: "emoCtnod", multiplier:1, currentBet:0, winnerIf:1},
    point4: {name: "4", reverseName: "4tniop", multiplier:(9/5), currentBet:0, winnerIf:4},
    point5: {name: "5", reverseName: "5tniop", multiplier:(7/5), currentBet:0, winnerIf:5},
    point6: {name: "6", reverseName: "6tniop", multiplier:(7/6), currentBet:0, winnerIf:6},
    point8: {name: "8", reverseName: "8tniop", multiplier:(7/6), currentBet:0, winnerIf:8},
    point9: {name: "9", reverseName: "9tniop", multiplier:(7/5), currentBet:0, winnerIf:9},
    point10: {name: "10", reverseName: "01tniop", multiplier:(9/5), currentBet:0, winnerIf:10}
}

/*-------Event Listeners-------*/
document.querySelector('section').addEventListener('click', chipClick);
document.querySelector('main').addEventListener('click', betClick);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('rollBtn').addEventListener('click', rollDice);

/*-------Functions-------*/
init();

function reset(){
    init ();
}

function init() {
    
    chipTotal = 1500;
    betTotal = 0;
    dimChips();
    render();
    for (bet in pointObj) {
        pointObj[bet].currentBet = 0;
    }
    for (bet in centerObj) {
        centerObj[bet].currentBet = 0;
    }
    for (bet in sideObj) {
        sideObj[bet].currentBet = 0;
    }
}

function chipClick(evt) {
    if (evt.target.className === 'chip' && chipTotal > 0){
        betTotal += parseInt(evt.target.innerText);
        chipTotal -= parseInt(evt.target.innerText);
        console.log(evt.target.innerText);
        render();
    } else if (evt.target.className === 'chip'){
     }
    render();
}


function betClick(evt){
    if (evt.target.className === 'pointRow'){
        for (type in pointObj){
            if (pointObj[type].currentBet > 0 && type === evt.target.id){
                chipTotal += pointObj[type].currentBet;
                pointObj[type].currentBet = 0;
            } else if (type === evt.target.id) {
                pointObj[type].currentBet += betTotal;
                betTotal = 0;
            };
        }
    } else if (evt.target.className === 'sideBet') {
        for (type in sideObj){
            if (sideObj[type].currentBet > 0 && type === evt.target.id){
                chipTotal += sideObj[type].currentBet;
                sideObj[type].currentBet = 0;
            } else if (type === evt.target.id) {
                sideObj[type].currentBet += betTotal;
                betTotal = 0;
            };
        }
    } else if (evt.target.className === 'center') {
        for (type in centerObj){
            if (centerObj[type].currentBet > 0 && type === evt.target.id){
                chipTotal += centerObj[type].currentBet;
                centerObj[type].currentBet = 0;
            } else if (type === evt.target.id) {
                centerObj[type].currentBet += betTotal;
                betTotal = 0;
            };
        }
    }
render()

}

function rollDice(){
    die1Num = Math.floor(Math.random()*6) + 1;
    die2Num =  Math.floor(Math.random()*6) + 1;
    die1Text = "&#x268" + (die1Num - 1) + " ";
    die2Text = "&#x268" + (die2Num - 1) + " ";
    document.getElementById('rolledDice').innerHTML = die1Text + die2Text;
    animateCSS('.diceRoll', 'fadeInDownBig');
    if (pointActive === 0) {
        payBetsNoPoint();
    } else {
    payBets();
    }
}

function render(){
    renderBets();
    displayPoint();
    dimChips();
    document.getElementById('chipDisplay').innerText = '$ ' + chipTotal;
    document.getElementById('betDisplay').innerText = '$ ' + betTotal;
    
}

function dimChips(){
    document.getElementById('chip1000').style.visibility= ((chipTotal < 1000) ? 'hidden' : 'visible');
    document.getElementById('chip500').style.visibility= ((chipTotal < 500) ? 'hidden' : 'visible');
    document.getElementById('chip100').style.visibility= ((chipTotal < 100) ? 'hidden' : 'visible');
    document.getElementById('chip25').style.visibility= ((chipTotal < 25) ? 'hidden' : 'visible');
    document.getElementById('chip5').style.visibility= ((chipTotal < 5) ? 'hidden' : 'visible');
    document.getElementById('chip1').style.visibility= ((chipTotal < 1) ? 'hidden' : 'visible');
}

function payBetsNoPoint(){
    if (((die1Num + die2Num) === 7) || ((die1Num + die2Num) === 11)){
        payout = payout + centerObj.passLine.currentBet;
        console.log("Seven or eleven rolled while no point active.  Paid out $ " + payout);
        centerObj.dontPass.currentBet = 0;
        centerObj.come.currentBet = 0;
    }
    if (((die1Num + die2Num) === 2) || ((die1Num + die2Num) === 3) || ((die1Num + die2Num) === 12)){
        console.log("Two, Three, or Twelve rolled.  Removed pass line bet");
        payout = payout + centerObj.dontPass.currentBet;
        centerObj.passLine.currentBet = 0;
    }
    if ((die1Num + die2Num === 4 || die1Num + die2Num === 5 || die1Num + die2Num === 6 || die1Num + die2Num === 8 || die1Num + die2Num === 9 || die1Num + die2Num === 10)){
        pointActive = (die1Num + die2Num);
        pointObj[`point${die1Num+die2Num}`].currentBet = centerObj.come.currentBet;
        centerObj.come.currentBet = 0;
        console.log('Setting point to ' + pointActive);
    }
    // Pays the field, clears bet if not a win
    if (centerObj.fieldBottom.winnerIf.includes(die1Num+die2Num)){
        if (die1Num + die2Num === 12 || die1Num + die2Num === 2){
            console.log("Paid out double value field bet for a 2 or 12 for $" + payout);
            payout = payout + (centerObj.fieldBottom.multiplier * 2 * centerObj.fieldBottom.currentBet);
        } else if (die1Num + die2Num === 3 || die1Num + die2Num === 4 || die1Num + die2Num === 9 || die1Num + die2Num === 10 || die1Num + die2Num === 11) {
            console.log("Paid out a field bet of $" + payout);
            payout = payout + (centerObj.fieldBottom.multiplier * centerObj.fieldBottom.currentBet);
            } 
        } 
    else {
        console.log("Field bet lost, clearing bet.")
        centerObj.fieldBottom.currentBet = 0;
        }  
       
        chipTotal += payout;
        console.log('You just won $ '+payout+'!');
        payout = 0;
        render();
    }

function payBets(){  // Pay out bets for when a point is active
    
    // Payout if current point (that is NOT the active point) is rolled.
    for (bet in pointObj){
        if (((die1Num + die2Num) === pointObj[bet].winnerIf)) {
            payout = payout + parseInt(pointObj[bet].multiplier * pointObj[bet].currentBet);
            console.log('Paid out a point (non-active) bet of $' + payout);
        }
    }
    
    // Payout side bet "any craps"
    for (bet in sideObj){
        if ((sideObj[bet].winnerIf === (die1Num + die2Num) || (die1Num + die2Num === 2) || (die1Num + die2Num === 3) || (die1Num + die2Num === 12)) && sideObj[bet].dieSpecific === 0) {
            payout = payout + parseInt(sideObj[bet].multiplier * sideObj[bet].currentBet);
            console.log('Paid out an Any Craps bet of $' + payout);
        } 
    }
    
    // Payout for hard-ways, removing bet if 'soft' number is rolled first.
    for (bet in sideObj){
        if ((sideObj[bet].winnerIf === (die1Num + die2Num)) && (die1Num === die2Num) && sideObj[bet].dieSpecific === 1) {
            payout = payout + parseInt(sideObj[bet].multiplier * sideObj[bet].currentBet);
            console.log('Paid out a hard ways bet of $' + payout);
        } if ((sideObj[bet].winnerIf === (die1Num + die2Num)) && (die1Num !== die2Num)) {
            console.log('Lost hard way bet');
            sideObj[bet].currentBet = 0;
        }
    }
    
    // Clears the board (except the 'any craps' field) if a 7 is rolled while the point is active.
    if ((die1Num + die2Num === 7)){
        payout = payout + parseInt(pointObj.dontCome.multiplier * pointObj.dontCome.currentBet);
        for (bet in pointObj){
            console.log('Rolled a 7, removed all active point bets');
            pointObj[bet].currentBet = 0;
        }
        for (bet in sideObj){
            if (sideObj.anySeven.currentBet > 0){
                payout = payout + sideObj.anySeven.currentBet;
                console.log('Paid out Any Seven bet of $' + payout);
            } else {
                sideObj[bet].currentBet = 0;
                }
        }
        // Pays the don't pass line on a roll of 7 while point is active
        console.log('Paid out a dont pass line bet of $' + payout);
        payout = payout + parseInt(centerObj.dontPass.multiplier * centerObj.dontPass.currentBet);
        centerObj.passLine.currentBet = 0;
        console.log('Resetting point to zero on a 7 roll');    
        pointActive = 0;
    } 
    
    // Pays the field, clears bet if not a win
    if (centerObj.fieldBottom.winnerIf.includes(die1Num+die2Num)){
        if (die1Num + die2Num === 12 || die1Num + die2Num === 2){
            console.log("Paid out double value field bet for a 2 or 12 for $" + payout);
            payout = payout + (centerObj.fieldBottom.multiplier * 2 * centerObj.fieldBottom.currentBet);
        } else if (die1Num + die2Num === 3 || die1Num + die2Num === 4 || die1Num + die2Num === 9 || die1Num + die2Num === 10 || die1Num + die2Num === 11) {
            console.log("Paid out a field bet of $" + payout);
            payout = payout + (centerObj.fieldBottom.multiplier * centerObj.fieldBottom.currentBet);
            } 
        } 
    else {
        console.log("Field bet lost, clearing bet.")
        centerObj.fieldBottom.currentBet = 0;
        }    

    if (pointActive === (die1Num + die2Num)){
        payout = payout + parseInt(centerObj.passLine.multiplier * centerObj.passLine.currentBet);
        console.log("Point hit!  Paid out "+ payout);
        centerObj.dontPass.currentBet = 0;
        pointActive = 0;
        }        
   
    chipTotal += payout;
    console.log('You just won $ '+payout+'!');
    payout = 0;
    render(); 
}

function renderBets(){
    for (each in pointObj){
        if (pointObj[each].currentBet > 0){
        document.getElementById(pointObj[each].reverseName).style.display = 'inline';
        document.getElementById(pointObj[each].reverseName).innerHTML = (`$${pointObj[each].currentBet} bet on ${pointObj[each].name}`);
    } else {
        document.getElementById(pointObj[each].reverseName).style.display = 'none';
        }
    }
    for (each in sideObj){
        if (sideObj[each].currentBet > 0){
        document.getElementById(sideObj[each].reverseName).style.display = 'inline';
        document.getElementById(sideObj[each].reverseName).innerHTML = (`$${sideObj[each].currentBet} bet on ${sideObj[each].name}`);
    } else {
        document.getElementById(sideObj[each].reverseName).style.display = 'none';
        }
    }
    for (each in centerObj){
        if (centerObj[each].currentBet > 0){
        document.getElementById(centerObj[each].reverseName).style.display = 'inline';
        document.getElementById(centerObj[each].reverseName).innerHTML = (`$${centerObj[each].currentBet} bet on ${centerObj[each].name}`);
    } else {
        document.getElementById(centerObj[each].reverseName).style.display = 'none';
        }
    }
}

function displayPoint(){
    for (each in pointObj){
        if (pointActive === pointObj[each].winnerIf){
            document.getElementById(each).style.color = 'red';
        } else {
            document.getElementById(each).style.color = 'black';
        }
    }
    console.log('Point is ' + pointActive);
}

function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}