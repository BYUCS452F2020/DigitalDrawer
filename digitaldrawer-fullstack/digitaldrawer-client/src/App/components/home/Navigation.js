import React from 'react';
import { NavLink } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
          <HtmlTooltip
              title={
                  <React.Fragment>
                      <Typography color="inherit"><strong>Digital Drawers</strong></Typography>
                      {"Store your bookmarks in custom Digital Drawers"}
                  </React.Fragment>
              }
          >
              <li><NavLink activeStyle={{background: "#60c6d9"}} to="/favorites">Favorite</NavLink></li>
          </HtmlTooltip>
        <li><NavLink activeStyle={{background: "#f38e56"}} to="/later">Later</NavLink></li>
        <li><NavLink activeStyle={{background: "#e0d551"}} to="/fun">Fun</NavLink></li>
        <li><NavLink activeStyle={{background: "#fc7abf"}} to="/business">Business</NavLink></li>
        <li><NavLink activeStyle={{background: "#6bab59"}} to="/addBookmark">+Bookmark</NavLink></li>
        <li><NavLink activeStyle={{background: "#f13333"}} to="/createDrawer">+Drawer</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
