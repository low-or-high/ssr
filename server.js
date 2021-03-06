// const createApp = require('/path/to/built-server-bundle.js')
const server = require('express')()
// const renderer = require('vue-server-renderer').createRenderer()
const { createBundleRenderer } = require('vue-server-renderer')

// const serverBundle = require('./dist/vue-ssr-server-bundle.json')
// const clientManifest = require("./dist/vue-ssr-client-manifest.json")
const template = require('fs').readFileSync('./dist/index.html', 'utf-8')

const renderer = createBundleRenderer(serverBundle,{
  runInNewContext: false,
  // template,
  // clientManifest
})


server.get('*',(req,res) => {
  const context = {url:req.url}
  // createApp(context).then(app =>{
  //   renderer.renderToString(app,(err,html)=>{
  //     if(err){
  //       if(err.code == 404){
  //         res.status(404).end('Page Not Found')
  //       }else {
  //         res.status(500).end('Internal Server Error')
  //       }
  //     }else {
  //       res.end(html)
  //     }
  //   })
  // })
  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code == 404) {
        res.status(404).end('Page Not Found')
      } else {
        res.status(500).end('Internal Server Error')
      }
    } else {
      res.end(html)
    }
  })
})

server.listen(8080)
