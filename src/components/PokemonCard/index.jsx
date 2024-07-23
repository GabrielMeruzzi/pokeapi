import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function PokemonCard({name, img}) {
    return (
        <Card sx={{ width: '80%', maxWidth: '350px' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    sx={{ height: 'auto', maxHeight: '300px' }}
                    image={img}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
