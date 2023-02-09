import tpl from './Error.hbs';
import './Error.scss';
import {Block} from '../../services/Block';

interface ErrorProps {
  errCode: number,
  errMessage: string,
  attr: {
    class: string
  }
}

export class Error extends Block<any> {
  constructor( props: ErrorProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {
      errCode: this.props.errCode,
      errMessage: this.props.errMessage,
      attr: this.props.attr.class,
    });
  }
}

