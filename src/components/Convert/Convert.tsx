import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectConvertedValue, selectValues } from "../../app/slices/currencySlice";
import { currencyAsync } from "../../app/slices/currencySlice";
import Section from "../Section/Section";
import { FormControl, FormHelperText } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export default function Convert() {
    const dispatch = useAppDispatch();
    const convertedValue = useAppSelector(selectConvertedValue);
    const values = useAppSelector(selectValues);

    function handleConvert() {
        dispatch(currencyAsync(values));
    }

    return (
        <div className="formContainer" style={{ marginLeft: "20px", padding: "15px" }}>
            <FormControl>
                <Section name={"Amount"} type={"number"} includeSelect={false} placeholder="amount" />
                <Section name={"From"} type={"string"} includeSelect={true} placeholder="EUR" />
                <Section name={"To"} type={"string"} includeSelect={true} placeholder="USD" selected={true}/>

                <div style={{ display: "flex", flexDirection: "row", marginTop: 15, justifyContent: "space-between" }}>
                    <Button colorScheme="blue" onClick={handleConvert}>
                        Covert
                    </Button>
                    <FormHelperText> {convertedValue}</FormHelperText>
                </div>
            </FormControl>
        </div>
    );
}
