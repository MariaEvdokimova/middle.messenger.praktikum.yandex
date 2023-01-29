import {Classes} from '../..';
import {Error} from './Error';

export const error = () => {
  const error = new Error({
    errCode: 404,
    errMessage: 'Не туда попали',
    attr: {
      class: Classes.ClassWrapper,
    },
  });

  return error;
};
