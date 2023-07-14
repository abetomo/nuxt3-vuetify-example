import { mount } from '@vue/test-utils'

import Index from '@/pages/index.vue'

describe('Index', async () => {
  test('1st h1', async () => {
    const wrapper = mount(Index)
    expect(wrapper.find('h1').text()).toBe('Example')
  })
})
