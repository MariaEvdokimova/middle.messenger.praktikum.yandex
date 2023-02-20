import {ChatBoxComponent} from '../../components/chat/chatBox/ChatBox';
import {ChatFooter} from '../../components/chat/chatFooter/ChatFooter';
import { ChatPage} from './Chats';
import {Link} from '../../components/link/Link';
import {Input} from '../../components/input/Input';
import {Button} from '../../components/button/Button';
import {Form, FormComponent} from '../../components/form/Form';
import {DropdownList} from '../../components/dropdownList/DropdownList';
import { ChatHeaderComponent} from '../../components/chat/chatHeader/ChatHeader';
import hamburger from '../../../static/img/hamburger.svg';
import clip from '../../../static/img/clip.svg';
import deleteChat from '../../../static/img/delete-chat.svg';
import add from '../../../static/img/add.svg';
import deleteImg from '../../../static/img/delete.svg';
import photoOrVideo from '../../../static/img/photo-or-video.svg';
import file from '../../../static/img/file.svg';
import location from '../../../static/img/location.svg';
import { authController } from '../../controllers/AuthController';
import { router } from '../../services/Router';
import { Modal } from '../../components/modal/Modal';
import { chatsController } from '../../controllers/ChatsController';
import Store from '../../services/store/Store';
import { socketController } from '../../controllers/SocketController';

const footerLinksData = [
  {
    img: photoOrVideo,
    value: 'Фото или Видео',
  },
  {
    img: file,
    value: 'Файл',
  },
  {
    img: location,
    value: 'Локация',
  },
];

const headerList: Array<Link> = [];

const inputModal = new Input({
  type: 'text',
  classInput: 'modal-chat__input',
  classLable: 'modal-chat__lable',
});

const buttonModal = new Button({
  classImg: 'visually-hidden',
  attr: {
    type: 'submit',
    class: 'button modal-chat__button--add'
  }
});

const formModal = new FormComponent({
  inputs: [inputModal],
  formButton: buttonModal,
}) as Form;

const modal = new Modal({
  form: formModal
});

const linkAddUser = new Link({
  value: 'Добавить пользователя',
  img: add,
  classImg: 'dropdown__link-img',
  attr: {
    class: 'dropdown__item',
  },
  events: {
    click: (event) => {
      event!.preventDefault();

      inputModal.setProps({
        name: 'addUser',
        lable: 'Добавить пользователя',
      });
      
      buttonModal.setProps({
        value: 'Добавить',
      });

      const formModalAddUser = new FormComponent({
        inputs: [inputModal],
        formButton: buttonModal,
        events: {
          submit: ( event: any ) => {
            event!.preventDefault();
            const value = inputModal.getContent()!.querySelectorAll('input')[0].value;
            if (value !== '' && value !== null) {
              chatsController.addUserToChat(value);
      
              modal.hidden();
              modal.clearInput();
            }
          } 
        }
      }) as Form;

        modal.setProps({ 
          form: formModalAddUser
      });

      modal.visible();
      linkAddUser.positionRect(modal, '88px', `calc(100% - 391px)`);
    }
  }
});

const linkDeleteUser = new Link({
  value: 'Удалить пользователя',
  img: deleteImg,
  classImg: 'dropdown__link-img',
  attr: {
    class: 'dropdown__item',
  },
  events: {
    click: (event) => {
      event!.preventDefault();

      inputModal.setProps({
        name: 'deleteUser',
        lable: 'Удалить пользователя',
      });
      
      buttonModal.setProps({
        value: 'Удалить',
      });

      const formModalDeleteUser = new FormComponent({
        inputs: [inputModal],
        formButton: buttonModal,
        events: {
          submit: ( event: any ) => {
            event!.preventDefault();
            const value = inputModal.getContent()!.querySelectorAll('input')[0].value;
            if (value !== '' && value !== null) {
              chatsController.deleteUserFromChat(value);
      
              modal.hidden();
              modal.clearInput();
            }
          } 
        }
      }) as Form;

        modal.setProps({ 
          form: formModalDeleteUser
      });

      modal.visible();
      linkDeleteUser.positionRect(modal, '88px', `calc(100% - 391px)`);
    }
  }
});

