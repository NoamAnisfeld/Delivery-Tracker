import { useState } from 'react';

import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'

export default function CollapsibleText({
    children,
    collapsedSize = "4em",
    toggleExpandText = "View more...",
    toggleCollapseText = "View less...",
    initiallyExpanded = false,
}: React.PropsWithChildren & {
    collapsedSize: string | number | undefined,
    toggleExpandText: string,
    toggleCollapseText: string,
    initiallyExpanded: boolean,
}) {
    const [expanded, setExpanded] = useState(initiallyExpanded);

    return <>
        <Collapse {...{ collapsedSize }} in={initiallyExpanded}>
            {children}
        </Collapse>
        <Button
            onClick={() => setExpanded(value => !value)}
        >
            {expanded ? toggleCollapseText : toggleExpandText}
        </Button>
    </>
}