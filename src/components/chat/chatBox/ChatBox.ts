import tpl from './ChatBox.hbs';
import * as styles from './ChatBox.scss';
import {Block} from '../../../services/Block';
import {ChatHeader} from '../chatHeader/chatHeader';
import {ChatMessageGroup} from '../chatMessageGroup/ChatMessagesGroup';
import {ChatFooter} from '../chatFooter/ChatFooter';


interface ChatBoxProps {
  chatHeader?: ChatHeader,
  chatMessageGroup?: ChatMessageGroup,
  chatFooter?: ChatFooter,
  attr?: {
    class?: string
  }
}

export class ChatBox extends Block<ChatBoxProps> {
  constructor(props: ChatBoxProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {
      chatHeader: this.props.chatHeader,
      chatMessageGroup: this.props.chatMessageGroup,
      chatFooter: this.props.chatFooter,
      attr: this.props.attr,
      styles,
    });
  }
}
