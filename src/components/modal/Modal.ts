import tpl from './Modal.hbs';
import * as styles from './Modal.scss';
import {Block} from '../../services/Block';
import {Button} from '../button/Button';
import { Link } from '../link/Link';
import { Input } from '../input/Input';
import { Form } from '../form/Form';
import connect from '../../services/store/Connect';
import Store from '../../services/store/Store';

interface ModalProps {
    form?: Form,
    //input?: Input,
   // button?: Button,
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
       // input: this.props.input,
       // button: this.props.button,
        attr: this.props.attr,
        styles,
    });
  }
}
