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

export function CreateDrawerForm(props) {
    const { value: name, bind: bindName, reset: resetName } = useInput('')

    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Creating DigitalDrawer...\n
        --> Drawer Name: ${name}\n`);
        // TODO: Save this to the database
        resetName();
    }

    return (
        <FormGroup onSubmit={handleSubmit}>
            <HtmlTooltip
                title={
                    <React.Fragment>
                        <Typography color="inherit"><strong>Name Your DigitalDrawer</strong></Typography>
                        {"Choose a name that represents content to be stored in here"}
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
                        <Typography color="inherit"><strong>Describe Your New DigitalDrawer</strong></Typography>
                        {"Adding a description will help you know just what to store here"}
                    </React.Fragment>
                }
            >
                {/*TODO: Add a hook for this*/}
                <TextField
                    id="outlined-multiline-static"
                    label=""
                    multiline
                    rows={4}
                    defaultValue="DigitalDrawer to store..."
                    variant="outlined"
                />
            </HtmlTooltip>
            <HtmlTooltip
                title={
                    <React.Fragment>
                        <Typography color="inherit"><strong>Create Your New DigitalDrawer</strong></Typography>
                        {"You will be able to save bookmarks to this drawer"}
                    </React.Fragment>
                }
            >
                <Button onClick={handleSubmit} variant={"contained"}>Create Drawer</Button>
            </HtmlTooltip>
            <br/>
            <br/>
            <br/>

        </FormGroup>
    );
}