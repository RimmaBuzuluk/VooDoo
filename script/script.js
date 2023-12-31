//////для того щоб побачити роботу пагінацію на 22 строці треба змінити itemsPerPage = 24; наприкладна 4 або на інше
//мале число, бо елеметів у файлі json 12, а обмеження кількості елементів на сторінці 24

const itemsContainer = document.querySelector('.items-container');
const jsonFileUrl = 'https://voodoo-sandbox.myshopify.com/products.json?limit=12';
const cartButton = document.getElementById('cartButton');
const cartOverlay = document.getElementById('cartOverlay');
const closeButton = document.getElementById('closeButton');
const totalAmountDiv = document.getElementById('totalAmountDiv')
let cart=[];
let items=[];
const itemQuantities = {}
let currentPage = 1;


function displayItems(items){
     // Разбиваем товары на строки, по 4 товара в каждой строке
     const rows = [];
    ///пагінація
     
 const totalItems = items.length; // Загальна кількість елементів
 const itemsPerPage = 24; // Кількість елементів на одній сторінці
 const totalPages = Math.ceil(totalItems / itemsPerPage); // Загальна кількість сторінок



 function showPage(pageNumber) {
   
   const startItem = (pageNumber - 1) * itemsPerPage;//номер першого елементу на сторінці
   const endItem = startItem + itemsPerPage;//НОМЕР ОСТАННЬОГО ЕЛЕМЕНТУ(ЙОГО НЕ ВКЛЮЧАЕМО)
  
   const buttons = document.querySelectorAll('#pagination button');
  buttons.forEach(button => {
    button.classList.remove('active-button');
  });

  // Highlight the clicked button
  const button = document.getElementById(`page-button-${pageNumber}`);
  if (button) {
    button.classList.add('active-button');
  }
 


   const itemsToShow = items.slice(startItem, endItem);
  //перш ніж показувати товари видаляемо те що було показано попередньо 
  itemsContainer.innerHTML=' ';
   const rows=[]
   console.log(itemsContainer.innerHTML=' ')
   for (let i = 0; i < itemsToShow.length; i += 4) {
    const rowItems = itemsToShow.slice(i, i + 4).map(item => {
      
      const item_= itemsToShow[i]
      
      return `
        <div class="item w-full md:w-1/4 lg:w-1/4 p-1 mb-16 " style="height: 402px;">
          <div class="rounded" style="height: 300px; border: 1px solid black;">
              <button id="${item.id}" onClick="showItemInfo(${item.id})" class="bg-black text-white ml-3 mt-3 rounded w-12 h-6">USED</button>
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

    rows.push(`<div class="items-container-flex">${rowItems}</div>`);
  }
  
  
  itemsContainer.innerHTML = rows.join('');
 }
 showPage(1);
 

 function generatePaginationButtons() {
   
   const paginationElement = document.getElementById('pagination');
   paginationElement.innerHTML = ''; // Очищаем кнопки, которые уже были добавлены
 
   for (let i = 1; i <= totalPages; i++) {
     
     const button = document.createElement('button');
     button.classList.add('w-10' ,'mx-2', 'h-10', 'bg-white', 'text-black', 'rounded-3xl');
     button.style.border = '1px solid black';
     button.textContent = i;
     button.id = `page-button-${i}`;  // Set id for each button

    if (i === 1) {
      button.classList.add('active-button');  // Add the class to the first button
    }

     button.addEventListener('click', () => showPage(i));
     paginationElement.appendChild(button);
   }
   
 }
 generatePaginationButtons()



}

/////////////////////відкривати закривати корзину///////////////////////////////////
cartButton.addEventListener('click', () => {
    cartOverlay.classList.remove('hidden'); // Видаляємо клас "hidden"  
});

closeButton.addEventListener('click', () => {
    cartOverlay.classList.add('hidden'); // Додаємо клас "hidden" 
});
///////////////////////////////////////////////////////////////

function addToCart(itemId){
  if(cart.includes(itemId)){
    console.log("товар уже есть в корине ");
    increaseQuantity(itemId);
    return;
  }
    cart.push(itemId);
    displayCartItems();
}

function displayCartItems(){
    const cartItemsContainer=document.getElementById('cartItem')
    cartItemsContainer.innerHTML=''

    let totalAmount=0;

    if (cart.length===0){
        cartItemsContainer.classList.add('hidden');//ховаємо контейнер якщо нема чого показувати
        return
    }
    cartItemsContainer.classList.remove('hidden');//показуємо (ховаємо hidden) елементи

    //додаємо кожен товар у кошик до відображення
    cart.forEach(itemId => {
        // const cartItemDev=document.createElement('div')
        const item =items.find(item=>item.id===itemId)
        
        if(item){
            const quantity=itemQuantities[item.id]||1
            const variants=item.variants[0]
            const itemPrice=parseFloat(variants.price)*quantity

            totalAmount += itemPrice;

            cartItemsContainer.innerHTML += `
                <div class="cart-item flex justify-between mb-10">
                <div class="h-20 w-20 rounded" style="border: 1px solid rgb(255, 255, 255);"></div>
                    <div class="w-56 h-16 ml-4" >
                        <div>${item.title}</div>
                        <div>${variants.price}</div>
                        <div class="flex">
                          <button onClick={decreaseQuantity(${itemId})}>
                            <div class="flex items-center justify-center w-5 h-5"><img src="./img/-.png"></div>
                          </button>
                          <div>${quantity}</div>
                          <button onClick={increaseQuantity(${itemId})}>
                            <div class="flex items-center justify-center w-5 h-5"><img src="./img/+.png"></div>
                          </button>
                        </div>
                    </div>
                    <div>
                        <button onclick="removeFromCart(${itemId})"><img src="./img/Vector.png"></button>
                    </div>     
                </div>
            `;
        }
    });

    const maxHeight = 500; // Максимальна висота в пікселях
  const currentHeight = cartItemsContainer.scrollHeight;
  cartItemsContainer.style.height = currentHeight > maxHeight ? `${maxHeight}px` : 'auto';

  totalAmountDiv.textContent = `${totalAmount} KR`;

  return totalAmount;

}

////increament and decrement

function increaseQuantity(itemId){ 
  const currentQuantity=itemQuantities[itemId] || 1;

  itemQuantities[itemId]=currentQuantity+1
 
  displayCartItems();
}

function decreaseQuantity(itemId){
  const currentQuantity=itemQuantities[itemId] || 1;
  if(currentQuantity>0){
    itemQuantities[itemId]=currentQuantity-1
    console.log(itemQuantities[itemId])
    displayCartItems();
  }
}

function removeFromCart(itemId) {
  const index = cart.indexOf(itemId);
  
  // Перевіряємо, чи знайдено елемент
  if (index !== -1) {
    cart.splice(index, 1);
    //робимо значення кількості 0, щоб при повторному додаванні елементу не поверталось старе значення
    const currentQuantity=itemQuantities[itemId] || 1;
  if(currentQuantity>0){
    itemQuantities[itemId]=0
  }
    displayCartItems();
  }
}
/////////////////////////відкривання повної інформації про товар//////////////////////

function showItemInfo(itemId) {
  const itemDetailsDiv = document.getElementById('product_information');
  const closeButton = itemDetailsDiv.querySelector('button');
  const product = document.getElementById('prodact'); // Typo corrected to 'product'

  const selectedItem = items.find(item => item.id === itemId);

  if (selectedItem) {
    let imagesHTML = '';

    // Check if the image has a valid src and only display it if it does
    for (const image of selectedItem.images) {
      if (image.src) {
        imagesHTML += `<div class="w-16 h-16"><img src="${image.src}" alt="${selectedItem.title}"></div>`;
      }
    }

    const productInformation = `
    <div class="p-4 border border-gray-300 rounded shadow-md">
    <h2 class="text-xl font-bold mb-2">${selectedItem.title}</h2>
    <p class="text-sm mb-2">Published: ${selectedItem.published_at}</p>
    <p class="text-sm mb-2">Created: ${selectedItem.created_at}</p>
    <p class="text-sm mb-2">Handle: ${selectedItem.handle}</p>
    <p class="text-sm mb-2">Vendor: ${selectedItem.vendor}</p>
    <p class="text-sm mb-2">Product Type: ${selectedItem.product_type}</p>
    <p class="text-sm mb-2">Type: ${selectedItem.type}</p>
  
    <h3 class="text-lg font-semibold mt-4 mb-2">Variants:</h3>
    <ul>
      <li>
        
        <ul>
          <li>Title: ${selectedItem.variants.title}</li>
          <li>Option 1: ${selectedItem.variants.option1}</li>
          <li>Option 2: ${selectedItem.variants.option2 || 'N/A'}</li>
          <li>Option 3: ${selectedItem.variants.option3 || 'N/A'}</li>
          <li>SKU: ${selectedItem.variants.sku}</li>
          <!-- Add more variant details as needed -->
        </ul>
      </li>
    </ul>
  
    <h3 class="text-lg font-semibold mt-4 mb-2">Images:</h3>
    <div class="flex flex-wrap gap-2">
      ${selectedItem.images.map(image => `
        <div class="w-16 h-16">
          <img src="${image.src}" alt="Product Image">
        </div>
      `).join('')}
    </div>
  </div>
    `;

    product.innerHTML = productInformation;
  }

  window.scrollTo(0, 0);
  itemDetailsDiv.classList.remove('hidden');

  closeButton.addEventListener('click', () => {
    itemDetailsDiv.classList.add('hidden');
  });
}

 

/////////////////відображення всіх елементів json//////////////////////////////
fetch(jsonFileUrl)
  .then(response => response.json())
  .then(data => {
     items = data.products;
    displayItems(items)
  })
  .catch(error => console.error('Ошибка при загрузке данных из JSON:', error));