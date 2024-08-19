// package.json 路徑要設定正確
// 記得先安裝套件 npm Init
console.log(1111);

import readXlsxFile from "read-excel-file/node";

const schema = {
  id: {
    prop: "id",
    data: Number,
  },
  title: {
    prop: "title",
    data: String,
  },
  realease_year: {
    prop: "realease_year",
    data: String,
  },
};

readXlsxFile("./imdb.xlsx", { schema: schema }).then((rows) => {
  console.log(rows.toString());
});
