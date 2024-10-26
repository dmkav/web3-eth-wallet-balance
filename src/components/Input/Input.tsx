import classes from './Input.module.css'
import { forwardRef, HTMLAttributes } from 'react'
import Error from '../Error'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

type Props = UseFormRegisterReturn &
  HTMLAttributes<HTMLInputElement> & {
    error?: FieldError
  }

const Input = forwardRef(({ error, ...restProps }: Props, ref) => {
  return (
    <div className={classes.wrapper}>
      <input
        ref={ref}
        type="text"
        className={classes.input}
        placeholder="Enter ETH wallet address to get balance"
        {...restProps}
      />
      {error && (
        <div className={classes.error}>
          <Error message={error.message} />
        </div>
      )}
    </div>
  )
})

export default Input
