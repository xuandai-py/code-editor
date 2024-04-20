import bundler from "@/helper/bundler";
// import { setCode, setErr } from "@/redux/bundle_slice";
import { useDispatch, useSelector } from "react-redux";
import Stack from '@mui/material/Stack';
import BundlerOptions from "./bundlerOptions";
import BundleButton from "./exe_button";
import FormatSnippet from "./format";
import React from 'react';
import { store } from '@/redux/store/index'
import { useAppDispatch, useAppSelector } from "@/redux/store/index";
import { setCode, setErr } from '@/redux/slice/bundleSlice';

const FunctionalButtons = ({ isBundleList, setIsLoading, isFormat, sx }: { setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, isFormat: boolean }) => {
    const { script, autoBundleState } = useAppSelector((state) => state.editor);

    const dispatch = useAppDispatch();
    console.log('buttons')


    const onClickHandler = async () => {
        setIsLoading(true);

        try {
            const bundleResult = await bundler(script);
            dispatch(setCode(bundleResult.code));
            dispatch(setErr(bundleResult.err));

        } catch (error) {
            // Handle any errors that occur during bundling
            console.error('Something wrong happened', error);
        }

        setIsLoading(false);
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (!autoBundleState) {
                onClickHandler()
                console.log('state: ', !autoBundleState)
            }
        }, 1000)
        return () => clearInterval(interval);
    }, [script]);
    // nav bar: >900 LanguageOptions
    // side bar: <900 LanguageOptionsSideList
    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={sx} >
            {isBundleList && <BundlerOptions />}
            {autoBundleState && <BundleButton onClickHandler={onClickHandler} />}
            {/* {!bundle && isFormat && <BundleButton onClickHandler={onClickHandler} />}  */}
            {isFormat && <FormatSnippet />}
        </Stack>
    )
}

export default FunctionalButtons;