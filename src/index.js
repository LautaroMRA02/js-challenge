const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
// const API = "https://api.escuelajs.co/api/v1/products";
const API = (page) => `https://api.escuelajs.co/api/v1/products?offset=${page}&limit=20`;

var pagina = 5
// localStorage.setItem('pagina', 5)


const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      if (response.length == 0 ){ 
        intersectionObserver.unobserve($observe)
        let newItem = document.createElement('section');
        newItem.classList.add('Item');
        newItem.innerHTML += `
                <article class="Card">
                      <h2>
                      Todos los productos Obtenidos
                      </h2>
                  </article>
        `  
        $app.appendChild(newItem);
        return 
      }
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
    getData(API(pagina));
    intersectionObserver.observe($observe)
  },1000)
}
const intersectionObserver = new IntersectionObserver(entries => {
  pagina += 20 
  loadData()
} );









window.addEventListener('load',() => {
  loadData()
})
