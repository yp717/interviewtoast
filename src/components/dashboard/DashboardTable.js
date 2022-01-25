import React from "react";

const DashboardTable = () => (
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
            Status
          </th>
          <th scope="col" class="relative px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="text-sm font-medium text-gray-900">Session Name</div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-500">27/06/2021</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
              Active
            </span>
          </td>
          <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
            <a href="#" class="text-indigo-600 hover:text-indigo-900">
              View Insights
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default DashboardTable;