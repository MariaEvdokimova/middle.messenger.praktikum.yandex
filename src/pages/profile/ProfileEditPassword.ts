import tpl from './ProfileEditPassword.hbs';
import './Profile.scss';
import nerrow from '../../../static/img/nerrow.svg';
import noAvatar from '../../../static/img/no-pic.svg';
import {Block} from '../../services/Block';
import {Form} from '../../components/form/Form';

interface ProfileEditPasswordProps {
  formProfileEditPassword: Form,
  attr: {
    class: string
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
      nerrow,
      noAvatar});
  }
}
