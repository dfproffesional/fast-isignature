import fs from 'fs'
import path from 'path'
import shell from 'shelljs'
import config from './config/default'
import multer from 'multer'
import { build } from './services/html2pdf'

const application = config()
const upload = multer({
  storage: multer.diskStorage({destination: 'src/storage/upload/',
  filename: (req, file, callback) => {
    callback(null, `${file.originalname}`)
  }})
})
const port = 3000

application.get('/', (req, res) => {
  res.render('index', {env: 'development', clientServer: 'http://localhost:8000'})
})

application.get('/read/:name', (req, res) => {
  const html = fs.readFileSync(`${__dirname}/storage/upload/html/${req.params.name}.html`, 'utf-8')
  res.send(html)
})

application.get('/build/:name', async ({params}, res) => {
  const filename = await build(params.name);
  
  const file = fs.readFileSync(filename), stat = fs.statSync(filename);
  
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Type', 'application/pdf');
  res.send(file);
})

application.post('/store', upload.single('file'), (req, res) => {
  if (!req.file) res.send({msg: 'bad!'})

  const [mType, extType] = req.file?.mimetype.split('/') as string[]
  
  const filename = path.basename(req.file?.path as string, `.${extType}`)

  shell.exec(`pdf2htmlEX --data-dir=${path.resolve('src/services/pdf2htmlEX/supplies')} ${path.resolve(`${req.file?.path}`)} ${path.relative('./', `${__dirname}/storage/upload/html/${filename}.html`)}`)

  const html = fs.readFileSync(path.resolve(`${__dirname}/storage/upload/html/${filename}.html`), 'utf-8')
  
  res.send(html)
})

application.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})