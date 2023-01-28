import {ChatBox} from '../../components/chat/chatBox/ChatBox';
import {ChatFooter} from '../../components/chat/chatFooter/ChatFooter';
import {Chats} from './Chats';
import {Link} from '../../components/link/Link';
import {ChatItem} from '../../components/chat/chatItem/ChatItem';
import {ChatMessage} from '../../components/chat/chatMessage/ChatMessage';
import {ChatMessageGroup} from '../../components/chat/chatMessageGroup/ChatMessagesGroup';
import {Input} from '../../components/input/Input';
import {Button} from '../../components/button/Button';
import {Form} from '../../components/form/Form';
import {slisedText} from '../../utils/SlicedText';
import {DropdownList} from '../../components/dropdownList/DropdownList';
import {ChatHeader} from '../../components/chat/chatHeader/ChatHeader';
import {usersList} from '../../data/messages.json';
import hamburger from '../../../static/img/hamburger.svg';
import clip from '../../../static/img/clip.svg';
import add from '../../../static/img/add.svg';
import deleteImg from '../../../static/img/delete.svg';
import photoOrVideo from '../../../static/img/photo-or-video.svg';
import file from '../../../static/img/file.svg';
import location from '../../../static/img/location.svg';
import noAvatar from '../../../static/img/no-pic.svg';

interface Imessage {
    message: string,
    date: string,
    time: string,
    isViewed: boolean,
    isOwner: boolean
  }

  interface Iuser {
    avatar: string,
    name: string,
    messages: Array<Imessage>
  }


const headerLinksData = [
  {
    img: add,
    value: 'Добавить пользователя',
  },
  {
    img: deleteImg,
    value: 'Удалить пользователя',
  },
];

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

export const chats = () => {
  const headerList: Array<Link> = [];
  const footerList: Array<Link> = [];
  const chatItems: Array<ChatItem> = [];
  const chatMessages: Array<ChatMessage> =[];

  if ( usersList ) {
    usersList.forEach(( user: Iuser ) => {
      const chatItem = new ChatItem({
        img: user.avatar,
        name: user.name,
        text: slisedText(user.messages[0].message),
        time: user.messages[0].time,
        unviewed: '2',
        classAvatar: 'users__avatar',
        classInfo: 'users__info',
        className: 'users__name',
        classText: 'users__text',
        classMessegeInfo: 'users__mess-info',
        classTime: 'users__time',
        classCount: 'users__count',
        attr: {
          class: 'users__item',
        },
      });
      chatItems.push(chatItem);
    });
  }


  headerLinksData.forEach(( value ) => {
    const linkItem = new Link({
      value: value.value,
      img: value.img,
      classImg: 'dropdown__link-img',
      attr: {
        class: 'dropdown__item',
      },
    });

    headerList.push(linkItem);
  });

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
        headerLink.positionRect(headerDropdownList, 55, -175);
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

  const chatHeader = new ChatHeader({
    avatar: noAvatar,
    name: 'Андрей',
    headerLink: headerLink,
    headerDropdownList,
    attr: {
      class: 'chat-header',
    },
  });

  if ( usersList[0].messages ) {
    usersList[0].messages.forEach(( message: Imessage ) => {
      const classMessage = message.isOwner ? 'message-owner' : '';
      const classTime = message.isOwner ? 'message__time-blue' : '';

      const messageItem = new ChatMessage({
        text: message.message,
        time: message.time,
        classText: 'message__text',
        classTime: 'message__time ' + classTime,
        attr: {
          class: 'message ' + classMessage,
        },
      });
      chatMessages.push(messageItem);
    });
  }

  const chatMessageGroup = new ChatMessageGroup({
    date: '19 июня',
    chatMessages,
    attr: {
      class: 'message__container',
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
        console.log(footerForm.getObjLog(footerForm));
        event.preventDefault();
      },
    },
    attr: {
      class: 'form-footer',
    },
  });

  footerLinksData.forEach(( value ) => {
    const linkItem = new Link({
      value: value.value,
      img: value.img,
      classImg: 'dropdown__link-img',
      attr: {
        class: 'dropdown__item',
      },
    });
    footerList.push(linkItem);
  });

  const footerLink = new Link({
    img: clip,
    classImg: 'dropdown__img footer__dropdown-img',
    events: {
      click: ( event ) => {
        if ( event ) {
          event.preventDefault();
        }
        footerDropdownList.toggle('visually-hidden');

        footerLink.positionRect(footerDropdownList, -178, 0);
      },
    },
    attr: {
      class: '',
      href: '',
    },
  });

  const footerDropdownList = new DropdownList({
    value: footerList,
    attr: {
      class: 'visually-hidden dropdown__list',
    },
  });

  const chatFooter = new ChatFooter({
    footerForm,
    footerLink: footerLink,
    footerDropdownList,
    attr: {
      class: 'chat-footer'
    },
  });

  const chatBox = new ChatBox({
    chatHeader,
    chatMessageGroup,
    chatFooter,
    attr: {
      class: 'chat-box',
    },
  });

  const chats = new Chats({
    chatItems,
    chatBox,
    attr: {
      class: 'chats chats__wrapper',
    },
  });

  return chats;
};
