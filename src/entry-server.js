import { createApp } from './app'

export default context => {

  return new Promise((resolve,reject) => {
    const { app, router } =  createApp()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if(!matchedComponents.length){
        return reject({code:404})
      }

      Promise.all(matchedComponents.map(Comment => {
        if(Comment.asyncData){
          return Comment.asyncData({
            store,
            route:router.currentRoute
          })
        }
      })).then(() => {
        context.state = store.state

        resolve(app)
      }).catch(reject)

    },reject)
  })
}
