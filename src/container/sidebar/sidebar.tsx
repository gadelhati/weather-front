import { useState } from 'react'
import { SideContainerTitle, SideContainerItem, SidebarContainer, SidebarContainerHeader, SidebarContainerCollapsible } from '../template/flex'
import { Icon } from '../../assets/svg.access'
import { Tooltip } from '../tooltip/tooltip'
import { UriScreenFormat } from '../../service/uri.format'

export const SideContainer = () => {
  const [side, setSide] = useState(true)
  const [collapsible, setCollapsible] = useState(false)
  const showSideBar = () => { setSide(!side) }
  const showCollapsible = () => { setCollapsible(!collapsible) }
  const vector: string[][] = [
    ["weather", "chm", "weather"],
    // ["t weatherOffShore", "home", "weatherOffShore"],
    // ["t weatherOnShore", "speedometer2", "weatherOnShore"],
    // ["t weatherHistoric", "bootstrap", "weatherHistoric"],
    // ["t weatherHistoricOffShore", "table", "weatherHistoricOffShore"],
    // ["t weatherHistoricOnShore", "geo-fill", "weatherHistoricOnShore"],
    // ["commission", "collection", "commission"],
    // ["country", "table", "country"],
    // ["equipment", "people-circle", "equipment"],
    // ["harbor", "grid", "harbor"],
    // ["institution", "collection", "institution"],
    // ["manufacturer", "collection", "manufacturer"],
    ["observer", "collection", "observer"],
    // ["om", "collection", "om"],
    ["platform", "calendar3", "platform"],
    // ["platform_category", "chat-quote-fill", "platform_category"],
    // ["researcher", "collection", "researcher"],
    // ["station", "cpu-fill", "station"],
    ["station_category", "gear-fill", "stationCategory"],
    // ["station_historic", "cpu-fill", "station_historic"],
    ["station_off_shore", "speedometer", "stationOffShore"],
    ["station_on_shore", "toggles2", "stationOnShore"],
    // ["surveying", "collection", "surveying"],
    ["tooltip user", "grid", "userEntity"],
    // ["tooltip role", "chevron-right", "role"],
    // ["tooltip profile", "people-circle", "profile"]
  ]

  const collapse: string[][] = [
    ["weather_historic", "bootstrap", "weather/historic"],
    ["weather_historic_off_hore", "table", "weatherOffShore/historic"],
    ["weather_historic_on_hore", "geo-fill", "weatherOnShore/historic"],
    ["station_historic", "cpu-fill", "station/historic"]]

  return (
    <SidebarContainer sidehide={side}>
      <SidebarContainerHeader>
        <SideContainerTitle key={0} href={`#/`} onClick={showSideBar} ><Icon name="speedometer" /><p>CHM</p></SideContainerTitle>
        {vector.map((element) => {
          return <SideContainerItem key={element[1]} href={`#/${element[2]}`} ><Tooltip data-tip={element[0].replaceAll('_', ' ')}><Icon name={element[1]} /></Tooltip><p>{UriScreenFormat(element[2])}</p></SideContainerItem>
        })}
        <SidebarContainerCollapsible collapsible={collapsible}>
          <SideContainerItem key={0} onClick={showCollapsible}><Tooltip data-tip={'historic'}><Icon name="speedometer" /></Tooltip><p>historic</p></SideContainerItem>
          {collapse.map((element) => {
            return <SideContainerItem key={element[1]} href={`#/${element[2]}`} ><Tooltip data-tip={element[0].replaceAll('_', ' ')}><Icon name={element[1]} /></Tooltip><p>{UriScreenFormat(element[2])}</p></SideContainerItem>
          })}
        </SidebarContainerCollapsible>
      </SidebarContainerHeader>
      <SideContainerItem element={'final'}  href={`#/${'profile'}`} ><Tooltip data-tip="tooltip profile"><Icon name="people-circle" /></Tooltip><p>profile</p></SideContainerItem>
    </SidebarContainer>
  )
}