const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
// const API = "https://api.escuelajs.co/api/v1/products";
const API = (page) => `https://api.escuelajs.co/api/v1/products?offset=${page}&limit=10`;
localStorage.setItem('pagina', 5)


const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      console.log(products)
      let output = products.map(product => {
        return `<div><p>${product.title}</p><div>`
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  getData(API(localStorage.getItem('pagina')));
}
const intersectionObserver = new IntersectionObserver(entries => {
  let paginaNext = 10 + Number(localStorage.getItem("pagina"))
  localStorage.setItem("pagina",paginaNext)
  loadData()
});

// , {
//   rootMargin: '0px 0px 100% 0px',
// }







window.addEventListener('load',() => {
  loadData()
  setTimeout(intersectionObserver.observe($observe),20000)
})
