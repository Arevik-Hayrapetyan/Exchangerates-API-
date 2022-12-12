import React from "react";
import { handleInputChanges } from "../../app/slices/currencySlice";
import { useAppDispatch } from "../../app/hooks";
import { currencies } from "../../constants";
import { Input, Select, FormLabel } from "@chakra-ui/react";
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import "../../css/style.css";

interface Props {
    name: string;
    type: "number" | "string";
    includeSelect: boolean;
    placeholder: string;
    selected?: boolean;
}

export default function Section({ name, type, includeSelect, placeholder, selected }: Props) {
    const dispatch = useAppDispatch();

    function handleChange(value: object): void {
        dispatch(handleInputChanges(value));
    }

    function handleChangeInput(event: React.FormEvent<HTMLInputElement>) {
        dispatch(handleInputChanges({ name, value: event.currentTarget.value }));
    }

    function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        dispatch(handleInputChanges({ name, value: event.target.value }));
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: "20px",
            }}
        >
            <FormLabel style={{ width: "20%" }}>{name}</FormLabel>
            {type === "number" ? (
                <NumberInput onChange={(value) => handleChange({ value, name })} defaultValue={1} min={1} style={{ width: "30%" }}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            ) : (
                <Input
                    name={name.toLowerCase()}
                    onChange={handleChangeInput}
                    type={type}
                    placeholder={placeholder}
                    style={{ width: "30%", marginRight: "5px" }}
                />
            )}

            {includeSelect && (
                <Select onChange={handleSelect} defaultValue={selected ? "AMD" : "EUR"}>
                    {currencies.map((item, index) => {
                        return <option key={item}>{item}</option>;
                    })}
                </Select>
            )}
        </div>
    );
}
