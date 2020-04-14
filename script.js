// Load external HTML file
function load(url, element) {
  req = new XMLHttpRequest();
  req.open("GET", url, false);
  req.send(null);
  element.innerHTML = req.responseText;
}

load("header.html", document.getElementById("loadHeader"));

// Calculate experience duration
let supervisorStart = new Date("11/01/2018");

function timeSince(date) {
  let timeDifference = new Date().getTime() - date.getTime();
  let monthDifference = Math.floor(timeDifference / (2592000000)); // 1000 * 60 * 60 * 24 * 30

  let years = Math.floor(monthDifference / 12);
  let months = monthDifference - (years * 12);
  let d = "";

  if (years !== 0 && years > 1) {
    d += years + " years";
  } else if (years !== 0 && years === 1) {
    d += years + " year";
  }

  if (years !== 0 && months !== 0) {
    d += ", ";
  }

  if (months !== 0 && months > 1) {
    d += months + " months";
  } else if (months !== 0 && months === 1) {
    d += months + " month";
  }

  return d;
}

document.getElementById("supervisor-duration").innerHTML += " (" + timeSince(supervisorStart) + ")";
