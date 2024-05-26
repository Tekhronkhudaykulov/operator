import { openDB } from "idb";

const dbPromise = openDB("authDB", 1, {
  upgrade(db) {
    db.createObjectStore("tokens");
  },
});

export const setTokenNew = async (key: any, val: any) => {
  const db = await dbPromise;
  await db.put("tokens", val, key);
};

export const getToken = async (key: any) => {
  const db = await dbPromise;
  return await db.get("tokens", key);
};

export const deleteToken = async (key: any) => {
  const db = await dbPromise;
  await db.delete("tokens", key);
};
