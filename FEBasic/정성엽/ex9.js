const MENU = {
    짜장: { price: 7000 },
    짬뽕: { price: 9900 },
    탕슉: { price: 25000, taxfree: 1 },
};

const WIDTH = 7;

function priceUnit(price, unit = "원") {
    return price.toString().padStart(WIDTH, " ") + unit;
}

function printInfo([label, unit], price) {
    console.log(`${label.padEnd(WIDTH, " ")} ${priceUnit(price, unit)}`);
}

function printLine(flag = "=") {
    console.log(flag.repeat(WIDTH * 3));
}

function calcTax(price) {
    return Math.round((price / 1.1) * 0.1);
}

function bill(tableNo) {
    const order = [];
    const total = { price: 0, tax: 0 };

    return {
        order(item) {
            if(!MENU[item]){
                return;
            }
            order.push(item);
            const { price, taxfree } = MENU[item];
            total.price += price;
            total.tax += taxfree ? 0 : calcTax(price);
        },

        printBill() {
            console.log(`\nTable. ${tableNo}`);
            printLine();
            for (const item of order) {
                const { price, taxfree } = MENU[item];
                console.log("*", item);
                printInfo`공급가액:${price}원`;
                printInfo`부가세액:${taxfree ? 0 : calcTax(price)}원`;
                printLine("-");
            }
            printInfo`주문합계:${total.price}원`;
            printInfo`주문합계:${total.tax}원`;
            printLine();
        },
    };
}

const table1 = bill(1);
table1.order("짜장");
table1.order("짬뽕");
table1.printBill();

const table2 = bill(2);
table2.order("짜장");
table2.printBill();

table1.order("탕슉");
table1.printBill();

table2.order("짜장");
table2.printBill();

//Menu에 없는 주문을 했을 경우 무시
const table3 = bill(3)
table3.order('간짜장'); //무시
table3.order('깐풍기'); //무시
table3.order('짜장');
table3.printBill();

