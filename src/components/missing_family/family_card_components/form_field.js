import "../../../styles/globals.css"
import { Input } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
export default function FormField(props) {
    return (
        <div className="flex flex-col my-3">
            <span className="text-lg">{props.title}</span>
            {props.title == "Age" &&
                <span><Input
                    placeholder={props.placeholder} inputProps={props.title}
                />years old</span>}
            {props.title == "Date Of Birth" &&
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Basic date picker"
                        disableFuture={true}
                    />
                </LocalizationProvider>}
            {props.title != "Date Of Birth" && props.title != "Age" && <Input placeholder={props.placeholder} inputProps={props.title} />}

        </div>
    )
}