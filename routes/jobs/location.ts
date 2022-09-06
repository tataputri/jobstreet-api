import { Request, Response, NextFunction } from 'express'
import axios from "axios"
import * as cheerio from "cheerio"



export default async (req: Request, res: Response, next: NextFunction) => {
  const location = req.query.name || 'pekanbaru'
  const page = req.query.page || 1
  const jobStreetUrl = `https://www.jobstreet.co.id/id/job-search/${location}-jobs/${page}`

  const rawHtml = await axios.get(jobStreetUrl).then(res => res.data)
  const $ = cheerio.load(rawHtml)
  const contentArea = $('div[data-automation="jobListing"]')



  const jobList = contentArea.find('[data-search-sol-meta]').map((i, div) => {
    const solMeta = $(div).attr('data-search-sol-meta') || '{}'
    const solMetaObj = JSON.parse(solMeta)
    const jobId = solMetaObj.jobId.replace('jobstreet-id-job-', '')
    const banner = $(div).find('img').first().attr('src') || null
    const link = $(div).find('a').first().attr('href')
    const jobName = $(div).find('div[class="sx2jih0 l3gun70 l3gun74 l3gun72"]').first().text()
    const postedTime = $(div).find('time').first().attr('datetime')
    const companyName = $(div).find('span[class="sx2jih0 zcydq84u _18qlyvc0 _18qlyvc1x _18qlyvc1 _18qlyvca"]').first().text() || null
    const companyLogo = $(div).find('img[class="sx2jih0 pXyoU_0"]').first().attr('src') || null

    const sellingPoint = $(div).find('div[data-automation="job-card-selling-points"]')
      .first()
      .find('li')
      .map((x, item) => {
        return $(item).text()
      }).toArray()

    return { jobId, banner, link, jobName, companyName, companyLogo, postedTime, sellingPoint }
  }).toArray()


  return res.json({

    success: true,
    data: jobList
  })
}