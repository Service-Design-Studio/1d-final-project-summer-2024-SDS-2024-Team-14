import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
export default function Textbox(props) {
  return (
    <div className='mt-5 w-full'>
      <TextField
        required={ props.required || false}
        sx={{width: '90%'}}
        InputProps={{
          startAdornment: (<InputAdornment position="start">
            { props.startIcon}
          </InputAdornment>
          ),
          endAdornment: (<InputAdornment position='end'>{ props.endIcon}</InputAdornment>),
        }}
        type={ props.type || "text"}
        label={props.label}
        placeholder={props.placeholder}
        helperText={props.helperText}
      />
    </div>
  );
}
