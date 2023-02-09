import {Button} from '../../components/button/Button';
import {Form} from '../../components/form/Form';
import {Input} from '../../components/input/Input';
import {Link} from '../../components/link/Link';
import { Classes } from '../../css/classes';
import {Authorization} from './Authorization';

const inputDataAuth = [
  {
    name: 'login',
    type: 'text',
    lable: 'Login',
  },
  {
    name: 'password',
    type: 'password',
    lable: 'Password',
  },
];

export const authorization = () => {
  const inputsAuth: Array<Input> = [];

  inputDataAuth.forEach(( value: Record<string, string> ) => {
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
    inputsAuth.push(inputItem);
  });


  const formButtonAuth = new Button({
    value: 'Sign In',
    classImg: 'visually-hidden',
    attr: {
      type: 'submit',
    },
  });

  const formAuth = new Form({
    inputs: inputsAuth,
    formButton: formButtonAuth,
    buttonClass: 'form__item form__item-button',
    attr: {
      action: '/chats',
    },
    events: {
      submit: (event) => {
        console.log(formAuth.getObjLog(formAuth));
        if (!formAuth.validation(formAuth)) {
          event.preventDefault();
        }
      },
    },
  });

  const linkAuth = new Link({
    value: 'Create a profile',
    classImg: 'visually-hidden',
    attr: {
      class: 'link',
      href: '/registration',
    },
  });

  const authorization = new Authorization({
    formAuth,
    linkAuth,
    attr: {
      class: Classes.ClassWrapper,
    },
  });

  return authorization;
};
