import tpl from './ChatHeader.hbs';
import * as styles from './ChatHeader.scss';
import {Block} from '../../../services/Block';
import {DropdownList} from '../../dropdownList/DropdownList';
import {Link} from '../../link/Link';
import connect from '../../../services/store/Connect';
import Store, { StoreEvents } from '../../../services/store/Store';
import { getAvatar } from '../../../utils/getAvatar';

interface ChatHeaderProps {
  avatar?: SVGAElement,
  name?: string,
  headerLink?: Link,
  headerDropdownList?: DropdownList,
  attr?: {
    class?: string
  }
}

export class ChatHeader extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    super('div', props);
  }

  render() {
    const avatar = Store.getState().selectedChat ? Store.getState().selectedChat.avatar : null;

    return this.compile(tpl, {
      avatar: getAvatar(avatar),
      name: Store.getState().selectedChat ? Store.getState().selectedChat.title : '',
      headerLink: this.props.headerLink,
      headerDropdownList: this.props.headerDropdownList,
      attr: this.props.attr,
      styles,
    });
  }
}

const withUser = connect((state) => ({ ...state.selectedChat }));
export const ChatHeaderComponent = withUser(ChatHeader as typeof Block);
