import tpl from './ChatFooter.hbs';
import * as styles from './ChatFooter.scss';
import {Block} from '../../../services/Block';
import {DropdownList} from '../../dropdownList/DropdownList';
import {Form} from '../../form/Form';
import {Link} from '../../link/Link';

interface ChatFooterProps {
  footerForm?: Form,
  footerLink?: Link,
  footerDropdownList?: DropdownList,
  attr?: {
    class?: string
  }
}

export class ChatFooter extends Block<ChatFooterProps> {
  constructor(props: ChatFooterProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {
      footerForm: this.props.footerForm,
      footerLink: this.props.footerLink,
      footerDropdownList: this.props.footerDropdownList,
      attr: this.props.attr,
      styles,
    });
  }
}
