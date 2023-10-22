import React from 'react';
import { IconButton, IconButtonProps } from '@mui/material';

type ButtonProps = Pick<IconButtonProps, "disabled" | "color" | "children" | "sx" | "id" | "className" | "onClick"> & {
  pressed?: boolean,
  shadow?: boolean,
}

export function Button(props: ButtonProps) {
  const {
    pressed = false,
    sx,
    shadow = true,
    ...otherButtonProps
  } = props;

  return (
    <IconButton
      sx={{
        boxShadow: shadow ? (pressed ? '2px 1px 3px 1px inset' : '2px 1px 3px 1px') : undefined,
        ...sx
      }}
      {...otherButtonProps}
    >
      {props.children}
    </IconButton >
  );
}