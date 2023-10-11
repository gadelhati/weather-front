import { useState } from "react";
import {
  SideContainerTitle,
  SideContainerItem,
  SidebarContainer,
  SidebarContainerHeader,
  SidebarContainerCollapsible,
  SidebarContainerButton,
  SidebarContainerButtonH,
  SideContainerFolderIcon,
} from "../template/flex";
import { Icon } from "../../assets/svg.access";
import { Tooltip } from "../tooltip/tooltip";
import { UriScreenFormat } from "../../service/uri.format";
import { getPayload } from "../../service/service.token";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from "react-icons/io";
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
// import { Rotate } from "../template/rotate";

export const SideContainer = () => {
  const [side, setSide] = useState(true);
  const [collapsible, setCollapsible] = useState(false);
  const showSideBar = () => {
    setSide(!side);
  };
  const showCollapsible = () => {
    setCollapsible(!collapsible);
  };
  const vector: string[][] = [
    ["weather", "chm", "weather"],
    ["weather12", "home", "weather12"],
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
  ];

  const collapse: string[][] = [
    ["weather_historic", "bootstrap", "weather/historic"],
    ["weather_historic_off_hore", "table", "weatherOffShore/historic"],
    ["weather_historic_on_hore", "geo-fill", "weatherOnShore/historic"],
    ["station_historic", "cpu-fill", "station/historic"],
  ];

  return (
    <SidebarContainer sidehide={side}>
      <SidebarContainerHeader>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            // border: 'solid',
          }}
        >
          <SideContainerTitle
            key={0}
            href={`#/`}
            style={{
              zIndex: 1,
              width: "99%",
            }}
          >
            <Icon name="speedometer" />
            <p>CHM</p>
          </SideContainerTitle>
          <SidebarContainerButton
            key={0}
            onClick={showSideBar}
            style={{
              zIndex: 2,
              marginLeft: "-10px",
              // padding: '5px',
              paddingTop: "8px",
            }}
          >
            {!side ? (
              <IoIosArrowDroprightCircle size="30px" />
            ) : (
              <IoIosArrowDropleftCircle size="30px" />
            )}
          </SidebarContainerButton>
        </div>
        {vector.map((element) => {
          return (
            <SideContainerItem key={element[1]} href={`#/${element[2]}`}>
              <Tooltip data-tip={element[0].replaceAll("_", " ")}>
                <Icon name={element[1]} />
              </Tooltip>
              <p>{UriScreenFormat(element[2])}</p>
            </SideContainerItem>
          );
        })}
        <SidebarContainerCollapsible collapsible={collapsible}>
          <SideContainerItem key={0} onClick={showCollapsible} style={{display: 'flex', padding: '.4em',}}>
            <div style={collapse? {display: 'flex', alignContent: 'flex-start',}: {width: '0px'}}>
              
              <SideContainerFolderIcon>
                {!collapsible ? (
                  <AiFillFolder size="1.25rem" style={{display: 'flex', marginLeft: "-30.8vh" }} />
                ) : (
                  <AiFillFolderOpen
                  size="1.25rem" style={{display: 'flex' ,marginLeft: "-30.8vh" }}
                  /> 
                )}

                  <Tooltip data-tip={"historic"}>
                    <p style={{margin: '1vh',}}>Historic</p>
                  </Tooltip>
              </SideContainerFolderIcon>

              <SidebarContainerButtonH>
                {!collapsible
                  ? side && <IoMdArrowDropdown size="25px" />
                  : side && <IoMdArrowDropup size="25px" />}
              </SidebarContainerButtonH>

            </div>
            {/* <div>
              <SidebarContainerButtonH>
                {!collapsible
                  ? side && <IoMdArrowDropdown size="25px" />
                  : side && <IoMdArrowDropup size="25px" />}
              </SidebarContainerButtonH>
            </div> */}
          </SideContainerItem>

          {collapse.map((element) => {
            return (
              <SideContainerItem key={element[1]} href={`#/${element[2]}`}>
                <Tooltip data-tip={element[0].replaceAll("_", " ")}>
                  <Icon name={element[1]} />
                </Tooltip>
                <p>{UriScreenFormat(element[2])}</p>
              </SideContainerItem>
            );
          })}
        </SidebarContainerCollapsible>
      </SidebarContainerHeader>
      <SideContainerItem element={"final"} href={`#/${"profile"}`}>
        <Tooltip data-tip="tooltip profile">
          <Icon name="people-circle" />
        </Tooltip>
        <p>{getPayload().sub}</p>
      </SideContainerItem>
    </SidebarContainer>
  );
};
