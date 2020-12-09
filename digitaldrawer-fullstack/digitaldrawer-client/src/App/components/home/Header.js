import React from "react";
import Form from "./Form";
import Navigation from "./Navigation";
import Jumbotron from "react-bootstrap/Jumbotron";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {fade} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Badge from "@material-ui/core/Badge";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from '@material-ui/core/Tooltip'


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
}));

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

export default function Header({history, handleSubmit}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        alert("Closing menu")
    };

    const menuId = 'primary-search-account-menu';

    function handleProfileClick() {
        //TODO: Send to a profile page
        alert("User: DigitalDrawer Dev\nPermissions: All\nProfile is under maintenance, please try again later")
    }

    function handleAccountClick() {
        //TODO: Send to account settings
        alert("Account Settings is under maintenance, please try again later ")
    }

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleAccountClick}>My account</MenuItem>
        </Menu>
    );

    function handleOpenMessages() {
        //TODO: Send to messages page
        alert("Messages is under maintenance,  please try again later")
    }

    function handleOpenNotifications() {
        //TODO: Send to notifications page
        alert("Notifications is under maintenance,  please try again later")
    }

    return (
        <div className={classes.grow}>
            <AppBar style={{ background: 'rgb(5, 28, 51) none repeat scroll 0% 0%'}} position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h5" noWrap>
                        DigitalDrawer
                    </Typography>
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit"><strong>Search Bookmarks!</strong></Typography>
                                {"Find yours, or others, previously saved bookmarks"}
                            </React.Fragment>
                        }
                    >
                        <div className={"search-bar"}>
                            <InputBase
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onSubmit={handleSubmit}
                            />
                            <Form history={history} handleSubmit={handleSubmit}/>
                        </div>
                    </HtmlTooltip>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <Typography color="inherit"><strong>Send Messages</strong></Typography>
                                    {"Instantly talk with other users about your content"}
                                </React.Fragment>
                            }
                        >
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <MailIcon onClick={handleOpenMessages}/>
                                </Badge>
                            </IconButton>
                        </HtmlTooltip>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <Typography color="inherit"><strong>Get Notifications</strong></Typography>
                                    {"You can control what notifications you want to receive"}
                                </React.Fragment>
                            }
                        >
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon onClick={handleOpenNotifications}/>
                                </Badge>
                            </IconButton>
                        </HtmlTooltip>

                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}
