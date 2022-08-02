import { Grid } from "@mui/material";
import React from "react";
import {
  ConfigContext,
  ConfigContextType,
} from "../../context/ConfigContextProvider";
import { apiClient } from "../../services";
import { DiaryEntry } from "../../types/DiaryEntry";
import EntryCard from "../entryCard/EntryCard";

type DashboardState = {
  entries: DiaryEntry[];
};

class Dashboard extends React.Component<{}, DashboardState> {
  static contextType = ConfigContext;

  context!: React.ContextType<typeof ConfigContext>;

  constructor(props: {}) {
    super(props)
    this.state = {
      entries: []
    }
  }

  componentDidMount() {
    
    console.log(this.context!.gitApiUrl + "/users/jeremycote/gists")
    
    // fetch(this.context!.gitApiUrl + "/users/jeremycote/gists")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.setState({ entries: data });
    //   })
    //   .catch(console.log);

    apiClient.getIndex().then((index) => {
      console.log(index)
      if (index) {
        console.log(`Index version: ${index.version}`)
        this.setState({ entries: index.entries })
      }
    })
  }

  render() {
    return (
      <div>
        <Grid container spacing={2} justifyContent="center" direction="row">
          {this.state.entries.map((entry) => (
            <Grid item key={entry.name}>
              <EntryCard entry={entry}/>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default Dashboard;

// type Gist = {
//   url: string;
//   forks_url: string;
//   commits_url: string;
//   id: string;
//   node_id: string;
//   git_pull_url: string;
//   git_push_url: string;
//   html_url: string;
//   files: { [name: string]: GistFile };
//   public: boolean;
//   created_at: string;
//   updated_at: string;
//   description: string;
//   comments: number;
//   user: null;
//   comments_url: string;
//   owner: GistUser;
//   truncated: boolean;
// };

// type GistFile = {
//   filename: string;
//   type: string;
//   language: string;
//   raw_url: string;
//   size: number;
// };

// type GistUser = {
//   login: string;
//   id: number;
//   node_id: string;
//   avatar_url: string;
//   gravatar_id: string;
//   url: string;
//   html_url: string;
//   followers_url: string;
//   following_url: string;
//   gists_url: string;
//   starred_url: string;
//   subscriptions_url: string;
//   organizations_url: string;
//   repos_url: string;
//   events_url: string;
//   received_events_url: string;
//   type: string;
//   site_admin: false;
// };