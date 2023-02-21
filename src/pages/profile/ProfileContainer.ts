import {Link} from '../../components/link/Link';
import {ProfilePage} from './Profile';
import nerrow from '../../../static/img/nerrow.svg';
import { Classes } from '../../css/classes';
import { router } from '../../services/Router';

  const linkNerrow = new Link({
    img: nerrow,
    classImg: 'profile__nerrow-img',
    events: {
      click: () => {
          router.back();
      }
    }
  });

   export const profile = new ProfilePage({
    linkNerrow,
    attr: {
      class: Classes.ClassWrapper,
    },
  });
