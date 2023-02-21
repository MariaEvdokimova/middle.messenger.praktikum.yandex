import {Button} from '../../components/button/Button';
import {Form} from '../../components/form/Form';
import {Input} from '../../components/input/Input';
import {Link} from '../../components/link/Link';
import { authController } from '../../controllers/AuthController';
import { chatsController } from '../../controllers/ChatsController';
import { Classes } from '../../css/classes';
import { router } from '../../services/Router';
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
    events: {
      submit: (event) => {
        event.preventDefault();
        formAuth.validation(formAuth);
      
        const data = formAuth.getObjLog(formAuth);
        authController.signin( data );        
      },
    },
    
  });

  const linkAuth = new Link({
    value: 'Create a profile',
    classImg: 'visually-hidden',
    attr: {
      class: 'link'
    },
    events: {
      click: () => {
          router.go('/sign-up');
      }
    }
  });

  export const authorization = new Authorization({
    formAuth,
    linkAuth,
    attr: {
      class: Classes.ClassWrapper,
    },
  });
