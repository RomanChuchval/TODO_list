import React, {memo} from 'react';
import Button from '@mui/material/Button';

type ButtonType = {
    callback: () => void
    name: string
    btnColor: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
    variant:  "outlined" | "contained"
}

export const ButtonHoc = memo( (props: ButtonType) => {
    const onCLickHandler = () => {
        props.callback()
    }

    return (
            <Button variant={props.variant}
                    onClick={onCLickHandler}
                    color={props.btnColor}>
                {props.name}
            </Button>
    );
});
