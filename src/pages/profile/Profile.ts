import tpl from './Profile.hbs';
import './Profile.scss';
import {Button} from '../../components/button/Button';
import {Block} from '../../services/Block';
import {Link} from '../../components/link/Link';
import {Popup} from '../../components/popup/Popup';
import {Avatar} from '../../components/avatar/Avatar';
import {Form} from '../../components/form/Form';
import connect from '../../services/store/Connect';
import Store, { StoreEvents } from '../../services/store/Store';
import { userController } from '../../controllers/UserController';
import { getAvatar } from '../../utils/getAvatar';
import { authController } from '../../controllers/AuthController';
import { Input } from '../../components/input/Input';
import { router } from '../../services/Router';

interface ProfileProps {
  linkNerrow?: Link,
  profileAatar?: Avatar,
  formProfile?: Form,
  buttonProfile?: Button,
  profileTitle?: string,
  linkEditProfile?: Link,
  linkEditPasswordProfile?: Link,
  linkExit?: Link,
  popupEditAvatar?: Popup,
  attr?: {
    class?: string
  }
}

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

const buttonPopup = new Button({
  value: 'Поменять',
  classImg: 'visually-hidden',
  attr: {
    type: 'submit'
  },
  events: {
    click: ( event ) => {
      event!.preventDefault();
      const form = popupEditAvatar.getContent()!.querySelector(
        '.modal__form'
      ) as HTMLFormElement;

      if (!form) {
        return;
      }
  
      const formData = new FormData(form);
      userController.changeAvatar(formData);
      popupEditAvatar.hidden();
  }}
});

const exitLink = new Link({
  value: 'Закрыть',
  classImg: 'visually-hidden',
  attr: {
    class: 'links__item--red modal__link',
  },
  events: {
    click: () => {
      popupEditAvatar.hidden();
    }
  }
});

const popupEditAvatar = new Popup({
  button: buttonPopup,
  exitLink: exitLink,
  attr: {
    class: 'modal',
  }
});

export class Profile extends Block<ProfileProps> {

   constructor( props: ProfileProps) {
    super('div', props);

    authController.user();

    let login;
    let avatar: string | SVGElement = '';
    if(!!Store) {
      if(!!Store.getState().user) {
      avatar =  getAvatar(Store.getState().user.avatar);
      login =  Store.getState().user.login;
      }
    }

    this.setProps({ 
      profileAatar: 
          new Avatar({
          linkToPopup: '/settings',
          avatarImg: avatar,
          events: {
            click: ( event ) => {
              event!.preventDefault();
              popupEditAvatar.visible();
            },
          },
        }),
      popupEditAvatar: popupEditAvatar,
      profileTitle: login
  });
  
  Store.on(StoreEvents.Updated, () => {
    let newLogin;
    let newAvatar: string | SVGElement = '';
    let user: any;

    if(!!Store) {
      if(!!Store.getState().user) {
        newAvatar =  getAvatar(Store.getState().user.avatar);
        newLogin =  Store.getState().user.login;
        user = Store.getState().user;
      }
    }

    const inputsProfile: Array<Input> = [];

    inputsDataProfile.forEach(( value: Ivalue ) => {
      const inputItem = new Input({
        name: value.name,
        value: !!user ? user[value.name] : '',
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
          Store.removeState();
          authController.logout();
        }
      }
    });

    this.setProps({ 
      profileAatar: 
          new Avatar({
          linkToPopup: '/settings',
          avatarImg: newAvatar,
          events: {
            click: ( event ) => {
              event!.preventDefault();
              popupEditAvatar.visible();
            },
          },
        }),
        popupEditAvatar: popupEditAvatar,
        profileTitle: !!user ? user.login : '',
        
        formProfile: formProfile,
        linkEditProfile: linkEditProfile,
        linkEditPasswordProfile: linkEditPasswordProfile,
        linkExit: linkExit,
      });

    });
  }

  render() {
    return this.compile(tpl, {
      linkNerrow: this.props.linkNerrow,
      profileTitle: this.props.profileTitle,
      attr: this.props.attr,
    });
  }
}

const withUser = connect((state) => ({ ...state.user }));
export const ProfilePage = withUser(Profile as typeof Block);
