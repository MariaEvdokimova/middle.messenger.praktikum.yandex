import { Classes } from '../../css/classes';
import {Error} from './Error';

export const error = (code: number, text: string) => {
  const error = new Error({
    errCode: code,
    errMessage: text,
    attr: {
      class: Classes.ClassWrapper,
    },
  });

  return error;
};
