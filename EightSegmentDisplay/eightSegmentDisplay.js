function init() {
  addEightSegments(1);

  setNumber(integer_dictionary[0]);
}

function addEightSegments(count) {
  for (let i = 0; i < count; i++) {
    addEightSegment();
  }
}

function addEightSegment() {
  const allSegments = document.getElementById("allSegments");
  const newSegment = document.createElement("div");
  newSegment.className = "segmentDisplay";
  newSegment.innerHTML = `        
        <div></div>
        <div id="0" class="horizontal"></div>
        <div></div>

        <div id="1" class="vertical"></div>
        <div></div>
        <div id="2" class="vertical"></div>

        <div></div>
        <div id="3" class="horizontal"></div>
        <div></div>

        <div id="4" class="vertical"></div>
        <div></div>
        <div id="5" class="vertical"></div>

        <div></div>
        <div id="6" class="horizontal"></div>
        <div></div>`;
  allSegments.appendChild(newSegment);
}

let count = 0;
function plusOne() {
  setNumber(getWrappedNumber());
  document.getElementById("click").innerHTML = count;
  count += 1;
}

function getWrappedNumber() {
  return integer_dictionary[count % Object.keys(integer_dictionary).length];
}

function setBar(id, state) {
  const bar = document.getElementById(id);
  bar.className = state;
}

function reset() {
  count = 0;
  document.getElementById("click").innerHTML = count;
  setNumber(getWrappedNumber());
}

function turnOffAll() {
  turnOff("0");
  turnOff("1");
  turnOff("2");
  turnOff("3");
  turnOff("4");
  turnOff("5");
  turnOff("6");
}

function turnOff(id) {
  const bar = document.getElementById(id);
  if (bar.classList.contains("horizontal")) {
    setBar(id, "horizontal-out");
  } else if (bar.classList.contains("vertical")) {
    setBar(id, "vertical-out");
  }
}

function turnOn(id) {
  const bar = document.getElementById(id);
  if (bar.classList.contains("horizontal-out")) {
    setBar(id, "horizontal");
  } else if (bar.classList.contains("vertical-out")) {
    setBar(id, "vertical");
  }
}

function setNumber(onString) {
  turnOffAll();

  for (let i = 0; i < onString.length; i += 1) {
    turnOn(onString[i].toString());
  }
}

window.onload = init;

integer_dictionary = {
  0: "012456",
  1: "25",
  2: "02346",
  3: "02356",
  4: "1235",
  5: "01356",
  6: "13456",
  7: "025",
  8: "0123456",
  9: "012356",
};
