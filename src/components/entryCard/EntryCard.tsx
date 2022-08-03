import { Button, CardActionArea, CardActions } from "@mui/material";
import CardContent, { CardContentProps } from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { FC, useCallback } from "react";
import { DiaryEntry } from "../../types/DiaryEntry";
import Card from "@mui/material/Card";
import { StyledComponent } from "@emotion/styled";

type EntryCardProp = {
  entry: DiaryEntry;
};

const EntryCard: FC<EntryCardProp> = ({ entry }) => {
  const onMiddleClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (event.button === 1) {
        window.open(`/entry/${entry.path}`);
      }
    },
    [entry.path]
  );

  return (
    <div onAuxClick={onMiddleClick}>
      <Card sx={{ maxWidth: "30em", height: "20em" }}>
        <CardActionArea href={`/entry/${entry.path}`}>
          <CardContent>
            <Typography
              sx={{ height: "2em" }}
              gutterBottom
              variant="h5"
              component="div"
            >
              {entry.name}
            </Typography>

            <Typography
              sx={{ overflow: "auto auto", height: "14em" }}
              variant="body2"
              color="text.secondary"
            >
              {entry.description}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions sx={{ height: "2em" }}>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default EntryCard;
