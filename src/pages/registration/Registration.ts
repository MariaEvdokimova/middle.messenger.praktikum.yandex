import tpl from './Registration.hbs';
import {Block} from '../../services/Block';
import {Form} from '../../components/form/Form';
import {Link} from '../../components/link/Link';

interface RegistrationProps {
  formRegistration: Form,
  linkRegistration: Link,
  attr: {
    class: string
  }
}

export class Registration extends Block<any> {
  constructor( props: RegistrationProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {
      formRegistration: this.props.formRegistration,
      linkRegistration: this.props.linkRegistration,
      attr: this.props.attr.class,
    });
  }
}
