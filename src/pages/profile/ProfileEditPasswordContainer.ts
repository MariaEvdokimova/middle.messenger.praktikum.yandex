import {Button} from '../../components/button/Button';
import {Form} from '../../components/form/Form';
import {Input} from '../../components/input/Input';
import { Link } from '../../components/link/Link';
import { Classes } from '../../css/classes';
import { router } from '../../services/Router';
import { ProfileEditPasswordPage } from './ProfileEditPassword';
import nerrow from '../../../static/img/nerrow.svg';
import { userController } from '../../controllers/UserController';

const linkNerrow = new Link({
  img: nerrow,
  classImg: 'profile__nerrow-img',
  events: {
    click: () => {
        router.back();
    }
  }
});

const inputs: Array<Input> = [];

const inputOldPassword = new Input({
  name: 'oldPassword',
  type: 'password',
  classInput: 'info__item-value profile__form-input',
  classLable: 'info__item-name profile__form-label',
  lable: 'Старый пароль',
  attr: {
    class: 'profile__form-item',
  },
});

const inputNewPassword = new Input({
  name: 'newPassword',
  type: 'password',
  classInput: 'info__item-value profile__form-input',
  classLable: 'info__item-name profile__form-label',
  lable: 'Новый пароль',
  attr: {
    class: 'profile__form-item',
  },
<<<<<<< HEAD
  {
    name: 'password_conf',
    lable: 'Повторите новый пароль',
  }
];
=======
});

const inputPasswordConf = new Input({
  name: 'newPassword',
  type: 'password',
  classInput: 'info__item-value profile__form-input',
  classLable: 'info__item-name profile__form-label',
  lable: 'Повторите новый пароль',
  attr: {
    class: 'profile__form-item',
  },
});
inputs.push(inputOldPassword,inputNewPassword,inputPasswordConf);
>>>>>>> 25bb91e524ae038313b1a9c4f441dadd5a4399d8

const profileSavePassButton = new Button({
  value: 'Save',
  classImg: 'visually-hidden',
  attr: {
    type: 'submit',
  },
});

<<<<<<< HEAD
  inputsDataProfileEditPass.forEach(( value: Record<string, string> ) => {
    const inputItem = new Input({
      name: value.name,
      type: 'password',
      classInput: 'info__item-value profile__form-input',
      classLable: 'info__item-name profile__form-label',
      lable: value.lable,
      attr: {
        class: 'profile__form-item'
      },
    });
    inputsProfileEditPassword.push(inputItem);
  });
=======
const formProfileEditPassword = new Form({
  inputs: inputs,
  formButton: profileSavePassButton,
  buttonClass: 'profile__button',
  attr: {
    class: 'profile__form',
  },
  events: {
    submit: (event) => {
      event.preventDefault();
      const isValid = formProfileEditPassword.validation(formProfileEditPassword);
      const isPasswordEqual = formProfileEditPassword.isPasswordEqual(formProfileEditPassword, inputNewPassword, inputPasswordConf);
>>>>>>> 25bb91e524ae038313b1a9c4f441dadd5a4399d8

      if ( isValid && isPasswordEqual ) {
        const data = formProfileEditPassword.getObjLog(formProfileEditPassword);
        userController.changePassword( data );          
      }
    },
  },
});

export  const profileEditPassword = new ProfileEditPasswordPage({
  linkNerrow,
  formProfileEditPassword,
  attr: {
    class: Classes.ClassWrapper,
  },
});
