import tpl from './ChatMessage.hbs';
import * as styles from './ChatMessage.scss';
import {Block} from '../../../services/Block';

interface ChatMessageProps {
  text: string,
  time: string,
  classTime?: string,
  attr?: {
    class?: string
  }
}

export class ChatMessage extends Block<ChatMessageProps> {
  constructor(props: ChatMessageProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {
      text: this.props.text,
      time: this.props.time,
      classTime: this.props.classTime,
      attr: this.props.attr,
      styles,
    });
  }
}
