import Typography from '@mui/material/Typography'

function isSameDate(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
}

export default function ColoredDate({
    date
}: {
    date?: Date
}) {
    if (!date)
        return null;
    
    return <Typography
        color={
            isSameDate(date, new Date) ?
                "success.main" :
            date.valueOf() < Date.now() ?
                "error.main" :
            undefined
        }
    >
        {date.toLocaleDateString()}
    </Typography>
}