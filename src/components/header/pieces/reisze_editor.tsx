import React from 'react'
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import MuiInput from '@mui/material/Input';
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

const Input = styled(MuiInput)`
  width: 42px;
`;

interface ResizeInnerProps {
    title: string,
    step: number,
    min: number,
    max: number
}

interface ResizeProps {
    inputState: any,
    dispatchTo: Dispatch,
    innerProps: ResizeInnerProps
}
const ResizeEditor: React.FC<ResizeProps> = ({ inputState, innerProps, dispatchTo, id }) => {
    const dispatch = useDispatch();
    // const zoomLevel = useSelector((state) => state.editor.zoomLevel);

    const [value, setValue] = React.useState(inputState);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
    };

    // const handleBlur = () => {
    //     if (value < 0) {
    //         setValue(0);
    //     } else if (value > 100) {
    //         setValue(100);
    //     }
    // };

    React.useEffect(() => {
        dispatch(dispatchTo(value))
    }, [value])
    console.log('resize')
    return (
        <Stack direction="row" spacing={2}
            sx={{ px: 2, borderRadius: 2, border: '1px solid gray', alignItems: 'center' }}
        >
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#1976d2', flexGrow: 1 }} >
                {innerProps.title.toUpperCase()}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Input
                value={value}
                id={`in-${id}`}
                className={id}
                sx={{ width: 60 }}
                // size='100px'
                onChange={handleInputChange}
                // onBlur={handleBlur}
                inputProps={{
                    step: innerProps.step,
                    min: innerProps.min,
                    max: innerProps.max,
                    type: 'number',
                    'aria-labelledby': id,
                }}
            />
        </Stack>
    );
}

export default ResizeEditor;