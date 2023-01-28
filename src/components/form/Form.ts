import tpl from './Form.hbs';
import * as styles from './Form.scss';
import {Block} from '../../services/Block';
import {Input} from '../input/Input';
import {Button} from '../button/Button';
import {validationForm} from '../../utils/ValidationForm';

interface FormProps {
  inputs: Array<Input>,
  formButton?: Button,
  buttonClass?: string,
  events?: {
      submit?: (event: SubmitEvent) => void
  },
  attr?: {
    class?: string,
    action?: string
  }
}

export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super('form', props);
  }

  validation(form: Form): boolean {
    let error = '';

    const formContent = form.getContent();

    if ( formContent !== null ) {
      const errorDIV = formContent.querySelector('.form__validation-error');
      const inputs = formContent.querySelectorAll('input');

      let i = 0;
      while ( i < inputs.length ) {
        error = validationForm(inputs[i].name, inputs[i].value);
        errorDIV!.innerHTML = error;
        if (error !== '') {
          break;
        }
        i++;
      }
    }

    return error === '' ? true : false;
  }

  getObjLog(form: Form) {
    const obj: Record<string, string> = {};

    const formContent = form.getContent();

    if ( formContent !== null ) {
      const inputs = formContent.querySelectorAll('input');
      inputs.forEach((input) => {
        obj[input.name] = input.value;
      });
    }

    return obj;
  }

  render() {
    return this.compile(tpl, {
      inputs: this.props.inputs,
      formButton: this.props.formButton,
      buttonClass: this.props.buttonClass,
      attr: this.props.attr,
      styles,
    });
  }
}