const linkdeleteChat = new Link({
  value: 'Удалить этот чат',
  img: deleteChat,
  classImg: 'dropdown__link-img',
  attr: {
    class: 'dropdown__item text__red',
  },
  events: {
    click: () => {
      if (Store.getState().selectedChat.id) {
      chatsController.deleteChat( { chatId: Store.getState().selectedChat.id } );
      Store.set('selectedChat', {
        id: '', 
        title: '',
        avatar: ''
      });
    }
      headerDropdownList.toggle('visually-hidden');
      headerDropdownList.toggle('dropdown__list');
    }
  }
});

headerList.push(linkAddUser, linkDeleteUser, linkdeleteChat); 

const headerLink = new Link({
  img: hamburger,
  classImg: 'dropdown__img',
  events: {
    click: ( event ) => {
      if ( event ) {
        event.preventDefault();
      }
      headerDropdownList.toggle('visually-hidden');
      headerDropdownList.toggle('dropdown__list');
      chatHeader.positionRect(headerDropdownList, '34px', '-175px');
    },
  },
  attr: {
    class: '',
    href: '',
  },
});

const headerDropdownList = new DropdownList({
  value: headerList,
  attr: {
    class: 'visually-hidden',
  },
});

const chatHeader = new ChatHeaderComponent({
  headerLink: headerLink,
  headerDropdownList,
  attr: {
    class: 'chat-header',
  },
});

const inputSearch = new Input({
  name: 'message',
  type: 'search',
  classInput: 'form-footer__search',
  classLable: '',
  lable: '',
  placeholder: 'Сообщение',
  attr: {
    class: 'form-footer__input',
  },
});

const buttonSearch = new Button({
  classImg: 'form-footer__img',
  attr: {
    class: 'form-footer__button',
    type: 'submit',
  },
});

const footerForm = new Form({
  inputs: [inputSearch],
  formButton: buttonSearch,
  buttonClass: '',
  events: {
    submit: (event) => {
      event.preventDefault();
      const value = inputSearch.getContent()!.querySelectorAll('input')[0].value;
      if (value !== '' && value !== null) {
       socketController.sendMessage(value);
       inputSearch.getContent()!.querySelectorAll('input')[0].value = '';
      }
    },
  },
  attr: {
    class: 'form-footer',
  },
});

const chatFooter = new ChatFooter({
  footerForm,
  attr: {
    class: 'chat-footer',
  },
});

const chatBox = new ChatBoxComponent({
  chatHeader,
  chatFooter,
  attr: {
    class: 'chat-box',
  },
});

const linkAddChat = new Link({
  img: add,
  classImg: 'chats__link-img',
  attr: {
    class: 'chats__link-add',
  },
  events: {
    click: ( event ) => {
      event!.preventDefault();

      inputModal.setProps({
        name: 'title',
        lable: 'Введите название чата',
      });

      buttonModal.setProps({
        value: 'Создать',
      });

      const formModalAddChat = new FormComponent({
        inputs: [inputModal],
        formButton: buttonModal,
        events: {
          submit: ( event: any ) => {
            event!.preventDefault();
            const value = inputModal.getContent()!.querySelectorAll('input')[0].value;
            if (value !== '' && value !== null) {
              chatsController.createChat( { title: value } );
              
              modal.hidden();
              inputModal.getContent()!.querySelectorAll('input')[0].value = '';
            }
          }
        }
      }) as Form;

        modal.setProps({ 
          form: formModalAddChat
      });

      modal.visible();
      linkAddChat.positionRect(modal, '35px', '32px');
    }
  }
});

const linkProfile = new Link({
  value: 'Профиль',
  classImg: 'visually-hidden',
  events: {
    click: ( event ) => {
        event!.preventDefault();
        authController.user();
        router.go('/settings');
    }
  },
  attr: {
    class: 'chats__link',
  },
});

export  const chats = new ChatPage({  
  linkAddChat,
  linkProfile,
  chatBox,
  attr: {
    class: 'chats chats__wrapper',
  },
  modal
});
