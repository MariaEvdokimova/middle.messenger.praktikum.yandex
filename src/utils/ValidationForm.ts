const REG_NAME = /([^А-ЯЁA-Z\-])/gi;
const REG_LOGIN = /[^A-Z\-_0-9]/gi;
const REG_LATIN = /[a-z]/i;
const REG_EMAIL = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const REG_PASS = /(?=.*[0-9])(?=.*[A-Z])/g;
const REG_PHONE = /(?:\+|\d)[\d]/g;

export const validationForm = (name: string, str: string): string => {
  if (str.length === 0) {
    return 'Все поля должны быть заполнены';
  }

  if (name === 'first_name' || name === 'second_name') {
    if (REG_NAME.test(str)) {
      return 'В поле First name и Second name допустимы только латиница, кирилица или дефис';
    }
    if (str[0] !== str[0].toUpperCase()) {
      return 'В поле First name и Second name первая буква должна быть заглавной';
    }
  }

  if (name === 'login') {
    if (str.length < 3 || str.length > 20) {
      return 'У поля Login длина от 3 до 20 символов';
    }
    if (REG_LOGIN.test(str) || !REG_LATIN.test(str)) {
      return 'Login только латиницей, может содержать цифры, символы - и _';
    }
  }

  if (name === 'email') {
    if (!REG_EMAIL.test(str)) {
      return 'Email - латинский алфавит, может включать цифры, -,_,. и обязательно @ . после неё,';
    }
  }

  if (name === 'password' || name === 'oldPassword' || name === 'newPassword') {
    if (str.length < 8 || str.length > 40) {
      return 'Поле Password - длина от 8 до 40 символов';
    }
    if (!REG_PASS.test(str)) {
      return 'Поле Password - обязательно хотя бы одна заглавная буква и цифра';
    }
  }

  if (name === 'phone') {
    if (str.length < 10 || str.length > 15) {
      return 'Поле Phone - длина от 10 до 15 символов';
    }
    if (!REG_PHONE.test(str)) {
      return 'Поле Phone - состоит из цифр, может начинается с плюса';
    }
  }

  return '';
};
