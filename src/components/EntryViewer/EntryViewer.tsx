import Editor from '@monaco-editor/react';
import { Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import Async from 'react-async';
import ReactMarkdown from 'react-markdown';
import { Location, useLocation, useParams } from 'react-router-dom';
import { apiClient } from '../../services';
import { convertFromBase64 } from '../../services/Converter';

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
