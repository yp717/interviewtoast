import React from "react"
import { Link } from "gatsby"
import { ArrowRightIcon } from "@heroicons/react/outline"

const largeCardStyle =
  "relative group text-left w-full border-2 border-orange-400 hover:bg-orange-400 hover:text-white text-orange-400 flex flex-col rounded py-2 px-4"

const LargeCard = ({ title, desc, Icon, link, tabIndex }) => (
  <Link to={link} className={largeCardStyle} tabIndex={tabIndex}>
    <div className="w-full border-b-2 mb-2 border-orange-400 group-hover:border-white pb-1">
      <p className="font-medium">{title}</p>
    </div>
    <p className="text-sm opacity-80 pr-8">{desc}</p>
    <Icon className="absolute bottom-0 right-0 h-8 w-8 m-4 opacity-0 group-hover:opacity-100 text-white" />
  </Link>
)

export default LargeCard
