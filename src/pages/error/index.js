import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial( 'err', tpl );

export const error = ( err_code, err_message ) => {
	return tpl({ err_code, err_message });
}
