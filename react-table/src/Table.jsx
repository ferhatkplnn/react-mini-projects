import React, { useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";

export default function Table({ head, body, searchable }) {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState(null);

  const filteredData = body
    .filter((items) =>
      items.some((item) =>
        item.toString().toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    )
    .sort((a, b) => {
      if (sorting?.orderBy === "asc") {
        return a[sorting?.key].toString().localeCompare(b[sorting?.key]);
      }

      if (sorting?.orderBy === "desc") {
        return b[sorting?.key].toString().localeCompare(a[sorting?.key]);
      }
    });

  return (
    <>
      {searchable && (
        <div className="mb-4 flex gap-x-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Ara..."
            className="h-10 border rounded text-sm px-4 w-full border-gray-300 outline-none focus:border-black"
          />
          {sorting && (
            <button
              onClick={() => setSorting(null)}
              className="h-10 whitespace-nowrap rounded border border-red-500 text-red-500 text-sm px-4"
            >
              Siralamayi iptal et
            </button>
          )}
        </div>
      )}
      <div className="w-full sm:border rounded p">
        <table className="w-full ">
          <thead className="max-sm:hidden">
            <tr>
              {head.map((item, key) => (
                <th
                  width={item?.width}
                  key={item.name}
                  className="text-left text-sm font-semibold text-gray-700 p-3 border-b bg-blue-50"
                >
                  <div className="inline-flex items-center gap-x-2">
                    {item.name}
                    {item.sortable && (
                      <button
                        onClick={() => {
                          if (sorting?.key === key) {
                            setSorting({
                              key,
                              orderBy:
                                sorting?.orderBy === "asc" ? "desc" : "asc",
                            });
                          } else {
                            setSorting({
                              key,
                              orderBy: "asc",
                            });
                          }
                        }}
                      >
                        {sorting?.key === key &&
                          (sorting?.orderBy === "asc" ? (
                            <FaSortDown />
                          ) : (
                            <FaSortUp />
                          ))}
                        {sorting?.key !== key && <FaSort />}
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="max-sm:flex max-sm:flex-col max-sm:gap-8">
            {filteredData.map((user, index) => (
              <tr
                className="hover:text-orange-600 hover:bg-slate-50 max-sm:p-4 max-sm:flex max-sm:flex-col max-sm:border"
                key={index}
              >
                {user.map((item, i) => (
                  <td
                    key={i}
                    className="max-sm:p-1 sm:p-3 sm:border-b text-sm group-hover:bg-slate-50 "
                  >
                    {Array.isArray(item) ? (
                      <div className="flex gap-1">{item}</div>
                    ) : (
                      item
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
