import sqlite3 from "sqlite3";
import { revalidateTag, unstable_cache } from "next/cache";

interface User {
  id?: number;
  name: string;
}

const db = new sqlite3.Database(
  "./src/database/mydb.sqlite3",
  (err: Error | null) => {
    if (err) {
      console.error("Error opening database", err);
    } else {
      console.log("Connected to the SQLite database.");
    }
  }
);

export const addUser = async (name: string): Promise<User> => {
  const result: User = await new Promise((resolve, reject) => {
    const query = "INSERT INTO users (name) VALUES (?)";
    db.run(query, [name], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, name });
      }
    });
  });
  revalidateTag("users");
  return result;
};

export const listUsers = unstable_cache(
  async (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users";
      db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as User[]);
        }
      });
    });
  },
  ["users"],
  { tags: ["users"] }
);
