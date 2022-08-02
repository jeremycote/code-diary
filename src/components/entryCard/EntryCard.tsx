import { Button, CardActionArea, CardActions } from "@mui/material";
import CardContent, { CardContentProps } from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import { DiaryEntry } from "../../types/DiaryEntry";
import Card from "@mui/material/Card"
import { StyledComponent } from "@emotion/styled";

type EntryCardProp = {
  entry: DiaryEntry
}

class EntryCard extends React.Component<EntryCardProp, {}> {
  render() {
    return (
      <Card sx={{ maxWidth: "30em", height: "20em" }}>

        <CardActionArea>

          <CardContent>
        
            <Typography sx={{height: "2em"}} gutterBottom variant="h5" component="div">
              {this.props.entry.name}
            </Typography>
        
            <Typography sx={{ overflow: "auto auto", height: "14em" }} variant="body2" color="text.secondary">
              {this.props.entry.description}
        
            </Typography>
        
          </CardContent>
        
        </CardActionArea>
        
        <CardActions sx={{height: "2em"}}>
          <Button size="small" color="primary">
            Share
          </Button>
        
        </CardActions>
      </Card>
    );
  }
}

export default EntryCard;
