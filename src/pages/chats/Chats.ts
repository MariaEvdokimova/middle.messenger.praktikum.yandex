import tpl from './Chats.hbs';
import './Chats.scss';
import {Block} from '../../services/Block';
import {ChatBox} from '../../components/chat/chatBox/ChatBox';
import {ChatItem} from '../../components/chat/chatItem/ChatItem';


interface ChatsProps {
  chatItems: Array<ChatItem>,
  chatBox?: ChatBox,
  attr: {
    class: string
  }
}

export class Chats extends Block<any> {
  constructor( props: ChatsProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {
      chatItems: this.props.chatItems,
      chatBox: this.props.chatBox,
      attr: this.props.attr.class,
    });
  }
}
