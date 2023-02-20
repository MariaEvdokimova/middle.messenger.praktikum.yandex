import tpl from './Form.hbs';
import * as styles from './Form.scss';
import {Block} from '../../services/Block';
import {Input} from '../input/Input';
import {Button} from '../button/Button';
import {validationForm} from '../../utils/ValidationForm';
import { isEqual } from '../../utils/IsEqual';
import connect from '../../services/store/Connect';
import Store from '../../services/store/Store';

interface FormProps {
  inputs?: Array<Input>,
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

  isPasswordEqual( form: Form, val1: Input, val2: Input ): boolean {
    
    const input1 = val1.getContent()!.querySelectorAll('input');
    const input2 = val2.getContent()!.querySelectorAll('input');
    
    const res = isEqual( input1[0].value, input2[0].value ); 

    if ( !res ) {
      const formContent = form.getContent();
      const errorDIV = formContent!.querySelector('.form__validation-error');
      errorDIV!.innerHTML = 'Пароли не совпадают';
    }

    return res;
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

const withUser = connect((state) => ({ ...state }));
export const FormComponent = withUser(Form as typeof Block);
