import { SubmitHandler, useForm } from 'react-hook-form'

import Input from 'components/Input'
import Loader from 'components/Loader'
import Button from 'components/Button'
import type { WalletFormData } from 'pages/Home/types'

import classes from './WalletForm.module.css'
import { validation } from './validation'

interface Props {
  onSubmit: SubmitHandler<WalletFormData>
}

function WalletForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<WalletFormData>({ mode: 'onTouched' })

  return (
    <form role="form" className={classes.row} onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="Enter ETH wallet address to get balance"
        disabled={isSubmitting}
        error={errors.address}
        {...register('address', validation.address)}
      />

      <Button disabled={isSubmitting || !isValid}>
        {isSubmitting ? <Loader /> : 'Get balance'}
      </Button>
    </form>
  )
}

export default WalletForm
