import "../../../styles/globals.css"
import { Input } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
export default function FormField(props) {

    return (
        <div className="flex flex-col w-full lg:min-w-96 my-3">
            <span className="text-lg">{props.title}</span>
            {props.title == "Age" &&
                <span>
                    <Input
                        placeholder={props.placeholder}
                        inputProps={props.title}
                        onChange={(e) => props.setData((prev) => {
                            return {
                                ...prev,
                                [props.title]: e.target.value
                            }
                        })
                        }
                    />
                    years old
                </span>}
            {props.title == "Date Of Birth" &&
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={props.title}
                        disableFuture={true}
                        placeholder={props.placeholder}
                        onChange={(e) => props.setData((prev) => {
                            return {
                                ...prev,
                                [props.title]: JSON.stringify(e)
                            }
                        })
                        }
                    />
                </LocalizationProvider>}
            {props.title != "Date Of Birth" && props.title != "Age" &&
                <Input
                    placeholder={props.placeholder}
                    inputProps={props.title}
                    onChange={(e) => props.setData((prev) => {
                        return {
                            ...prev,
                            [props.title]: e.target.value
                        }
                    })
                    }
                />}

        </div>
    )
}