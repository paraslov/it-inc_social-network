import Joi from '@hapi/joi'
import React, {useEffect, useState} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {joiResolver} from '@hookform/resolvers/joi'
import s from '../Dialogs.module.css'

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
type TSendMessageFormProps = {
  wsChannel: WebSocket | null
}
export const SendMessageForm: React.FC<TSendMessageFormProps> = (({wsChannel}) => {
  const [wsReady, setWsReady] = useState('pending')

  const {register, handleSubmit, resetField, formState: {errors}} = useForm<TFormDataType>({
    resolver: joiResolver<any>(schema)
  })

  const onSubmit: SubmitHandler<TFormDataType> = (formData) => {
    if (!formData.newMessageText) return
    wsChannel?.send(formData.newMessageText)
    resetField('newMessageText')
  }

  useEffect(() => {
    const wsOpenHandler = () => {
      setWsReady('resolved')
    }
    wsChannel?.addEventListener('open', wsOpenHandler)
    return () => {
      wsChannel?.removeEventListener('open', wsOpenHandler)
    }
  }, [wsChannel])

  const isButtonDisabled = wsChannel === null || wsReady === 'pending'

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
