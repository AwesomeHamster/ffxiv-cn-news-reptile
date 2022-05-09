import axios from 'axios'
import { categorys, RespData, AxiosConfig,Datas } from '../config'


export async function getNews(
  pageIndex: number = 0,
  pageSize: number = 1,
  category: string = 'all-news'): Promise<Datas[]> {
  let datas:Datas[] = []
  let url: string =
    'https://ff.web.sdo.com/inc/newdata.ashx?url=List?' +
    'gameCode=ff' +
    '&category=' +
    categorys[category] +
    '&pageIndex=' +
    pageIndex +
    '&pageSize=' +
    pageSize

  let config = AxiosConfig
  await axios.get<RespData>(url, config).then((resp) => {
    resp.data.Data.forEach((item) => {
      datas.push({
        id: item.Id,
        title: item.Title,
        url: item.Author,
        time: item.PublishDate,
        image: item.HomeImagePath,
        description: item.Summary,
      })
    })
  })

  return datas
}
