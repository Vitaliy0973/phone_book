import {createRow} from './createElements.js';
import storage from './serviceStorage.js';

export const hoverRow = (allRow, logo) => {
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

export const modalControl = (btnAdd, btnDel, list, formOverlay) => {
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

export const deleteControl = (btnDel, list) => {
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
      storage.removeStorage('contacts', phone);
      contact.remove();
    }
  });
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

export const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newContact = Object.fromEntries(formData);

    addContactPage(newContact, list);
    storage.setStorage('contacts', newContact);

    form.reset();
    closeModal();
  });
};
