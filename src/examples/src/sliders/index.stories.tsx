import HeroSlider from 'hero-slider';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import '../index.css';
import { Page } from '../ui/Page';
import BasicSlider from './BasicSlider';
import AutoplayButtonSlider from './AutoplayButtonSlider';
import NavbarSlider from './NavbarSlider';

export default {
  title: 'Example/hero-slider',
  component: HeroSlider,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Page>;

export const Basic: ComponentStory<typeof Page> = (args) => (
  <main>
    <BasicSlider {...args} />
    <Page />
  </main>
);

export const AutoplayButton: ComponentStory<typeof Page> = (args) => (
  <main>
    <AutoplayButtonSlider {...args} />
    <Page />
  </main>
);

export const Navbar: ComponentStory<typeof Page> = (args) => (
  <main>
    <NavbarSlider {...args} />
  </main>
);
