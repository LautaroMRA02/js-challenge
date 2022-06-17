const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
// const API = "https://api.escuelajs.co/api/v1/products";
const API = (page) => `https://api.escuelajs.co/api/v1/products?offset=${page}&limit=10`;

localStorage.setItem('pagina', 5)


const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      if (response.length == 0 ) return 
      else {
        let products = response;
        console.log(products)
        let output = products.map(product => {
          return `<article class="Card" id="${product.id}">
                      <img src="${product.images[0]}" src="imagen.png" />
                      <h2>
                        Producto: ${product.title}
                        <small>$ ${product.price}</small>
                      </h2>
                  </article>`
        });
        let newItem = document.createElement('section');
        newItem.classList.add('Item');
        output.forEach(element => {
          newItem.innerHTML += element;
        });
        $app.appendChild(newItem);
      }
    })
    .catch(error => console.log(error));
}

const loadData = async() => {
  setTimeout(()=>{
    getData(API(localStorage.getItem('pagina')));
    intersectionObserver.observe($observe)
  },2000)
}
const intersectionObserver = new IntersectionObserver(entries => {
  let paginaNext = 10 + Number(localStorage.getItem("pagina"))
  localStorage.setItem("pagina",paginaNext)
  loadData()
} );









window.addEventListener('load',() => {
  loadData()
})
