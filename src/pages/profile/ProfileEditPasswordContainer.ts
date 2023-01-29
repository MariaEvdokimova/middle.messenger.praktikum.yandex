import {Classes} from '../..';
import {Button} from '../../components/button/Button';
import {Form} from '../../components/form/Form';
import {Input} from '../../components/input/Input';
import {ProfileEditPassword} from './ProfileEditPassword';

const inputsDataProfileEditPass = [
  {
    name: 'Password_old',
    lable: 'Старый пароль',
  },
  {
    name: 'password',
    lable: 'Новый пароль',
  },
  {
    name: 'password_conf',
    lable: 'Повторите новый пароль',
  },
];

export const profileEditPassword = () => {
  const inputsProfileEditPassword: Array<Input> = [];

  inputsDataProfileEditPass.forEach(( value: Record<string, string> ) => {
    const inputItem = new Input({
      name: value.name,
      type: 'password',
      classInput: 'info__item-value profile__form-input',
      classLable: 'info__item-name profile__form-label',
      lable: value.lable,
      attr: {
        class: 'profile__form-item',
      },
    });
    inputsProfileEditPassword.push(inputItem);
  });

  const profileSavePassButton = new Button({
    value: 'Save',
    classImg: 'visually-hidden',
    attr: {
      type: 'submit',
    },
  });

  const formProfileEditPassword = new Form({
    inputs: inputsProfileEditPassword,
    formButton: profileSavePassButton,
    buttonClass: 'profile__button',
    attr: {
      class: 'profile__form',
    },
    events: {
      submit: (event) => {
        event.preventDefault();
        console.log(formProfileEditPassword.getObjLog(formProfileEditPassword));
        formProfileEditPassword.validation(formProfileEditPassword);
      },
    },
  });

  const profileEditPassword = new ProfileEditPassword({
    formProfileEditPassword,
    attr: {
      class: Classes.ClassWrapper,
    },
  });

  return profileEditPassword;
};
