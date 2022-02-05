export function createDynamicEmailTemplate() {
  const Maizzle = require("@maizzle/framework")

  const options = {
    tailwind: {
      config: {},
      css: "",
      compiled: "",
    },
    maizzle: {},
    beforeRender() {},
    afterRender() {},
    afterTransformers() {},
  }

  Maizzle.render(`html string`, options).then(({ html, config }) =>
    console.log(html, config)
  )
}
