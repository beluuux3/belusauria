import React from "react";

export default function Table({ headers, children }) {
  return (
    <div className="mx-10 overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm bg-[#ffa2c6] text-body bg-neutral-secondary-soft border-b rounded-base border-default">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-6 py-3 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
