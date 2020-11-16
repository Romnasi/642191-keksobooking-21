// avatar.js
'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const DEFAULT_PHOTO = `img/muffin-grey.svg`;

// Аватар
const avatarFileChooser = document.querySelector(`.ad-form-header__input`);
const avatarPreviewBlock = document.querySelector(`.ad-form-header__preview`);
const avatarPreview = avatarPreviewBlock.querySelector(`img`);

// Фотография жилья
const photoFileChooser = document.querySelector(`.ad-form__input`);
const photoPreviewBlock = document.querySelector(`.ad-form__photo`);
const photoPreview = photoPreviewBlock.querySelector(`img`);


const showPreview = (fileChooser, preview) => {
  fileChooser.addEventListener(`change`, () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

const resetPreview = () => {
  avatarPreview.src = DEFAULT_PHOTO;
  photoPreview.src = DEFAULT_PHOTO;
};

showPreview(avatarFileChooser, avatarPreview);
showPreview(photoFileChooser, photoPreview);

window.preview = {
  resetPreview
};
