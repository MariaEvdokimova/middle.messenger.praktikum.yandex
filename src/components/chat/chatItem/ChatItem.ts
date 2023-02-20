import tpl from './ChatItem.hbs';
import {Block} from '../../../services/Block';

interface ChatItemProps {
  img?: string | SVGElement,
  name?: string,
  text?: string,
  time?: string,
  unviewed?: string,
  classAvatar?: string,
  classInfo?: string,
  className?: string,
  classText?: string,
  classMessegeInfo?: string,
  classTime?: string,
  classCount?: string,
  events?: {
    click: (event?: MouseEvent) => void
  },
  attr?: {
    class?: string,
    href?: string
  }
}

export class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super('a', props);
  }

  render() {
    return this.compile(tpl, {
      img: this.props.img,
      name: this.props.name,
      text: this.props.text,
      time: this.props.time,
      unviewed: this.props.unviewed,
      classAvatar: this.props.classAvatar,
      classInfo: this.props.classInfo,
      className: this.props.className,
      classText: this.props.classText,
      classMessegeInfo: this.props.classMessegeInfo,
      classTime: this.props.classTime,
      classCount: this.props.classCount,
      attr: this.props.attr,
    });
  }
}
