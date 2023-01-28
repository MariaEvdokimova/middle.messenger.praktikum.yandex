import tpl from './Popup.hbs';
import * as styles from './Popup.scss';
import {Block} from '../../services/Block';
import {Button} from '../button/Button';

interface PopupProps {
  button: Button,
  attr: {
    class: string
  },
  events: {
    click: (event?: MouseEvent) => void
  }
}

export class Popup extends Block<PopupProps> {
  constructor(props: PopupProps) {
    super('div', props);
  }


  render() {
    return this.compile(tpl, {
      button: this.props.button,
      attr: this.props.attr.class,
      styles,
    });
  }
}
