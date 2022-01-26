import { Link } from "gatsby"
import React from "react"

const DashboardTable = ({ data }) => (
  <div class="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
    <table class="min-w-full overflow-x-scroll divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >
            Name
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >
            Date
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >
            Length
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >
            Status
          </th>
          <th scope="col" class="relative px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        {data.map(({ sessionID, name, date, length }) => (
          <tr class="">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="text-sm font-medium text-gray-900">
                  {name.split("_").join(" ")}
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">
                {date.toISOString().split("T")[0]}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">
                {Math.ceil(length / 1000)}s
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                Processed
              </span>
            </td>
            <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
              <Link
                to={`/review/${sessionID}`}
                class="text-indigo-600 hover:text-indigo-900"
              >
                View Insights
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default DashboardTable
