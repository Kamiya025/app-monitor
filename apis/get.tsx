import { SumaryAllLogs } from "../model"
import axiosClient from "./axios-client"

export const getApi = {
  getSumaryAllLogs(): Promise<SumaryAllLogs> {
    const url = "/ams/"
    return axiosClient.post(url, {
      type: "last",
      last: {
        value: 1,
        unit: "d",
      },
    })
  },
}
