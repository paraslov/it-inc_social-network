import Joi from '@hapi/joi'
import React from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {joiResolver} from '@hookform/resolvers/joi'
import s from '../Dialogs.module.css'
import {useDispatch} from 'react-redux'
import {sendMessage} from '../../../../redux/chat_reducer'

const schema = Joi.object({
  newMessageText: Joi.string()
    .max(200)
    .messages({
      'string.max': 'Message must be less than 200 symbols',
    })
})
//* SendMessageForm component ========================================================================================>>
type TFormDataType = {
  newMessageText: string
}
type TSendMessageFormProps = {}
export const SendMessageForm: React.FC<TSendMessageFormProps> = (() => {
  const dispatch = useDispatch()

  const {register, handleSubmit, resetField, formState: {errors}} = useForm<TFormDataType>({
    resolver: joiResolver<any>(schema)
  })

  const onSubmit: SubmitHandler<TFormDataType> = (formData) => {
    if (!formData.newMessageText) return
    dispatch(sendMessage(formData.newMessageText))
    resetField('newMessageText')
  }

  const isButtonDisabled = false

  return (
    <form className={s.inputAreaContent} onSubmit={handleSubmit(onSubmit)}>
      <textarea {...register('newMessageText')} placeholder={'new message'}/>
      {errors.newMessageText && <p className={s.errors}>{errors.newMessageText?.message}</p>}
      <div>
        <button type={'submit'} disabled={isButtonDisabled}>Send</button>
      </div>
    </form>
  )
})
