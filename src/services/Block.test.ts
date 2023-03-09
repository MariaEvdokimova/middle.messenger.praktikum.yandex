import { Block } from "./Block";

describe('Check Block', () => {
    class mockBlock extends Block<{test: string}> {
        constructor(props: {test: string}) {
            super('div', props);
        }
        render() {
          return this.compile(()=>'<div></div>', {});
        }
      }
    
      it('check setProps', () => {
        const block = new mockBlock({ test: 'test' });
        block.setProps({ test: 'new test' });
        expect(block.props).toHaveProperty('test', 'new test');
      });

      it('dispatchComponentDidMount', () => {
        const block = new mockBlock({ test: 'test' });
        expect(block.dispatchComponentDidMount).toBeDefined();
      });  

    it('hide content', () => {
        const block = new mockBlock({ test: 'test' });
        block.hide();
        expect(block.getContent()!.style.display).toStrictEqual('none');
    });

    it('show content', () => {
        const block = new mockBlock({ test: 'test' });
        block.show();
        expect(block.getContent()!.style.display).toStrictEqual('flex');
    });
});
