'use strict';

{
  const data = [
    {
      name: 'Иван',
      surname: 'Петров',
      phone: '+79514545454',
    },
    {
      name: 'Игорь',
      surname: 'Семёнов',
      phone: '+79999999999',
    },
    {
      name: 'Семён',
      surname: 'Иванов',
      phone: '+79800252525',
    },
    {
      name: 'Мария',
      surname: 'Попова',
      phone: '+79876543210',
    },
  ];

  localStorage.setItem('contacts', JSON.stringify(data));
}

{
  const getStorage = key => JSON.parse(localStorage.getItem(key)) ?? [];

  const setStorage = (key, obj) => {
    const data = getStorage(key);
    data.push(obj);
    localStorage.setItem(key, JSON.stringify(data));
  };

  const removeStorage = (key, phone) => {
    const data = getStorage(key);
    const index = data.findIndex(item => item.phone === phone);
    data.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(data));
  };

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');

    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    const headerContainer = createContainer();

    header.classList.add('header');
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();

    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createButtonGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({ className, type, text }) => {
      const button = document.createElement('button');

      button.type = type;
      button.textContent = text;
      button.className = className;

      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const sortTable = JSON.parse(localStorage.getItem('sort'));
    const sortName = sortTable?.[0] === 'table__name' ?
      `data-sort="${sortTable[1]}"` : '';
    const sortSurname = sortTable?.[0] === 'table__surname' ?
      `data-sort="${sortTable[1]}"` : '';


    table.classList.add('table', 'table-striped');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete">Удалить</th>
        <th class="table__name" ${sortName}>Имя</th>
        <th class="table__surname"${sortSurname}>Фамилия</th>
        <th>Телефон</th>
        <th></th>
      </tr>
    `);

    table.append(thead, tbody);
    table.tbody = tbody;
    table.thead = thead;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    const form = document.createElement('form');
    const buttonGroup = createButtonGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    overlay.classList.add('form-overlay');
    form.classList.add('form');

    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" name="name" id="name" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" name="surname" id="surname" type="text" 
          required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" name="phone" id="phone" type="number" 
          required>
      </div>
    `);

    form.append(...buttonGroup.btns);

    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createRow = ({ name: firstName, surname, phone }) => {
    const tr = document.createElement('tr');
    const tdDel = document.createElement('td');
    const buttonDel = document.createElement('button');
    const tdName = document.createElement('td');
    const tdSurname = document.createElement('td');
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    const tdEdit = document.createElement('td');
    const buttonEdit = document.createElement('button');

    tr.classList.add('contact');

    tdDel.classList.add('delete');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    tdName.textContent = firstName;
    tdSurname.textContent = surname;

    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tdPhone.append(phoneLink);

    tr.phoneLink = phoneLink;

    tdEdit.classList.add('text-right');
    buttonEdit.classList.add('btn', 'btn-primary');
    buttonEdit.textContent = 'Редактировать';
    tdEdit.append(buttonEdit);

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

  const createFooter = title => {
    const footer = document.createElement('footer');
    const footerContainer = createContainer();
    const span = document.createElement('span');

    span.textContent = `Все прова защищены ©${title}`;
    footerContainer.append(span);

    footer.classList.add('footer');
    footer.append(footerContainer);

    return footer;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();
    const { form, overlay } = createForm();
    const footer = createFooter(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);

    app.append(header, main, footer);

    return {
      list: table.tbody,
      thead: table.thead,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
    };
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const createSortArrow = (cell, cellArrow = null) => {
    if (cellArrow) {
      if (cell.dataset.sort === 'down') {
        cellArrow.textContent = ' ▴';
        cell.dataset.sort = 'up';
      } else if (cell.dataset.sort === 'up') {
        cellArrow.textContent = ' ▾';
        cell.dataset.sort = 'down';
      }
    } else {
      const arrow = document.createElement('span');
      arrow.className = 'table__arrow';
      arrow.textContent = cell?.dataset?.sort === 'up' ? ' ▴' : ' ▾';
      cell.append(arrow);
      if (!cell.dataset.sort) {
        cell.dataset.sort = 'down';
      }
    }
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

  const sortTableControl = (thead, list) => {
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

  const modalControl = (btnAdd, btnDel, list, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };

    btnAdd.addEventListener('click', () => {
      if (btnDel.classList.contains('active')) {
        list.querySelectorAll('.delete').forEach(del => {
          btnDel.classList.remove('active');
          del.classList.remove('is-visible');
        });
      }
      openModal();
    });

    formOverlay.addEventListener('click', e => {
      if (e.target === formOverlay || e.target.classList.contains('close')) {
        closeModal();
      }
    });

    return {
      closeModal,
    };
  };

  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      btnDel.classList.toggle('active');

      list.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', e => {
      const contact = e.target.closest('.contact');
      const phone = contact.querySelector('a').textContent;

      if (e.target.closest('.del-icon')) {
        removeStorage('contacts', phone);
        contact.remove();
      }
    });
  };

  const addContactPage = (contact, list) => {
    list.append(createRow(contact));
  };

  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const newContact = Object.fromEntries(formData);

      addContactPage(newContact, list);
      setStorage('contacts', newContact);

      form.reset();
      closeModal();
    });
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const {
      thead,
      list,
      logo,
      btnAdd,
      btnDel,
      formOverlay,
      form,
    } = renderPhoneBook(app, title);

    // Функционал
    const allRow = renderContacts(list, getStorage('contacts'));
    const { closeModal } = modalControl(btnAdd, btnDel, list, formOverlay);

    hoverRow(allRow, logo);

    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    sortTableControl(thead, list);
  };

  window.phoneBookInit = init;
}
