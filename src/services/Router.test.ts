import { Indexed } from "../utils/Interfeces";
import { Block } from "./Block";
import { router } from "./Router";

describe('Check Router', () => {
    it('Router go', () => {
      router.go('/messenger');
      expect(window.location.pathname).toStrictEqual('/messenger');
    });

    it('Router back', () => {
      router.go('/login');
      router.back()
      expect(window.location.pathname).toStrictEqual('/login');
    });

    it('Router use', () => {
      const mockBlock = class extends Block<Indexed> {
        constructor(props: Indexed){
          super('div', props);
        }
      };
      const result = router.use('/', new mockBlock({}));
      expect(result).toBe(router);
    });

  }); 
