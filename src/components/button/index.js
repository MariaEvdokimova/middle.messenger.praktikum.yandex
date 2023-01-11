import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('button', tpl);

export const button = (id, value) => {
	return tpl({ id, value });
}
