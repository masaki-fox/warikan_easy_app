import init, { multiply } from "../pkg/warikan_easy_app.js";
const inclusive = getInput("inclusive");
const exclusive = getInput("exclusive");
const taxRate = getInput("tax_rate");
let records = []; // stores records for calc
const registerBtn = getInput("register-btn");
const resultArea = getInput("result-area");
const amount = getInput("amount");
const taxType_input = document.querySelector('input[name="tax"]:checked');
const owner = getInput("owner");
const total_money = getInput("total_money");
function setup() {
    ///////////////////////////////////////////////////////////
    // feature about tax_rate controll
    ///////////////////////////////////////////////////////////
    inclusive.addEventListener("click", () => {
        console.log("税込みが選ばれた");
        taxRate.setAttribute("disabled", "true");
    });
    exclusive.addEventListener("click", () => {
        console.log("税抜きが選ばれた");
        taxRate.removeAttribute("disabled");
    });
    ///////////////////////////////////////////////////////////
    // register form value to record
    ///////////////////////////////////////////////////////////
    registerBtn.addEventListener("click", () => {
        // why check, taxType_input is not used getInput Function
        const taxType_input = document.querySelector('input[name="tax"]:checked');
        if (!taxType_input) {
            return;
        }
        const taxType = taxType_input.value;
        let finalAmount = Number(amount.value);
        if (taxType === "tax_exclusive") {
            finalAmount = multiply(Number(amount.value), (1 + parseFloat(taxRate.value)));
        }
        // store record
        records.push({
            owner: owner.value,
            amount: finalAmount,
        });
        // display new record
        const record = document.createElement("div");
        record.style.borderBottom = "1px solid #eee";
        record.style.padding = "4px 0";
        record.textContent = `所有者: ${owner.value} | 合計: ${finalAmount}円`;
        resultArea.appendChild(record);
        resultArea.scrollTop = resultArea.scrollHeight; // auto scroll topdown
        updateTotals();
    });
}
///////////////////////////////////////////////////////////
// calc warikan
///////////////////////////////////////////////////////////
function updateTotals() {
    let totalA = 0;
    let totalB = 0;
    records.forEach(record => {
        if (record.owner === "member1") {
            totalA += Number(record.amount);
        }
        if (record.owner === "member2") {
            totalB += Number(record.amount);
        }
    });
    const totalMoney = Number(getInput("total_money").value) || 0;
    let total = totalMoney - totalA - totalB;
    const split = Math.round(total / 2);
    getInput("a-personal").textContent = String(totalA);
    getInput("b-personal").textContent = String(totalB);
    getInput("a-split").textContent = String(split);
    getInput("b-split").textContent = String(split);
    getInput("a-total").textContent = String(totalA + split);
    getInput("b-total").textContent = String(totalB + split);
}
///////////////////////////////////////////////////////////
// when enter tatal maney, update warikan
///////////////////////////////////////////////////////////
total_money.addEventListener("input", updateTotals);
document.addEventListener("DOMContentLoaded", setup);
await init();
function getInput(id) {
    const el = document.querySelector(`#${id}`);
    if (!el)
        throw new Error(`${id} not found`);
    return el;
}
//# sourceMappingURL=script.js.map