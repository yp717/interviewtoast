exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /agora-rtc-sdk-ng/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
