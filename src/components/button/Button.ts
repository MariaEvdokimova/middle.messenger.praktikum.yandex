import tpl from './Button.hbs';
import * as styles from './Button.scss';
import {Block} from '../../services/Block';
import nerrow from '../../../static/img/nerrow.svg';

interface ButtonProps {
  value?: string,
  classImg?: string,
  events?: {
    click?: (event?: MouseEvent) => void
  },
  attr?: {
    class?: string,
    type?: string
  }
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super('button', props);

    const el = this.element;
    if ( el !== null ) {
      el.classList.add('button');
    }
  }

  render() {
    return this.compile(tpl, {
      value: this.props.value,
      classImg: this.props.classImg,
      attr: this.props.attr,
      styles,
      nerrow,
    });
  }
}
