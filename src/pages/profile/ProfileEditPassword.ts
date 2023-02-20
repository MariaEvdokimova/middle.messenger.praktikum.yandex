import tpl from './ProfileEditPassword.hbs';
import './Profile.scss';
import noAvatar from '../../../static/img/no-pic.svg';
import {Block} from '../../services/Block';
import {Form} from '../../components/form/Form';
import { Link } from '../../components/link/Link';
import connect from '../../services/store/Connect';

interface ProfileEditPasswordProps {
  linkNerrow?: Link,
  formProfileEditPassword?: Form,
  attr?: {
    class?: string
  }
}

export class ProfileEditPassword extends Block<any> {
  constructor( props: ProfileEditPasswordProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {
      formProfileEditPassword: this.props.formProfileEditPassword,
      attr: this.props.attr,
<<<<<<< HEAD
      nerrow,
      noAvatar
    });
=======
      noAvatar});
>>>>>>> 25bb91e524ae038313b1a9c4f441dadd5a4399d8
  }
}

const withUser = connect((state) => ({ ...state.user }));
export const ProfileEditPasswordPage = withUser(ProfileEditPassword as typeof Block);
