import axios from 'axios';
import createMarkup from './markup';
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
    createMarkup(pictures);
    return dataPictures;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
