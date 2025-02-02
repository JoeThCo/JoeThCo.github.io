let passwordBox = document.getElementById("passwordBox");
let newPassword = document.getElementById("newPassword");
let passwordLengthSlider = document.getElementById("passwordLength");

function generatePassword(length) {
  const charecters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const randomArray = new Uint8Array(length);
  crypto.getRandomValues(randomArray);
  randomArray.forEach((number) => {
    result += charecters[number % charecters.length];
  });
  return result;
}

function displayNewPassword() {
  passwordBox.innerHTML = generatePassword(passwordLengthSlider.value);
}

function copyPassword() {
  navigator.clipboard.writeText(passwordBox.innerHTML);
  alert(passwordBox.innerHTML + " copied!");
}

function init() {
  newPassword.addEventListener("click", () => displayNewPassword());
  passwordBox.addEventListener("click", () => copyPassword());
  displayNewPassword();
}

window.onload = init;

passwordLengthSlider.oninput = function () {
  displayNewPassword();
};
