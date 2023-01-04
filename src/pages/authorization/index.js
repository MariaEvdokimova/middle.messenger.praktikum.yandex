import Handlebars from 'handlebars';
//import Handlebars from 'handlebars/dist/handlebars.runtime';
import tpl from './tpl.hbs';
import './style.scss';
//import button from '../../components/button';

Handlebars.registerPartial('authorization', tpl);

export default (props = {}) => {
	return tpl(props);
}
