import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { latestCurrencies } from "../../app/slices/currencySlice";
import { selectCurrencies } from "../../app/slices/currencySlice";
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from "@chakra-ui/react";

export default function Latest() {
    const dispatch = useAppDispatch();
    const currencies = useAppSelector(selectCurrencies);

    useEffect(() => {
        dispatch(latestCurrencies({ base: "EUR" }));
        console.log(currencies);
    }, []);

    return (
        <div >
            Latest
            <div></div>
            <List>
                {currencies?.length > 0 &&
                    currencies.map(({ key, value }) => {
                        if (typeof value === "number") {
                            return (
                                <ListItem key={key}>
                                    {key}:{value}
                                </ListItem>
                            );
                        }
                    })}
            </List>
        </div>
    );
}
