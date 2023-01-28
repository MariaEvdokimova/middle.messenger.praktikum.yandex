import {CLASSES} from '../..';
import {Error} from './Error';

export const error = () => {
  const error = new Error({
    errCode: 404,
    errMessage: 'Не туда попали',
    attr: {
      class: CLASSES.CLASS_WRAPPER,
    },
  });

  return error;
};
