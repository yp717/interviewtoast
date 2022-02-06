import * as React from "react"

const Devpost = () => {
  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center text-white justify-center py-8 md:py-16">
      <p className="text-sm leading-4 uppercase text-white">Built for</p>
      <h2 className="md:text-5xl text-3xl font-bold leading-10 mt-3 text-white">
        Developer Week 2022
      </h2>
      <p className="text-sm  text-white mt-4">
        By <a href="https://yannispanagis.com">Yannis Panagis</a> &{" "}
        <a class="" href="https://sld.codes">
          Sam Larsen-Disney
        </a>
      </p>
      <div className="space-x-2 mt-8">
        <a className="btn-secondary" href="https://devpost.com">
          DevPost
        </a>
        <a
          className="btn-secondary"
          href="https://github.com/yp717/interviewtoast"
        >
          GitHub
        </a>
      </div>
    </div>
  )
}

export default Devpost
