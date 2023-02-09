import tpl from './Profile.hbs';
import './Profile.scss';
import nerrow from '../../../static/img/nerrow.svg';
import noAvatar from '../../../static/img/no-pic.svg';
import {Button} from '../../components/button/Button';
import {Block} from '../../services/Block';
import {Link} from '../../components/link/Link';
import {Popup} from '../../components/popup/Popup';
import {Avatar} from '../../components/avatar/Avatar';
import {Form} from '../../components/form/Form';

interface ProfileProps {
  profileAatar: Avatar,
  formProfile: Form,
  buttonProfile?: Button,
  profileTitle: string,
  linkEditProfile: Link,
  linkEditPasswordProfile: Link,
  linkExit: Link,
  popupEditAvatar?: Popup,
  attr: {
    class: string
  }
}

export class Profile extends Block<any> {
  constructor( props: ProfileProps) {
    super('div', props);
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    return oldProps[this.props.profileTitle] != newProps[this.props.profileTitle];
  }

  render() {
    return this.compile(tpl, {
      profileAatar: this.props.profileAatar,
      formProfile: this.props.formProfile,
      buttonProfile: this.props.buttonProfile,
      profileTitle: this.props.profileTitle,
      linkEditProfile: this.props.linkEditProfile,
      linkEditPasswordProfile: this.props.linkEditPasswordProfile,
      linkExit: this.props.linkExit,
      popupEditAvatar: this.props.popupEditAvatar,
      attr: this.props.attr.class,
      nerrow,
      noAvatar,
    });
  }
}
