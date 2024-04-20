import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Bundler } from '@/helper/constant';
export default function BundlerOptions() {
    const [type, setType] = React.useState(Bundler[0]);

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120, color: '#fff' }} size="small">
            <InputLabel color="primary" id="demo-select-small-label">Bundler</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={type}
                sx={{ color: '#fff' }}
                label="Age"
                onChange={handleChange}
            >
                {Bundler && Bundler.length > 0 && Bundler.map((item, index) => (
                    <MenuItem key={index} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}