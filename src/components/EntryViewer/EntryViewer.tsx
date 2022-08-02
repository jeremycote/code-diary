import Grid from "@mui/material/Grid";
import React from "react";
import { useParams } from "react-router";
import Editor from "@monaco-editor/react";

function EntryViewer() {
  const { entryId } = useParams();
  console.log(entryId);
  return (
    <Grid
      style={{ height: "100%" }}
      container
      spacing={{ xs: 0, sm: 2 }}
      columns={{ xs: 1, sm: 3, md: 8 }}
    >
      <Grid item xs={1} sm={1} md={2}>
        <h1>Details</h1>
      </Grid>
      <Grid item xs={1} sm={2} md={6}>
        <div style={{ margin: "1em", height: "90vh" }}>
          <Editor defaultLanguage="Markdown" defaultValue="#Sample" />
        </div>
      </Grid>
    </Grid>
  );
}

export default EntryViewer;
