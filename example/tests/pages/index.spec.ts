import { mount } from '@vue/test-utils'

import Index from '@/pages/index.vue'

describe('Index', () => {
  test('1st h1', () => {
    const wrapper = mount(Index)
    expect(wrapper.find('h1').text()).toBe('Example')
  })
})
