import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { latestCurrencies } from "../../app/slices/currencySlice";
import { selectCurrencies, selectBaseCurrency } from "../../app/slices/currencySlice";
import { Heading } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";

export default function Latest() {
    const dispatch = useAppDispatch();
    const currencies = useAppSelector(selectCurrencies);
    const baseCurrency = useAppSelector(selectBaseCurrency);

    useEffect(() => {
        dispatch(latestCurrencies({ base: "EUR" }));
        console.log(currencies);
    }, []);

    return (
        <div style={{ padding: "15px", display: "flex", alignItems: "center", flexDirection: "column", width: "60%" }}>
            <Heading as="h4" size="md">
                Latest
            </Heading>
            <Heading as="h5" size="sm">
                Base:
                <span style={{ color: "rgba(66, 153, 225, 0.6)" }}> {baseCurrency}</span>
            </Heading>

            <Select>
                {currencies?.length > 0 &&
                    currencies.map(({ key, value }) => {
                        if (typeof value === "number") {
                            return (
                                <option value={value} key={key}>
                                    {key}:{value}
                                </option>
                            );
                        }
                    })}
            </Select>
        </div>
    );
}
