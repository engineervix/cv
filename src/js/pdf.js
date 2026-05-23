import { readFileSync, writeFileSync } from 'fs'
import { setTimeout } from 'node:timers/promises'
import puppeteer from 'puppeteer'
import { PDFDocument } from 'pdf-lib'
import { createServer } from 'vite'
import { format } from 'date-fns'

const today = format(new Date(), 'yyyyMMdd-HHmmss')

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

;(async () => {
  const server = await createServer({
    server: {
      port: 3000,
    },
  })
  await server.listen()

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 })
  const session = await page.createCDPSession()
  await session.send('DOM.enable')
  await session.send('CSS.enable')
  session.on('CSS.fontsUpdated', (event) => {
    // event will be received when browser updates fonts on the page due to webfont loading.
    console.log(event)
  })
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' })

  // Wait for fonts and content to load
  await setTimeout(5000)
  await page.evaluateHandle('document.fonts.ready')

  // Get the title from the page's metadata
  const author = await page.evaluate(() => {
    const titleElement = document.querySelector('header h1')
    return titleElement ? titleElement.textContent : 'CV'
  })

  const pdfPath = `${slugify(author)}-resume-${today}.pdf`

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    preferCSSPageSize: true,
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
    <div style="
      font-family: Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif;
      color: #E5E4E2;
      font-size: 14px;
      text-align: right;
      width: 100%;
      padding-right: 0.5in;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
    ">
      <span class="pageNumber"></span> / <span class="totalPages"></span>
    </div>
  `,
  })
  await browser.close()
  await server.close()

  const existingPdfBytes = readFileSync(pdfPath)
  const pdfDoc = await PDFDocument.load(existingPdfBytes)

  // Set metadata
  pdfDoc.setAuthor(author)
  pdfDoc.setSubject(`${author}'s resumé`)
  pdfDoc.setKeywords([author, 'curriculum vitæ', 'resumé'])
  pdfDoc.setLanguage('en-gb')

  // Save the modified PDF
  const modifiedPdfBytes = await pdfDoc.save()
  writeFileSync(pdfPath, modifiedPdfBytes)

  console.info(`PDF saved at ${pdfPath}`)
})()
