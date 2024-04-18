import puppeteer, { BoundingBox, PDFOptions, Page, PaperFormat } from 'puppeteer';
import path from 'path';
import PAPER_FORMAT from './paper_format.json';

interface PaperFormatItem {
  format: PaperFormat ; 
  ratio: number[]
}

const UPLOAD_DIR = path.resolve(`/app/src/storage/upload`);

export async function build(filename:string):Promise<string> {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage();
  
  await page.goto(`file://${UPLOAD_DIR}/html/${filename}.html`);
  
  const {format, isLandscape: landscape} = await getDetails(page);
  
  await page.pdf({ path: `${UPLOAD_DIR}/output/${filename}-release.pdf`, format, landscape });
  
  await browser.close();

  return `${UPLOAD_DIR}/output/${filename}-release.pdf`;
}

async function getDetails(page: Page): Promise<{format: PaperFormat; isLandscape: boolean}> {
  const $el = await page.$('.pf');
  const {height, width} = await $el?.boundingBox() as BoundingBox;
  
  const isLandscape = width > height ? true : false;
  const {format} = getPaperFormat(width, height, isLandscape) as PaperFormatItem;

  return {format, isLandscape};
}

function getPaperFormat(width:number, height:number, isLandscape:boolean = false): PaperFormatItem | undefined{
  const ratio = isLandscape ? (width/height).toFixed(2) : (height/width).toFixed(2);

  return PAPER_FORMAT.find((item: {format: string; ratio: number[]}) => 
    parseFloat(ratio) >= item.ratio[0] && 
    parseFloat(ratio) <= item.ratio[1]
  ) as PaperFormatItem;
}