module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "@/styles/base-vars.scss";@import "@/styles/shared-styles.scss";`
            }
        }
    }
}
