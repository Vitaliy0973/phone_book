import storage from './modules/serviceStorage.js';
import {sortTableControl} from './modules/sort.js';
import {renderContacts, renderPhoneBook} from './modules/render.js';
import * as control from './modules/control.js';

const {hoverRow, modalControl, deleteControl, formControl} = control;

{
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
    const allRow = renderContacts(list, storage.getStorage('contacts'));
    const {closeModal} = modalControl(btnAdd, btnDel, list, formOverlay);

    hoverRow(allRow, logo);

    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    sortTableControl(thead, list);
  };

  window.phoneBookInit = init;
}
