export default (store) => {
  store.subscribe((mutation, state) => {
    // eslint-disable-next-line no-console
    console.log(
      `%c${mutation.type} %c[mutation.type]`,
      'color:tomato',
      'color:gray'
    )
  })
}
