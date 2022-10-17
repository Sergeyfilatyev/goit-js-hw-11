import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './refs';
import NewApiService from './api-service';
import smoothScroll from './smoothScroll';
import throttle from 'lodash.throttle';
import scrollTop from './scrollTop';

refs.searchForm.addEventListener('submit', onSearch);
document.addEventListener('scroll', throttle(onLoadingScroll, 500));

const simpleLightbox = new SimpleLightbox('.gallery-link', {});
const newApiService = new NewApiService();

let pageAmount;
let currentPage;

function onSearch(event) {
  newApiService.resetPage();
  refs.gallery.innerHTML = '';
  event.preventDefault();
  newApiService.searchQuery = refs.input.value;
  if (!newApiService.searchQuery) {
    return Notify.info(
      'The input field must not be empty. Please enter something.'
    );
  }
  event.target.reset();
  async function onFetch() {
    const dataPictures = await newApiService.fetchPictures();
    const pictures = dataPictures.data.hits;
    const totalPictures = dataPictures.data.totalHits;
    pageAmount = dataPictures.data.totalHits / 40;
    currentPage = newApiService.page;
    if (pictures.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.success(`Hooray! We found ${totalPictures} images.`);
    }
    simpleLightbox.refresh();
  }
  onFetch();
}

async function onLoadMore() {
  newApiService.incrementPage();
  const dataPictures = await newApiService.fetchPictures();
  refs.loading.classList.remove('show');
  smoothScroll();
  pageAmount = dataPictures.data.totalHits / 40;
  currentPage = newApiService.page;
  if (currentPage >= pageAmount) {
    refs.loading.classList.remove('show');
    Notify.success(
      "We're sorry, but you've reached the end of search results."
    );
  }

  simpleLightbox.refresh();
}

function onLoadingScroll() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (
    clientHeight + scrollTop >= scrollHeight - 5 &&
    window.scrollY > 400 &&
    currentPage < pageAmount
  ) {
    refs.loading.classList.add('show');
    setTimeout(onLoadMore, 600);
  }
}
