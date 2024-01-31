import { useState, ChangeEvent, useEffect, useTransition } from 'react'
import { getPayload, isValidToken } from '../../service/service.token'
import { ErrorMessage } from '../../assets/error/errorMessage'
import { initialErrorMessage } from '../../assets/error/errorMessage.initial'
import { create, update, remove, retrieve, removeComposite } from '../../service/service.crud'
import { Container, ContainerInput2 } from './generic.field'
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
import './inputgroup.css'
import './tooltip.css'

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
                if (key === 'dateObservation' || key === 'observer' || key === 'ddddddd' || key === 'ii' || key === 'iii' || key === 'yy' || key === 'miMi') {
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
    const copyContent = async () => {
        let text = document.getElementById('myText')!.innerHTML;
        try {
          await navigator.clipboard.writeText(text);
          console.log('Content copied to clipboard');
        } catch (err) {
          console.error('Failed to copy: ', err);
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
                            <header><span onClick={handleModal}>&times;</span><h2>Observação</h2></header>
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
                                        <span className={'inputgroup tooltip'} data-tip={validation('observer')}>
                                            <select key={'observer'} name={'observer'} onChange={handleInputChangeSubSelect}
                                                value={state.observer}>
                                                <option selected value={state.observer === undefined || state.observer === null || state.observer[0] === null ? null : state.observer}>{state.observer === undefined || state.observer === null ? null : state.observer.name !== undefined ? state.observer?.name : state.observer?.id}</option>
                                                {subStates[Object.keys(state).indexOf('observer')]?.map(((result: any) => <option key={Math.random()} value={result.id}>{result?.name ? result.name : result.id}</option>))}
                                            </select>
                                            <label htmlFor={'observer'} >{"observer"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('station')}>
                                            <select key={'station'} name={'station'} onChange={handleInputChangeSubSelect}
                                                value={state.station}>
                                                <option selected value={state.station === undefined || state.station === null || state.station[0] === null ? null : state.station}>{state.station === undefined || state.station === null ? null : state.station.name !== undefined ? state.station?.name : state.station?.id}</option>
                                                {subStates[Object.keys(state).indexOf('station')]?.map(((result: any) => <option key={Math.random()} value={result.id}>{result?.name ? result.name : result.id}</option>))}
                                            </select>
                                            <label htmlFor={'station'} >{'station'}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={''}>
                                                <select key={'miMi'} name={"miMi"} required onChange={handleSelectChange}
                                                    value={state.miMi} >
                                                    <option selected value={'AA'}>AA</option>
                                                    <option value={'BB'}>BB</option>
                                                </select>
                                                <label htmlFor={"miMi"} >{"miMi"}</label>
                                        </span>
                                        {/* <ContainerInput2 data-tip={validation('mjMj')} historic={true}>
                                                                <span>
                                                                <input type="text" name={"mjMj"} required value={state.mjMj} placeholder='XX' readOnly= {true} onChange={handleInputChange}/>
                                                                <label htmlFor={"mjMj"}>{"mjMj"}</label>
                                                                <label htmlFor={"mjMj"}>{validation("mjMj")}</label>
                                                                </span>
                                                            </ContainerInput2> */}

                                        <span className={'inputgroup tooltip'} data-tip={validation('ddddddd')}>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"ddddddd"} value={state.ddddddd} onChange={handleInputChange} placeholder={'ddddddd'} />
                                            {/* <label htmlFor={"ddddddd"}>{"ddddddd"}</label> */}
                                            <label htmlFor={"ddddddd"}>{"ddddddd"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('ii')}>
                                            <input disabled={state.miMi === 'BB' ? true : false} type="text" name={"ii"} value={state.ii} onChange={handleInputChange} placeholder={'ii'} />
                                            <label htmlFor={"ii"}>{"ii"}</label>
                                            <input disabled={state.miMi === 'BB' ? true : false} type="text" name={"iii"} value={state.iii} onChange={handleInputChange} placeholder={'iii'} />
                                            <label htmlFor={"iii"}>{"iii"}</label>
                                        </span>

                                        {/* <ContainerInput2 data-tip={validation('nbNbNb')} historic={true}>
                                                                <span>
                                                                <input type="text" name={"nbNbNb"} value={state.nbNbNb} onChange={handleInputChange}/>
                                                                <label htmlFor={"nbNbNb"}>{"nbNbNb"}</label>
                                                                <label htmlFor={"nbNbNb"}>{validation("nbNbNb")}</label>
                                                                </span>
                                                            </ContainerInput2> */}
                                        <span className={'inputgroup tooltip'} data-tip={validation('yy').concat(validation('gg')).concat(validation('iw'))} >
                                            <input type="text" name={"yy"} required value={state.yy} onChange={handleInputChange} placeholder={'yy'} />
                                            <label htmlFor={"yy"}>{"yy"}</label>
                                            <input type="text" name={"gg"} required value={state.gg} onChange={handleInputChange} placeholder={'gg'} />
                                            <label htmlFor={"gg"}>{"gg"}</label>
                                            <input type="text" name={"iw"} required value={state.iw} onChange={handleInputChange} placeholder={'iw'} />
                                            <label htmlFor={"iw"}>{"iw"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('laLaLa')}>
                                            <input className="title" value="99" tabIndex={-1} />
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"laLaLa"} value={state.laLaLa} onChange={handleInputChange} placeholder={'laLaLa'} />
                                            <label htmlFor={"laLaLa"}>{"laLaLa"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('qc').concat(validation('loLoLoLo'))}>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"qc"} value={state.qc} onChange={handleInputChange} placeholder={'qc'} />
                                            <label htmlFor={"qc"}>{validation("qc")}</label>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"loLoLoLo"} value={state.loLoLoLo} onChange={handleInputChange} placeholder={'loLoLoLo'} />
                                            <label htmlFor={"loLoLoLo"}>{"loLoLoLo"}</label>
                                        </span>
                                    </div>
                                    {/*begining of section 1*/}
                                    <div className={tab === 1 ? 'tab' : 'hide'}>
                                        <span className={'inputgroup tooltip'} data-tip={validation('ir').concat(validation('ix')).concat(validation('h')).concat(validation('vv'))}>
                                            <input type="text" name={"ir"} value={state.ir} onChange={handleInputChange} placeholder={'ir'} />
                                            <label htmlFor={"ir"}>{"ir"}</label>
                                            <input type="text" name={"ix"} value={state.ix} onChange={handleInputChange} placeholder={'ix'} />
                                            <label htmlFor={"ix"}>{"ix"}</label>
                                            <input type="text" name={"h"} value={state.h} onChange={handleInputChange} placeholder={'h'} />
                                            <label htmlFor={"h"}>{"h"}</label>
                                            <input type="text" name={"vv"} value={state.vv} onChange={handleInputChange} placeholder={'vv'} />
                                            <label htmlFor={"vv"}>{"vv"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('n').concat(validation('dd')).concat(validation('ff'))}>
                                            <input type="text" name={"n"} value={state.n} onChange={handleInputChange} placeholder={'n'} />
                                            <label htmlFor={"n"}>{"n"}</label>
                                            <input type="text" name={"dd"} value={state.dd} onChange={handleInputChange} placeholder={'dd'} />
                                            <label htmlFor={"dd"}>{"dd"}</label>
                                            <input type="text" name={"ff"} value={state.ff} onChange={handleInputChange} placeholder={'ff'} />
                                            <label htmlFor={"ff"}>{"ff"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('fff')}>
                                            <input className="title" value="00" tabIndex={-1} />
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"fff"} value={state.fff} onChange={handleInputChange} placeholder={'fff'} />
                                            <label htmlFor={"fff"}>{validation("fff")}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('sn1_1').concat(validation('ttt'))}>
                                            <input className="title" value="1" tabIndex={-1} />
                                            <input type="text" name={"sn1_1"} value={state.sn1_1} onChange={handleInputChange} placeholder={'sn1_1'} />
                                            <label htmlFor={"sn1_1"}>{"sn1_1"}</label>
                                            <input type="text" name={"ttt"} value={state.ttt} onChange={handleInputChange} placeholder={'ttt'} />
                                            <label htmlFor={"ttt"}>{"ttt"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('sn2_1').concat(validation('tdTdTd'))}>
                                            <input className="title" value="2" tabIndex={-1} />
                                            <input type="text" name={"sn2_1"} value={state.sn2_1} onChange={handleInputChange} placeholder={'sn2_1'} />
                                            <label htmlFor={"sn2_1"}>{"sn2_1"}</label>
                                            <input type="text" name={"tdTdTd"} value={state.tdTdTd} onChange={handleInputChange} placeholder={'tdTdTd'} />
                                            <label htmlFor={"tdTdTd"}>{"tdTdTd"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('poPoPoPo')} >
                                            <input className="title" value="3" tabIndex={-1} />
                                            <input type="text" name={"poPoPoPo"} value={state.poPoPoPo} onChange={handleInputChange} placeholder={'poPoPoPo'} />
                                            <label htmlFor={"poPoPoPo"}>{"poPoPoPo"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('pppp')}>
                                            <input className="title" value="4" tabIndex={-1} />
                                            <input type="text" name={"pppp"} value={state.pppp} onChange={handleInputChange} placeholder={'pppp'} />
                                            <label htmlFor={"pppp"}>{"pppp"}</label>
                                        </span>

                                        {/* <ContainerInput2 data-tip={validation('a3')} historic={true}>
                                                                <span>
                                                                <input type="text" name={"a3"} value={state.a3} onChange={handleInputChange}/>
                                                                <label htmlFor={"a3"}>{"a3"}</label>
                                                                <label htmlFor={"a3"}>{validation("a3")}</label>
                                                                </span>
                                                            </ContainerInput2> */}

                                        {/* <ContainerInput2 data-tip={validation('hhh')} historic={true}>
                                                                <span>
                                                                <input disabled={state.miMi === 'AA'? true : false} type="text" name={"hhh"} value={state.hhh} onChange={handleInputChange}/>
                                                                <label htmlFor={"hhh"}>{"hhh"}</label>
                                                                <label htmlFor={"hhh"}>{validation("hhh")}</label>
                                                                </span>
                                                            </ContainerInput2> */}

                                        <span className={'inputgroup tooltip'}  data-tip={validation('a').concat(validation('ppp'))}>
                                            <input className="title" value="5" tabIndex={-1} />
                                            <input type="text" name={"a"} value={state.a} onChange={handleInputChange} placeholder={'a'} />
                                            <label htmlFor={"a"}>{"a"}</label>
                                            <input type="text" name={"ppp"} value={state.ppp} onChange={handleInputChange} placeholder={'ppp'} />
                                            <label htmlFor={"ppp"}>{validation("ppp")}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('rrr').concat(validation('tr'))}>
                                            <input className="title" value="6" tabIndex={-1} />
                                            <input type="text" name={"rrr"} value={state.rrr} onChange={handleInputChange} placeholder={'rrr'} />
                                            <label htmlFor={"rrr"}>{"rrr"}</label>
                                            <input type="text" name={"tr"} value={state.tr} onChange={handleInputChange} placeholder={'tr'} />
                                            <label htmlFor={"tr"}>{"tr"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('ww').concat(validation('w1w2'))}>
                                            <input className="title" value="7" tabIndex={-1} />
                                            <input type="text" name={"ww"} value={state.ww} onChange={handleInputChange} placeholder={'ww'} />
                                            <label htmlFor={"ww"}>{"ww"}</label>
                                            <input type="text" name={"w1W2"} value={state.w1W2} onChange={handleInputChange} placeholder={'w1W2'} />
                                            <label htmlFor={"w1W2"}>{"w1W2"}</label>
                                        </span>

                                        {/* <ContainerInput2 data-tip={validation('waWa')} historic={true}>
                                                                <span>
                                                                <input type="text" name={"waWa"} value={state.waWa} onChange={handleInputChange}/>
                                                                <label htmlFor={"waWa"}>{"waWa"}</label>
                                                                <label htmlFor={"waWa"}>{validation("waWa")}</label>
                                                                </span>
                                                            </ContainerInput2>

                                                            <ContainerInput2 data-tip={validation('wa1')} historic={true}>
                                                                <span>
                                                                <input type="text" name={"wa1"} value={state.wa1} onChange={handleInputChange}/>
                                                                <label htmlFor={"wa1"}>{"wa1"}</label>
                                                                <label htmlFor={"wa1"}>{validation("wa1")}</label>
                                                                </span>
                                                            </ContainerInput2>

                                                            <ContainerInput2 data-tip={validation('wa2')} historic={true}>
                                                                <span>
                                                                <input type="text" name={"wa2"} value={state.wa2} onChange={handleInputChange}/>
                                                                <label htmlFor={"wa2"}>{"wa2"}</label>
                                                                <label htmlFor={"wa2"}>{validation("wa2")}</label>
                                                                </span>
                                                            </ContainerInput2> */}

                                        <span className={'inputgroup tooltip'} data-tip={validation('nh').concat(validation('cl')).concat(validation('cm')).concat(validation('ch'))}>
                                            <input className="title" value="8" tabIndex={-1} />
                                            <input type="text" name={"nh"} value={state.nh} onChange={handleInputChange} placeholder={'nh'} />
                                            <label htmlFor={"nh"}>{validation("nh")}</label>
                                            <input type="text" name={"cl"} value={state.cl} onChange={handleInputChange} placeholder={'cl'} />
                                            <label htmlFor={"cl"}>{validation("cl")}</label>
                                            <input type="text" name={"cm"} value={state.cm} onChange={handleInputChange} placeholder={'cm'} />
                                            <label htmlFor={"cm"}>{validation("cm")}</label>
                                            <input type="text" name={"ch"} value={state.ch} onChange={handleInputChange} placeholder={'ch'} />
                                            <label htmlFor={"ch"}>{validation("ch")}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('gggg')}>
                                            <input className="title" value="9" tabIndex={-1} />
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"gggg"} value={state.gggg} onChange={handleInputChange} placeholder={'gggg'} />
                                            <label htmlFor={"gggg"}>{"gggg"}</label>
                                        </span>
                                    </div>
                                    {/* begining of section 2 */}
                                    <div className={tab === 2 ? 'tab' : 'hide'}>
                                        <span className={'inputgroup tooltip'} data-tip={validation('ds').concat(validation('vs'))}>
                                            <input className="title" value="222" tabIndex={-1} />
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"ds"} value={state.ds} onChange={handleInputChange} placeholder={'ds'} />
                                            <label htmlFor={"ds"}>{"ds"}</label>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"vs"} value={state.vs} onChange={handleInputChange} placeholder={'vs'} />
                                            <label htmlFor={"vs"}>{"vs"}</label>
                                            <span>{"vs"}</span>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('ss').concat(validation('twTwTw'))}>
                                            <input className="title" value="0" tabIndex={-1} />
                                            <input type="text" name={"ss"} value={state.ss} onChange={handleInputChange} placeholder={'ss'} />
                                            <label htmlFor={"ss"}>{"ss"}</label>
                                            <input type="text" name={"twTwTw"} value={state.twTwTw} onChange={handleInputChange} placeholder={'twTwTwTw'} />
                                            <label htmlFor={"twTwTw"}>{"twTwTw"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('pwaPwa').concat(validation('hwaHwa'))}>
                                            <input className="title" value="1" tabIndex={-1} />
                                            <input type="text" name={"pwaPwa"} value={state.pwaPwa} onChange={handleInputChange} placeholder={'pwaPwa'} />
                                            <label htmlFor={"pwaPwa"}>{"pwaPwa"}</label>
                                            <input type="text" name={"hwaHwa"} value={state.hwaHwa} onChange={handleInputChange} placeholder={'hwaHwa'} />
                                            <label htmlFor={"hwaHwa"}>{"hwaHwa"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('pwPw').concat(validation('hwHw'))}>
                                            <input className="title" value="2" tabIndex={-1} />
                                            <input type="text" name={"pwPw"} value={state.pwPw} onChange={handleInputChange} placeholder={'pwPw'} />
                                            <label htmlFor={"pwPw"}>{"pwPw"}</label>
                                            <input type="text" name={"hwHw"} value={state.hwHw} onChange={handleInputChange} placeholder={'hwHw'} />
                                            <label htmlFor={"hwHw"}>{"hwHw"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('dw1Dw1').concat(validation('dw2Dw2'))}>
                                            <input className="title" value="3" tabIndex={-1} />
                                            <input type="text" name={"dw1Dw1"} value={state.dw1Dw1} onChange={handleInputChange} placeholder={'dw1Dw1'} />
                                            <label htmlFor={"dw1Dw1"}>{"dw1Dw1"}</label>
                                            <input type="text" name={"dw2Dw2"} value={state.dw2Dw2} onChange={handleInputChange} placeholder={'dw2Dw2'} />
                                            <label htmlFor={"dw2Dw2"}>{"dw2Dw2"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('pw1Pw1').concat(validation('hw1Hw1'))}>
                                            <input className="title" value="4" tabIndex={-1} />
                                            <input type="text" name={"pw1Pw1"} value={state.pw1Pw1} onChange={handleInputChange} placeholder={'pw1Pw1'} />
                                            <label htmlFor={"pw1Pw1"}>{"pw1Pw1"}</label>
                                            <input type="text" name={"hw1Hw1"} value={state.hw1Hw1} onChange={handleInputChange} placeholder={'hw1hw1'} />
                                            <label htmlFor={"hw1Hw1"}>{"hw1Hw1"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('pw2Pw2').concat(validation('hw2Hw2'))}>
                                            <input className="title" value="5" tabIndex={-1} />
                                            <input type="text" name={"pw2Pw2"} value={state.pw2Pw2} onChange={handleInputChange} placeholder={'pw2Pw2'} />
                                            <label htmlFor={"pw2Pw2"}>{"pw2Pw2"}</label>
                                            <input type="text" name={"hw2Hw2"} value={state.hw2Hw2} onChange={handleInputChange} placeholder={'hw2Hw2'} />
                                            <label htmlFor={"hw2Hw2"}>{"hw2Hw2"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('ic_ice').concat(validation('eses')).concat(validation('rs'))}>
                                            <input className="title" value="6" tabIndex={-1} />
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"is_ice"} value={state.is_ice} onChange={handleInputChange} placeholder={'is_ice'} />
                                            <label htmlFor={"is_ice"}>{"is_ice"}</label>
                                            <input type="text" name={"eses"} value={state.eses} onChange={handleInputChange} placeholder={'eses'} />
                                            <label htmlFor={"eses"}>{"eses"}</label>
                                            <input type="text" name={"rs"} value={state.rs} onChange={handleInputChange} placeholder={'rs'} />
                                            <label htmlFor={"rs"}>{"rs"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('hwaHwaHwa')}>
                                            <input className="title" value="70" tabIndex={-1} />
                                            <input type="text" name={"hwaHwaHwa"} value={state.hwaHwaHwa} onChange={handleInputChange} placeholder={'hwaHwaHwa'} />
                                            <label htmlFor={"hwaHwaHwa"}>{"hwaHwaHwa"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('tbTbTb').concat(validation('sw'))}>
                                            <input className="title" value="8" tabIndex={-1} />
                                            <input type="text" name={"sw"} value={state.sw} onChange={handleInputChange} placeholder={'sw'} />
                                            <label htmlFor={"sw"}>{"sw"}</label>
                                            <input type="text" name={"tbTbTb"} value={state.tbTbTb} onChange={handleInputChange} placeholder={'tbTbTbTb'} />
                                            <label htmlFor={"tbTbTb"}>{"tbTbTb"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={''}>
                                            <input className="title" value="ICE" tabIndex={-1} />
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('ci').concat(validation('si')).concat(validation('bi')).concat(validation('di')).concat(validation('zi'))}>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"ci"} value={state.ci} onChange={handleInputChange} placeholder={'ci'} />
                                            <label htmlFor={"ci"}>{"ci"}</label>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"si"} value={state.si} onChange={handleInputChange} placeholder={'si'} />
                                            <label htmlFor={"si"}>{"si"}</label>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"bi"} value={state.bi} onChange={handleInputChange} placeholder={'bi'} />
                                            <label htmlFor={"bi"}>{"bi"}</label>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"di"} value={state.di} onChange={handleInputChange} placeholder={'di'} />
                                            <label htmlFor={"di"}>{validation("di")}</label>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"zi"} value={state.zi} onChange={handleInputChange} placeholder={'zi'} />
                                            <label htmlFor={"zi"}>{validation("zi")}</label>
                                        </span>

                                    </div>
                                    {/*begining of section 3*/}
                                    <div className={tab === 3 ? 'tab' : 'hide'}>
                                        <span className={'inputgroup tooltip'} data-tip={''}>
                                            <input className="title" value="333" tabIndex={-1} />
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('sn1_3').concat(validation('txTxTx'))}>
                                            <input className="title" value="1" tabIndex={-1} />
                                            <input type="text" name={"sn1_3"} value={state.sn1_3} onChange={handleInputChange} placeholder={'sn1_3'} />
                                            <label htmlFor={"sn1_3"}>{"sn1_3"}</label>
                                            <input type="text" name={"txTxTx"} value={state.txTxTx} onChange={handleInputChange} placeholder={'txTxTxTx'} />
                                            <label htmlFor={"txTxTx"}>{"txTxTx"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('sn2_3').concat(validation('tnTnTn'))}>
                                            <input className="title" value="2" tabIndex={-1} />
                                            <input type="text" name={"sn2_3"} value={state.sn2_3} onChange={handleInputChange} placeholder={'sn2_3'} />
                                            <label htmlFor={"sn2_3"}>{"sn2_3"}</label>
                                            <input type="text" name={"tnTnTn"} value={state.tnTnTn} onChange={handleInputChange} placeholder={'tnTnTn'} />
                                            <label htmlFor={"tnTnTn"}>{"tnTnTn"}</label>
                                        </span>

                                        <span className={'inputgroup tooltip'} data-tip={validation('ind89').concat(validation('p24P24P24'))}>
                                            <input className="title" value="5" tabIndex={-1} />
                                            <input type="text" name={"ind89"} value={state.ind89} onChange={handleInputChange} placeholder={'ind89'} />
                                            <label htmlFor={"ind89"}>{"ind89"}</label>
                                            <input type="text" name={"p24P24P24"} value={state.p24P24P24} onChange={handleInputChange} placeholder={'p24P24P24'} />
                                            <label htmlFor={"p24P24P24"}>{"p24P24P24"}</label>
                                        </span>
                                    </div>
                                    {/*begning of section 5*/}
                                    <div className={tab === 4 ? 'tab' : 'hide'}>
                                        <span className={'inputgroup tooltip'} data-tip={validation('iChw').concat(validation('iCm')).concat(validation('cs')).concat(validation('iCf')).concat(validation('iCp')).concat(validation('iCq'))}>
                                            <input className="title" value="555" tabIndex={-1} />
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"iChw"} value={state.iChw} onChange={handleInputChange} placeholder={'iChw'} />
                                            <label htmlFor={"iChw"}>{"iChw"}</label>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"iCm"} value={state.iCm} onChange={handleInputChange} placeholder={'iCm'} />
                                            <label htmlFor={"iCm"}>{"iCm"}</label>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"cs"} value={state.cs} onChange={handleInputChange} placeholder={'cs'} />
                                            <label htmlFor={"cs"}>{"cs"}</label>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"iCf"} value={state.iCf} onChange={handleInputChange} placeholder={'iCf'} />
                                            <label htmlFor={"iCf"}>{"iCf"}</label>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"iCp"} value={state.iCp} onChange={handleInputChange} placeholder={'iCp'} />
                                            <label htmlFor={"iCp"}>{"iCp"}</label>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"iCq"} value={state.iCq} onChange={handleInputChange} placeholder={'iCq'} />
                                            <label htmlFor={"iCq"}>{"iCq"}</label>
                                        </span>
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
                                <Button category={'primary'} onClick={() => handleNext()} hidden={tab === 4}>Próximo</Button>
                                <Button category={'primary'} onClick={() => handleConfirm('create')} hidden={compositeOrNot() || tab !== 4}>Criar</Button>
                                <Button category={'warning'} onClick={() => handleConfirm('update')} hidden={!compositeOrNot()}>Atualizar</Button>
                                <Button category={'danger'} onClick={() => handleConfirm('delete')} hidden={!compositeOrNot()}>Deletar</Button>
                                <Button category={'secondary'} onClick={handleModal}>Fechar</Button>
                            </footer>
                        </article>
                    </Modal>
                    <Header>
                        <span>
                            {!object.url.includes('istoric') && <Button category={'primary'} onClick={newItem}>Novo</Button>}
                            <TitleHeader>
                                <h1>Observação</h1>
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
                                            <span>mostrar</span>
                                            <select onChange={handleSize} >
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                            </select>
                                        </div>
                                        <div>
                                            <span>buscar por {key}</span>
                                            <input name={search} onChange={searchItem} placeholder={`${key}`} value={search}></input>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                {Object.entries(state).map(([key]: any, index) => {
                                    if (key === 'dateObservation' || key === 'observer' || key === 'ddddddd' || key === 'ii' || key === 'iii' || key === 'yy' || key === 'miMi' ) {
                                        return (<th key={Math.random()} onClick={() => searchKey(key)}>
                                            {key === 'observer' ? 'observador' : key === 'dateObservation' ? 'data' : key === 'miMi' ? 'tipo' : key }
                                        </th>)
                                    }
                                    // else { 
                                    //     return (<th key={Math.random()} onClick={() => searchKey(key)}>{any}</th>)
                                    // }
                                })}
                                {/* <th>EX</th> */}
                            </tr>
                        </thead>
                        <ErrorBoundary fallback={<div> Something went wrong </div>} >
                            <tbody>
                                {states && states.map((element) => {
                                    return (
                                        <tr key={Math.random()} onClick={() => selectItem(element)}>
                                            <>{showObject(element)}</>
                                            {/* <th><Button id={"myText"} onClick={copyContent} name='123'>"123123ddsfffffffffffffffffffffffffffffffff12"</Button></th> */}
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
                            <tr><th>Quantidade total {pageable.totalElements}</th></tr>
                        </tfoot>
                    </Table>
                    <Toast className="notifications"></Toast>
                </>
            }
        </>
    )
}