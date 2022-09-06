import { Request, Response, NextFunction, response } from 'express'
import * as fetch from 'node-fetch';
import axios from "axios"
import * as fs from 'fs'
import * as cheerio from "cheerio"



export default async (req: Request, res: Response, next: NextFunction) => {

  const jobsId = req.params.id
  if (!req.params.id) {
    return res.json({
      success: false,
      error: "Please provide job ID"
    })
  }
  try {
    const response = await axios.post(
      'https://xapi.supercharge-srp.co/job-search/graphql',
      {
        'query': 'query getJobDetail($jobId: String, $locale: String, $country: String, $candidateId: ID, $solVisitorId: String, $flight: String) {\n  jobDetail(\n    jobId: $jobId\n    locale: $locale\n    country: $country\n    candidateId: $candidateId\n    solVisitorId: $solVisitorId\n    flight: $flight\n  ) {\n    id\n    pageUrl\n    jobTitleSlug\n    applyUrl {\n      url\n      isExternal\n    }\n    isExpired\n    isConfidential\n    isClassified\n    accountNum\n    advertisementId\n    subAccount\n    showMoreJobs\n    adType\n    header {\n      banner {\n        bannerUrls {\n          large\n        }\n      }\n      salary {\n        max\n        min\n        type\n        extraInfo\n        currency\n        isVisible\n      }\n      logoUrls {\n        small\n        medium\n        large\n        normal\n      }\n      jobTitle\n      company {\n        name\n        url\n        slug\n        advertiserId\n      }\n      review {\n        rating\n        numberOfReviewer\n      }\n      expiration\n      postedDate\n      postedAt\n      isInternship\n    }\n    companyDetail {\n      companyWebsite\n      companySnapshot {\n        avgProcessTime\n        registrationNo\n        employmentAgencyPersonnelNumber\n        employmentAgencyNumber\n        telephoneNumber\n        workingHours\n        website\n        facebook\n        size\n        dressCode\n        nearbyLocations\n      }\n      companyOverview {\n        html\n      }\n      videoUrl\n      companyPhotos {\n        caption\n        url\n      }\n    }\n    jobDetail {\n      summary\n      jobDescription {\n        html\n      }\n      jobRequirement {\n        careerLevel\n        yearsOfExperience\n        qualification\n        fieldOfStudy\n        industryValue {\n          value\n          label\n        }\n        skills\n        employmentType\n        languages\n        postedDate\n        closingDate\n        jobFunctionValue {\n          code\n          name\n          children {\n            code\n            name\n          }\n        }\n        benefits\n      }\n      whyJoinUs\n    }\n    location {\n      location\n      locationId\n      omnitureLocationId\n    }\n    sourceCountry\n  }\n}\n',
        'variables': {
          'jobId': `${jobsId}`,
          'country': 'id',
          'locale': 'id',
          'candidateId': '',
          'solVisitorId': 'c3fe8788-2d8e-4dae-b94a-0e1a3ff5bf28'
        }
      },
      {
        params: {
          'country': 'id',
          'isSmartSearch': 'true'
        },
        headers: {
          'authority': 'xapi.supercharge-srp.co',
          'accept': '*/*',
          'accept-language': 'en-US,en;q=0.9,id;q=0.8',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
          'origin': 'https://www.jobstreet.co.id',
          'pragma': 'no-cache',
          'referer': 'https://www.jobstreet.co.id/',
          'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
        }
      }
    );
    res.json({
      success: true,
      data: response.data.data.jobDetail
    })
  } catch (error) {
    res.json({
      success: false,
      error: error.message
    })
  }


}