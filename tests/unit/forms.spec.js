import {
  shallowMount,
  mount
} from '@vue/test-utils'
import TextString from '@/components/TextString.vue'
import TextNumber from '@/components/TextNumber.vue'

const factory = (values = {}) => {
  return shallowMount(TextString, {
    data() {
      return {
        ...values
      }
    }
  })
}

describe('測試TextString.vue', () => {
  it('renders val', () => {
      const wrapper = factory({
        val: 'input text',
        small: false
      })
      wrapper.setProps({
        smallSize: true
      })
      console.log(wrapper.html())
      expect(wrapper.contains('input')).toBe(true)
    }),

    it('props Data', () => {
      const value = 'new message';
      const smallSize = true
      const placeHolder = "請輸入"
      const wrapper = mount(TextString, {
        propsData: {
          value,
          smallSize,
          placeHolder
        },
      });
      // wrapper.setData({val:"測試"})
      console.log(wrapper.vm.val)
    })
})

describe('測試TextNumber.vue', () => {
  it('props Data', () => {
      const value = 987654321.123
      const smallSize = true
      const placeHolder = "請輸入"
      const wrapper = shallowMount(TextNumber, {
        propsData: {
          value,
          smallSize,
          placeHolder
        },
      });
      // wrapper.setData({val:"測試"})
      expect(wrapper.vm.numVal).toBe('987,654,321.123')
      console.log(wrapper.vm.numVal)
    }),
    it('set Data', () => {
      const wrapper = shallowMount(TextNumber, {
        propsData: {
          value: 123456
        }
      });
      wrapper.setData({
        val: 654321.1234
      })
      expect(wrapper.vm.numVal).toBe('654,321.1234')
      console.log(wrapper.vm.numVal)
      console.log(wrapper.html())
    })
})