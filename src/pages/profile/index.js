import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import tplEditData from './profileEditData.hbs';
import tplEditPassword from './profileEditPassword.hbs';
import './style.scss';
import nerrow from '../../../static/img/nerrow.svg'
import noAvatar from '../../../static/img/no-pic.svg'

Handlebars.registerPartial( 'profile', tpl );
Handlebars.registerPartial( 'profileEditData', tplEditData );
Handlebars.registerPartial( 'profileEditPassword', tplEditPassword );

export default ( props = {} ) => {
	return {
		tpl: tpl( {...props, nerrow, noAvatar} ),
		tplEditData: tplEditData( {...props, nerrow, noAvatar} ),
		tplEditPassword: tplEditPassword( {...props, nerrow, noAvatar} )
	};
}