import './css/style.scss';
import {renderDOM} from './services/RenderDOM';
import {authorization} from './pages/authorization/AuthorizationContainer';
import {registration} from './pages/registration/RegistrationContainer';
import {chats} from './pages/chats/ChatsContainer';
import {profile} from './pages/profile/ProfileContainer';
import {profileEditPassword} from './pages/profile/ProfileEditPasswordContainer';
import {error} from './pages/error/ErrorContainer';

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
