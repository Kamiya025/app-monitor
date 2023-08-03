import { useQuery } from "react-query"
import { getApi } from "../../apis/get"

export const getApiKeys = {
  all: ["getAPI"] as const,
  getSumaryAllLogs: () => [...getApiKeys.all, "getSumaryAllLogs"] as const,
}
export function useGetSumaryAllLogs() {
  return useQuery(getApiKeys.getSumaryAllLogs(), () =>
    getApi.getSumaryAllLogs()
  )
}
