import * as React from "react"

const PriceCard = ({ title, price, description }) => {
  return (
    <div
      role="listitem"
      class="bg-white shadow rounded-lg p-8 my-4 relative z-30"
    >
      <div class="md:flex items-center justify-between">
        <h2 class="text-2xl font-semibold leading-6 text-gray-800">{title}</h2>
        <p class="text-2xl font-semibold md:mt-0 mt-4 leading-6 text-gray-800">
          {price}
        </p>
      </div>
      <p class="md:w-80 text-base leading-6 mt-4 text-gray-600">
        {description}
      </p>
    </div>
  )
}

export default PriceCard
