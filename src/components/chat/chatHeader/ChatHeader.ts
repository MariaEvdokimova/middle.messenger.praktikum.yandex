import tpl from './ChatHeader.hbs';
import * as styles from './ChatHeader.scss';
import {Block} from '../../../services/Block';
import {DropdownList} from '../../dropdownList/DropdownList';
import {Link} from '../../link/Link';

interface ChatHeaderProps {
  avatar: SVGAElement,
  name: string,
  headerLink: Link,
  headerDropdownList: DropdownList,
  attr?: {
    class?: string
  }
}

export class ChatHeader extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {
      avatar: this.props.avatar,
      name: this.props.name,
      headerLink: this.props.headerLink,
      headerDropdownList: this.props.headerDropdownList,
      attr: this.props.attr,
      styles,
    });
  }
}
