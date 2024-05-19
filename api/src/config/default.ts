import path from 'path'
import morgan from 'morgan'
import {config as DotenvConfig} from 'dotenv'
import express, { Application, static as Static } from "express"

export default (): Application => {
  const conf: Application = express()

  DotenvConfig()
  
  return conf
  .set('views', path.resolve('src/views/templates'))
  .set('view engine', 'pug')
  .use(morgan(':method :url :status :res[content-length] - :response-time ms'))
  .use('\/webroot/', Static(path.resolve('src/views/static')))
  .use('\/app/', Static(path.resolve('src/views/app')))
  .use('\/vendor/axios', Static(path.resolve('node_modules/axios/dist')))
  .use('\/vendor/jquery', Static(path.resolve('node_modules/jquery/dist')))
}