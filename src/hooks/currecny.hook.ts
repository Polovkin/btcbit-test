import {useState} from "react";
import {Currency} from "../types";
import {useAtom} from "jotai/index";
import {AppAtom} from "../store";
import HttpService from "../services/Http.service";

const useCurrencyHook = (url: string) => {
    const [state, setState] = useAtom(AppAtom)
    const [currency, setCurrency] = useState<Currency[]>([])

    const getCurrency = async () => {
        try {
            const response = await HttpService.get<Currency[]>(url)
            console.log(response);
            setCurrency(response)
        } catch (e) {
            console.log(e);
            setState({
                ...state,
                error: {
                    status: 400,
                    message: 'Error while getting currencies'
                }
            })
            return
        }

    }

    return {
        currency,
        getCurrency,
    }
}

export default useCurrencyHook
