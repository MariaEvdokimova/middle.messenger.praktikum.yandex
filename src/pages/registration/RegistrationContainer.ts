import {Classes} from '../..';
import {Button} from '../../components/button/Button';
import {Form} from '../../components/form/Form';
import {Input} from '../../components/input/Input';
import {Link} from '../../components/link/Link';
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
  },
  {
    name: 'password',
    type: 'password',
    lable: 'Password',
  },
  {
    name: 'password_conf',
    type: 'password',
    lable: 'Password (cnfirm)',
  },
];

export const registration = () => {
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
    attr: {
      action: '/',
    },
    events: {
      submit: (event) => {
        event.preventDefault();
        console.log(formRegistration.getObjLog(formRegistration));
        formRegistration.validation(formRegistration);
      },
    },
  });

  const linkRegistration = new Link({
    value: 'Sign in',
    classImg: 'visually-hidden',
    attr: {
      class: 'link',
      href: '/',
    },
  });

  const registration = new Registration({
    formRegistration,
    linkRegistration,
    attr: {
      class: Classes.ClassWrapper,
    },
  });

  return registration;
};
