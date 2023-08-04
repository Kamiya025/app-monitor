import {
  CorrelationLogs,
  InstanceLog,
  InstanceLogSort,
  SumaryAllLogs,
} from "../model"
import axiosClient from "./axios-client"

export const getApi = {
  getSumaryAllLogs(time: number): Promise<SumaryAllLogs> {
    const url = "/ams/"
    return axiosClient.post(url, {
      type: "last",
      last: {
        value: time,
        unit: "m",
      },
    })
  },
  getAllInstanceLogs(
    netName: string,
    service: string,
    sort: InstanceLogSort,
    time: number
  ): Promise<InstanceLog[]> {
    const url = "/ams/instance/"
    return axiosClient.post(url, {
      sorts: [`-${sort}`],
      type: "last",
      last: {
        value: time,
        unit: "m",
      },
      netName,
      service,
    })
  },
  getCorrelationLogs(id: string): Promise<CorrelationLogs[]> {
    const url = "/ams/correlation/"
    return axiosClient.post(url, {
      correlation_id: id,
    })
  },
}
