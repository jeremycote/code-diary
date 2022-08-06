import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { useParams, useLocation, Location } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { GithubFile } from '../../types/GithubFile';
import { apiClient } from '../../services';
import Async, { AsyncState } from 'react-async';
import { convertFromBase64 } from '../../services/Converter';
import ReactMarkdown from 'react-markdown';
import { ButtonGroup, Skeleton } from '@mui/material';

function EntryViewer() {
  const { entryId } = useParams();
  console.log(entryId);
  const location: Location = useLocation();

  const path: string = location.pathname.replace('/entry/', '');
  const [ fileContents, setFileContents] = useState("")

  return (
    <Grid style={{ height: '100%' }} container spacing={{ xs: 0, sm: 2 }} columns={{ xs: 1, sm: 3, md: 8 }}>
      <Grid item xs={1} sm={1} md={2}>
        <h1>Details</h1>
        <a>pathname: {location.pathname}</a>
        <p>key: {location.key}</p>
        <p>search: {location.search}</p>
        <p>id: {entryId}</p>
      </Grid>
      <Grid item xs={1} sm={2} md={6}>
        <div style={{ margin: '1em', height: '90vh' }}>
          <Async promiseFn={() => apiClient.getFile(path)}>
            {({ data, isLoading }) => {
              if (isLoading) return <Skeleton variant="rectangular" style={{ height: '100%' }} />;

              if (data) {
                console.log(data);
                return (
                  <Grid container columns={2} spacing={3} style={{ height: '100%' }}>
                    <Grid item xs={1} style={{ height: '100%' }}>
                      <Editor
                        defaultLanguage="Markdown"
                        defaultValue={convertFromBase64(data.content)}
                        theme={'vs-dark'}
                      />
                    </Grid>
                    <Grid item xs={1} style={{ height: '100%' }}>
                      <ReactMarkdown>{convertFromBase64(data.content)}</ReactMarkdown>
                    </Grid>
                  </Grid>
                );
              }
            }}
          </Async>
        </div>
      </Grid>
    </Grid>
  );
}

export default EntryViewer;
