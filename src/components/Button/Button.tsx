import classes from './Button.module.css'
import {HTMLAttributes} from "react";

export default function Button({children, ...restProps}: HTMLAttributes<HTMLButtonElement>) {
    return <button className={classes.button} {...restProps}>{children}</button>
}
