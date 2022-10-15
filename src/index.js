import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewApiService from './api-service';
import refs from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

refs.search.addEventListener('click', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

const simpleLightbox = new SimpleLightbox('.gallery a', {});
const newApiService = new NewApiService();

async function onSearch() {
  newApiService.searchQuery = refs.input.value;
  newApiService.resetPage();
  refs.gallery.innerHTML = '';
  event.preventDefault();
  if (!newApiService.searchQuery) {
    refs.loadMore.classList.add('hidden');
    return Notify.info(
      'The input field must not be empty. Please enter something.'
    );
  }
  const dataPictures = await newApiService.fetchPictures();
  const pictures = dataPictures.data.hits;
  const totalPictures = dataPictures.data.totalHits;
  simpleLightbox.refresh();

  if (pictures.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    Notify.success(`Hooray! We found ${totalPictures} images.`);
  }
  if (refs.gallery.innerHTML) {
    refs.loadMore.classList.remove('hidden');
  }
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

async function onLoadMore() {
  const dataPictures = await newApiService.fetchPictures();
  newApiService.incrementPage();
  simpleLightbox.refresh();
}
