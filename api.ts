import { Request, Response, NextFunction } from 'express'
import axios from "axios"



export default async (req: Request, res: Response, next: NextFunction) => {

  if (!req.headers.apikey) {
    return res.send({
      success: false,
      error: 'please provide api key'
    })
  }
  const ApiEndPoint = `${process.env.API_BASE}/api/collections/jobstreet_id_api/records?filter=(apikey='${req.headers.apikey}')`

  
  const ApiStatus = await axios.get(ApiEndPoint).then(res => res.data)
  if (ApiStatus.items.length < 1) {
    return res.send({
      success: false,
      error: 'Please provide a valid Api Key'
    })
  }

  const apiKeyStatus = ApiStatus.items[0];

  const today = new Date();
  const expiredDate = new Date(apiKeyStatus.expired);
  // console.log(`Expired Date : ${expiredDate}`)
  // console.log(`Today Date : ${today}`)


  if (apiKeyStatus.status === false) {
    return res.send({
      success: false,
      error: 'Api key is disabled. please contact admin at discord @nulled#7662'
    })
  }
  if (expiredDate <= today) {
    return res.send({
      success: false,
      error: 'Api key expired. please contact admin at discord @nulled#7662'
    })
  }

  // if (req.authenticated) next()
  // console.log(req.headers)

  next()

}