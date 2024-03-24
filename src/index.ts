import config from './config/default'

const application = config()
const port = 3000

application.get('/', (req, res) => {
  res.render('index')
})

application.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})