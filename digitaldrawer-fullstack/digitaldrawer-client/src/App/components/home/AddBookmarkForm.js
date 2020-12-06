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
        alert(`Submitting...\n
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
            <div>
                <TextField required id={"standard-required"} fullWidth label={"Name"} variant="outlined" {...bindName} />
            </div>
            <div>
                <TextField required id={"standard-required"} fullWidth label={"URL"} variant="outlined" {...bindURL} />
            </div>
            <FormGroup className={"check_form"}>
                <FormLabel component="legend" className={"check_label"}><strong>Tags</strong></FormLabel>
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
                    <div className={"label-rating"}><strong>{'Rating: ' + rating.x}</strong></div>
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
            <Button onClick={handleSubmit} variant={"contained"} color="primary">Add Bookmark</Button>
            <br/>
            <br/>
            <br/>

        </FormGroup>
    );
}