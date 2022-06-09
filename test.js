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

const lastDate = {
  6: "30",
};
const year = new Date().getFullYear();
const month = undefined || new Date().getMonth() + 1;

console.log(new Date(`${year}-${month}-${lastDate[month]}`).toLocaleString());
