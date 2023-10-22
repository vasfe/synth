import * as React from 'react';
import { Button } from '../UI';
import { MoreVert } from '@mui/icons-material';
import { ReactNode } from 'react';
import { Box, Menu } from '@mui/material';
import { flexColumn } from '../styles';

type Option = {
  onClick: () => void,
  label: ReactNode | string,
}

type ListMenuProps = {
  options: Option[],
}

export const ListMenu = (props: ListMenuProps) => {

  const { options } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        shadow={false}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleOpen(event)}
        sx={{ padding: 0 }}
      >
        <MoreVert sx={{ fontSize: 14 }} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Box sx={flexColumn}>
          {options.map((opt: Option, i) =>
            <Button
              shadow={false}
              onClick={() => {
                opt.onClick()
                handleClose()
              }}
              sx={{ px: 1, py: .25, }}
              key={i}
            >
              {opt.label}
            </Button>
          )}
        </Box>
      </Menu>
    </>
  );
}
