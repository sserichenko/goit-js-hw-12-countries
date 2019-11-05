import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';
const input = document.querySelector('.input');
const ul = document.querySelector('.country');
input.addEventListener('input',
debounce(e => {
  fetchCountries(e.target.value)
  .then(data => {
      if (data.length <= 10 && data.length !== 1) {
        PNotify.error({
          text: 'Too much matches found. Please enter a more specific query!',
          addClass: 'custom nonblock',
          delay: 2000,
          icon: true,
        });
        return data.reduce((acc, item) => {
          acc += `<li>${item.name}</li>`;
          return (ul.innerHTML = acc);
        }, '');
      }
      if (data.length === 1) {
        return data.reduce((acc, item) => {
          console.log('item', item)
          acc += `<h2 class="country__title">${
            item.name
          }</h2><div class="country__wrapper">
          <div class="left__side">
          <p><span style="font-weight: bold">Capital: </span>${item.capital}</p>
          <p><span style="font-weight: bold">Population: </span>${
            item.population
          } citizens</p>
          <p><span style="font-weight: bold">Languages: </span>
          <ul>
          ${item.languages.reduce((acc, cur) => {
            return (acc += `<li>${cur.name}</li>`);
          }, '')}
          </ul></p>
          </div>
          <div class="right__side"><img src="${
            item.flag
          }" width="500" height="400" alt="Flag"></div>`;
          return (ul.innerHTML = acc);
        }, '');
      } else {
        return '';
      }
    })
    .catch(err => console.log(err));
  }, 1000));


