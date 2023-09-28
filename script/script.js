const itemsContainer = document.querySelector('.items-container');
const jsonFileUrl = 'https://voodoo-sandbox.myshopify.com/products.json?limit=12';

fetch(jsonFileUrl)
  .then(response => response.json())
  .then(data => {
    const items = data.products; // Обратите внимание на изменение здесь

    console.log(items);

    // Создание HTML-элементов для каждого товара
    const itemElements = items.map(item => {
      return `
        <div class="item">
          <div>${item.title}</div>  <!-- Исправлено на item.title -->
          <div>${item.product_type}</div>
        </div>
      `;
    });

    // Добавление элементов на страницу
    itemsContainer.innerHTML = itemElements.join('');
  })
  .catch(error => console.error('Ошибка при загрузке данных из JSON:', error));
