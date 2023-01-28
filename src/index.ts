import './css/style.scss';
import {renderDOM} from './services/RenderDOM';
import {authorization} from './pages/authorization/AuthorizationContainer';
import {registration} from './pages/registration/RegistrationContainer';
import {chats} from './pages/chats/ChatsContainer';
import {profile} from './pages/profile/ProfileContainer';
import {profileEditPassword} from './pages/profile/ProfileEditPasContainer';
import {error} from './pages/error/ErrorContainer';

enum CLASSES {
  CLASS_WRAPPER = 'wrapper'
}

window.addEventListener('DOMContentLoaded', () => {
  switch ( window.location.pathname ) {
    case '/':
      renderDOM( authorization() );
      break;

    case '/registration':
      renderDOM( registration() );
      break;

    case '/chats':
      renderDOM( chats() );
      break;

    case '/profile':
      renderDOM( profile() );
      break;

    case '/profileEditPassword':
      renderDOM( profileEditPassword() );
      break;

    default:
      renderDOM( error() );
      break;
  }
});

export {CLASSES};
