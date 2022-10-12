import './css/styles.css';
import axios from 'axios';

const DEBOUNCE_DELAY = 300;
axios('https://pixabay.com/api/?key=29648653-4a0943b69a497c54fdb933d14').then(
  console.log
);
