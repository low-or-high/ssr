const createApp = require('/path/to/built-server-bundle.js')
const server = require('express')()
// const renderer = require('vue-server-renderer').createRenderer()
const { createBundleRenderer } = require('vue-server-renderer')

const renderer = createBundleRenderer(serverBundle,{
  runInNewContext: false,
  template,
  clientManifest
})


server.get('*',(req,res) => {
  const context = {url:req.url}
  createApp(context).then(app =>{
    renderer.renderToString(app,(err,html)=>{
      if(err){
        if(err.code == 404){
          res.status(404).end('Page Not Found')
        }else {
          res.status(500).end('Internal Server Error')
        }
      }else {
        res.end(html)
      }
    })
  })
})
