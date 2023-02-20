import {Button} from '../../components/button/Button';
import {Form} from '../../components/form/Form';
import {Input} from '../../components/input/Input';
import {Link} from '../../components/link/Link';
import { authController } from '../../controllers/AuthController';
import { Classes } from '../../css/classes';
import { router } from '../../services/Router';
import {Registration} from './Registration';

const inputData = [
  {
    name: 'email',
    type: 'email',
    lable: 'Mail',
  },
  {
    name: 'login',
    type: 'text',
    lable: 'Login',
  },
  {
    name: 'first_name',
    type: 'text',
    lable: 'First Name',
  },
  {
    name: 'second_name',
    type: 'text',
    lable: 'Second Name',
  },
  {
    name: 'phone',
    type: 'tel',
    lable: 'Phone',
  }
];

const inputs: Array<Input> = [];

inputData.forEach(( value: Record<string, string> ) => {
  const inputItem = new Input({
    name: value.name,
    type: value.type,
    classInput: 'form__input--blue',
    classLable: 'form__label',
    lable: value.lable,
    attr: {
      class: 'form__item',
    },
  });
  inputs.push(inputItem);
});

const inputItemPassword = new Input({
  name: 'password',
  type: 'password',
  classInput: 'form__input--blue',
  classLable: 'form__label',
  lable: 'password',
  attr: {
    class: 'form__item',
  },
});
inputs.push(inputItemPassword);

const inputItemPasswordConf = new Input({
  name: 'password',
  type: 'password',
  classInput: 'form__input--blue',
  classLable: 'form__label',
  lable: 'password (confirm)',
  attr: {
    class: 'form__item',
  },
});
inputs.push(inputItemPasswordConf);

const formButton = new Button({
  value: 'Sign Up',
  classImg: 'visually-hidden',
  attr: {
    type: 'submit',
  },
});

const formRegistration = new Form({
  inputs,
  formButton,
  buttonClass: 'form__item form__item-button',
  events: {
    submit: (event) => {
      event.preventDefault();
      const isValid = formRegistration.validation(formRegistration);
      const isPasswordEqual = formRegistration.isPasswordEqual(formRegistration, inputItemPassword, inputItemPasswordConf);

      if (isValid && isPasswordEqual) {
        const data = formRegistration.getObjLog(formRegistration);
        authController.signup( data )
      }
    },
  },
});

const linkRegistration = new Link({
  value: 'Sign in',
  classImg: 'visually-hidden',
  attr: {
    class: 'link'
  },
  events: {
    click: () => {
        router.go('/');
    }
  }
});

export const registration = new Registration({
  formRegistration,
  linkRegistration,
  attr: {
    class: Classes.ClassWrapper,
  },
});
