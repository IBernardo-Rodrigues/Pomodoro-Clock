const Elements = {
  $controlTimes: document.querySelector('.control-times'),
  
  $displayHour: document.querySelector('.clock-circle p'),
  
  $btnPlayPause: document.querySelector('.btn-play-pause'),
  
  $modalWork: document.querySelector('.modal-work'),
  
  $modalRest: document.querySelector('.modal-rest'),
  
  $btnSignOut: document.querySelectorAll('.content-signout'),
  
  $menuHamburgerIcon: document.querySelector('.menu-icon'),
  
  $navbar: document.querySelector('.navbar'),
}

const times = {
  shortRest: 5 * 60,
  longRest: 15 * 60,
  workingTime: 25 * 60,
  allShift: 4
}

const infosClock = {
  timeRemaining: times.workingTime,
  isPaused: true,
  isWorking: true,
  fullShift: 0,
  loop: null,
}

function playPause() {
  
  if (infosClock.isPaused) {
    infosClock.isPaused = false;
    infosClock.loop = setInterval(updateClock, 1000);
  } else {
    infosClock.isPaused = true;
    clearInterval(infosClock.loop);
  }
  
  contentButtonPlayPause();
}


function updateClock() {
  const { $displayHour } = Elements;
  
  isFinished();

  $displayHour.innerHTML = returnFormatedTime();
}

function restProps() {      
  infosClock.isWorking = false;
  infosClock.isPaused = true;
  infosClock.timeRemaining = infosClock.fullShift == 4 ? times.longRest : times.shortRest;
}

function workProps() {
  infosClock.isPaused = true;
  infosClock.isWorking = true;
  infosClock.timeRemaining = times.workingTime;
}

function isFinished() {
  if (infosClock.timeRemaining < 0) {
    
    clearInterval(infosClock.loop);
    
    if (infosClock.isWorking) {
      infosClock.fullShift += 1;
      restProps();
    } else {
      workProps();
    }
    
    
    const modalForOpen = infosClock.isWorking ? "work" : "rest";
    
    openModal(modalForOpen);
    
    contentButtonPlayPause();
    
    counts();
    
    loopFour();
  }
}

function loopFour() {
  if (infosClock.fullShift >= 4) {
    infosClock.fullShift = 0;
  }
}

function returnFormatedTime() {
  
  const currentTime = infosClock.timeRemaining;
  
  const formatedHour = Math.floor(currentTime / 60);
  
  const formatedSeconds = Math.floor(currentTime % 60);
  
  infosClock.timeRemaining -= 1;
  
  return `${formatTime(formatedHour)}:${formatTime(formatedSeconds)}`;
}


function contentButtonPlayPause() {
  const { $btnPlayPause } = Elements;

  $btnPlayPause.textContent = infosClock.isPaused ? "Play" : "Pause";
}

function counts() {
  const { $controlTimes } = Elements;
  
  $controlTimes.innerHTML = `${infosClock.fullShift}/4`
}

function formatTime(time) {
  if (time < 10) {
    return `0${time}`;
  } 
  
  return time;
}

function openModal(whichModal) {
  const { $modalWork, $modalRest } = Elements;
  
  if (whichModal === "work") {
    $modalWork.classList.add('modal-active');
  } else {   
    $modalRest.classList.add('modal-active');
  }
  
}

function closeModal() {
  const { $modalWork, $modalRest } = Elements;
  
  $modalRest.classList.remove('modal-active');
  
  $modalWork.classList.remove('modal-active');
}

// =================== LISTENERS

const { 
  $btnPlayPause,
  $btnSignOut,
  $menuHamburgerIcon,
  $navbar } = Elements;

$btnPlayPause.addEventListener('click', playPause);

$btnSignOut.forEach((current) => {
  current.addEventListener('click', closeModal);
});

$menuHamburgerIcon.addEventListener('click', () => {
  $navbar.classList.toggle('navbar-active');
})
