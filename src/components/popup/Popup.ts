import tpl from './Popup.hbs';
import * as styles from './Popup.scss';
import {Block} from '../../services/Block';
import {Button} from '../button/Button';
import { Link } from '../link/Link';

interface PopupProps {
  button: Button,
  exitLink: Link,
  attr: {
    class: string
  },
  events?: {
    click?: (event?: MouseEvent) => void
  }
}

export class Popup extends Block<PopupProps> {
  constructor(props: PopupProps) {
    super('div', props);
  }


  render() {
    return this.compile(tpl, {
      exitLink: this.props.exitLink,
      button: this.props.button,
      attr: this.props.attr.class,
      styles,
    });
  }
}
