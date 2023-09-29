const itemsContainer = document.querySelector('.items-container');
const jsonFileUrl = 'https://voodoo-sandbox.myshopify.com/products.json?limit=12';
const cartButton = document.getElementById('cartButton');
const cartOverlay = document.getElementById('cartOverlay');
const closeButton = document.getElementById('closeButton');
let cart=[];
let items=[];

function displayItems(items){
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
    cart.push(itemId);
    displayCartItems();
}

function displayCartItems(){
    const cartItemsContainer=document.getElementById('cartItem')
    cartItemsContainer.innerHTML=''

    if (cart.length===0){
        cartItemsContainer.classList.add('hidden');//ховаємо контейнер якщо нема чого показувати
        return
    }
    cartItemsContainer.classList.remove('hidden');//показуємо (ховаємо hidden) елементи

    //додаємо кожен товар у кошик до відображення
    cart.forEach(itemId => {
        const cartItemDev=document.createElement('div')
        const item =items.find(item=>item.id===itemId)

        if(item){
            
            const variants=item.variants[0]
            cartItemsContainer.innerHTML += `
                <div class="cart-item flex justify-between">
                <div class="h-20 w-20 rounded" style="border: 1px solid rgb(255, 255, 255);"></div>

                    <div>
                        <div>${item.title}</div>
                        <div>${variants.price}</div>
                    </div>
                    <div>
                        <button onclick="removeFromCart(${itemId})"><img src="./img/Vector.png"></button>
                    </div>     
                </div>
            `;
        }
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


