import tpl from './Input.hbs';
import * as styles from './Input.scss';
import {Block} from '../../services/Block';
import {validationForm} from '../../utils/ValidationForm';
import connect from '../../services/store/Connect';
import Store from '../../services/store/Store';

let store = Store.getState().user;

interface InputProps {
  value?: string,
  name?: string,
  type?: string,
  classInput?: string,
  classLable?: string,
  lable?: string,
  disabled?: string,
  placeholder?: string,
  events?: {
    click?: (event: MouseEvent) => void
  },
  attr?: {
    class?: string
  }
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super('div', props);
  }

  _addEvents() {
    const el = this._element;
    const content = this.getContent();

    if (el !== null && content !== null) {
      const input = el.querySelector('input');
      const errorDIV = content.querySelector('.input__validation-error');

      if ( input !== null ) {
        const eventFunction = () => {
          const error = validationForm(input.name, input.value);
          if (error.length !== 0 ) {
            input.classList.add('input--validation-error');
          } else {
            input.classList.remove('input--validation-error');
          }
          errorDIV!.innerHTML = error;
        };

        input.addEventListener('blur', eventFunction);
        input.addEventListener('focus', eventFunction);
      }
    }
  }

  render() {
    return this.compile(tpl, {
      value: !!store ? (store[this.props.name as keyof typeof store]) : this.props.value,
      name: this.props.name,
      type: this.props.type,
      classInput: this.props.classInput,
      classLable: this.props.classLable,
      lable: this.props.lable,
      disabled: this.props.disabled,
      placeholder: this.props.placeholder,
      attr: this.props.attr,
      styles,
    });
  }
}

const withUser = connect((state) => ({ ...state.user }));
export const InputComponent = withUser(Input as typeof Block);
