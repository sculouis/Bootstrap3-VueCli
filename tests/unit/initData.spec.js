import axios from "axios"
// const url = "/api/datas"
const url = "https://louis-chen-webapi.netlify.com/.netlify/functions/server/"
const urlPrResultAdd = url + "pr/add"

const obj = {
    sel:false,
    prNum:"PR20191021001",
    quoteNum:"Q20191021001", 
    category:"辦公室用具",
    itemDescription:"桌子",
    amount:60,
    unitName:"打",
    minQuote:true,
    currency:"TWD",
    originalQuote:"123456",
    quoteEmp:"游OO(17962)",
    invoiceEmp:"黃OO(17845)",
    isdelete:0,
    isDetailOpen: true,
    isSubOpen:false,
    subDatas:[{
        raChk:false,
        receiveAmount:10,
        paymentDep:"1399-XX分行",
        receiveDep:"1399-XX分行"
    },{
        raChk:false,
        receiveAmount:10,
        paymentDep:"1399-XX分行",
        receiveDep:"1399-XX分行"
    }
    ]
}

axios.post(urlPrResultAdd,obj)
.then(response => {
    console.log(`add data response:${response}`)
})
.catch(err => console.log(err))
