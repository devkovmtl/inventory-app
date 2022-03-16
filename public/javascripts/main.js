const sideNav = document.querySelector('.sidenav');
const btnCloseSidenav = document.querySelector('.close-sidenav');
const overlay = document.querySelector('.overlay');
const btnShowSidenav = document.querySelector('.open-sidenav');

btnShowSidenav.addEventListener('click', showSidenav);

btnCloseSidenav.addEventListener('click', hideSidenav);
overlay.addEventListener('click', hideSidenav);

function hideSidenav() {
  overlay.classList.remove('active');
  sideNav.classList.remove('active');
}

function showSidenav() {
  overlay.classList.add('active');
  sideNav.classList.add('active');
}
