import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HomeHeader from '../HomeHeader.vue'

describe('HomeHeader', () => {
  it('renders properly', () => {
    const wrapper = mount(HomeHeader)
    expect(wrapper.text()).toContain('MOONHOLDINGS.XYZ')

    const a = 2 + 2
    expect(a === 2)
  })
})
