import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial( 'authorization', tpl );

export const authorization = ( props = {} ) => {
	return tpl( props );
}
