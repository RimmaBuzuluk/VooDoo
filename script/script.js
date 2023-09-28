const itemsContainer = document.querySelector('.items-container');
const jsonFileUrl = 'https://voodoo-sandbox.myshopify.com/products.json?limit=12';

fetch(jsonFileUrl)
  .then(response => response.json())
  .then(data => {
    const items = data.products;

    // console.log(items);

    // Разбиваем товары на строки, по 4 товара в каждой строке
    const rows = [];
    for (let i = 0; i < items.length; i += 4) {
      const rowItems = items.slice(i, i + 4).map(item => {
        // console.log(item.id)
        return `
          <div class="item w-full md:w-1/4 lg:w-1/4 p-1 mb-16 " style="height: 402px;">
            <div class="rounded" style="height: 300px; border: 1px solid black;">
                indorm blok
            </div>
            <div class="flex h-9 mt-3 mb-3 justify-between">
              <div class="font-bold" style="font-size: 10px;">
                <div>Product name</div>
                <div>${item.title}</div>
              </div>
              <div class="text-right" style="font-size: 14px;">
                <div>Condition</div>
                <div>${item.handle}</div>
              </div>
            </div>
            <button class="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded w-full" 
            onClick="addToCart(${item.id})">
              ADD TO CART
            </button>
          </div>
        `;
      }).join('');

      rows.push(`<div class="flex">${rowItems}</div>`);
    }

    // Добавление строк с товарами на страницу
    itemsContainer.innerHTML = rows.join('');
  })
  .catch(error => console.error('Ошибка при загрузке данных из JSON:', error));



  let cart=[];

  function addToCart(item){
    cart.push(item);
    // console.log('додано у кошик',item)
    // console.log(cart)
}


// function showCartOverlay() {
//     const cartOverlay = document.getElementById('cartOverlay');
//     cartOverlay.classList.remove('hidden');
//   }
  
//   function hideCartOverlay() {
//     const cartOverlay = document.getElementById('cartOverlay');
//     cartOverlay.classList.add('hidden');
//   }


  function addToCart(item) {
    cart.push(item);
    // console.log('додано у кошик', item);
    // console.log(cart);
    showCartOverlay();  // Показати елемент кошика при додаванні в кошик
  }


const cartButton = document.getElementById('cartButton');
const cartOverlay = document.getElementById('cartOverlay');
const closeButton = document.getElementById('closeButton');




cartButton.addEventListener('click', () => {
    cartOverlay.classList.remove('hidden'); // Видаляємо клас "hidden"
    
});

closeButton.addEventListener('click', () => {
    cartOverlay.classList.add('hidden'); // Додаємо клас "hidden"
    
});
