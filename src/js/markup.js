import refs from './refs';

export default function createMarkup(array) {
  const markup = array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a class="gallery-link" href="${largeImageURL}">
  <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" width="320" height="240" />
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
</a>`
    )
    .join('');
  return refs.gallery.insertAdjacentHTML('beforeend', markup);
}
