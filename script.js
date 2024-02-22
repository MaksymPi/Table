let draggingElementId; // Переменная для сохранения id перетаскиваемой ячейки
let draggedCellStyle; // Переменная для сохранения стилей перетаскиваемой ячейки

function handleDragStart(event) {
    draggingElementId = event.target.id; // Сохраняем id перетаскиваемой ячейки
    draggedCellStyle = event.target.style.cssText; // Сохраняем стили перетаскиваемой ячейки
}

function handleDropCell(event, rowIndex, colIndex) {
    event.preventDefault();
    const droppedCell = event.target;
    const draggedCell = document.getElementById(draggingElementId); // Получаем перетаскиваемую ячейку по ее id
    const targetCell = document.getElementById(`cell-${rowIndex}-${colIndex}`);
    const draggedContent = draggedCell.innerHTML;
    const droppedContent = droppedCell.innerHTML;
    
    // Обмениваем содержимое ячеек
    draggedCell.innerHTML = droppedContent;
    droppedCell.innerHTML = draggedContent;

    // Восстанавливаем стили ячеек
    draggedCell.style.cssText = droppedCell.style.cssText;
    droppedCell.style.cssText = draggedCellStyle;

    draggingElementId = null; // Обнуляем значение переменной
    draggedCellStyle = null; // Обнуляем значение переменной
}



function handleDropColumn(event, colIndex) {
    event.preventDefault();
    const table = document.getElementById('myTable');
    const draggedCell = document.getElementById(draggingElementId);
    if (draggingElement.tagName === 'TH') {
        const cols = Array.from(table.querySelectorAll('tr')).map(row => row.children[colIndex]);
        cols.forEach((col, index) => {
            const targetCol = table.rows[index].children[colIndex];
            table.rows[index].insertBefore(col, targetCol);
        });
    } else if (draggingElement.tagName === 'TD') {
        const rowIndex = parseInt(draggingElement.id.split('-')[1]);
        const targetRow = table.rows[rowIndex - 1];
        const cols = Array.from(targetRow.children);
        cols.forEach((col, index) => {
            const targetCol = table.rows[index].children[colIndex - 1];
            table.rows[index].insertBefore(col.cloneNode(true), targetCol);
        });
    }
}

function handleDragOver(event) {
    event.preventDefault();
}
