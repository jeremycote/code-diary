import { Button, CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { DiaryEntry } from "../../types/DiaryEntry";

type EntryCardProp = {
  entry: DiaryEntry
}

class EntryCard extends React.Component<EntryCardProp, {}> {
  render() {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {this.props.entry.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {this.props.entry.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default EntryCard;
