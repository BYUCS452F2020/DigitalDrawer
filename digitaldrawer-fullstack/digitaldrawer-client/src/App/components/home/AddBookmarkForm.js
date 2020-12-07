import React, {Fragment, useState} from "react";
import {useInput} from "../hooks/input-hook";
import Slider from 'react-input-slider';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import {Bookmark, BookmarkBorder, Favorite, FavoriteBorder, Star, StarBorder} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import yellow from "@material-ui/core/colors/yellow";
import green from "@material-ui/core/colors/green";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

const GoldCheckbox = withStyles({
    root: {
        color: yellow[400],
        '&$checked': {
            color: yellow[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export function AddBookmarkForm(props) {
    const [rating, setRating] = useState({ x: 5 });
    const { value: name, bind: bindName, reset: resetName } = useInput('')
    const { value: URL, bind: bindURL, reset: resetURL } = useInput('')
    const [tagChecked, setTagChecked] = useState({
        favoriteCheck: true,
        laterCheck: false,
        funCheck: false,
        businessCheck: false,
    });
    const { favoriteCheck, laterCheck, funCheck, businessCheck } = tagChecked;

    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Adding Bookmark...\n
        --> Bookmark: ${name}\n
        -->URL: ${URL}\n
        -->Rating: ${rating.x.toString()}\n
        -->Favorite: ${favoriteCheck.valueOf()}\n
        -->Later: ${laterCheck.valueOf()}\n
        -->Fun: ${funCheck.valueOf()}\n
        -->Business: ${businessCheck.valueOf()}`);
        // TODO: Save this to the database
        resetName();
        resetURL();
        rating.x = 5;
    }

    const handleCheck = (event) => {
        setTagChecked({ ...tagChecked, [event.target.name]: event.target.checked });
    };

    return (
        <FormGroup onSubmit={handleSubmit}>
            <HtmlTooltip
                title={
                    <React.Fragment>
                        <Typography color="inherit"><strong>Name your bookmark!</strong></Typography>
                        {"Choose a name to help you remember what it is"}
                    </React.Fragment>
                }
            >
                <div>
                    <TextField required id={"standard-required"} fullWidth label={"Name"} variant="outlined" {...bindName} />
                </div>
            </HtmlTooltip>
            <HtmlTooltip
                title={
                    <React.Fragment>
                        <Typography color="inherit"><strong>Bookmark URL</strong></Typography>
                        {"Where do you want this bookmark to take you?"}
                    </React.Fragment>
                }
            >
                <div>
                    <TextField required id={"standard-required"} fullWidth label={"URL"} variant="outlined" {...bindURL} />
                </div>
            </HtmlTooltip>
            <FormGroup className={"check_form"}>
                <HtmlTooltip
                    title={
                        <React.Fragment>
                            <Typography color="inherit"><strong>Add a tag</strong></Typography>
                            {"Your custom tags will show up below!"}
                        </React.Fragment>
                    }
                >
                    <FormLabel component="legend" className={"check_label"}><strong>Tags</strong></FormLabel>
                </HtmlTooltip>
                <div className={"check_label"}>

                </div>
                <FormControlLabel
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={favoriteCheck} onChange={handleCheck} name="favoriteCheck" />}
                    label="Favorite"
                />
                <FormControlLabel
                    control={<Checkbox icon={<BookmarkBorder />} checkedIcon={<Bookmark />} color={"primary"} checked={laterCheck} onChange={handleCheck} name="laterCheck" />}
                    label="Save for Later"
                />
                <FormControlLabel
                    control={<GoldCheckbox icon={<StarBorder />} checkedIcon={<Star />} color={"yellow"} checked={funCheck} onChange={handleCheck} name="funCheck" />}
                    label="Fun"
                />
                <FormControlLabel
                    control={<GreenCheckbox checked={businessCheck} onChange={handleCheck} name="businessCheck" />}
                    label="Business"
                />
            </FormGroup>
            <label>
                <Fragment>
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <Typography color="inherit"><strong>Rate your bookmark</strong></Typography>
                                {"How good is this bookmark to you?"}
                            </React.Fragment>
                        }
                    >
                        <div className={"label-rating"}><strong>{'Rating: ' + rating.x}</strong></div>
                    </HtmlTooltip>
                    <Slider
                        axis="x"
                        styles={{
                            track: {
                                backgroundColor: 'lightblue'
                            },
                            active: {
                                backgroundColor: 'darkblue'
                            },
                            thumb: {
                                width: 30,
                                height: 30,
                                opacity: 0.8,
                                backgroundColor: 'blue'
                            }
                        }}
                        xstep={1}
                        xmin={0}
                        xmax={10}
                        x={rating.x}
                        onChange={({ x }) => setRating({ x: parseInt(x.toString()) })}
                    />
                </Fragment>
                <br/>
                <br/>
                <br/>
            </label>
            <HtmlTooltip
                title={
                    <React.Fragment>
                        <Typography color="inherit"><strong>Add the bookmark!</strong></Typography>
                        {"Save this bookmark into your profile."}
                    </React.Fragment>
                }
            >
                <Button onClick={handleSubmit} variant={"contained"} color="primary">Add Bookmark</Button>
            </HtmlTooltip>
            <br/>
            <br/>
            <br/>

        </FormGroup>
    );
}