import {Button, Table} from "react-bootstrap";
import React, {FC} from "react";
import {Currency} from "../types";
import currencyMap, {KeyType} from "../mappers/currency.mapper";

type Props = {
    currency: Currency[]
    deleteItem: (id: string) => void
}

const CurrencyTable: FC<Props> = ({currency,deleteItem}) => {
    const renderCurrencyItem = (currency: Currency, index: number) => {
        const symbol = currencyMap.get(currency.currencyId as KeyType) || null
        if (!symbol) return null

        return (
            <tr key={currency.currencyId}>
                <td>{currency.currencyId}</td>
                <td>{currency.amount}</td>
                <td><Button onClick={() => deleteItem(currency.currencyId)} variant="danger">Delete</Button></td>
            </tr>
        )
    }
    return (
        <Table className={'mx-1'} striped bordered hover>
            <thead>
            <tr>
                <th>Currency Id</th>
                <th>Balance</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {currency.map((currency, index) => renderCurrencyItem(currency, index))}
            </tbody>
        </Table>
    )
}

export default CurrencyTable
