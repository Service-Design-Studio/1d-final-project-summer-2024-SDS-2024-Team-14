import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
export default function Textbox(props) {
  return (
    <div className='mt-5 w-full'>
      <TextField
        error={ props.error}
        onChange={() => props.setFormState(prevState => ({ ...prevState, [props.id]: document.getElementById(`${props.id}`).value }))}
        id={props.id}
        required={ props.required || true}
        sx={{ width: '90%'}}
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
