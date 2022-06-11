// console.log(new Date('1987-10-26').getTime() + )
// const date = new Date('2022-06-08T24:00:00-01:00')

// const { limit } = require("./constants/constants");

// console.log(new Date("2022-06-08T13:24:06.408+00:00").toLocaleString());
// console.log(new Date("2022-06-08T13:25:13.265+00:00").toLocaleString());
// console.log(new Date("2022-06-08T13:25:13.265+00:00").toLocaleString());
// 2022-06-08T13:25:13.265+00:00

// new Date().setTime()
// console.log(new Date().toLocaleString());
// console.log(new Date(Date.now() + (2 * 1000 * 60 * 60)).toLocaleString());
// const pageNo = Math.max(0,parseInt(undefined) - 1) || 1
// skip =

// const pageNo = Math.max(0,(parseInt(1) || 2) - 1)
// const skip = Math.max(0,(parseInt(3) || 1) - 1) * 10

// console.log(skip);



// const date = new Date(new Date('2022-09-08').getTime() - (7 * 1000 * 60 * 60 * 24 ))

// console.log(date <= new Date('2022-09-01'));
// const sevenDaysBefore = new Date(Date.now()  - (7 * 1000 * 60 * 60 * 24)).getDate()
// console.log(sevenDaysBefore);

// const date = new Date('2021-03-20').getDate()
// console.log(date);
// let month,date = new Date("2024-02-19")
// month = date.getMonth() + 100
// month = month < 10 ? '0' + month.toString() : month
// console.log(parseInt(month));
// console.log(new Date("2022-06-07T07:46:02.618Z").toLocaleString())
const date = new Date("2022-06-14")
console.log(date.getDate())
console.log(new Date(date.getTime() - (6 * 1000 * 60 * 60 * 24)).getDate());
