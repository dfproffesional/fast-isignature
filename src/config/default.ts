import path from 'path'
import express, { Application, static as Static } from "express"
import morgan from 'morgan'

export default (): Application => {
  const conf: Application = express()
  
  return conf
  .set('views', path.resolve('src/views/templates'))
  .set('view engine', 'pug')
  .use(morgan(':method :url :status :res[content-length] - :response-time ms'))
  .use('\/webroot/', Static(path.resolve('src/views/static')))
}