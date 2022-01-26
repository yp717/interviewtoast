import { Link } from "gatsby"
import React from "react"
import { useSessions } from "../../context/session-context"

const DashboardTable = () => {
  const { sessions } = useSessions()
  return (
    <div class="overflow-hidden border-b border-gray-700 rounded-md shadow-md">
      <table class="min-w-full overflow-x-scroll divide-y divide-gray-200">
        <thead class="bg-gray-700">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-100 uppercase"
            >
              Name
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-100 uppercase"
            >
              Date
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-100 uppercase"
            >
              Length
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-100 uppercase"
            >
              Status
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-gray-700 divide-y divide-gray-800">
          {sessions.map(({ sessionID, name, date, length }) => (
            <tr class="">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="text-sm font-medium text-white">
                    {name.split("_").join(" ")}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-300">
                  {date.toISOString().split("T")[0]}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-300">
                  {Math.ceil(length / 1000)}s
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-200 rounded-full">
                  Processed
                </span>
              </td>
              <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <Link
                  to={`/review/${sessionID}`}
                  class="text-orange-400 hover:text-orange-500"
                >
                  Insights
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DashboardTable
