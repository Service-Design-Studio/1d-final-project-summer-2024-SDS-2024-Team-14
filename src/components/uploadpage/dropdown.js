import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SchoolIcon from '@mui/icons-material/School';
import Divider from '@mui/material/Divider';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkIcon from '@mui/icons-material/Work';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HouseIcon from '@mui/icons-material/House';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 20,
    marginTop: theme.spacing(1),
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const ITEM_HEIGHT = 40;

export default function UploadDropdown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState({ name: 'Document', icon: null });
  const [menuWidth, setMenuWidth] = React.useState(null);
  const buttonRef = React.useRef(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (buttonRef.current) {
      setMenuWidth(buttonRef.current.clientWidth);
    }
  };

  const handleClose = (category, icon) => {
    setAnchorEl(null);
    if (category) {
      setSelectedCategory({ name: category, icon: icon });
    }
  };

  return (
    <div className="w-full">
      <Button
        ref={buttonRef}
        id="demo-customized-button"
        aria-label="more"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        className="w-full"
      >
        {selectedCategory.icon && <selectedCategory.icon className="mr-2" />}
        {selectedCategory.name}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null, null)}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: menuWidth,
          },
        }}
      >
        <MenuItem onClick={() => handleClose('Education', SchoolIcon)} disableRipple>
          <SchoolIcon />
          Education
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => handleClose('Career', WorkIcon)} disableRipple>
          <WorkIcon />
          Career
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => handleClose('Finance', AttachMoneyIcon)} disableRipple>
          <AttachMoneyIcon />
          Finance
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => handleClose('Property', HouseIcon)} disableRipple>
          <HouseIcon />
          Property
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => handleClose('Family', FamilyRestroomIcon)} disableRipple>
          <FamilyRestroomIcon />
          Family
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
      </StyledMenu>
    </div>
  );
}

// const UploadDropdown = ({ value, onChange }) => {
//   return (
//     <Select
//       value={value}
//       onChange={onChange}
//       variant="outlined"
//       fullWidth
//       displayEmpty
//     >
//       <MenuItem value="" disabled>
//         Health
//       </MenuItem>
//       <MenuItem value="health">Health</MenuItem>
//       <MenuItem value="finance">Finance</MenuItem>
//       <MenuItem value="education">Education</MenuItem>
//     </Select>
//   );
// };

// export default UploadDropdown;

