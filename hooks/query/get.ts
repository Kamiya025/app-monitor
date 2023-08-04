import { useQuery } from "react-query"
import { getApi } from "../../apis/get"
import { CorrelationLogs, InstanceLogSort } from "../../model"

export const getApiKeys = {
  all: ["getAPI"] as const,
  getSumaryAllLogs: (time: number) =>
    [...getApiKeys.all, "getSumaryAllLogs", time] as const,
  getAllInstanceLogs: (
    netName: string,
    service: string,
    sort: InstanceLogSort,
    time: number
  ) =>
    [
      ...getApiKeys.all,
      "getAllInstanceLogs",
      netName,
      service,
      sort,
      time,
    ] as const,
  getCorrelationLogs: (id?: string) => ["getCorrelationLogs", id] as const,
}
export function useGetSumaryAllLogs(time: number) {
  return useQuery(getApiKeys.getSumaryAllLogs(time), () =>
    getApi.getSumaryAllLogs(time)
  )
}
export function useGetAllInstanceLogs(
  netName: string,
  service: string,
  sort: InstanceLogSort,
  time: number
) {
  return useQuery(
    getApiKeys.getAllInstanceLogs(netName, service, sort, time),
    () => getApi.getAllInstanceLogs(netName, service, sort, time)
  )
}
export function useGetCorrelationLogs(id?: string) {
  return useQuery(getApiKeys.getCorrelationLogs(id), () => {
    if (id) return getApi.getCorrelationLogs(id)
    return [] as unknown as Promise<CorrelationLogs[]>
  })
}
