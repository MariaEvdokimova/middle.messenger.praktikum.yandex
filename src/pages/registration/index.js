import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial( 'registration', tpl );

export const registration = ( props = {} ) => {
	return tpl( props );
}
