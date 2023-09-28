function calculateItemsPerRow() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth >= 1200) {
      return 4; // Для широких экранов - 4 элемента в ряду
    } else if (screenWidth >= 768) {
      return 3; // Для планшетов - 3 элемента в ряду
    } else {
      return 1; // Для мобильных устройств - 1 элемент в ряду
    }
  }