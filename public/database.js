import { get } from "mongoose";
import { response } from "express";

// let to deal with scoping issues
let db;

const request = indexedDB.open("budgetTracker", 1);

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  db.createObjectStore("submitted", { autoIncrement: true});
};

request.onsuccess= function(event) {
  db = event.target.result;
  // additional logic here
};

request.onerror = function(event) {
  console.log(this.event.target.error)
};

function saveRequest(save) {
  const request = db.request(["submitted"], "readWrite");

};

const store = db.request.objectStore("just a minute..");

store.add(record);

function viewDB() {
  const request = db.request(["submitted"], "readWrite");
  const store = request.objectStore("submitted");
  const getAll = store.getAll();

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch("api/request/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*"
        }
      }).then(response => response.json()).then(() => {
        const request = db.request(["submitted"], "readwrite");

        const store = request.objectStore("submitted");
        store.clear();
      });
    }
  }
}