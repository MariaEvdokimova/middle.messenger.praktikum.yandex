import tpl from './Chats.hbs';
import './Chats.scss';
import {Block} from '../../services/Block';
import {ChatBox} from '../../components/chat/chatBox/ChatBox';
import {ChatItem} from '../../components/chat/chatItem/ChatItem';
import { Link } from '../../components/link/Link';
import connect from '../../services/store/Connect';
import { Modal } from '../../components/modal/Modal';
import Store, { StoreEvents } from '../../services/store/Store';
import { getAvatar } from '../../utils/getAvatar';
import { slisedText } from '../../utils/SlicedText';
import { socketController } from '../../controllers/SocketController';
import { chatsController } from '../../controllers/ChatsController';

interface ChatsProps {
  linkAddChat?: Link,
  linkProfile?: Link,
  chatItems?: Array<ChatItem>,
  chatBox?: ChatBox,
  attr?: {
    class?: string
  },
  modal?: Modal
}

export class Chats extends Block<ChatsProps> {
  constructor( props: ChatsProps) {
    super('div', props);
    
    chatsController.getChats();

    let chats = Store.getState().chats;

    let chatItems: Array<ChatItem> = [];
    if ( chats ) {
      chats.forEach(( chat: any ) => {
        const chatItem = new ChatItem({
          img: getAvatar(chat.avatar),
          name: chat.title,
          text: chat.last_message ? slisedText(chat.last_message.content) : '',
          time: '00:00',
          unviewed: chat.unread_count,
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
          events: {
            click: (event) => {
              event!.preventDefault();
              Store.set('selectedChat', {
                id: chat.id, 
                title: chat.title,
                avatar: chat.avatar
              });
            }
          }
        });
        chatItems.push(chatItem);
        });
      }

      this.setProps({ chatItems: chatItems});
    
      Store.on(StoreEvents.Updated, () => {

        chats = Store.getState().chats;
        chatItems = [];
        
        if ( !!chats && chats.length !== 0 ) {
          chats.forEach(( chat: any ) => {
            const chatItem = new ChatItem({
              img: getAvatar(chat.avatar),
              name: chat.title,
              text: chat.last_message ? slisedText(chat.last_message.content) : '',
              time: '00:00',
              unviewed: chat.unread_count,
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
              events: {
                click: (event) => {
                  event!.preventDefault();

                  Store.set('selectedChat', {
                    id: chat.id, 
                    title: chat.title,
                    avatar: chat.avatar
                  });

                  Store.set('messages', []);
                socketController.connect();
              }
            }
          });
            chatItems.push(chatItem);
          });          
        } else {
          chatItems.push(new ChatItem({}));
        }
        
        this.setProps({ 
          chatItems: chatItems
        })
      });

  }

  addModal( modal: Modal){
    this.setProps({ maoda: modal});
  }

  render() {
    return this.compile(tpl, {
      linkAddChat: this.props.linkAddChat,
      linkProfile: this.props.linkProfile,
      chatItems: this.props.chatItems,
      chatBox: this.props.chatBox,
      attr: this.props.attr,
      modal: this.props.modal,
    });
  }
}

const withUser = connect((state) => ({ ...state.chats }));
export const ChatPage = withUser(Chats as typeof Block);
