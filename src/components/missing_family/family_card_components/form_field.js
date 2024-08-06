import "../../../styles/globals.css"
import { useState, useEffect } from 'react';
import { Input, ButtonGroup, Button } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);

export default function FormField(props) {
    const [gender, setGender] = useState("Male");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [ethnicity, setEthnicity] = useState("");
    const [dateBirth, setDateBirth] = useState(dayjs());

    useEffect(() => {
        switch (props.title) {
            case "Gender":
                setGender(props.default || "Male");
                break;
            case "Name":
                setName(props.default);
                break;
            case "Age":
                setAge(props.default);
                break;
            case "Ethnicity":
                setEthnicity(props.default);
                break;
            case "Date Of Birth":
                setDateBirth(dayjs(props.default, "DD-MM-YYYY"));
                break;
        }
    }, [props.default, props.title])

    return (
        <div className="flex flex-col w-full lg:min-w-96 my-3">
            <span className="text-lg">{props.title}</span>
            {props.title === "Age" &&
                <span>
                    <Input
                        value={age}
                        placeholder={props.placeholder}
                        inputProps={props.title}
                        onChange={(e) => props.setData((prev) => {
                            return {
                                ...prev,
                                "age": e.target.value
                            }
                        })}
                    />
                    years old
                </span>}
            {props.title === "Date Of Birth" &&
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={props.title}
                        disableFuture={true}
                        placeholder={props.placeholder}
                        value={dateBirth}
                        onChange={(newValue) => {
                            setDateBirth(newValue);
                            props.setData((prev) => {
                                return {
                                    ...prev,
                                    "date_birth": newValue.format("DD-MM-YYYY")
                                }
                            })
                        }}
                    />
                </LocalizationProvider>}
            {props.title === "Gender" &&
                <ButtonGroup>
                    <Button
                        disableElevation
                        variant={gender === "Male" ? "contained" : "outlined"}
                        onClick={() => {
                            setGender("Male");
                            props.setData((prev) => {
                                return {
                                    ...prev,
                                    "gender": "Male"
                                }
                            })
                        }}>
                        Male
                    </Button>
                    <Button
                        disableElevation
                        variant={gender === "Female" ? "contained" : "outlined"}
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
            {props.title !== "Date Of Birth" && props.title !== "Age" && props.title !== "Gender" &&
                <Input
                    placeholder={props.placeholder}
                    value={props.title === "Name" ? name : ethnicity}
                    inputProps={props.title}
                    onChange={(e) => props.setData((prev) => {
                        return {
                            ...prev,
                            [String(props.title).toLowerCase()]: e.target.value
                        }
                    })}
                />}
        </div>
    )
}