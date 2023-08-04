import dayjs from "dayjs"
import { useGetAllInstanceLogs } from "../hooks/query/get"
import { InstanceLogSort, ServiceData } from "../model"

export const InstanceLog = (props: {
  data: ServiceData
  sort: InstanceLogSort
  setcorrelationSelect: any
  time: number
}) => {
  const getInstanceLogs = useGetAllInstanceLogs(
    props.data.netName,
    props.data.serviceName,
    props.sort,
    props.time
  )
  if (getInstanceLogs.status === "loading") return <>Loading....</>
  if (getInstanceLogs.status === "error") return <>Lỗi....</>
  if (getInstanceLogs.status === "success")
    return (
      <div className="h-[80%] overflow-auto">
        <div className="flex flex-col gap-2">
          <div>
            <span className="font-bold uppercase">Number request: </span>
            <span>{getInstanceLogs.data.length ?? 0}</span>
          </div>
          {getInstanceLogs.data.map((item, index) => (
            <div
              key={index}
              className="p-2 border-2 shadow"
              onClick={() => {
                props.setcorrelationSelect(item.correlation_id)
              }}
            >
              <div className="">
                <div className="flex justify-center gap-2 p-2 border uppercase text-lg font-bold bg-slate-50">
                  <span>{item.sourceService}</span>
                  <span>{"->"}</span>

                  <span>{item.destService}</span>
                </div>
                <div>
                  <div>
                    <span className="font-bold uppercase">Request time: </span>
                    {dayjs(item.requested_time).format("DD/MM/YYYY HH:mm:ss")}
                  </div>
                  <div>
                    <span className="font-bold uppercase">Process time: </span>
                    {item.processing_time} ms
                  </div>
                </div>
                <div className="flex">
                  <span className="font-bold uppercase">url:</span>
                  <input
                    className="grow w-full inline"
                    value={item.url}
                  ></input>
                </div>
                <div>
                  <div>
                    <span className="font-bold uppercase">
                      source host name:{" "}
                    </span>
                    {item.sourceHostName}
                  </div>
                  <div>
                    <span className="font-bold uppercase">host name: </span>
                    {item.hostName}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}
