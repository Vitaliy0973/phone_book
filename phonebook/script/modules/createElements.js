const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');

  return container;
};

export const createHeader = () => {
  const header = document.createElement('header');
  const headerContainer = createContainer();

  header.classList.add('header');
  header.append(headerContainer);

  header.headerContainer = headerContainer;

  return header;
};

export const createLogo = title => {
  const h1 = document.createElement('h1');
  h1.classList.add('logo');
  h1.textContent = `Телефонный справочник. ${title}`;

  return h1;
};

export const createMain = () => {
  const main = document.createElement('main');
  const mainContainer = createContainer();

  main.append(mainContainer);
  main.mainContainer = mainContainer;

  return main;
};

export const createButtonGroup = params => {
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('btn-wrapper');

  const btns = params.map(({className, type, text}) => {
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

export const createTable = () => {
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

export const createForm = () => {
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

export const createFooter = title => {
  const footer = document.createElement('footer');
  const footerContainer = createContainer();
  const span = document.createElement('span');

  span.textContent = `Все прова защищены ©${title}`;
  footerContainer.append(span);

  footer.classList.add('footer');
  footer.append(footerContainer);

  return footer;
};

export const createRow = ({name: firstName, surname, phone}) => {
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
