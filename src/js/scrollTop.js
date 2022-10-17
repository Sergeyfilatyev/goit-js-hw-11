import refs from './refs';
import throttle from 'lodash.throttle';
export default document.addEventListener(
  'scroll',
  throttle(btnVisibility, 300)
);
refs.btnTop.addEventListener('click', throttle(scrollTop, 300));

function scrollTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function btnVisibility(e) {
  if (window.scrollY > 400) {
    refs.btnTop.classList.remove('btn-hidden');
  } else {
    refs.btnTop.classList.add('btn-hidden');
  }
}
