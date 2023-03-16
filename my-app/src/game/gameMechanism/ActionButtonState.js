import { useState } from 'react';

export function ActionButtonState() {
    const [incomeButtonDisabled, setIncomeButtonDisabled] = useState(!false);
    const [foreignAidButtonDisabled, setForeignAidButtonDisabled] = useState(!false);
    const [taxButtonDisabled, setTaxButtonDisabled] = useState(!false);
    const [exchangeButtonDisabled, setExchangeButtonDisabled] = useState(!false);
    const [stealButtonDisabled, setStealButtonDisabled] = useState(!false);
    const [assassinationButtonDisabled, setAssassinationButtonDisabled] = useState(!false);
    const [coupButtonDisabled, setCoupButtonDisabled] = useState(!false);

    return {
        incomeButtonDisabled, setIncomeButtonDisabled,
        foreignAidButtonDisabled, setForeignAidButtonDisabled,
        taxButtonDisabled, setTaxButtonDisabled,
        exchangeButtonDisabled, setExchangeButtonDisabled,
        stealButtonDisabled, setStealButtonDisabled,
        assassinationButtonDisabled, setAssassinationButtonDisabled,
        coupButtonDisabled, setCoupButtonDisabled,
    };
}

export function AfterSelectActionDisableActionButton(
    incomeButtonDisabled, setIncomeButtonDisabled,
    foreignAidButtonDisabled, setForeignAidButtonDisabled,
    taxButtonDisabled, setTaxButtonDisabled,
    exchangeButtonDisabled, setExchangeButtonDisabled,
    stealButtonDisabled, setStealButtonDisabled,
    assassinationButtonDisabled, setAssassinationButtonDisabled,
    coupButtonDisabled, setCoupButtonDisabled,
) {

    if (incomeButtonDisabled === false) {
        setIncomeButtonDisabled((prev) => !prev);
    }
    if (foreignAidButtonDisabled === false) {
        setForeignAidButtonDisabled((prev) => !prev);
    }
    // if(taxButtonDisabled === false) {
    //     setTaxButtonDisabled((prev) => !prev);
    // }
    // if(exchangeButtonDisabled === false) {
    //     setExchangeButtonDisabled((prev) => !prev);
    // }
    // if(stealButtonDisabled === false) {
    //     setStealButtonDisabled((prev) => !prev);
    // }
    if (assassinationButtonDisabled === false) {
        setAssassinationButtonDisabled((prev) => !prev);
    }
    // if(coupButtonDisabled === false) {
    //     setCoupButtonDisabled((prev) => !prev);
    // }
}