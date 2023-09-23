const createSortArrow = (cell, cellArrow = null) => {
  const arrow = !!cellArrow;
  const sort = cell.dataset.sort || 'down';

  if (!arrow) {
    cellArrow = document.createElement('span');
    cellArrow.className = 'table__arrow';
    cell.append(cellArrow);
  }

  if (!arrow && sort === 'down' || arrow && sort === 'up') {
    cellArrow.textContent = ' ▾';
    cell.dataset.sort = 'down';
    return;
  }

  cellArrow.textContent = ' ▴';
  cell.dataset.sort = 'up';
};

const sortTable = (target, list, arrow) => {
  const i = target.classList.contains('table__name') ? 1 : 2;
  let rows = Array.from(list.rows);

  rows.sort((a, b) => {
    const firstElem = a.cells[i].textContent;
    const secondElem = b.cells[i].textContent;
    return firstElem.localeCompare(secondElem);
  });

  while (list.firstChild) {
    list.firstChild.remove();
  }

  if (arrow === 'up') {
    rows = rows.reverse();
  }

  list.append(...rows);
};

const sortTableRender = (thead, list) => {
  const cell = thead.querySelector('[data-sort]');

  if (cell?.dataset?.sort === 'down' || cell?.dataset?.sort === 'up') {
    createSortArrow(cell);
    sortTable(cell, list, cell.dataset.sort);
  }
};

export const sortTableControl = (thead, list) => {
  sortTableRender(thead, list);

  thead.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.table__name') || target.closest('.table__surname')) {
      const cell = target.closest('.table__name') ??
        target.closest('.table__surname');
      const oldArrow = thead.querySelector('.table__arrow');
      const cellArrow = cell.querySelector('.table__arrow');

      if (oldArrow && oldArrow !== cellArrow) {
        oldArrow.closest('th').removeAttribute('data-sort');
        oldArrow.remove();
      }

      createSortArrow(cell, cellArrow);

      sortTable(cell, list, cell.dataset.sort);

      localStorage.setItem('sort', JSON.stringify([
        cell.className,
        cell.dataset.sort,
      ]));
    }
  });
};
