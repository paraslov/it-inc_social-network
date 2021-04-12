import React from 'react';
import NavBar from './NavBar';
import {Meta, Story} from '@storybook/react';
import {MemoryRouter} from 'react-router-dom';


export default {
    title: 'Common Components/NavBar',
    component: NavBar,
    decorators: [Story => (<MemoryRouter><Story/></MemoryRouter>)]
} as Meta

const Template: Story = (args) => <NavBar/>

export const NavBarTest = Template.bind({})