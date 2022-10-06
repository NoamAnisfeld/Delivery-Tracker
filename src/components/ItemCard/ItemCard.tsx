import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Product } from "../../interfaces/interfaces"

export default function ItemCard({ item }: { item: Product }) {
    return <Card sx={{ maxWidth: 500, bgcolor: "primary.main" }}>
        <Typography p={2} variant="h3" component="div" align="center">
            {item.title}
        </Typography>
        <Grid container>
            <Grid item xs={true}>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {item.description}
                    </Typography>
                </CardContent>
            </Grid>
            <Grid item sm={3} m={2}>
                <CardMedia
                    component="img"
                    sx={{ width: "100%", height: "auto" }}
                    image={item.image}
                    alt={item.title}
                />
            </Grid>
        </Grid>
        <Grid container sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Grid item xs={true}>
                <CardActions>
                    <Button variant="contained" color="secondary" size="small">Add to delivery waiting list</Button>
                </CardActions>
            </Grid>
            <Grid item sm={4}>
                <Typography variant="h5" m={2} textAlign="center">
                    {item.price}$
                </Typography>
            </Grid>
        </Grid>
    </Card>
}