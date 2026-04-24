// SARS 2024/2025 TAX BRACKETS

export function calculateMonthlyTax(grossAnnualIncome) {
    const income = parseFloat(grossAnnualIncome);

    let annualTax = 0;

    // SARS 2024/2025 tax brackets
    if (income <= 237100) {
        annualTax = income * 0.18;
    } else if (income <= 370500) {
        annualTax = 42678 + (income - 237100) * 0.26;
    } else if (income <= 512800) {
        annualTax = 77362 + (income - 370500) * 0.31;
    } else if (income <= 673000) {
        annualTax = 121475 + (income - 512800) * 0.36;
    } else if (income <= 857900) {
        annualTax = 179147 + (income - 673000) * 0.39;
    } else if (income <= 1817000) {
        annualTax = 251258 + (income - 857900) * 0.41;
    } else {
        annualTax = 644489 + (income - 1817000) * 0.45;
    }

    // Primary rebate 2024/2025
    const primaryRebate = 17235;
    annualTax = Math.max(0, annualTax - primaryRebate);

    // UIF: 1% of gross monthly income, capped at R177.12/month
    const grossMonthly = income / 12;
    const uif = Math.min(grossMonthly * 0.01, 177.12);

    const monthlyTax = annualTax / 12;
    const monthlyTakeHome = grossMonthly - monthlyTax - uif;

    return {
        grossMonthly: Math.round(grossMonthly),
        monthlyPAYE: Math.round(monthlyTax),
        monthlyUIF: Math.round(uif),
        takeHomePay: Math.round(monthlyTakeHome),
    };
}