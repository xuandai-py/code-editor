import Box from '@mui/material/Box';
import ResizeEditor from "./reisze_editor";
import { FormControlLabel, SwipeableDrawer, Switch } from "@mui/material";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { setBundle, getFrameHeight, getZoomLevel } from '@/redux/editor_slice';
import React from 'react';

const SideBar = (props) => {
    const innerPropsZoomEditor = {
        title: 'zoom',
        step: 1,
        min: 0,
        max: 30
    }
    const innerPropsFrameHeight = {
        title: 'height',
        step: 200,
        min: 400,
        max: 2000
    }

    return (
        <Box sx={{ display: 'flex', flexGrow: 0, flexDirection: 'row', bgcolor: '#fff' }}>
            <SwipeableTemporaryDrawer anchor={'right'}  >
                <ResizeEditor
                    inputState={props.frameHeight}
                    innerProps={innerPropsFrameHeight}
                    dispatchTo={getFrameHeight}
                />
                <ResizeEditor
                    inputState={props.zoomLevel}
                    innerProps={innerPropsZoomEditor}
                    dispatchTo={getZoomLevel}
                />

                {props.showBundle && (
                    <AutoBundle bundleState={props.bundleState} />
                )}
            </SwipeableTemporaryDrawer>
        </Box>
    )
}

const AutoBundle = ({ bundleState }: { bundleState: boolean }) => {
    const dispatch = useDispatch();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setBundle(!bundleState));
    };

    return (
        <FormControlLabel
            control={<Switch checked={bundleState} onChange={handleChange} name="auto_bundle" />}
            label="Auto Bundle"
        />
    )
}

const SwipeableTemporaryDrawer: React.FC<SwipeableTemporaryDrawerProps> = ({ anchor, children }) => {
    const [state, setState] = React.useState( {right: false});

    const toggleDrawer = (anchor: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor: string) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List sx={{ px: 2 }}>
                {React.Children.map(children, (child, index) => (
                    <ListItem key={index} disablePadding sx={{ my: 1 }}>
                        {/* <ListItemText primary={child} /> */}
                        {child}
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(anchor, true)}>Options</Button>
            <SwipeableDrawer
                anchor={'right'}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}

            >
                {list(anchor)}
            </SwipeableDrawer>
        </div>
    );
}


export default SideBar;