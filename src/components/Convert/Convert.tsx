import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { currencyAsync } from "../../app/slices/currencySlice";
import { selectConvertedValue } from "../../app/slices/currencySlice";
import { currencies } from "../../constants";
import Section from "../Section/Section";
import { Input } from "@chakra-ui/react";
import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";

export default function Convert() {
    const dispatch = useAppDispatch();
    const convertedValue = useAppSelector(selectConvertedValue);

    useEffect(() => {
        dispatch(currencyAsync({ to: "AMD", from: "EUR", amount: 5 }));
    }, []);

    return (
        <div className="formContainer" style={{ marginLeft: "20px", padding: "15px" }}>
            <FormControl>
                <Section name={"Amount"} type={"number"} includeSelect={false} placeholder="amount" />
                <Section name={"From"} type={"string"} includeSelect={true} placeholder="EUR" />
                <Section name={"To"} type={"string"} includeSelect={true} placeholder="USD" />

                <div style={{ display: "flex", flexDirection: "row", marginTop: 15, justifyContent: "space-between" }}>
                    <Button colorScheme="blue">Covert</Button>
                    <FormHelperText> {convertedValue}</FormHelperText>
                </div>
            </FormControl>
        </div>
    );
}
