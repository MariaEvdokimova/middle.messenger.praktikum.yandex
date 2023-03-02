import tpl from './Modal.hbs';
import * as styles from './Modal.scss';
import {Block} from '../../services/Block';
import { Link } from '../link/Link';
import { Form } from '../form/Form';

interface ModalProps {
    form?: Form,
    exitLink?: Link,
    attr?: {
        class: string
    },
}

export class Modal extends Block<ModalProps> {
  constructor(props: ModalProps) {
    super('div', props);

    this.setProps({ 
        exitLink: 
            new Link({
            value: 'Закрыть',
            classImg: 'visually-hidden',
            attr: {
                class: 'links__item--red modal-chat__link',
            },
            events: {
                click: () => {
                    this.hidden();
                    this.clearInput();
                }
            }
            }),
        attr: {
            class: 'modal-chat'
        }
    })
  }

  clearInput () {
    if (this.getContent()!.querySelectorAll('input')[0] ) {
        this.getContent()!.querySelectorAll('input')[0].value = '';
    }
  }

  render() {
    return this.compile(tpl, {
        form: this.props.form,
        attr: this.props.attr,
        styles,
    });
  }
}
