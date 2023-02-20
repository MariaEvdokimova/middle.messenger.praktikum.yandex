import './css/style.scss';
import {authorization} from './pages/authorization/AuthorizationContainer';
import {registration} from './pages/registration/RegistrationContainer';
import {chats} from './pages/chats/ChatsContainer';
import {profile} from './pages/profile/ProfileContainer';
import {profileEditPassword} from './pages/profile/ProfileEditPasswordContainer';
import {error} from './pages/error/ErrorContainer';
import { router } from './services/Router';
import { authController } from './controllers/AuthController';
import Store from './services/store/Store';

window.addEventListener('DOMContentLoaded', () => {
  router
  .use("/", authorization)
  .use("/sign-up", registration)
  .use("/messenger", chats)
  .use("/settings", profile)
  .use("/profileEditPassword", profileEditPassword)
  .use("/error404", error( 404, 'Не туда попали' ))
  .use("/error500", error( 500, 'Мы уже фиксим' ));

   router.start();

});
