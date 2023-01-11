import tpl from './index.hbs';
import './css/style.scss';
import { button } from './components/button';
import { authorization } from './pages/authorization';
import { registration } from './pages/registration';
import { error } from './pages/error';
import { chats } from './pages/chats';
import { profile } from './pages/profile';

const indexPage = ( page ) => {
	const res = document.getElementById( 'root' ).innerHTML = tpl({
		page: page
	});
	return res;
};

switch( window.location.pathname ) {
	case '/':  
		indexPage( authorization({ button: button( 'btn1','Sign in' )}) );
		break;  
	case  '/registration':
		indexPage( registration({ button: button( 'btn1','Sign up' )}) );
		break; 
	case  '/chats': 
		indexPage( chats() );
		break; 
	case  '/profile': 
		indexPage( profile().tpl );
		break;  
	case  '/profileEditData': 
		indexPage( profile({ button: button( 'btn1','Сохранить' )} ).tplEditData );
		break; 
	case  '/profileEditPassword': 
		indexPage( profile({ button: button( 'btn1','Сохранить' )} ).tplEditPassword );
		break; 
	default:
		indexPage( error( '404', 'Не туда попали' ) );	
		break; 
  }

window.createButton = ( id, value ) => {
	const htmlTpl = document.createElement( 'template' );
	htmlTpl.innerHTML = button( id,value );
	document.getElementById( 'root' ).appendChild( htmlTpl.content );
}
