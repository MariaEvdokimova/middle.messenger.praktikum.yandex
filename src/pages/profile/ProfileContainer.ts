import {Avatar} from '../../components/avatar/Avatar';
import {Button} from '../../components/button/Button';
import {Form} from '../../components/form/Form';
import {Input, InputComponent} from '../../components/input/Input';
import {Link} from '../../components/link/Link';
import {Popup} from '../../components/popup/Popup';
import {Profile, ProfilePage} from './Profile';
import noAvatar from '../../../static/img/no-pic.svg';
import nerrow from '../../../static/img/nerrow.svg';
import { Classes } from '../../css/classes';
import { authController } from '../../controllers/AuthController';
import { router } from '../../services/Router';
import Store from '../../services/store/Store';
import { userController } from '../../controllers/UserController';

let store = Store.getState().user;

interface Ivalue {
    name: 'email' |'login' | 'first_name' | 'second_name' | 'display_name' | 'phone',
    type: string,
    lable: string,
    disabled: string,
    [key: string]: any
  }

const inputsDataProfile: Array<Ivalue>= [
  {
    name: 'email',
    type: 'email',
    lable: 'Mail',
    disabled: 'disabled',
  },
  {
    name: 'login',
    type: 'text',
    lable: 'Login',
    disabled: 'disabled',
  },
  {
    name: 'first_name',
    type: 'text',
    lable: 'First Name',
    disabled: 'disabled',
  },
  {
    name: 'second_name',
    type: 'text',
    lable: 'Second Name',
    disabled: 'disabled',
  },
  {
    name: 'display_name',
    type: 'text',
    lable: 'Nickname',
    disabled: 'disabled',
  },
  {
    name: 'phone',
    type: 'tel',
    lable: 'Phone',
    disabled: 'disabled',
  },
];

  const linkNerrow = new Link({
    img: nerrow,
    classImg: 'profile__nerrow-img',
    events: {
      click: () => {
          router.back();
      }
    }
  });

  const inputsProfile: Array<Input> = [];

  inputsDataProfile.forEach(( value: Ivalue ) => {
    const inputItem = new InputComponent({
      name: value.name,
      type: value.type,
      classInput: 'info__item-value profile__form-input',
      classLable: 'info__item-name profile__form-label',
      lable: value.lable,
      disabled: value.disabled,
      attr: {
        class: 'profile__form-item',
      },
    });
    inputsProfile.push(inputItem);
  });

  const editProfileButton = new Button({
    value: 'Save',
    classImg: 'visually-hidden',
    attr: {
      class: ' visually-hidden',
      type: 'submit',
    },
  });

  const formProfile = new Form({
    inputs: inputsProfile,
    formButton: editProfileButton,
    buttonClass: 'profile__button',
    attr: {
      class: 'profile__form',
    },
    events: {
      submit: (event) => {
        event.preventDefault();
        const isValid = formProfile.validation(formProfile);

        if ( isValid ) {
          const data = formProfile.getObjLog(formProfile);
          userController.changeProfile( data );

          const buttonClass = {
            attr: {
              class: 'visually-hidden',
            },
          };
  
          const attrDisabled = {
            disabled: 'disabled',
          };
  
          inputsProfile.forEach((input) => {
            input.setProps(attrDisabled);
          });
  
          editProfileButton.removeAttribute('class');
          editProfileButton.setProps(buttonClass);
          linkEditProfile.show();
          linkEditPasswordProfile.show();
          linkExit.show();
        }
      },
    },
  });

  const linkEditProfile = new Link({
    value: 'Изменить данные',
    classImg: 'visually-hidden',
    events: {
      click: ( event ) => {
        if ( event ) {
          event.preventDefault();
        }
        const buttonClass = {
          attr: {
            class: 'button',
          },
        };

        const attrDisabled = {
          disabled: 'false',
        };

        inputsProfile.forEach((input) => {
          input.setProps(attrDisabled);
        });

        editProfileButton.removeAttribute('class');
        editProfileButton.setProps(buttonClass);
        linkEditProfile.hide();
        linkEditPasswordProfile.hide();
        linkExit.hide();
      },
    },
    attr: {
      class: 'links__item',
    },
  });

  const linkEditPasswordProfile = new Link({
    value: 'Изменить пароль',
    classImg: 'visually-hidden',
    attr: {
      class: 'links__item'
    },
    events: {
      click: () => {
          router.go('/profileEditPassword');
      }
    }
  });

  const linkExit = new Link({
    value: 'Выйти',
    classImg: 'visually-hidden',
    attr: {
      class: 'links__item--red',
    },
    events: {
      click: () => {
        authController.logout();
      }
    }
  });

   export const profile = new ProfilePage({
    linkNerrow,
    formProfile,
    linkEditProfile,
    linkEditPasswordProfile,
    linkExit,
    profileTitle: !!store ? store.login : '',
    attr: {
      class: Classes.ClassWrapper,
    },
  });
