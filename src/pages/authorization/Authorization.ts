import tpl from './Authorization.hbs';
import './Authorization.scss';
import {Block} from '../../services/Block';
import {Link} from '../../components/link/Link';
import {Form} from '../../components/form/Form';

interface AuthorizationProps {
  formAuth: Form,
  // authButton: Button,
  // authInputLogin: Input,
  // authInputPas: Input,
  linkAuth: Link,
  attr: {
    class: string
  }
}

export class Authorization extends Block<any> {
  constructor( props: AuthorizationProps) {
    super(
        'div',
        props,
    );
  }

  render() {
    return this.compile(tpl, {
      formAuth: this.props.formAuth,
      // authBbutton: this.props.authButton,
      // authInputLogin: this.props.authInputLogin,
      // authInputPas: this.props.authInputPas,
      linkAuth: this.props.linkAuth,
      attr: this.props.attr,
    });
  }
}
