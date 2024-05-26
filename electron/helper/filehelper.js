const path = require("path");
const fs = require("fs");

// __filename va __dirname hosil qilish

// // data folder bor bo'lsa oladi yo'q bo'lsa data folder yaratadi

//lokalnida ishlatsa boladi
const dataDir = path.join(process.cwd(), "data"); 

//build qiganda ikta nuqta bilan
// const dataDir = path.join(process.cwd(), "../data");

const filePath = path.join(dataDir, "data.json");

export const createData = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
};

export const createFile = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}));
    console.log("data.json fayli yaratildi");
  } else {
    console.log("data.json fayli allaqachon mavjud");
  }
};

export const loginToFile = async (data) => {
  // const currentFile = await readFile();

  // if (currentFile) {
  //   currentFile.push(...data);
  //   data = currentFile;
  // }

  // ma'lumotni JSON ga o'firish
  const jsonString = JSON.stringify(data, null, 2);

  // JSON holatida data/data.json filega yozadi
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, jsonString, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(console.log("Data saved successfully"));
      }
    });
  });
};

// export const readFile = async () => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path.join(dataDir, 'data.json'), 'utf-8', (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(JSON.parse(data));
//       }
//     });
//   });
// };

export const getLoginJson = () => {
  createData();
  createFile();
  return fs.readFileSync(path.join(dataDir, "data.json"), "utf-8");
};
