import { ArrowRightIcon, FlagIcon } from "@heroicons/react/outline"
import { Link } from "gatsby"
import React from "react"
import { useSessions } from "../../context/session-context"

const DashboardTable = () => {
  const { sessions, meetings } = useSessions()
  // const allData = [...meetings, ...sessions]
  if (sessions.length === 0 && meetings.length === 0) {
    return (
      <div className="w-full px-16 py-24 bg-gray-900 rounded flex flex-col items-center justify-center">
        <FlagIcon className="h-5 w-5" />
        <h2 className="text-lg font-bold">No sessions recorded</h2>
        <p>
          After you have recorded a practice session or attended an interview
          you will be able to review them here.
        </p>
      </div>
    )
  }

  return (
    <div className=" space-y-4">
      {sessions.length > 0 && (
        <div className="space-y-1">
          <p className="text-sm uppercase pl-1 ">Practise Interviews</p>
          <Table data={sessions} />
        </div>
      )}
      {meetings.length > 0 && (
        <div className="space-y-1">
          <p className="text-sm uppercase pl-1 ">Interviews</p>
          <Table data={meetings} />
        </div>
      )}
    </div>
  )
}

const Table = ({ data }) => {
  return (
    <table className="min-w-full overflow-x-scroll divide-y divide-gray-800 overflow-hidden rounded-md shadow-md">
      <thead className="bg-gray-900 ">
        <tr>
          <th
            scope="col"
            className="hidden md:block px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase w-[12rem]"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase"
          >
            Date
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase"
          >
            Length
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase"
          >
            Status
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-900 divide-y divide-gray-800">
        {data
          .slice(0, 5)
          .map(({ sessionID, name, date, length, users, processed }) => (
            <tr className="">
              <td className="hidden md:block px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-white">{name}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {date.toISOString().split("T")[0]}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {Math.ceil(length / 1000)}s
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-200 rounded-full">
                  Processed
                </span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <Link
                  to={`/feedback/${sessionID}`}
                  className="text-orange-400 hover:text-orange-500 inline-block"
                >
                  <div className="flex space-x-2 items-center">
                    <p>Feedback</p>
                    <ArrowRightIcon className="h-5 w-5" />
                  </div>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default DashboardTable
