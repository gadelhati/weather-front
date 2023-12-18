import { useState, ChangeEvent, useEffect, useTransition } from 'react'
import { getPayload, isValidToken } from '../../service/service.token'
import { ErrorMessage } from '../../assets/error/errorMessage'
import { initialErrorMessage } from '../../assets/error/errorMessage.initial'
import { create, update, remove, retrieve, removeComposite } from '../../service/service.crud'
import { Container, ContainerInput2, InputGroup } from './generic.field'
import { AtributeSet } from './generic.atribute'
import { Atribute } from '../../component/atribute/atribute.interface'
import { Table } from '../template/table'
import { Button, ButtonPage, GroupButton } from '../template/button'
import { Pageable } from '../../component/pageable/pageable.interface'
import { initialPageable } from '../../component/pageable/pageable.initial'
import { ErrorBoundary } from 'react-error-boundary'
import { Modal } from '../template/modal'
import { Toast } from '../toast/toast'
import { createToast, toastDetails } from '../toast/toast.message'
import { SubAtributeSet } from '../../component/atribute/subAtribute'
// import { WeatherUpload } from './state.upload'
import { Header, TitleHeader } from '../template/header'
// import { Load } from '../template/load'
import { UriScreenFormat } from '../../service/uri.format'
// import { ShineButton } from './shine.button'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PDFDocument } from '../../component/pdf/PDFDocument'
// import { Input } from './input/Input'
// import { InputInterface } from './input/assets/input.interface'
import { Icon } from '../../assets/svg.access'
import { WeatherUpload } from '../weather.upload'

