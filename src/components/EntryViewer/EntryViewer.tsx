import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { useParams, useLocation, Location } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { GithubFile } from "../../types/GithubFile";
import { apiClient } from "../../services";

function EntryViewer() {
  const { entryId } = useParams();
  console.log(entryId);
  const location: Location = useLocation()

  const path: string = location.pathname.replace("/entry/", "")
  const [ file, setFile ] = useState<GithubFile | null>(null)

  apiClient.getFile(path).then((result: GithubFile | null) => {
    setFile(result)
  })

  //TODO: API call calls refresh, memoize?

  return (
    <Grid
      style={{ height: "100%" }}
      container
      spacing={{ xs: 0, sm: 2 }}
      columns={{ xs: 1, sm: 3, md: 8 }}
    >
      <Grid item xs={1} sm={1} md={2}>
        <h1>Details</h1>
        <a>pathname: {location.pathname}</a>
        <p>key: {location.key}</p>
        <p>search: {location.search}</p>
        <p>id: {entryId}</p>
      </Grid>
      <Grid item xs={1} sm={2} md={6}>
        <div style={{ margin: "1em", height: "90vh" }}>
          <Editor defaultLanguage="Markdown" defaultValue={"Unable to get file."} />
        </div>
      </Grid>
    </Grid>
  );
}

export default EntryViewer;
