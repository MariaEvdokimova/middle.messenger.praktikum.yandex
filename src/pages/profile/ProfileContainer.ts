import {Avatar} from '../../components/avatar/Avatar';
import {Button} from '../../components/button/Button';
import {Form} from '../../components/form/Form';
import {Input} from '../../components/input/Input';
import {Link} from '../../components/link/Link';
import {Popup} from '../../components/popup/Popup';
import {Profile} from './Profile';
import noAvatar from '../../../static/img/no-pic.svg';
import {owner} from '../../data/owner.json';
import {CLASSES} from '../..';

interface Ivalue {
    name: 'email' |'login' | 'first_name' | 'second_name' | 'display_name' | 'phone',
    type: string,
    lable: string,
    disabled: string,
    [key: string]: any
  }

const dataProfile = {
  'email': 'pochta@yandex.ru',
  'login': 'Иванов',
  'first_name': 'Иван',
  'second_name': 'Иванов',
  'display_name': 'Иван',
  'phone': '+7 (909) 123 45 67',
};

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

export const profile = () => {
  const inputsProfile: Array<Input> = [];

  inputsDataProfile.forEach(( value: Ivalue ) => {
    const inputItem = new Input({
      value: dataProfile[value.name],
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

  const profileButton = new Button({
    value: 'Save',
    classImg: 'visually-hidden',
    attr: {
      class: ' visually-hidden',
      type: 'submit',
    },
  });

  const formProfile = new Form({
    inputs: inputsProfile,
    formButton: profileButton,
    buttonClass: 'profile__button',
    attr: {
      class: 'profile__form',
    },
    events: {
      submit: (event) => {
        event.preventDefault();
        console.log(formProfile.getObjLog(formProfile));
        formProfile.validation(formProfile);
      },
    },
  });

  const profileAatar = new Avatar({
    linkToPopup: '/profile',
    avatarImg: noAvatar,
    events: {
      click: ( event ) => {
        if ( event ) {
          event.preventDefault();
        }
        popupEditAvatar.visible();
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

        profileButton.removeAttribute('class');
        profileButton.setProps(buttonClass);
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
      class: 'links__item',
      href: '/profileEditPassword',
    },
  });

  const linkExit = new Link({
    value: 'Выйти',
    classImg: 'visually-hidden',
    attr: {
      class: 'links__item--red',
      href: '/',
    },
  });

  const buttonPopup = new Button({
    value: 'Поменять',
    classImg: 'visually-hidden',
    events: {
      click: ( event ) => {
        if ( event ) {
          event.preventDefault();
        }
      },
    },
  });

  const popupEditAvatar = new Popup({
    button: buttonPopup,
    attr: {
      class: 'modal',
    },
    events: {
      click: (event) => {
        if ( event ) {
          event.preventDefault();
          event.stopPropagation();
          if (event.eventPhase === 2) {
            popupEditAvatar.hidden();
          }
        }
      },
    },
  });

  const profile = new Profile({
    profileAatar,
    formProfile,
    linkEditProfile,
    linkEditPasswordProfile,
    linkExit,
    popupEditAvatar,
    profileTitle: owner.login,
    attr: {
      class: CLASSES.CLASS_WRAPPER,
    },
  });

  return profile;
};
