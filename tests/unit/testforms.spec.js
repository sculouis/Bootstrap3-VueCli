import { render,fireEvent,cleanup,getQueriesForElement } from '@testing-library/vue'
import TextString from '@/components/TextString.vue'

afterEach(cleanup)
describe('測試TextString.vue', () => {
    it('renders val', () => {
        const { debug,updateProps } = render(TextString)
        const props = async ()=> await updateProps({smallSize:true,placeHolder:"請輸入"});
        props()
        const input = getQueriesForElement("input")
        fireEvent.update(input,"測試")
        debug()
      })
   })
