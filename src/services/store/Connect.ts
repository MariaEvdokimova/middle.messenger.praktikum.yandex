import { Indexed } from '../../utils/Interfeces';
import { isEqualObj } from '../../utils/IsEqualObj';
import { Block } from '../Block';
import Store, { StoreEvents } from './Store';

export default function connect(mapStateToProps: (state: Indexed) => Indexed) {
    return function(Component: typeof Block<any>) {
      return class extends Component {
        constructor(props: any) {
            // сохраняем начальное состояние
            let state = mapStateToProps(Store.getState());

            super({...props, ...state});

            // подписываемся на событие
            Store.on(StoreEvents.Updated, () => {
                      // при обновлении получаем новое состояние
                      const newState = mapStateToProps(Store.getState());
                
                      // если что-то из используемых данных поменялось, обновляем компонент
                     if (!isEqualObj(state, newState)) {
                    this.setProps({...newState});
                     }
  
                      // не забываем сохранить новое состояние
                      state = newState;
                  });
          }
      }
      }
  }
