import * as React from "react"

const PriceCardWithBorder = ({ title, price, description }) => {
  return (
    <div
      role="listitem"
      class="bg-white shadow rounded-lg mt-3 flex relative z-30"
    >
      <div class="w-2.5 h-auto bg-orange-500 rounded-tl-md rounded-bl-md"></div>
      <div class="w-full p-8">
        <div class="md:flex items-center justify-between">
          <h2 class="text-2xl font-semibold leading-6 text-gray-800">
            {title}
          </h2>
          <p class="text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800">
            {price}
          </p>
        </div>
        <p class="md:w-80 text-base leading-6 mt-4 text-gray-600">
          {description}
        </p>
      </div>
    </div>
  )
}

export default PriceCardWithBorder
