import { useState } from 'react'
import { SideTitle, SideItem, Sidebar, SidebarHeader } from '../template/flex'
import { Icon } from '../../assets/svg.access' 
import { Tooltip } from '../tooltip/tooltip'

export const SideContainer = () => {
  const [show, setShow] = useState(true)
  const changeShow = () => { setShow( !show ) }
  const vector: string[][] = [
    ["t weather", "chm", "weather"],
    ["t weatherHistoric", "bootstrap", "weatherHistoric"],
    ["t weatherHistoricOffShore", "home", "weatherHistoricOffShore"],
    ["t weatherHistoricOnShore", "speedometer2", "weatherHistoricOnShore"],
    // ["commission", "collection", "commission"],
    ["country", "table", "country"],
    ["equipment", "people-circle", "equipment"],
    ["harbor", "grid", "harbor"],
    // ["institution", "collection", "institution"],
    // ["manufacturer", "collection", "manufacturer"],
    ["observer", "collection", "observer"],
    // ["om", "collection", "om"],
    ["platform", "calendar3", "platform"],
    ["platform_category", "chat-quote-fill", "platform_category"],
    // ["researcher", "collection", "researcher"],
    // ["station", "cpu-fill", "station"],
    ["station_category", "gear-fill", "station_category"],
    ["station_historic", "cpu-fill", "station_historic"],
    ["station_off_shore", "speedometer", "station_off_shore"],
    ["station_on_shore", "toggles2", "station_on_shore"],
    // ["surveying", "collection", "surveying"],
    ["tooltip user", "tools-circle", "user_entity"], ["tooltip role", "chevron-right", "role"], ["tooltip profile", "geo-fill", "profile"]]

  return (
      <Sidebar sidehide={show}>
        <SidebarHeader>
        <SideTitle key={0} href={`#/`} ><Icon name="speedometer" /><p>Title</p></SideTitle>
        {vector.map((element) => {
          return <SideItem key={element[1]} href={`#/${element[2]}`} ><Tooltip data-tip={element[0]}><Icon name={element[1]} /></Tooltip><p>{element[2]}</p></SideItem>
        })}
        {/* <SideItem ><Tooltip data-tip="collapsible"><Icon name="speedometer" /></Tooltip><p>Collapsible</p></SideItem> */}
        </SidebarHeader>
        <SideItem element={'final'} onClick={changeShow}><Tooltip data-tip="hide items"><Icon name="grid" /></Tooltip><p>hide</p></SideItem>
      </Sidebar>
  )
}