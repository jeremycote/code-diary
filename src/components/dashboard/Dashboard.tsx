import { Button, Grid } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../context/ApiContextProvider';
import { ConfigContext } from '../../context/ConfigContextProvider';
import { DiaryEntry } from '../../types/DiaryEntry';
import EntryCard from '../entryCard/EntryCard';

function Dashboard() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  const context = useContext(ConfigContext);

  const api = useContext(ApiContext);

  useEffect(() => {
    api.client?.getIndex().then(index => {
      if (index) {
        console.log(`Index version: ${index.version}`);
        setEntries(index.entries);
      } else {
        console.error('Index failed to load');
      }
    });
  }, [api.client]);

  return (
    <div>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 16 }}
        justifyContent="center"
        direction="row"
      >
        {entries.map((entry: DiaryEntry) => (
          <Grid item xs={2} sm={4} md={4} key={entry.name}>
            <EntryCard entry={entry} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Dashboard;
