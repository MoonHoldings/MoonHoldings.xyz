import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import HomeHeader from "../HomeHeader.vue";

describe("HomeHeader", () => {
  it("renders properly", () => {
    const wrapper = mount(HomeHeader, { props: { title: "Hello Vitest" } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
