import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function BusinessCard({ yelpData }) {
  const classes = useStyles();

  return (
    <Card className={`${classes.root} m-2`}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={yelpData.image_Url}
          title={yelpData.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {yelpData.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`${yelpData.address}`}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
           {yelpData.rating}/5 stars
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <a href={yelpData.url} target='_blank' rel='noreferrer'>
        <Button size="small" color="primary">
          Visit Website
        </Button>
        </a>
      </CardActions>
    </Card>
  );
}
