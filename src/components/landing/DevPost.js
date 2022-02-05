import * as React from "react"

const Devpost = () => {
  return (
    <div class="max-w-4xl mx-auto flex flex-col items-center text-white justify-center py-8 md:py-16">
      <p class="text-sm leading-4 uppercase text-white">Built for</p>
      <h2 class="md:text-5xl text-3xl font-bold leading-10 mt-3 text-white">
        Developer Week 2022
      </h2>
      <p class="text-sm  text-white mt-4">By Yannis Panagis & Sam Larsen-Disney</p>
      <div className="space-x-2 mt-8">
        <a className="btn-secondary">DevPost</a>
        <a className="btn-secondary">GitHub</a>
      </div>
    </div>
  )
}

export default Devpost
