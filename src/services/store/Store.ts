import { Indexed } from "../../utils/Interfeces";
import set from "../../utils/Set";
import { EventBus } from "../EventBus";

export enum StoreEvents {
    Updated = 'updated',
  }

class Store extends EventBus {

	static _instance: Store;
	static STORE_NAME = 'myAppStore';

	_state: Indexed = {};

	constructor() {
		
		if(Store._instance)
			return Store._instance;

		super();

		const savedState = localStorage.getItem(Store.STORE_NAME);
		
		this._state = savedState ? (JSON.parse(savedState) ?? {}) : {} 

		Store._instance = this;

		this.on(
			StoreEvents.Updated, 
			() => { localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state)); }
		);
	}

	public getState() {
		return this._state;
	}

	removeState() {
		this._state = {};
		this.emit(StoreEvents.Updated);
	}

	public set(path: string, value: unknown) {
		//this._state[id] = value;
        set(this._state, path, value);
		this.emit(StoreEvents.Updated);
		return this;
	}
}

export default new Store(); 
