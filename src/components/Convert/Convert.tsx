import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { currencyAsync } from "../../app/slices/currencySlice";
import { Input } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import "./Convert.css";

export default function Convert() {
    const dispatch = useAppDispatch();
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
                <FormHelperText>Converted value: 1555</FormHelperText>
            </FormControl>
        </div>
    );
}
