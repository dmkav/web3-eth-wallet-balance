import classes from './Error.module.css'

interface Props {
  message: string
}

export default function Error({ message }: Props) {
  return <span className={classes.error}>{message}</span>
}
