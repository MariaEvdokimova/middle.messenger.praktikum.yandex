import tpl from './ChatBox.hbs';
import * as styles from './ChatBox.scss';
import {Block} from '../../../services/Block';
import {ChatHeader} from '../chatHeader/ChatHeader';
import {ChatMessageGroup} from '../chatMessageGroup/ChatMessagesGroup';
import {ChatFooter} from '../chatFooter/ChatFooter';
import connect from '../../../services/store/Connect';
import Store, { StoreEvents } from '../../../services/store/Store';
import { ChatMessage } from '../chatMessage/ChatMessage';
import { parseDate } from '../../../utils/ParseDate';

interface ChatBoxProps {
  chatHeader?: ChatHeader,
  chatFooter?: ChatFooter,
  attr?: {
    class?: string
  }
}

export class ChatBox extends Block<ChatBoxProps> {
  constructor(props: ChatBoxProps) {
    super('div', props);

    Store.on(StoreEvents.Updated, () => {
      let messages = Store.getState().messages;
      
      const chatMessages: Array<ChatMessage> =[];
      let chatMessageGr = new ChatMessageGroup({
        attr: {
          class: 'message__container',
        },
      });
 
      if ( !!messages && messages.length !== 0) {
        messages.forEach(( message: any ) => {

          const classMessage = message.user_id ===  Store.getState().user.id ? 'message-owner' : '';
          const classTime = message.user_id ===  Store.getState().user.id ? 'message__time-blue' : '';
      
          const time = parseDate(message.time).time;

          const messageItem = new ChatMessage({
            text: message.content,
            time: time,
            classTime: 'message__time ' + classTime,
            attr: {
              class: 'message ' + classMessage,
            },
          });
          chatMessages.push(messageItem);
        });
        
        const date = parseDate(messages[messages.length-1].time).date;

        chatMessageGr.setProps({
          date: date,
          chatMessages: chatMessages,
        });

        this.setProps({ 
          chatMessageGroup: chatMessageGr
        });

       chatMessageGr.getContent()!.scrollTop = chatMessageGr.getContent()!.scrollHeight;  

      } else {
         chatMessageGr.hidden();
         this.setProps({ 
          chatMessageGroup: chatMessageGr
        });
      }
    })
  }

  render() {
    return this.compile(tpl, {
      chatHeader: this.props.chatHeader,
      chatFooter: this.props.chatFooter,
      attr: this.props.attr,
      styles,
    });
  }
}

const withUser = connect((state) => ({ ...state.messages }));
export const ChatBoxComponent = withUser(ChatBox as typeof Block);
