import {
  shallowMount,
  mount
} from '@vue/test-utils'
import TextString from '@/components/TextString.vue'
import TextNumber from '@/components/TextNumber.vue'
import DatePicker from '@/components/DatePicker'
import Selecter from '@/components/Selecter'

describe('測試TextString.vue', () => {
  it('renders val', () => {
      const wrapper = mount(TextString,{propsData: {
        value: '測試輸入',
        smallSize: false
      }})
      console.log(wrapper.html())
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
      wrapper.setData({val:"測試"})
      expect(wrapper.vm.val).toEqual("測試")
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

describe('測試DatePicker.vue', () => {
  it('props Data', () => {
      const value = '2019-09-26'
      const smallSize = true
      const wrapper = shallowMount(DatePicker, {
        propsData: {
          value,
          smallSize,
        },
      });
      // wrapper.setData({val:"測試"})
      expect(wrapper.vm.val).toBe('2019-09-26')
      console.log(wrapper.vm.val)
    }),
    it('set Data', () => {
      const wrapper = shallowMount(DatePicker, {
        propsData: {
          value: '2019-09-30'
        }
      });
      wrapper.setData({
        val: '2019-10-01'
      })
      expect(wrapper.vm.val).toBe( '2019-10-01')
      console.log(wrapper.vm.val)
      console.log(wrapper.html())
    })
})

describe('測試Selecter.vue', () => {
  it('props Data', () => {
      const value = '1'
      const smallSize = true
      const wrapper = shallowMount(Selecter, {
        propsData: {
          value,
          smallSize,
        },
      });
      expect(wrapper.vm.val).toBe('1')
      console.log(wrapper.vm.val)
    }),
    it('set Data', () => {
      const wrapper = shallowMount(Selecter, {
        propsData: {
          value: '1'
        }
      });
      wrapper.setData({
        val: '2'
      })
      expect(wrapper.vm.val).toBe( '2')
      console.log(wrapper.vm.val)
      console.log(wrapper.html())
    })
})

