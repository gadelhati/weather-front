import { useState, useEffect, useTransition } from 'react'
import { SideTitle, SideItem, Sidebar, SidebarHeader, SidebarCollapsible } from '../template/flex'
import { Icon } from '../../assets/svg.access'
import { UriScreenFormat } from '../../service/uri.format'
import { logout } from '../../service/service.crud'
import { accessList } from '../access.list'
import { vector } from '../menu'
import logo from '../../assets/image/marinha.png'
import { getRoles } from '../../service/service.token'

export const SideContainer = () => {
  // const [ispending, startTransition] = useTransition()
  const [collapsible, setCollapsible] = useState(false)
  const [list, setList] = useState<boolean[]>(accessList())
  const [show, setShow] = useState(true)
  const showCollapsible = () => { setCollapsible(!collapsible) }
  const changeShow = () => { setShow(!show) }

  const collapse: string[][] = [
    ["weather/historic", "bootstrap", "sixth"],
    ["weatherOffShore/historic", "table", "sixth"],
    ["weatherOnShore/historic", "geo-fill", "sixth"],
    ["station/historic", "cpu-fill", "sixth"]]

  // useEffect(()=> {
  //   startTransition(() => setList(accessList()))
  // },[])
  return (
    <Sidebar>
      <SidebarHeader>
        <SideTitle sidehide={show} key={0} href={`#/`} >
          <p>Início</p><img src={logo} />
        </SideTitle>
        {vector.map((element, index) => {
          return <SideItem key={Math.random()} href={`#/${vector[index][0]}`}><Icon name={vector[index][1]} />
            <p>{UriScreenFormat(vector[index][0] === 'weather' ? 'Observação' : vector[index][0] === 'observer' ? 'observador' : vector[index][0] === 'station' ? 'estação': vector[index][0])}</p>
          </SideItem>
        })}
        {getRoles() == 'ROLE_ADMIN' &&
        <SideItem key={Math.random()} href={`#/userEntity`}><Icon name={vector[0][1]} /><p>{UriScreenFormat('usuários')}</p></SideItem>
      }
      </SidebarHeader>
      <SidebarHeader>
      <SidebarCollapsible collapsible={collapsible}>
            <SideItem key={0} onClick={showCollapsible}>
              <div><span>Observações Historicas</span><Icon name="geo2" /></div></SideItem>
            {collapse.map((element) => {
              return <SideItem key={element[1]} href={`#/${element[0]}`} ><Icon name={element[1]} /><p>
                {UriScreenFormat(element[0] === 'weather/historic' ? 'observações gerais' : element[0] === 'weatherOffShore/historic' ? 'ship' : element[0] === 'weatherOnShore/historic' ? 'synop': element[0] === 'station/historic' ? 'estações': element[0])}
              </p></SideItem>
            })}
        </SidebarCollapsible>
        <SideItem key={'logout'} href={`#/${'login'}`} element={'final'} onClick={logout}><Icon name={'geo-fill'} /><p>logout</p></SideItem>
      </SidebarHeader>
    </Sidebar>
  )
}