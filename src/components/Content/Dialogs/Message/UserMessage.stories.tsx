import React from 'react'
import {Meta, Story} from '@storybook/react';
import {UserMessage, UserMessagePropsType} from './UserMessage'

export default {
    title: 'Dialogs Page/Message',
    component: UserMessage,
} as Meta

const Template: Story<UserMessagePropsType> = (args) => <UserMessage {...args}/>

export const UserMessageTest = Template.bind({})
UserMessageTest.args = {
    message: 'Hi, this is logged in user message!',
    myMessage: true
}

export const CollocutorMessageTest = Template.bind({})
CollocutorMessageTest.args = {
    message: 'Hi, this is collocutor message!',
    myMessage: false
}