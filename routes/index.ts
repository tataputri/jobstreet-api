import { Request, Response, NextFunction } from 'express'
export default async (req: Request, res: Response, next: NextFunction) => {

  const endPoint = [
    /**
     * jobs section
     */
    {
      name: "jobsByLocation",
      desc: "Get newest job by location",
      endpoint: "/api/job/location",
      params: [
        {
          name: "location",
          optional: true,
          default: "pekanbaru"
        },
        {
          name: "page",
          optional: true,
          default: 1
        }
      ],
    },
    {
      name: "jobDetails",
      desc: "Get job details",
      endpoint: "/api/job/details",
      params: [
        {
          name: "id",
          optional: false,
          default: null
        }
      ],
    },
    /**
     * company section
     */
    {
      name: "companyListByPrefix",
      desc: "Get company list by prefix",
      endpoint: "/api/company/list",
      params: [
        {
          name: "prefix",
          optional: false,
          default: "a"
        }
      ],
    },
    {
      name: "companyListBySearch",
      desc: "Search company list by keyword",
      endpoint: "/api/company/list",
      params: [
        {
          name: "page",
          optional: false,
          default: 1
        },
        {
          name: "per_page",
          optional: false,
          default: 10
        },
        {
          name: "keyword",
          optional: false,
          default: "a"
        }
      ],
    },
    {
      name: "",
      desc: "",
      endpoint: "",
      params: [
        {
          name: "",
          optional: false,
          default: ""
        }
      ],
    },

  ]




  return res.json({
    succes: true,
    endPoint
  })
}