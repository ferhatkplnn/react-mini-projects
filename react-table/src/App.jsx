import React from "react";
import Table from "./Table";

const users = [
  {
    name: "Osman",
    surname: "Kaya",
    email: "Osman@asldkf.com",
    age: 29,
  },
  {
    name: "Mehmet",
    surname: "Cabbar",
    email: "cabbar@asldkf.com",
    age: 99,
  },
  {
    name: "Ali",
    surname: "Zaman",
    email: "aliii@hotmail.com",
    age: 33,
  },
];

function App() {
  return (
    <div className="p-4">
      <Table
        searchable={true}
        head={[
          { name: "Ad-Soyad", sortable: true },
          { name: "E-posta" },
          { name: "Yas", sortable: true },
          { name: "islemler", width: 100 },
        ]}
        body={users.map((user, index) => [
          `${user.name} ${user.surname}`,
          user.email,
          user.age,
          [
            <React.Fragment key={index}>
              <button className="h-8 px-4 flex items-center bg-blue-600 text-white font-medium rounded">
                Duzenle
              </button>
              <button className="h-8 px-4 flex items-center bg-red-500 text-white font-medium rounded">
                Sil
              </button>
            </React.Fragment>,
          ],
        ])}
      />
    </div>
  );
}

export default App;
