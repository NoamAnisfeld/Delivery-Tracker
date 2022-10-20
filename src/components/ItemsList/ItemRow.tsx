import {
    archiveItem,
    dearchiveItem,
    deleteItemFromAwaitedProducts,
    deleteItemFromArchivedProducts,
} from "../../GlobalState/dispatchers";

import PurcashedProduct from "../../data-structures/PurcashedProduct";
import Price from "../Price/Price";
import ColoredDate from "../ColoredDate/ColoredDate";

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import BackIcon from '@mui/icons-material/ArrowBack'

function ActionButton({
    label,
    icon,
    onClick = () => { },
}: {
    label: string,
    icon?: React.ReactNode,
    onClick?: () => void
}) {
    return <Tooltip title={label}>
        <Button variant="outlined"
            sx={{
                m: 1,
                '& span': {
                    display: {
                        xs: "none",
                        sm: "revert",
                    }
                }
            }}
            {...{ onClick }}
        >
            {icon}
            <Typography component="span">
                {label}
            </Typography>
        </Button>
    </Tooltip>
}

export default function ItemRow({
    item,
    context,
}: {
    item: PurcashedProduct,
    context: "AwaitingList" | "ArchivedList",
}) {
    return <TableRow
        sx={{
            '& .MuiTableCell-root': {
                py: 0,
            }
        }}
    >
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.store}</TableCell>
        <TableCell><Price priceInUSDollars={item.price} /></TableCell>
        <TableCell>
            {context === 'AwaitingList' ?
                <ColoredDate date={item.estimatedDeliveryDate} /> :
                item.estimatedDeliveryDate?.toLocaleDateString()}
        </TableCell>
        <TableCell>{context === "AwaitingList" ?
            <>
                <ActionButton
                    label="Archive"
                    icon={<CheckIcon />}
                    onClick={() => archiveItem(item)}
                />
                <ActionButton
                    label="Delete"
                    icon={<DeleteIcon />}
                    onClick={() => deleteItemFromAwaitedProducts(item)}
                />
            </> :

            <>
                <ActionButton
                    label="Dearchive"
                    icon={<BackIcon />}
                    onClick={() => dearchiveItem(item)}
                />
                <ActionButton
                    label="Delete"
                    icon={<DeleteIcon />}
                    onClick={() => deleteItemFromArchivedProducts(item)}
                />
            </>}</TableCell>
    </TableRow>
}