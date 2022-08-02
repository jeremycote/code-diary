import { SearchRounded } from "@mui/icons-material";
import BookIcon from "@mui/icons-material/Book";
import MenuIcon from "@mui/icons-material/Menu";
import { InputAdornment, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {
  ConfigContext,
  ConfigContextType,
} from "../../context/ConfigContextProvider";
import { apiClient } from "../../services";

const pages: string[] = [];
const settings: string[] = ["Profile", "Account", "Dashboard", "Logout"];

type ResponsiveAppBarState = {
  anchorElNav: HTMLElement | null;
  anchorElUser: HTMLElement | null;
  userProfilePic: string | null;
};

class ResponsiveAppBar extends React.Component<any, ResponsiveAppBarState> {
  static contextType = ConfigContext;
  context!: React.ContextType<typeof ConfigContext>;

  constructor(props: any) {
    super(props);

    this.state = {
      anchorElNav: null,
      anchorElUser: null,
      userProfilePic: null
    };

    this.setAnchorElNav = this.setAnchorElNav.bind(this);
    this.setAnchorElUser = this.setAnchorElUser.bind(this);
    this.handleOpenNavMenu = this.handleOpenNavMenu.bind(this);
    this.handleOpenUserMenu = this.handleOpenUserMenu.bind(this);
    this.handleCloseNavMenu = this.handleCloseNavMenu.bind(this);
    this.handleCloseUserMenu = this.handleCloseUserMenu.bind(this);

  }

  componentDidMount(){
    apiClient.getSignedInUser().then(user => {
      if (user) {
        this.setState({
          userProfilePic: user.avatar_url
        })
      }
    })
  }

  setAnchorElNav(element: HTMLElement | null) {
    this.setState({ anchorElNav: element });
  }

  setAnchorElUser(element: HTMLElement | null) {
    this.setState({ anchorElUser: element });
  }

  handleOpenNavMenu(event: React.MouseEvent<HTMLElement>) {
    this.setAnchorElNav(event.currentTarget); 
  }

  handleOpenUserMenu(event: React.MouseEvent<HTMLElement>) {
    console.log(`Target: ${event}`)
    this.setState({ anchorElUser: event.currentTarget });
    // this.setAnchorElUser(event.currentTarget);
  }

  handleCloseNavMenu() {
    this.setAnchorElNav(null);
  }

  handleCloseUserMenu() {
    this.setAnchorElUser(null);
  }

  render() {
    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <BookIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {this.context?.appName}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(this.state.anchorElNav)}
                onClose={this.handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={this.handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <BookIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={this.handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <TextField
              id="search"
              label="article search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Profile Pic" src={this.state.userProfilePic != null ? this.state.userProfilePic! : "/static/images/avatar/2.jpg"} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={this.state.anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(this.state.anchorElUser)}
                onClose={this.handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={this.handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}

export default ResponsiveAppBar;
