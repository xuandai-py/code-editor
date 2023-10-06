import Box from '@mui/material/Box';
import ResizeEditor from "./reisze_editor";
import { FormControlLabel, SwipeableDrawer, Switch } from "@mui/material";
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import GridViewIcon from '@mui/icons-material/GridView';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { setBundle, getFrameHeight, getZoomLevel } from '@/redux/editor_slice';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import React from 'react';
import LanguageOptions from './lang_switch';
import BundleButton from './exe_button';
import { FunctionalButtons } from './nav_bar';

const profile = [
    {
        name: 'github',
        path: 'https://github.com/xuandai-py',
        icon: GitHubIcon
    },
    {
        name: 'about me',
        path: 'https://daidesu.dev',
        icon: GridViewIcon
    },
    {
        name: 'mail',
        path: 'mailto:xuandaibuinguyen@gmail.com',
        icon: InboxIcon
    }
];

const SideBar = ({ setIsLoading, showEditorOptions }: { setIsLoading: boolean, showEditorOptions: boolean }) => {
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
    const { zoomLevel, frameHeight, bundle: bundleState } = useSelector((state) => state.editor);

    return (
        <Box sx={{ display: 'flex', flexGrow: 0, flexDirection: 'row', bgcolor: '#fff' }}>
            <SwipeableTemporaryDrawer anchor={'right'} showEditorOptions={showEditorOptions} >
                <ResizeEditor
                    inputState={frameHeight}
                    innerProps={innerPropsFrameHeight}
                    dispatchTo={getFrameHeight}
                />
                <ResizeEditor
                    inputState={zoomLevel}
                    innerProps={innerPropsZoomEditor}
                    dispatchTo={getZoomLevel}
                />

                <AutoBundle bundleState={bundleState} />
                <FunctionalButtons
                    setIsLoading={setIsLoading}
                    showEditorOptions={showEditorOptions}
                    sx={{
                        display: { xs: 'flex', sm: 'none' },
                        width:'100%'
                    }}
                />
            </SwipeableTemporaryDrawer>
        </Box >
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

const SwipeableTemporaryDrawer: React.FC<SwipeableTemporaryDrawerProps> = ({ anchor, children, showEditorOptions }) => {
    // const [state, setState] = React.useState({ right: false });
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setOpen(isOpen);

        // setState({ ...state, [anchor]: open });
    };

    const list = (anchor: string) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {profile.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton href={item.path} target="_blank">
                            <ListItemIcon >
                                {< item.icon />}
                            </ListItemIcon>
                            <ListItemText primary={item.name} sx={{ textTransform: 'capitalize' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List sx={{ px: 2 }}>
                {showEditorOptions && React.Children.map(children, (child, index) => (
                    <ListItem key={index} disablePadding sx={{ my: 1 }}>
                        {/* <ListItemText primary={child} /> */}
                        {child}
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Options</Button>
            <SwipeableDrawer
                anchor={'right'}
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}

            >
                <IconButton sx={{ borderRadius: 0 }} size="large" onClick={() => setOpen(false)}>
                    <ChevronRightIcon />
                </IconButton>
                <Divider />
                {list(anchor)}
            </SwipeableDrawer>
        </div>
    );
}


export default SideBar;