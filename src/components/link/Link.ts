import tpl from './Link.hbs';
import {Block} from '../../services/Block';

interface LinkProps {
  value?: string,
  img?: SVGAElement,
  classImg?: string,
  events?: {
    click?: (event?: MouseEvent) => void
  },
  attr?: {
    class?: string,
    href?: string
  }
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super('a', props);
  }

  render() {
    return this.compile(tpl, {
      value: this.props.value,
      attr: this.props.attr,
      img: this.props.img,
      classImg: this.props.classImg,
    });
  }
}
