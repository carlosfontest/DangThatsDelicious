import axios from 'axios';
// Sirve para que si en algún momento una persona guarda como nombre un onload, ahi se va a ejecutar un
// script, entonces no se ejecuta.
import dompurify from 'dompurify';

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

    // Axios permite obtener ell json
    axios.get(`/api/search?q=${this.value}`)
      .then(res => {
        if (res.data.length) {
          const html = searchResultsHTML(res.data);
          searchResults.innerHTML = dompurify.sanitize(html);
        } else {
          // No hay ningun resultado
          searchResults.innerHTML = dompurify.sanitize(`<div class="search__result">No results for ${this.value} found!</div>`);
        }
      })
      .catch(error => {
        console.error(error);
      });
  });

  // Handle keyboards inputs
  searchInput.on('keyup', (e) => {
    // Si no se presiona arriba, abajo o enter
    if (![38, 40, 13].includes(e.keyCode)) {
      return;
    }
    const activeClass = 'search__result--active';
    const current = search.querySelector(`.${activeClass}`);
    const items = search.querySelectorAll('.search__result');
    let next;

    // Si pisa abajo y hay un current
    if (e.keyCode === 40 && current) {
      // El próximo o si no hay próximo (está en el último) será el primero
      next = current.nextElementSibling || items[0];
    } else if (e.keyCode === 40) {
      next = items[0];
    } else if (e.keyCode === 38 && current) {
      next = current.previousElementSibling || items[items.length - 1];
    } else if (e.keyCode === 38) {
      next = items[items.length - 1];
    } else if (e.keyCode === 13 && current.href) {
      window.location = current.href;
      return;
    }

    if (current) {
      current.classList.remove(activeClass);
    }
    next.classList.add(activeClass);

  });
};

export default typeAhead;
