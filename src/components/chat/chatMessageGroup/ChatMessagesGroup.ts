import tpl from './ChatMessagesGroup.hbs';
import * as styles from './ChatMessageGroup.scss';
import {Block} from '../../../services/Block';
import {ChatMessage} from '../chatMessage/ChatMessage';

interface ChatMessageGroupProps {
  date: string,
  chatMessages: Array<ChatMessage>,
  attr?: {
    class?: string
  }
}

export class ChatMessageGroup extends Block<ChatMessageGroupProps> {
  constructor(props: ChatMessageGroupProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {
      date: this.props.date,
      chatMessages: this.props.chatMessages,
      attr: this.props.attr,
      styles,
    });
  }
}
