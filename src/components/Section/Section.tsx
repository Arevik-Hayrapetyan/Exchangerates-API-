import React from "react";
import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";
import { currencies } from "../../constants";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import "../../css/style.css";

interface Props {
    name: string;
    type: "number" | "string";
    includeSelect: boolean;
    placeholder: string;
}

export default function Section({ name, type, includeSelect, placeholder }: Props) {
    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "20px" }}>
            <FormLabel style={{ width: "20%" }}>{name}</FormLabel>
            {type === "number" ? (
                <NumberInput defaultValue={1} min={1} style={{ width: "30%" }}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            ) : (
                <Input type={type} placeholder={placeholder} style={{ width: "30%", marginRight: "5px" }} />
            )}

            {includeSelect && (
                <Select style={{}}>
                    {currencies.map((item) => {
                        return <option>{item}</option>;
                    })}
                </Select>
            )}
        </div>
    );
}
