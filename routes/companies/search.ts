import { Request, Response, NextFunction, response } from 'express'

import axios from "axios"




export default async (req: Request, res: Response, next: NextFunction) => {

  const page = req.query.page || 1
  const per_page = req.query.per_page || 10
  const keyword = req.query.keyword || 'a'

  try {
    const response = await axios.get('https://api-js.prod.companyreview.co/companies', {
      params: {
        'page': page,
        'per_page': per_page,
        'company_name': keyword,
        'sort': '-reviews_count'
      },
      headers: {
        'authority': 'api-js.prod.companyreview.co',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache',
        'origin': 'https://www.jobstreet.co.id',
        'pragma': 'no-cache',
        'referer': 'https://www.jobstreet.co.id/',
        'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
        'x-country-iso': 'id'
      }
    });


    res.json(response.data)
  } catch (error) {
    res.json({
      success: false,
      error

    })
  }
}