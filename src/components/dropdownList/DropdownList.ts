import tpl from './DropdownList.hbs';
import * as styles from './DropdownList.scss';
import {Block} from '../../services/Block';
import {Link} from '../link/Link';

interface DropdownListProps {
  value: Array<Link>,
  attr?: {
    class?: string,
  }
}

export class DropdownList extends Block<DropdownListProps> {
  constructor(props: DropdownListProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {
      value: this.props.value,
      attr: this.props.attr,
      styles,
    });
  }
}
