// ---------- FUNCTION DEFINITIONS ----------
// Load external HTML file
function load(url, element) {
  req = new XMLHttpRequest();
  req.open("GET", url, false);
  req.send(null);
  element.innerHTML = req.responseText;
}

// Closes navigation bar on mobile devices when scrolling to a section on the same page
function toggleNavbarCollapse() {
  $("#navigation-bar").collapse('hide');
}

// Edits link labels on navigation bar for small devices
function editNavBarLabels() {
  let navBarWidth = parseInt(getComputedStyle(document.getElementById("navigation-bar")).width)
  let projectLabel = document.getElementById("navbar-projects-link");

  if (navBarWidth >= 475 || isNaN(navBarWidth)) {
    projectLabel.innerHTML = "Projects & Interests"
  } else {
    projectLabel.innerHTML = "Projects"
  }
}

// Animate homepage hero
function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
  }
  else var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return null;
}

// Calculates experience duration
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

// ---------- EVENT LISTENERS ----------
window.addEventListener("DOMContentLoaded", function() {
  // Hero animations
  if (window.location.pathname == "/" || window.location.pathname == "/index.html") {
    var firstVisit = readCookie("firstVisit");
    if (firstVisit === "false" || window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches === true) {
      $("#home-hero-img-mobile, #home-hero-img-desktop").css("opacity", 1);
      $(".hero-text").show();
    } else {
      $("#hero-index-mobile .hero-text").animate({ opacity: 'toggle' }, 1000, function() {
        $("#home-hero-img-mobile").fadeTo(1500, 1);
      });
      $("#home-hero-img-desktop").fadeTo(1500, 1, function() {
        $("#hero-index-desktop .hero-text").animate({ height: 'toggle', opacity: 'toggle' }, 1000);
      });
      createCookie("firstVisit", "false", 0);
    }
  } else if (window.location.pathname == "/ayjackson.html" || window.location.pathname == "/carleton.html") {
    $(".edu-hero-logo, .edu-hero-title").animate({ opacity: 'toggle' }, 1000, function() {
      $(".edu-hero-subtitle").fadeTo(500, 1);
    });
  } else if (window.location.pathname == "/projects.html") {
    $(".hero-text").animate({ opacity: 'toggle' }, 1000);
  }
  
  // Experience duration
  if (window.location.pathname == "/" || window.location.pathname == "/index.html" || window.location.pathname == "/carleton.html") {
    let supervisorStart = new Date("11/01/2018");
    let ccssStart = new Date("10/01/2020");
    document.getElementById("supervisor-duration").innerHTML += " (" + timeSince(supervisorStart) + ")";
    for (let element of document.getElementsByClassName("cu-volunteer-duration")) {
      element.innerHTML += " (" + timeSince(ccssStart) + ")";
    }
  }
});
window.addEventListener('load', editNavBarLabels)
window.addEventListener('resize', editNavBarLabels);
load("header.html", document.getElementById("loadHeader"));

