import {EventBus} from './EventBus';
import { v4 as uuidv4 } from 'uuid';

class Block<Props extends object> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _setUpdate = false;
  public id = uuidv4();
  public props: Props;
  protected children: Record<string, Block<Props>> = {};
  private eventBus: () => EventBus;
  protected _element: HTMLElement | null = null;
  private _meta: { tagName: string, props: any };

  constructor( tagName = 'div', propsWithChildren: Record<string, any> = {} ) {
    const {props, children} = this._getChildrenAndProps( propsWithChildren );

    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.children = this._makePropsProxy( children) as Record<string, Block<Props>>;
    this.props = this._makePropsProxy( props ) as Props;
    this.eventBus = () => eventBus;
    this._registerEvents( eventBus );
    eventBus.emit( Block.EVENTS.INIT );
  }

  private _getChildrenAndProps<T>(childrenAndPropps: Record<string, T>) {
    const props: Record<string, T> = {};
    const children: Record<string, T> = {};

    Object.entries(childrenAndPropps).forEach(([key, value]) => {
      if (Array.isArray(value) ) {
        value.forEach((val) => {
          if (val instanceof Block) {
            children[key] = value;
          } else {
            props[key] = value;
          }
        });
        return;
      }

      if ( value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return {props, children};
  }

  _addEvents() {
    const {events} = this.props as Record<string, () => void>;

    if ( events ) {
      Object.entries( events ).forEach( ( [event, listener] ) => {
        this._element!.addEventListener( event, listener );
      });
    }
  }

  _removeEvents() {
    const {events} = this.props as Record<string, () => void>;

    if ( events ) {
      Object.entries( events ).forEach( ( [event, listener] ) => {
        this._element!.removeEventListener( event, listener );
      });
    }
  }

  private _addAttributes() {
    const {attr = {}} = this.props as Record<string, string>;

    if ( attr ) {
      Object.entries(attr).forEach(([key, value]) => {
        this._element!.setAttribute(key, value as string);
      });
    }
  }

  removeAttribute(attrName: string) {
    this._element!.removeAttribute(attrName);
  }

  private _registerEvents( eventBus: EventBus ) {
    eventBus.on( Block.EVENTS.INIT, this.init.bind(this) );
    eventBus.on( Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this) );
    eventBus.on( Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) );
    eventBus.on( Block.EVENTS.FLOW_RENDER, this._render.bind(this) );
  }

  private _createResources() {
    const {tagName} = this._meta;
    this._element = this._createDocumentElement( tagName );
  }

  protected init() {
    this._createResources();

    this.eventBus().emit( Block.EVENTS.FLOW_RENDER );
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {
    return true;
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate( oldProps: Props, newProps: Props ): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    this.eventBus().emit( Block.EVENTS.FLOW_RENDER );
  }

  protected componentDidUpdate( _oldProps: Props, _newProps: Props ) {
    return true;
  }

  setProps = ( nextProps: Record<string, any> ) => {
    if ( !nextProps ) {
      return;
    }

    const oldValue = (this.props);
    const {children, props} = this._getChildrenAndProps(nextProps);

    if (Object.values(children).length) {
      Object.assign( this.children, children );
    }

    if (Object.values(props).length) {
      Object.assign( this.props, props );
    }

    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, this.props);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();

    this._removeEvents();
    this._element!.innerHTML = '';
    this._element!.appendChild( block );
    this._addEvents();
    this._addAttributes();
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = {...context};

    Object.entries(this.children).forEach(([name, component]) => {
      contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
    });

    const html = template(contextAndStubs);

    const temp = document.createElement( 'template' );
    temp.innerHTML = html;

    Object.values(this.children).forEach((child) => {
      const stub = temp.content.querySelector(`[data-id="${child.id}"]`);

      if (!stub) {
        return;
      }

      if (Array.isArray(child)) {
        child.forEach((item, index) => {
          if (index === child.length - 1) {
            stub.replaceWith(item.getContent());
          } else {
            stub.before(item.getContent());
          }
        });
      } else {
        stub.replaceWith(child.getContent()!);
      }
    });

    return temp.content;
  }

  getContent() {
    return this.element;
  }

  private _makePropsProxy<T>( props: Record<string, T> ) {
    const self = this;

    return new Proxy( props, {

      get( target, prop: string ) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind( target ) : value;
      },

      set( target, prop: string, value ) {
        if (target[prop] !== value) {
          target[prop] = value;
          self._setUpdate = true;
        }
        return true;
      },

      deleteProperty() {
        throw new Error( 'Нет доступа' );
      },
    });
  }

  _createDocumentElement( tagName: string ) {
    return document.createElement( tagName );
  }

  show() {
    this.getContent()!.style.display = 'flex';//'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }

  visible() {
    this.getContent()!.style.visibility = 'visible';
  }

  hidden() {
    this.getContent()!.style.visibility = 'hidden';
  }

  toggle( className: string ) {
    this.getContent()!.classList.toggle(className);
  }

  positionRect(el: Block<any>, top: string, left: string) {
    el.getContent()!.style.top = top;
    el.getContent()!.style.left = left;
  }

}

export {Block};
