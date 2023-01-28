import {Block} from './Block';

export const renderDOM = (block: Block<object>) => {
  const root = document.getElementById( 'root' );
  root!.append(block.getContent()!);
};
