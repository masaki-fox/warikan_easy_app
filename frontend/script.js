console.log("update");
function getInput(id) {
    const el = document.querySelector(`#${id}`);
    if (!el)
        throw new Error(`${id} not found`);
    return el;
}
let records = []; // stores records for calc
export function init() {
    const inclusive = getInput("inclusive");
    const exclusive = getInput("exclusive");
    const taxRate = getInput("tax_rate");
    ///////////////////////////////////////////////////////////
    // feature about tax_rate controll
    ///////////////////////////////////////////////////////////
    if (!inclusive || !exclusive || !taxRate) {
        return;
    }
    inclusive.addEventListener("click", () => {
        console.log("税込みが選ばれた");
        taxRate.setAttribute("disabled", "true");
    });
    exclusive.addEventListener("click", () => {
        console.log("税抜きが選ばれた");
        taxRate.removeAttribute("disabled");
        ;
    });
    ///////////////////////////////////////////////////////////
    // register form value to record
    ///////////////////////////////////////////////////////////
    const registerBtn = getInput("register-btn");
    const resultArea = getInput("result-area");
    if (!registerBtn || !resultArea) {
        console.error("not found elements, registerBtn or resultArea");
        return;
    }
    registerBtn.addEventListener("click", () => {
        console.log("start register");
        const amount = getInput("amount").value;
        const taxType_input = document.querySelector('input[name="tax"]:checked');
        const taxRate = getInput("tax_rate").value;
        const owner = getInput("owner").value;
        // why check, taxType_input is not used getInput Function
        if (!taxType_input) {
            return;
        }
        const taxType = taxType_input.value;
        if (!amount || !taxRate || !owner) {
            console.error("not get elements amount, taxtype, taxrate or owner");
            return;
        }
        let finalAmount = Number(amount);
        if (taxType === "tax_exclusive") {
            finalAmount = Math.round(Number(amount) * (1 + parseFloat(taxRate)));
        }
        // store record
        records.push({
            owner: owner,
            amount: finalAmount
        });
        // レコード用div作成
        const record = document.createElement("div");
        record.style.borderBottom = "1px solid #eee";
        record.style.padding = "4px 0";
        record.textContent =
            `所有者: ${owner} | 合計: ${finalAmount}円`;
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
    console.log("update");
}
///////////////////////////////////////////////////////////
// when enter tatal maney, update warikan
///////////////////////////////////////////////////////////
const total_money = getInput("total_money");
total_money.addEventListener("input", updateTotals);
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=script.js.map