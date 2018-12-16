const axios = require('axios');

function searchResultsHTML(stores) {
  return stores.map(store => {
    return `
      <a href="/store/${store.slug}" class="search__result">
        <strong>${store.name}</strong>
      </a>
    `;
  }).join('');
};

function typeAhead(search) {
  if (!search) return;

  const searchInput = search.querySelector('input[name="search"]');
  const searchResults = search.querySelector('.search__results');

  searchInput.on('input', function() {
    // Si no hay nada escrito, no hay nada que buscar
    if (!this.value) {
      searchResults.style.display = 'none';
      return;
    }
    // Mostramos los resultados
    searchResults.style.display = 'block';
    searchResults.innerHTML = '';

    // Axios permite obtener ell json
    axios.get(`/api/search?q=${this.value}`)
      .then(res => {
        if (res.data.length) {
          const html = searchResultsHTML(res.data);
          searchResults.innerHTML = html;
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
};

export default typeAhead;
