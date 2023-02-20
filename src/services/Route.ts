import { isEqual } from "../utils/IsEqual";
import { Block } from "./Block";
import { render } from "./Render";

export interface RouteProps {
    rootQuery: string
}

class Route {
    private _pathname: string;
    private _blockClass: Block<object>; //Block<any>;
    private _block: Block<object> | null; //Block<any> | null; 
    private _props: RouteProps;

    constructor(pathname: string, view: Block<object>, props: RouteProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
           this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = this._blockClass;
            render(this._props.rootQuery, this._block!);
            return;
        }

        this._block.show();
    }
}

export { Route };
