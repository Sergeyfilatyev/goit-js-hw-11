import axios from 'axios';
import refs from './refs';

const API_KEY = '29648653-4a0943b69a497c54fdb933d14';
const API_URL = 'https://pixabay.com/api/';

export default class NewApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }
  async fetchPictures() {
    const dataPictures = await axios(
      `${API_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );

    const pictures = dataPictures.data.hits;
    pictures.map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        const markup = `<a href="${largeImageURL}"><div class="photo-card">
  <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" width="360" height="240" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div></a>`;
        this.createMarkup(markup);
      }
    );

    return dataPictures;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  createMarkup(markup) {
    refs.gallery.insertAdjacentHTML('beforeend', markup);
  }
}
