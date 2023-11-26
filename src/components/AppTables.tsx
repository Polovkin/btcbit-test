import React, {FC, useEffect, useState} from "react";
import {Currency} from "../types";
import currencyMap, {KeyType} from "../mappers/currency.mapper";
import CurrencyTable from "./CurrencyTable";
import AppInput from "./inputs/AppInput";

type Props = {
    data: Currency[]
}

const AppTables: FC<Props> = ({data}) => {
    const [currency, setCurrency] = useState<Currency[]>(data)
    const [search, setSearch] = useState('')
    const [tables, setTables] = useState(2)
    const [chunks, setChunk] = useState<Currency[][]>([])

    const filterCurrency = (search: string): Currency[] => {
        return currency.filter((currency) =>
            currencyMap.get(currency.currencyId as KeyType)?.toLowerCase().includes(search.toLowerCase()) ||
            currency.currencyId.toLowerCase().includes(search.toLowerCase()) ||
            currency.amount.toString().includes(search)
        )
    }

    const handleDeleteItem = (id: string) => {
        setCurrency((prev) => prev.filter((currency) => currency.currencyId !== id))
    }

    const handleTableChange = (value: string) => {
        const tableNumbers = parseInt(value)
        if (tableNumbers > 0) {
            setTables(tableNumbers)
        }
    }

    const searchCurrency = (value: string) => {
        if (!value) {
            setCurrency(data)
        } else {
            setCurrency(filterCurrency(value))
        }
        setSearch(value)
    }

    const chunkCurrency = (arr: Currency[], chunkSize: number): Currency[][] => {
        const chunks: Currency[][] = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    };

    useEffect(() => {
        const itemsPerPage = Math.ceil(currency.length / tables);
        const chunks = chunkCurrency(currency, itemsPerPage);
        setChunk(chunks);
    }, [currency, tables]);

    if (!currency.length) return (
        <div className={'d-flex justify-content-center align-items-center h-100'}>
            <h1>Error,No Data</h1>
        </div>
    )

    return (
        <div>
            <div className={'d-flex mb-2'}>
                <AppInput value={search} setValue={searchCurrency} placeholder={'Search'} type="text"/>
                <AppInput value={`${tables}`} setValue={handleTableChange} placeholder={'Tables'} type="number"/>
            </div>

            <div className={'d-flex'}>
                {chunks.map((chunk, index) => (
                    <CurrencyTable deleteItem={handleDeleteItem} key={index} currency={chunk}/>
                ))}
            </div>
        </div>
    )
}

export default AppTables
