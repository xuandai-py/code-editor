import Box from '@mui/material/Box';
import ResizeEditor from "./pieces/reisze_editor";
import FormControlLabel from "@mui/material/FormControlLabel";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Switch from "@mui/material/Switch";
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
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import React, { memo } from 'react';
import BundleButton from './pieces/exe_button';
import FunctionalButtons from './pieces/functionalButtons';
import { CommonButtons } from './pieces/button';
import LanguageOptions from './pieces/common/lang_switch';

// import { setBundle, getFrameHeight, getZoomLevel } from '@/redux/editor_slice';
// from new
import { setAutoBundleState, setFrameHeight, setZoomLevel } from '@/redux/slice/editorSlice';
import { store, useAppDispatch, useAppSelector } from '@/redux/store/index';

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

const SideBar = ({ isEditorOption, isFormat, isBundleList, setIsLoading, showEditorOptions }: { setIsLoading: boolean, showEditorOptions: boolean }) => {
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
    // const { zoomLevel, frameHeight, bundle: bundleState } = useSelector((state) => state.editor);
    // dispath get
    const { autoBundleState, zoomLevel, frameHeight } = store.getState().editor;

    const MemoResizeEditor = memo(ResizeEditor);
    console.log('sidebarmemo')

    return (
        <Box sx={{ bgcolor: '#fff' }}>
            <SwipeableTemporaryDrawer anchor={'right'} showEditorOptions={showEditorOptions} >
                {isEditorOption && (
                    <Box sx={{ display: 'flex', flexGrow: 0, flexDirection: 'column', gap: 2 }}>
                        <MemoResizeEditor
                            inputState={frameHeight}
                            innerProps={innerPropsFrameHeight}
                            dispatchTo={setFrameHeight}
                            id={`editor-height`}
                        />
                        <MemoResizeEditor
                            inputState={zoomLevel}
                            innerProps={innerPropsZoomEditor}
                            dispatchTo={setZoomLevel}
                            id={`editor-zoom-value`}
                        />

                        <AutoBundle />
                    </Box >)
                }
                <FunctionalButtons
                    isBundleList={isBundleList}
                    isFormat={isFormat}
                    setIsLoading={setIsLoading}
                // sx={{
                //     display: { xs: 'flex', sm: 'none' },
                //     width: '100%'
                // }}
                />
            </SwipeableTemporaryDrawer>
        </Box >
    )
}

const AutoBundle = () => {
    const dispatch = useAppDispatch();
    const autoBundleState = useAppSelector((state) => state.editor.autoBundleState);
    // const { autoBundleState } = store.getState().editor;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('sidebar', event.target.value)
        // dispatch(setBundle(!bundleState));
        dispatch(setAutoBundleState(!autoBundleState));
        console.log('sidebar', autoBundleState)
    };

    return (
        <FormControlLabel
            control={<Switch name="auto_bundle" checked={autoBundleState} onChange={(e) => handleChange(e)} />}
            label="Auto Bundle"
        />
    )
}
/**
 * write a component call MakingBundleEvent, return a MUI <Switch > component.
 * the component has checked={bundleState} and onChange={(e) => handleChange(e)} to modify the bundleState state
 * the bundleState was get from redux-toolkit store.
 * in the handleChangeEvent, make a dispatch call to set new state for the bundleState
*
*/
// const MakingBundleEvent = () => {
//     const dispatch = useDispatch();
//     const { bundle: bundleState } = useSelector((state) => state.editor);
//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         dispatch(setBundle(!bundleState));
//     };
//     return (
//         <FormControlLabel
//             control={<Switch name="bundle" checked={bundleState} onChange={(e) => handleChange(e)} />}
//             label="Bundle"
//         />
//     )
// }

const SwipeableTemporaryDrawer = ({ anchor, children, showEditorOptions }) => {
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
    };

    return (
        <div>
            <Button
                onClick={() => setOpen(true)}
                sx={{
                    color: '#1976D2',
                    p: 1,
                    width: '100%',
                    borderRadius: 1,
                }}
            >
                Options
            </Button>
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

                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    // onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(false)}
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
                        {React.Children.map(children, (child, index) => (
                            <ListItem key={index} disablePadding sx={{ my: 1 }}>
                                {child}
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <Box
                        display={{ xs: 'block', md: 'none' }}>
                        <LanguageOptions type="list" />
                    </Box>
                </Box>
            </SwipeableDrawer>
        </div>
    );
}


export default SideBar;