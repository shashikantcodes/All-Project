const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = "!@#$%^&*()_+{}[]|:;<>,.?/";

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setIndicator("#ccc"); // Default strength indicator

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max - min)) + "% 100%"
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 4px 10px ${color}`;
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRandomInteger(0, 10);
}

function generateLowerCase() {
    return String.fromCharCode(getRandomInteger(97, 123));
}

function generateUpperCase() {
    return String.fromCharCode(getRandomInteger(65, 91));
}

function generateSymbol() {
    return symbols[getRandomInteger(0, symbols.length)];
}

function calcStrength() {
    let hasUpper = uppercaseCheck.checked;
    let hasLower = lowercaseCheck.checked;
    let hasNum = numbersCheck.checked;
    let hasSym = symbolCheck.checked;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0"); // Green (Strong)
    } else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6) {
        setIndicator("#ff0"); // Yellow (Medium)
    } else {
        setIndicator("#f00"); // Red (Weak)
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied!";
    } catch (e) {
        copyMsg.innerText = "Failed!";
    }
    
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

function shufflePassword(passwordArray) {
    for (let i = passwordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }
    return passwordArray.join("");
}

function handleCheckBoxChange() {
    checkCount = Array.from(allCheckBox).filter(checkbox => checkbox.checked).length;
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
    }
    handleSlider();
}

// Event Listeners
allCheckBox.forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckBoxChange);
});

inputSlider.addEventListener('input', (e) => {
    passwordLength = parseInt(e.target.value);
    handleSlider();
});

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) copyContent();
});

generateBtn.addEventListener('click', () => {
    if (checkCount === 0) return;

    password = "";

    let funcArr = [];
    if (uppercaseCheck.checked) funcArr.push(generateUpperCase);
    if (lowercaseCheck.checked) funcArr.push(generateLowerCase);
    if (numbersCheck.checked) funcArr.push(generateRandomNumber);
    if (symbolCheck.checked) funcArr.push(generateSymbol);

    // Add one guaranteed character from each selected category
    funcArr.forEach(func => {
        password += func();
    });

    // Fill remaining characters randomly
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRandomInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }

    // Shuffle the password
    password = shufflePassword(Array.from(password));

    // Display password in UI
    passwordDisplay.value = password;

    // Calculate Strength
    calcStrength();
});
  