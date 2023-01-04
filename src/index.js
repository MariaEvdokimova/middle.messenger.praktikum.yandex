import tpl from './index.hbs';

console.log(tpl);

document.getElementById('root').innerHTML = tpl({
    fname: 'students'
});


/*import Handlebars from "handlebars";
import tpl from 'bundle-text:./index.hbs';
import './sass/index.scss';
//import button from './components/button';
//import page1 from './pages/page1';
//import page2 from './pages/page2';

console.log(tpl);

const comp = Handlebars.compile(tpl);
const res = comp({
	fname: 'students'
//	btn: button('btn1','Click this', )
});

document.getElementById('root').innerHTML = res;

*/

/*import tpl from './index.hbs';


document.getElementById('root').innerHTML = tpl({
    fname: 'students'
});
*/
/*import './styles/style.css';
import button from './components/button';
import authorization from './pages/authorization';
//import page2 from './pages/page2';

console.log(tpl);

document.getElementById('root').innerHTML = tpl({
	fname: 'students',
	btn: button('btn1','Sign in')
});


window.createButton = (id, value) => {

	const htmlTpl = document.createElement('template');
	htmlTpl.innerHTML = button(id,value);

	document.getElementById('root').appendChild(htmlTpl.content);
}
*/