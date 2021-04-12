import React from 'react'
import {Dialog, DialogPropsType} from './Dialog';
import {Meta, Story} from '@storybook/react';
import {MemoryRouter} from 'react-router-dom';


export default {
    title: 'Dialogs Page/Dialog',
    component: Dialog,
    decorators: [Story => <MemoryRouter><Story/></MemoryRouter>]
} as Meta

const Template: Story<DialogPropsType> = (args) => <Dialog {...args} />

export const DialogTest = Template.bind({})
DialogTest.args = {
    id: 1,
    name: 'Suzuki Inomoto',
    avatar: 'https://i.pinimg.com/originals/3a/3b/5f/3a3b5f7e4bf441eec327d5ef431a718a.jpg'
}
