import axios from 'axios';
import { $ } from './bling';

function ajaxHeart(e) {
  // Pausamos el POST
  e.preventDefault();
  // Hacemos el POST
  axios.post(this.action)
    .then(res => {
      // Cambiamos la clase del boton
      const isHearted = this.heart.classList.toggle('heart__button--hearted');
      // res.data es el user porque en storeController en el método heartStore, devolvemos el json con el user
      $('.heart-count').textContent = res.data.hearts.length;

      if (isHearted) {
        console.log(2);
        this.heart.classList.add('heart__button--float');
        setTimeout(() => this.heart.classList.remove('heart__button--float'), 2500);
      }
    })
    .catch(err => console.log(err));
};

export default ajaxHeart;