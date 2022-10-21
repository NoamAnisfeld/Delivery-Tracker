import Typography, { TypographyProps } from '@mui/material/Typography'
import { SystemCssProperties } from '@mui/system'

export default function XSHiddenText(props: TypographyProps) {
    return <Typography
        component="span" // added first so it can be overriden in props
        {...props}
        sx={{
            display: {
                xs: "none",
                sm: "revert",
            },
            ...props.sx,
        }}
    >
        {props.children}
    </Typography>
}