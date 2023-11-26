import AppTables from "../AppTables";
import {useEffect} from "react";
import useCurrencyHook from "../../hooks/currecny.hook";

const Home = () => {
    const {getCurrency, currency} = useCurrencyHook(`/currencies`)
    const {getCurrency: ErrorCurrency, currency: errorCurrency} = useCurrencyHook(`/not-found`)


    useEffect(() => {
        void getCurrency()
        void ErrorCurrency()
    }, [])

    return (
        <div className={'container'}>
            <h1>Balances</h1>
            {currency.length > 0 ? <AppTables data={currency}/> : <h1>Error,No Data</h1>}
            <hr/>
            {errorCurrency.length > 0 ? <AppTables data={errorCurrency}/> : <h1>Error,No Data</h1>}
        </div>
    )
}

export default Home;
