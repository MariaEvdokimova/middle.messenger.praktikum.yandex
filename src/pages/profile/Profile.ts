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

    this.setProps({ 
      profileAatar: 
          new Avatar({
          linkToPopup: '/settings',
          avatarImg: getAvatar(!!Store.getState().user ? Store.getState().user.avatar : ''),
          events: {
            click: ( event ) => {
              event!.preventDefault();
              popupEditAvatar.visible();
            },
          },
        }),
      popupEditAvatar: popupEditAvatar
  });
  
  Store.on(StoreEvents.Updated, () => {
    this.setProps({ 
      profileAatar: 
          new Avatar({
          linkToPopup: '/settings',
          avatarImg: getAvatar(Store.getState().user.avatar),
          events: {
            click: ( event ) => {
              event!.preventDefault();
              popupEditAvatar.visible();
            },
          },
        }),
        popupEditAvatar: popupEditAvatar
      });
    });
  }

  render() {
    return this.compile(tpl, {
      linkNerrow: this.props.linkNerrow,
      formProfile: this.props.formProfile,
      buttonProfile: this.props.buttonProfile,
      profileTitle: !!Store.getState().user ? Store.getState().user.login : '',
      linkEditProfile: this.props.linkEditProfile,
      linkEditPasswordProfile: this.props.linkEditPasswordProfile,
      linkExit: this.props.linkExit,
      attr: this.props.attr,
    });
  }
}

const withUser = connect((state) => ({ ...state.user }));
export const ProfilePage = withUser(Profile as typeof Block);