export const WeatherForm = <T extends { id: string, name: string }>(object: any) => {
    const [state, setState] = useState<any>(object.object)
    const [composite, setComposite] = useState<any>(object.object)
    const [states, setStates] = useState<T[]>([object.object])
    const [subStates, setSubStates] = useState<Object[][]>(SubAtributeSet(state))
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [atribute, setAtribute] = useState<Atribute[]>(AtributeSet(object.object))
    const [page, setPage] = useState<number>(0)
    const [size, setSize] = useState<number>(5)
    const [pageable, setPageable] = useState<Pageable>(initialPageable)
    const [ispending, startTransition] = useTransition()
    const [modal, setModal] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<{ message: '', show: boolean, action: string }>({ message: '', show: false, action: '' })
    const [key, setKey] = useState<string>('name')
    const [search, setSearch] = useState<string>('')
    const [tab, setTab] = useState<number>(0)

    const width = object.width ?? 100;

    useEffect(() => {
        JSON.stringify({ ispending })
        setAtribute(AtributeSet(object.object))
        retrieveItem()
        loadSubStates()
    }, [page, size])
    useEffect(() => {
        searchValue()
        setPage(0)
    }, [key, search])
    const changeTab = (index: any) => {
        setTab(index)
    }
    const searchValue = async () => {
        await retrieve(object.url, page, size, key, search).then((data: any) => {
            startTransition(() => setPageable(data))
            startTransition(() => setStates(data.content))
        }).catch(() => { networkError() })
    }
    const searchKey = (ikey: string) => {
        setKey(ikey)
    }
    const searchItem = async (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }
    const resetItem = () => {
        setComposite(object.object)
        loadSubStates()
        setState(object.object)
        setError([initialErrorMessage])
    }
    const selectItem = async (data: any) => {
        loadSubStates()
        setComposite(data)
        setState(data)
        handleModal()
    }
    const validItem = (data: any) => {
        if (data?.hasOwnProperty('id') || data?.hasOwnProperty('ii') && data?.hasOwnProperty('iii') || data?.hasOwnProperty('ddddddd') || data?.hasOwnProperty('name') && data?.hasOwnProperty('number')) {
            setConfirm({ ...confirm, show: !confirm.show })
            retrieveItem()
            createToast(toastDetails[0])
        } else {
            handleConfirm('')
            startTransition(() => setError(data))
            createToast(toastDetails[1])
        }
    }
    const networkError = () => {
        setError([{ field: 'DTO', message: 'Network Error' }])
    }
    const createItem = async () => {
        await create(object.url, state).then((data) => {
            validItem(data)
        }).catch(() => { networkError() })
    }
    const retrieveItem = async () => {
        await retrieve(object.url, page, size, key, search).then((data: any) => {
            startTransition(() => setPageable(data))
            startTransition(() => setStates(data.content))
        }).catch(() => { networkError() })
    }
    const loadSubStates = async () => {
        Object.entries(state).map(([key, value], index) => {
            return (
                (key === 'observer' || key === 'station') ?
                    retrieve(key).then((data: any) => {
                        startTransition(() => {
                            subStates[index] = data.content
                            setSubStates(subStates)
                        })
                    }).catch(() => { networkError() })
                    : {}
            )
        })
    }
    const updateItem = async () => {
        await update(object.url, state).then((data) => {
            validItem(data)
        }).catch(() => { networkError() })
    }
    const deleteItem = async () => {
        if (state.id !== undefined) {
            await remove(object.url, state.id).then((data) => {
                validItem(data)
            }).catch(() => { networkError() })
        } else if (composite.hasOwnProperty('dateObservation') || composite.hasOwnProperty('ii') && composite.hasOwnProperty('iii')) {
            await removeComposite(object.url, state, state?.dateObservation, state?.ddddddd, state?.ii, state?.iii).then((data) => {
                validItem(data)
            }).catch(() => { networkError() })
        } else if (composite.hasOwnProperty('name') && composite.hasOwnProperty('number')) {
            await removeComposite(object.url, state, state?.name, state?.number, '', '').then((data) => {
                validItem(data)
            }).catch(() => { networkError() })
        }
    }
    const validation = (name: string): string[] => {
        let vector: string[] = []
        if (Array.isArray(error)) {
            error?.map((element: any) => { if (name == element.field) return vector.push(element?.message + '. ') })
        }
        return vector
    }
    const validationDTO = (): string[] => {
        let vector: string[] = []
        if (Array.isArray(error)) {
            error?.map((element: any) => { if (element.field?.startsWith("DTO")) return vector.push(element?.message + '. ') })
        }
        return vector
    }
    // const handleInputChangeFather = (object: InputInterface) => {
    //     setState({ ...state, [object.name]: object.value })
    // }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setState({ ...state, [event.target.name]: typeof value !== 'boolean' ? value.toUpperCase() : value })
    }
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }
    const handleInputChangeSubSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
        await retrieve(event.target.name, 0, size, 'id', event.target.value).then((data: any) => {
            setState({ ...state, [event.target.name]: data?.content[0] })
        }).catch(() => { networkError() })
    }
    const handleInputChangeSubSelectArray = async (event: ChangeEvent<HTMLSelectElement>) => {
        await retrieve(event.target.name, 0, size, 'id', event.target.value).then((data: any) => {
            setState({ ...state, [event.target.name]: [data?.content[0]] })
        }).catch(() => { networkError() })
    }
    const handlePage = (page: number) => {
        setPage(page)
    }
    const handleSize = (event: ChangeEvent<HTMLSelectElement>) => {
        setSize(Number(event.target.value))
    }
    const handleModal = () => {
        setTab(0)
        setModal(!modal)
        setError([initialErrorMessage])
    }
    const handleNext = () => {
        if (tab < 4) { changeTab(tab + 1) }
    }
    const handleConfirm = (action: string) => {
        setConfirm({ ...confirm, show: !confirm.show, action: action })
        handleModal()
    }
    const handleConfirmYes = () => {
        switch (confirm.action) {
            case 'create': createItem(); break
            case 'retrieve': retrieveItem(); break
            case 'update': updateItem(); break
            case 'delete': deleteItem(); break
        }
    }
    const newItem = () => {
        setModal(!modal)
        resetItem()
        loadSubStates()
    }
    const removeTimeFromDate = (date: any) => {
        let aux = new Date(date)
        return new Date(aux.getFullYear(), aux.getMonth() + 1, aux.getDate()).toLocaleDateString('fr-CA');
    }
    const showObject = (values: any): any => {
        return (
            Object.entries(values).map(([key, value]: any, index) => {
                if (key !== 'id' && key !== 'password' && index <= 7 && key !== 'role') {
                    return (<td key={Math.random()}>
                        {Array.isArray(value) ?
                            <>
                                {value.map((key) => {
                                    return (
                                        typeof value === 'object' ?
                                            <>{showObject(key)}</>
                                            :
                                            <>{value}</>
                                    )
                                })}
                            </> :
                            typeof value === 'object' ?
                                <>{value === null ? '' : value?.name ? value.name : value.id}</>
                                :
                                <>{typeof value === 'boolean' ? JSON.stringify(value) : value}</>
                        }
                    </td>)
                }
            }))
    }
    // const shine = (event: React.MouseEvent<HTMLButtonElement>):void => {
    //     const button = document.querySelector(".shiny") as HTMLInputElement | null
    //     button?.style.setProperty("--x", event.clientX - button?.getBoundingClientRect().x)
    //     button?.style.setProperty("--y", event.clientY - button?.getBoundingClientRect().y)
    // }
    const compositeOrNot = (): boolean => {
        let id: boolean = false
        if (composite.hasOwnProperty('name') && composite?.name !== '' &&
            composite.hasOwnProperty('number') && composite?.number !== 0) {
            id = true
        }
        if (composite.hasOwnProperty('ii') && composite?.ii !== '' &&
            composite.hasOwnProperty('iii') && composite?.iii !== '') {
            id = true
        }
        if (composite.hasOwnProperty('ddddddd') && composite?.ddddddd !== '') {
            id = true
        }
        if (state.hasOwnProperty('id') && state?.id !== '') {
            id = true
        }
        if (object.url.includes('istoric')) {
            id = true
        }
        return id
    }
    const onClickModal = (evt: React.MouseEvent) => {
        if ((evt.target as HTMLElement).className.includes('modal-div')) {
            setModal(false);
        }
    }
    const onConfirmModal = (evt: React.MouseEvent) => {
        if ((evt.target as HTMLElement).className.includes('modal-confirm')) {
            setConfirm({ ...confirm, show: false });
        }
    }
    return (
        <>
            {/* <ShineButton onMouseMove={shine} className='shiny'>Shine Button</ShineButton> */}
            {isValidToken() &&
                <>
                    <Modal confirm={true} show={confirm.show} className='modal-confirm' onClick={(evt) => {
                        onConfirmModal(evt)
                    }}>
                        <article>
                            <header><span onClick={() => handleConfirm('')}>&times;</span><h2>{UriScreenFormat('Confirm')}</h2></header>
                            <footer>
                                <Button category={'danger'} onClick={handleConfirmYes} >{UriScreenFormat(confirm.action)}</Button>
                                <Button category={'secondary'} onClick={() => handleConfirm('')} type='reset' >Reset</Button>
                            </footer>
                        </article>
                    </Modal>
                    <Modal weather={true} show={modal} className='modal-div' onClick={(evt) => {
                        onClickModal(evt)
                    }}>
                        <article>
                            <header><span onClick={handleModal}>&times;</span><h2>{UriScreenFormat(object.url)}</h2></header>
                            <center>
                                <div className='tabs'>
                                    <button className={tab === 0 ? 'show' : 'inative'} onClick={() => changeTab(0)}>Seção 0</button>
                                    <button className={tab === 1 ? 'show' : 'inative'} onClick={() => changeTab(1)}>Seção 1</button>
                                    <button className={tab === 2 ? 'show' : 'inative'} onClick={() => changeTab(2)}>Seção 2</button>
                                    <button className={tab === 3 ? 'show' : 'inative'} onClick={() => changeTab(3)}>Seção 3</button>
                                    <button className={tab === 4 ? 'show' : 'inative'} onClick={() => changeTab(4)}>Seção 5</button>
                                </div>
                                <Container align={'line'} style={{ flex: '1', overflow: 'auto' }}>
                                    <div className={tab === 0 ? 'tab' : 'hide'}>
                                        <ContainerInput2 error={validation('observer').length !== 0 ? true : false} historic={true}>
                                            <select key={'observer'} name={'observer'} onChange={handleInputChangeSubSelect}
                                                value={state.observer}>
                                                <option selected value={state.observer === undefined || state.observer === null || state.observer[0] === null ? null : state.observer}>{state.observer === undefined || state.observer === null ? null : state.observer.name !== undefined ? state.observer?.name : state.observer?.id}</option>
                                                {subStates[Object.keys(state).indexOf('observer')]?.map(((result: any) => <option key={Math.random()} value={result.id}>{result?.name ? result.name : result.id}</option>))}
                                            </select>
                                            <label className='label' htmlFor={'observer'} >observer</label>
                                            <label htmlFor={'observer'}>{validation('observer')}</label>
                                        </ContainerInput2>
                                        <ContainerInput2 error={validation('station').length !== 0 ? true : false} historic={true}>
                                            <select key={'station'} name={'station'} onChange={handleInputChangeSubSelect}
                                                value={state.station}>
                                                <option selected value={state.station === undefined || state.station === null || state.station[0] === null ? null : state.station}>{state.station === undefined || state.station === null ? null : state.station.name !== undefined ? state.station?.name : state.station?.id}</option>
                                                {subStates[Object.keys(state).indexOf('station')]?.map(((result: any) => <option key={Math.random()} value={result.id}>{result?.name ? result.name : result.id}</option>))}
                                            </select>
                                            <label className='label' htmlFor={'station'} >station</label>
                                            <label htmlFor={'station'}>{validation('station')}</label>
                                        </ContainerInput2>
                                        <ContainerInput2 error={validation('miMi').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <select key={'miMi'} name={"miMi"} required onChange={handleSelectChange}
                                                    value={state.miMi} >
                                                    <option selected value={'AA'}>AA</option>
                                                    <option value={'BB'}>BB</option>
                                                </select>
                                                <label htmlFor={"miMi"} >{"miMi"}</label>
                                                <label htmlFor={"miMi"}>{validation("miMi")}</label>
                                            </span>
                                        </ContainerInput2>
                                        {/* <ContainerInput2 error={validation('mjMj').length !== 0 ? true : false} historic={true}>
                                                                <span>
                                                                <input type="text" name={"mjMj"} required value={state.mjMj} placeholder='XX' readOnly= {true} onChange={handleInputChange}/>
                                                                <label htmlFor={"mjMj"}>{"mjMj"}</label>
                                                                <label htmlFor={"mjMj"}>{validation("mjMj")}</label>
                                                                </span>
                                                            </ContainerInput2> */}

                                        <ContainerInput2 error={validation('ddddddd').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input disabled={state.miMi === 'AA' ? true : false}
                                                    type="text" name={"ddddddd"} value={state.ddddddd} onChange={handleInputChange} />

                                                <label htmlFor={"ddddddd"}>{"ddddddd"}</label>
                                                <label htmlFor={"ddddddd"}>{validation("ddddddd")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <InputGroup>
                                           
                                                <input disabled={state.miMi === 'BB' ? true : false}
                                                    type="text" name={"ii"} value={state.ii} onChange={handleInputChange} />
                                                <input disabled={state.miMi === 'BB' ? true : false} type="text" name={"iii"} value={state.iii} onChange={handleInputChange} /> 
                                                
                                        </InputGroup>

                                        {/* <ContainerInput2 error={validation('nbNbNb').length !== 0 ? true : false} historic={true}>
                                                                <span>
                                                                <input type="text" name={"nbNbNb"} value={state.nbNbNb} onChange={handleInputChange}/>
                                                                <label htmlFor={"nbNbNb"}>{"nbNbNb"}</label>
                                                                <label htmlFor={"nbNbNb"}>{validation("nbNbNb")}</label>
                                                                </span>
                                                            </ContainerInput2> */}
                                        <InputGroup>
                                            <input className="child label" value="SS" type="submit" tabIndex={-1}/>
                                            <input type="text" name={"yy"} required value={state.yy} onChange={handleInputChange} />
                                            <input type="text" name={"gg"} required value={state.gg} onChange={handleInputChange} />
                                            <input type="text" name={"iw"} required value={state.iw} onChange={handleInputChange} />
                                        </InputGroup>

                                        <InputGroup>
                                                <input className="child label" value="99" type="submit" tabIndex={-1}/>
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"laLaLa"} value={state.laLaLa} onChange={handleInputChange} />
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"qc"} value={state.qc} onChange={handleInputChange} />
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"loLoLoLo"} value={state.loLoLoLo} onChange={handleInputChange} />
                                        </InputGroup>

                                        
                                    </div>
                                    {/*begining of section 1*/}
                                    <div className={tab === 1 ? 'tab' : 'hide'}>
                                        <InputGroup>
                                         
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"ir"} value={state.ir} onChange={handleInputChange} />
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"ix"} value={state.ix} onChange={handleInputChange} />
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"h"} value={state.h} onChange={handleInputChange} />
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"vv"} value={state.vv} onChange={handleInputChange} />

                                        </InputGroup>

                                        <InputGroup>
                                            
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"n"} value={state.n} onChange={handleInputChange} />
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"dd"} value={state.dd} onChange={handleInputChange} />
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"ff"} value={state.ff} onChange={handleInputChange} />
                                           
                                        </InputGroup>

                                        <InputGroup>
                                            
                                                <input className="child label" value="00" type="submit" tabIndex={-1}/>
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"fff"} value={state.fff} onChange={handleInputChange} />
                                                
                                        </InputGroup>

                                        <InputGroup>
                                                
                                                <input className="child label" value="1" type="submit" tabIndex={-1}/>
                                                <input type="text" name={"sn1_1"} value={state.sn1_1} onChange={handleInputChange} />
                                                <input type="text" name={"ttt"} value={state.ttt} onChange={handleInputChange} />

                                        </InputGroup>                                

                                        <InputGroup>
                                            
                                            <input className="child label" value="2" type="submit" tabIndex={-1}/>
                                            <input type="text" name={"sn2_1"} value={state.sn2_1} onChange={handleInputChange} />
                                            <input type="text" name={"tdTdTd"} value={state.tdTdTd} onChange={handleInputChange} />   

                                        </InputGroup>

                                        <InputGroup error={validation('poPoPoPo').length !== 0 ? true : false} >
                                            
                                                <input className="child label" value="3" type="submit" tabIndex={-1}/>
                                                <input type="text" name={"poPoPoPo"} value={state.poPoPoPo} onChange={handleInputChange} />
                                                
                                        </InputGroup>

                                        <InputGroup error={validation('pppp').length !== 0 ? true : false}>
                                            
                                                <input className="child label" value="4" type="submit" tabIndex={-1}/>
                                                <input type="text" name={"pppp"} value={state.pppp} onChange={handleInputChange} />
                                               
                                        </InputGroup>

                                        {/* <ContainerInput2 error={validation('a3').length !== 0 ? true : false} historic={true}>
                                                                <span>
                                                                <input type="text" name={"a3"} value={state.a3} onChange={handleInputChange}/>
                                                                <label htmlFor={"a3"}>{"a3"}</label>
                                                                <label htmlFor={"a3"}>{validation("a3")}</label>
                                                                </span>
                                                            </ContainerInput2> */}

                                        {/* <ContainerInput2 error={validation('hhh').length !== 0 ? true : false} historic={true}>
                                                                <span>
                                                                <input disabled={state.miMi === 'AA'? true : false} type="text" name={"hhh"} value={state.hhh} onChange={handleInputChange}/>
                                                                <label htmlFor={"hhh"}>{"hhh"}</label>
                                                                <label htmlFor={"hhh"}>{validation("hhh")}</label>
                                                                </span>
                                                            </ContainerInput2> */}

                                        <InputGroup error={validation('a').length !== 0 ? true : false}>
                                            
                                                <input className="child label" value="5" type="submit" tabIndex={-1}/>
                                                <input type="text" name={"a"} value={state.a} onChange={handleInputChange} />
                                                <input type="text" name={"ppp"} value={state.ppp} onChange={handleInputChange} />

                                        </InputGroup>

                                        <ContainerInput2 error={validation('ppp').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"ppp"} value={state.ppp} onChange={handleInputChange} />
                                                <label htmlFor={"ppp"}>{"ppp"}</label>
                                                <label htmlFor={"ppp"}>{validation("ppp")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('rrr').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"rrr"} value={state.rrr} onChange={handleInputChange} />
                                                <label htmlFor={"rrr"}>{"rrr"}</label>
                                                <label htmlFor={"rrr"}>{validation("rrr")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('tr').length !== 0 ? true : false} historic={true}>
                                                                <span>
                                                                <input type="text" name={"tr"} value={state.tr} onChange={handleInputChange}/>
                                                                <label htmlFor={"tr"}>{"tr"}</label>
                                                                <label htmlFor={"tr"}>{validation("tr")}</label>
                                                                </span>
                                                            </ContainerInput2>

                                        <ContainerInput2 error={validation('ww').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"ww"} value={state.ww} onChange={handleInputChange} />
                                                <label htmlFor={"ww"}>{"ww"}</label>
                                                <label htmlFor={"ww"}>{validation("ww")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('w1W2').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"w1W2"} value={state.w1W2} onChange={handleInputChange} />
                                                <label htmlFor={"w1W2"}>{"w1W2"}</label>
                                                <label htmlFor={"w1W2"}>{validation("w1W2")}</label>
                                            </span>
                                        </ContainerInput2>

                                        {/* <ContainerInput2 error={validation('waWa').length !== 0 ? true : false} historic={true}>
                                                                <span>
                                                                <input type="text" name={"waWa"} value={state.waWa} onChange={handleInputChange}/>
                                                                <label htmlFor={"waWa"}>{"waWa"}</label>
                                                                <label htmlFor={"waWa"}>{validation("waWa")}</label>
                                                                </span>
                                                            </ContainerInput2>

                                                            <ContainerInput2 error={validation('wa1').length !== 0 ? true : false} historic={true}>
                                                                <span>
                                                                <input type="text" name={"wa1"} value={state.wa1} onChange={handleInputChange}/>
                                                                <label htmlFor={"wa1"}>{"wa1"}</label>
                                                                <label htmlFor={"wa1"}>{validation("wa1")}</label>
                                                                </span>
                                                            </ContainerInput2>

                                                            <ContainerInput2 error={validation('wa2').length !== 0 ? true : false} historic={true}>
                                                                <span>
                                                                <input type="text" name={"wa2"} value={state.wa2} onChange={handleInputChange}/>
                                                                <label htmlFor={"wa2"}>{"wa2"}</label>
                                                                <label htmlFor={"wa2"}>{validation("wa2")}</label>
                                                                </span>
                                                            </ContainerInput2> */}

                                        <ContainerInput2 error={validation('nh').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"nh"} value={state.nh} onChange={handleInputChange} />
                                                <label htmlFor={"nh"}>{"nh"}</label>
                                                <label htmlFor={"nh"}>{validation("nh")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('cl').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"cl"} value={state.cl} onChange={handleInputChange} />
                                                <label htmlFor={"cl"}>{"cl"}</label>
                                                <label htmlFor={"cl"}>{validation("cl")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('cm').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"cm"} value={state.cm} onChange={handleInputChange} />
                                                <label htmlFor={"cm"}>{"cm"}</label>
                                                <label htmlFor={"cm"}>{validation("cm")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('ch').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"ch"} value={state.ch} onChange={handleInputChange} />
                                                <label htmlFor={"ch"}>{"ch"}</label>
                                                <label htmlFor={"ch"}>{validation("ch")}</label>
                                            </span>
                                        </ContainerInput2>

                                        {/* <ContainerInput2 error={validation('gggg').length !== 0 ? true : false} historic={true}>
                                                                <span>
                                                                <input disabled={state.miMi === 'AA'? true : false} type="text" name={"gggg"} value={state.gggg} onChange={handleInputChange}/>
                                                                <label htmlFor={"gggg"}>{"gggg"}</label>
                                                                <label htmlFor={"gggg"}>{validation("gggg")}</label>
                                                                </span>
                                                            </ContainerInput2> */}
                                    </div>
                                    {/* begining of section 2 */}
                                    <div className={tab === 2 ? 'tab' : 'hide'}>
                                        <ContainerInput2 error={validation('ds').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"ds"} value={state.ds} onChange={handleInputChange} />
                                                <label htmlFor={"ds"}>{"ds"}</label>
                                                <label htmlFor={"ds"}>{validation("ds")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('vs').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"vs"} value={state.vs} onChange={handleInputChange} />
                                                <label htmlFor={"vs"}>{"vs"}</label>
                                                <label htmlFor={"vs"}>{validation("vs")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('ss').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"ss"} value={state.ss} onChange={handleInputChange} />
                                                <label htmlFor={"ss"}>{"ss"}</label>
                                                <label htmlFor={"ss"}>{validation("ss")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('twTwTw').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"twTwTw"} value={state.twTwTw} onChange={handleInputChange} />
                                                <label htmlFor={"twTwTw"}>{"twTwTw"}</label>
                                                <label htmlFor={"twTwTw"}>{validation("twTwTw")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('pwaPwa').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"pwaPwa"} value={state.pwaPwa} onChange={handleInputChange} />
                                                <label htmlFor={"pwaPwa"}>{"pwaPwa"}</label>
                                                <label htmlFor={"pwaPwa"}>{validation("pwaPwa")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('hwaHwa').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"hwaHwa"} value={state.hwaHwa} onChange={handleInputChange} />
                                                <label htmlFor={"hwaHwa"}>{"hwaHwa"}</label>
                                                <label htmlFor={"hwaHwa"}>{validation("hwaHwa")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('pwPw').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"pwPw"} value={state.pwPw} onChange={handleInputChange} />
                                                <label htmlFor={"pwPw"}>{"pwPw"}</label>
                                                <label htmlFor={"pwPw"}>{validation("pwPw")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('hwHw').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"hwHw"} value={state.hwHw} onChange={handleInputChange} />
                                                <label htmlFor={"hwHw"}>{"hwHw"}</label>
                                                <label htmlFor={"hwHw"}>{validation("hwHw")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('dw1Dw1').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"dw1Dw1"} value={state.dw1Dw1} onChange={handleInputChange} />
                                                <label htmlFor={"dw1Dw1"}>{"dw1Dw1"}</label>
                                                <label htmlFor={"dw1Dw1"}>{validation("dw1Dw1")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('dw2Dw2').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"dw2Dw2"} value={state.dw2Dw2} onChange={handleInputChange} />
                                                <label htmlFor={"dw2Dw2"}>{"dw2Dw2"}</label>
                                                <label htmlFor={"dw2Dw2"}>{validation("dw2Dw2")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('pw1Pw1').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"pw1Pw1"} value={state.pw1Pw1} onChange={handleInputChange} />
                                                <label htmlFor={"pw1Pw1"}>{"pw1Pw1"}</label>
                                                <label htmlFor={"pw1Pw1"}>{validation("pw1Pw1")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('hw1Hw1').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"hw1Hw1"} value={state.hw1Hw1} onChange={handleInputChange} />
                                                <label htmlFor={"hw1Hw1"}>{"hw1Hw1"}</label>
                                                <label htmlFor={"hw1Hw1"}>{validation("hw1Hw1")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('pw2Pw2').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"pw2Pw2"} value={state.pw2Pw2} onChange={handleInputChange} />
                                                <label htmlFor={"pw2Pw2"}>{"pw2Pw2"}</label>
                                                <label htmlFor={"pw2Pw2"}>{validation("pw2Pw2")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('hw2Hw2').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"hw2Hw2"} value={state.hw2Hw2} onChange={handleInputChange} />
                                                <label htmlFor={"hw2Hw2"}>{"hw2Hw2"}</label>
                                                <label htmlFor={"hw2Hw2"}>{validation("hw2Hw2")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('hwaHwaHwa').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"hwaHwaHwa"} value={state.hwaHwaHwa} onChange={handleInputChange} />
                                                <label htmlFor={"hwaHwaHwa"}>{"hwaHwaHwa"}</label>
                                                <label htmlFor={"hwaHwaHwa"}>{validation("hwaHwaHwa")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('sw').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"sw"} value={state.sw} onChange={handleInputChange} />
                                                <label htmlFor={"sw"}>{"sw"}</label>
                                                <label htmlFor={"sw"}>{validation("sw")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('tbTbTb').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"tbTbTb"} value={state.tbTbTb} onChange={handleInputChange} />
                                                <label htmlFor={"tbTbTb"}>{"tbTbTb"}</label>
                                                <label htmlFor={"tbTbTb"}>{validation("tbTbTb")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('is_ice').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"is_ice"} value={state.is_ice} onChange={handleInputChange} />
                                                <label htmlFor={"is_ice"}>{"is_ice"}</label>
                                                <label htmlFor={"is_ice"}>{validation("is_ice")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('ci').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"ci"} value={state.ci} onChange={handleInputChange} />
                                                <label htmlFor={"ci"}>{"ci"}</label>
                                                <label htmlFor={"ci"}>{validation("ci")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('si').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"si"} value={state.si} onChange={handleInputChange} />
                                                <label htmlFor={"si"}>{"si"}</label>
                                                <label htmlFor={"si"}>{validation("si")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('bi').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"bi"} value={state.bi} onChange={handleInputChange} />
                                                <label htmlFor={"bi"}>{"bi"}</label>
                                                <label htmlFor={"bi"}>{validation("bi")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('di').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"di"} value={state.di} onChange={handleInputChange} />
                                                <label htmlFor={"di"}>{"di"}</label>
                                                <label htmlFor={"di"}>{validation("di")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('zi').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"zi"} value={state.zi} onChange={handleInputChange} />
                                                <label htmlFor={"zi"}>{"zi"}</label>
                                                <label htmlFor={"zi"}>{validation("zi")}</label>
                                            </span>
                                        </ContainerInput2>
                                        {/* 
                                                            <ContainerInput2 error={validation('eses').length !== 0 ? true : false} historic={true}>
                                                                <span>
                                                                <input type="text" name={"eses"} value={state.eses} onChange={handleInputChange}/>
                                                                <label htmlFor={"eses"}>{"eses"}</label>
                                                                <label htmlFor={"eses"}>{validation("eses")}</label>
                                                                </span>
                                                            </ContainerInput2> */}

                                        {/* <ContainerInput2 error={validation('rs').length !== 0 ? true : false} historic={true}>
                                                                <span>
                                                                <input type="text" name={"rs"} value={state.rs} onChange={handleInputChange}/>
                                                                <label htmlFor={"rs"}>{"rs"}</label>
                                                                <label htmlFor={"rs"}>{validation("rs")}</label>
                                                                </span>
                                                            </ContainerInput2> */}
                                    </div>
                                    {/*begining of section 3*/}
                                    <div className={tab === 3 ? 'tab' : 'hide'}>
                                        <ContainerInput2 error={validation('sn1_3').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"sn1_3"} value={state.sn1_3} onChange={handleInputChange} />
                                                <label htmlFor={"sn1_3"}>{"sn"}</label>
                                                <label htmlFor={"sn1_3"}>{validation("sn1_3")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('txTxTx').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"txTxTx"} value={state.txTxTx} onChange={handleInputChange} />
                                                <label htmlFor={"txTxTx"}>{"txTxTx"}</label>
                                                <label htmlFor={"txTxTx"}>{validation("txTxTx")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('sn2_3').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"sn2_3"} value={state.sn2_3} onChange={handleInputChange} />
                                                <label htmlFor={"sn2_3"}>{"sn"}</label>
                                                <label htmlFor={"sn2_3"}>{validation("sn2_3")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('tnTnTn').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"tnTnTn"} value={state.tnTnTn} onChange={handleInputChange} />
                                                <label htmlFor={"tnTnTn"}>{"tnTnTn"}</label>
                                                <label htmlFor={"tnTnTn"}>{validation("tnTnTn")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('ind89').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"ind89"} value={state.ind89} onChange={handleInputChange} />
                                                <label htmlFor={"ind89"}>{"ind89"}</label>
                                                <label htmlFor={"ind89"}>{validation("ind89")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('p24P24P24').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input type="text" name={"p24P24P24"} value={state.p24P24P24} onChange={handleInputChange} />
                                                <label htmlFor={"p24P24P24"}>{"p24P24P24"}</label>
                                                <label htmlFor={"p24P24P24"}>{validation("p24P24P24")}</label>
                                            </span>
                                        </ContainerInput2>
                                    </div>
                                    {/*begning of section 5*/}
                                    <div className={tab === 4 ? 'tab' : 'hide'}>
                                        <ContainerInput2 error={validation('iChw').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"iChw"} value={state.iChw} onChange={handleInputChange} />
                                                <label htmlFor={"iChw"}>{"iChw"}</label>
                                                <label htmlFor={"iChw"}>{validation("iChw")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('iCm').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"iCm"} value={state.iCm} onChange={handleInputChange} />
                                                <label htmlFor={"iCm"}>{"iCm"}</label>
                                                <label htmlFor={"iCm"}>{validation("iCm")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('cs').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"cs"} value={state.cs} onChange={handleInputChange} />
                                                <label htmlFor={"cs"}>{"cs"}</label>
                                                <label htmlFor={"cs"}>{validation("cs")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('iCf').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"iCf"} value={state.iCf} onChange={handleInputChange} />
                                                <label htmlFor={"iCf"}>{"iCf"}</label>
                                                <label htmlFor={"iCf"}>{validation("iCf")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('iCp').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"iCp"} value={state.iCp} onChange={handleInputChange} />
                                                <label htmlFor={"iCp"}>{"iCp"}</label>
                                                <label htmlFor={"iCp"}>{validation("iCp")}</label>
                                            </span>
                                        </ContainerInput2>

                                        <ContainerInput2 error={validation('iCq').length !== 0 ? true : false} historic={true}>
                                            <span>
                                                <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"iCq"} value={state.iCq} onChange={handleInputChange} />
                                                <label htmlFor={"iCq"}>{"iCq"}</label>
                                                <label htmlFor={"iCq"}>{validation("iCq")}</label>
                                            </span>
                                        </ContainerInput2>
                                    </div>

                                </Container>
                                <Container align={'response'}>
                                    <div>{validationDTO()}</div>
                                </Container>
                            </center>
                            <footer>
                                {/* {modal &&
                                    <PDFDownloadLink document={<PDFDocument object={state} />} fileName="somename.pdf">
                                        {({ loading }) => loading ? <Button disabled={true} category={'secondary'} >Wait</Button> : <Button category={'secondary'} >Download</Button>}
                                    </PDFDownloadLink>}
                                <Button category={'primary'} onClick={resetItem} type='reset' >Reset</Button> */}
                                <Button category={'primary'} onClick={() => handleNext()} hidden={tab === 4}>Next</Button>
                                <Button category={'primary'} onClick={() => handleConfirm('create')} hidden={compositeOrNot() || tab !== 4}>Create</Button>
                                <Button category={'warning'} onClick={() => handleConfirm('update')} hidden={!compositeOrNot()}>Update</Button>
                                <Button category={'danger'} onClick={() => handleConfirm('delete')} hidden={!compositeOrNot()}>Delete</Button>
                                <Button category={'secondary'} onClick={handleModal}>Close</Button>
                            </footer>                                
                        </article>
                    </Modal>
                    <Header>
                        <span>
                            {!object.url.includes('istoric') && <Button category={'primary'} onClick={newItem}>New</Button>}
                            <TitleHeader>
                                <h1>{UriScreenFormat(object.url)}</h1>
                            </TitleHeader>
                            <WeatherUpload></WeatherUpload>
                        </span>
                        <a href={`#/${'profile'}`}><Button category={'secondary'}>{getPayload().sub}</Button></a>
                    </Header>
                    {/* {ispending && <Load></Load>} */}
                    <Table>
                        <thead>
                            <tr>
                                <th colSpan={9}>
                                    <div className='header'>
                                        <div>
                                            <span>show</span>
                                            <select onChange={handleSize} >
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                            </select>
                                        </div>
                                        <div>
                                            <span>search {key}</span>
                                            <input name={search} onChange={searchItem} placeholder={`${key}`} value={search}></input>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                {Object.entries(state).map(([key]: any, index) => {
                                    if (key !== 'id' && key !== 'password' && index < 7 && key !== 'role') {
                                        return (<th key={Math.random()} onClick={() => searchKey(key)}>{key}</th>)
                                    }
                                })}
                            </tr>
                        </thead>
                        <ErrorBoundary fallback={<div> Something went wrong </div>} >
                            <tbody>
                                {states && states.map((element) => {
                                    return (
                                        <tr key={Math.random()} onClick={() => selectItem(element)}>
                                            <>{showObject(element)}</>
                                        </tr>)
                                })}
                            </tbody>
                        </ErrorBoundary>
                        <tfoot>
                            <tr>
                                <th>
                                    <GroupButton>
                                        <ButtonPage onClick={() => handlePage(0)}>{'<<'}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(page - 1)} disabled={page <= 0 ? true : false}>{'<'}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(page - 1)} hidden={page <= 0 ? true : false}>{page}</ButtonPage>
                                        <ButtonPage selected={true} disabled  >{page + 1}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(page + 1)} hidden={page >= pageable.totalPages - 1 ? true : false}>{page + 2}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(page + 1)} disabled={page >= pageable.totalPages - 2 ? true : false}>{'>'}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(pageable.totalPages - 1)}>{'>>'}</ButtonPage>
                                    </GroupButton>
                                </th>
                            </tr>
                            <tr><th>Total amount {pageable.totalElements}</th></tr>
                        </tfoot>
                    </Table>
                    <Toast className="notifications"></Toast>
                </>
            }
        </>
    )
}