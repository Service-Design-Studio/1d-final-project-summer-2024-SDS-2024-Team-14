import "../../../styles/globals.css"
import { useState } from 'react';
import { Input, ButtonGroup, Button } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
export default function FormField(props) {
    const [gender, setGender] = useState("Male");
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
                                "age": e.target.value
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
                                "date_birth": JSON.stringify(e)
                            }
                        })
                        }
                    />
                </LocalizationProvider>}
            {props.title == "Gender" &&
                <ButtonGroup>
                    <Button
                        disableElevation
                        variant={gender == "Male" ? "contained" : "outlined"}
                        onClick={() => {
                            setGender("Male");
                            props.setData((prev) => 
                            {return {
                                ...prev,
                                "gender": "Male"
                            }})
                        }}>
                        Male
                    </Button>
                    <Button
                        disableElevation
                        variant={gender == "Female" ? "contained" : "outlined"}
                        onClick={() => {
                            setGender("Female");
                            props.setData((prev) => {
                                return {
                                    ...prev,
                                    "gender": "Female"
                                }
                            })
                        }}>
                        Female
                    </Button>
                </ButtonGroup>
            }
            {props.title != "Date Of Birth" && props.title != "Age" && props.title != "Gender" &&
                <Input
                    placeholder={props.placeholder}
                    inputProps={props.title}
                    onChange={(e) => props.setData((prev) => {
                        return {
                            ...prev,
                            [String(props.title).toLowerCase()]: e.target.value
                        }
                    })
                    }
                />}

        </div>
    )
}