import tpl from './Avatar.hbs';
import {Block} from '../../services/Block';

interface AvatarProps {
    linkToPopup: string,
    avatarImg: SVGElement,
    events: {
      click: (event?: MouseEvent) => void
    }
}

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {
      linkToPopup: this.props.linkToPopup,
      avatarImg: this.props.avatarImg,
    });
  }
}
