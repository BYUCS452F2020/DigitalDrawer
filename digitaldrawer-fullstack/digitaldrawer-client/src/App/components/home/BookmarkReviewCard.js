import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import red from "@material-ui/core/colors/red";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import AlarmIcon from '@material-ui/icons/Alarm';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

var cardStyle = {
    display: 'block',
    width: '30vw',
    transitionDuration: '0.3s',
}

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

export default function BookmarkReviewCard({ url, key, alt, date, site }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function handleURLClick() {
        alert("Opening your bookmark");
    }

    return (
        <Card style={cardStyle} className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        JB
                    </Avatar>
                }

                action={
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit"><strong>Bookmark Options</strong></Typography>
                                {"The Options menus is where you can change your rating, add/remove tags, add notes, and change the picture"}
                            </React.Fragment>
                        }
                    >
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    </HtmlTooltip>
                }
                title={alt}
                subheader={date}
            />
            <HtmlTooltip
                title={
                    <React.Fragment>
                        <Typography color="inherit"><strong>Bookmark Picture</strong></Typography>
                        {"Take a screenshot or choose from a selection of icons to easily remember bookmarks"}
                    </React.Fragment>
                }
            >
                <CardMedia
                    className={classes.media}
                    image={url}
                    title={alt}
                />
            </HtmlTooltip>

            <HtmlTooltip
                title={
                    <React.Fragment>
                        <Typography color="inherit"><strong>Bookmark URL</strong></Typography>
                        {"Go directly to your bookmark source by selecting the URL"}
                    </React.Fragment>
                }
            >
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <span onClick={handleURLClick}> {site} </span>
                    </Typography>
                </CardContent>
            </HtmlTooltip>
            <CardActions disableSpacing>
                <HtmlTooltip
                    title={
                        <React.Fragment>
                            <Typography color="inherit"><strong>See Your Tags</strong></Typography>
                            {"Quickly identify what the content is from the tags"}
                        </React.Fragment>
                    }
                >
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon
                            color={"secondary"}
                        />
                    </IconButton>
                </HtmlTooltip>
                <HtmlTooltip
                    title={
                        <React.Fragment>
                            <Typography color="inherit"><strong>Share With Anyone</strong></Typography>
                            {"Share with anyone on any platform"}
                        </React.Fragment>
                    }
                >
                    <IconButton aria-label="share">
                        <ShareIcon
                            color={"primary"}
                        />
                    </IconButton>
                </HtmlTooltip>
                <HtmlTooltip
                    title={
                        <React.Fragment>
                            <Typography color="inherit"><strong>Expand For More Info</strong></Typography>
                            {"See your notes, tags, pictures, rating, and frequency. "}
                        </React.Fragment>
                    }
                >
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>
                    </IconButton>
                </HtmlTooltip>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        You choose what data to show/save. All of the bookmark metadata will be available to select and display here!
                    </Typography>
                    <Typography paragraph>
                        <strong>Bookmark information will go below:</strong>
                    </Typography>
                    <TextField
                        id="outlined-multiline-static"
                        label=""
                        multiline
                        rows={4}
                        placeholder="Add notes or drag and drop any media here. Screenshots, recordings, music, etc."
                        variant="outlined"
                    />
                    <br/>
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit"><strong>Save Your Notes Or Media</strong></Typography>
                                {"Click here to save your notes or media to your profile for this bookmark"}
                            </React.Fragment>
                        }
                    >
                        <Button
                            variant="contained"
                            color="green"
                            size="small"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                        >
                            Save
                        </Button>
                    </HtmlTooltip>
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit"><strong>Set a Reminder</strong></Typography>
                                {"Remind yourself to comeback to this bookmark at any time. SMS reminders coming soon!"}
                            </React.Fragment>
                        }
                    >
                        <IconButton color="secondary" aria-label="add an alarm">
                            <AlarmIcon />
                        </IconButton>
                    </HtmlTooltip>

                </CardContent>
            </Collapse>
        </Card>
    );
}

