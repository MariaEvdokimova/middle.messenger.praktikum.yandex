import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import tplEditData from './profileEditData.hbs';
import tplEditPassword from './profileEditPassword.hbs';
import './style.scss';

Handlebars.registerPartial( 'profile', tpl );
Handlebars.registerPartial( 'profileEditData', tplEditData );
Handlebars.registerPartial( 'profileEditPassword', tplEditPassword );

export default ( props = {} ) => {
	return {
		tpl: tpl( props ),
		tplEditData: tplEditData( props ),
		tplEditPassword: tplEditPassword( props )
	};
}