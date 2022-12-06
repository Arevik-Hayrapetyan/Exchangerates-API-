import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { currencyAsync } from "../../app/slices/currencySlice";
import { Input } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import "./Convert.css";
import { selectConvertedValue } from "../../app/slices/currencySlice";

export default function Convert() {
    const dispatch = useAppDispatch();
    const convertedValue = useAppSelector(selectConvertedValue);

    useEffect(() => {
        dispatch(currencyAsync({ to: "AMD", from: "EUR", amount: 5 }));
    }, []);
    
    return (
        <div className="formContainer" style={{ marginLeft: "20px" }}>
            <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input type="number" placeholder="amount" />
                <FormLabel>From</FormLabel>
                <Input type="text" placeholder="from" />
                <FormLabel>To</FormLabel>
                <Input type="text" placeholder="to" />
                <div style={{ display: "flex", flexDirection: "row", marginTop: 15, justifyContent: "space-between" }}>
                    <Button colorScheme="blue">Covert</Button>
                    <FormHelperText> {convertedValue}</FormHelperText>
                </div>
            </FormControl>
        </div>
    );
}
