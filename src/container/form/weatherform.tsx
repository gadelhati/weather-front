import { useState, ChangeEvent, useEffect, useTransition } from 'react'
import { isValidToken } from '../../service/service.token'
import { ErrorMessage } from '../../assets/error/errorMessage'
import { initialErrorMessage } from '../../assets/error/errorMessage.initial'
import { create, update, remove, retrieve, removeComposite } from '../../service/service.crud'
import { Container, ContainerInput } from './generic.field'
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
import { WeatherUpload } from './weather.upload'
import { Header, TitleHeader } from '../template/header'
// import { Load } from '../template/load'
import { UriScreenFormat } from '../../service/uri.format'
// import { ShineButton } from './shine.button'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PDFDocument } from '../../component/pdf/PDFDocument'
import { Weather } from '../../component/weather/weather.interface'
import './style.css'

export const Weatherform = (weather: any) => {
    const [state, setState] = useState<any>(weather)
    const [states, setStates] = useState<Weather[]>([weather])
    const [subStates, setSubStates] = useState<object[][]>(SubAtributeSet(state))
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [atribute, setAtribute] = useState<Atribute[]>(AtributeSet(weather))
    const [page, setPage] = useState<number>(0)
    const [size, setSize] = useState<number>(8)
    const [pageable, setPageable] = useState<Pageable>(initialPageable)
    const [ispending, startTransition] = useTransition()
    const [modal, setModal] = useState<boolean>(false)
    const [key, setKey] = useState<string>('')
    const [search, setSearch] = useState<string>('')
    const [tab, setTab] = useState<number>(0)

    // let aabb: boolean = true

    const width = 100;

    useEffect(() => {
        JSON.stringify({ispending})
        setAtribute(AtributeSet(weather))
        retrieveItem()
    }, [page, size])
    useEffect(()=>{
        searchValue()
    }, [key, search])
    const changeTab = (index:any) => {
        setTab(index)
    } 
    const searchValue = async() => {
        await retrieve("weather", page, size, key, search).then((data: any) => {
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
        loadSubStates()
        setState(weather)
        setError([initialErrorMessage])
    }
    const selectItem = async (data: any) => {
        loadSubStates()
        setState(data)
        handleModal()
    }
    const validItem = (data: any) => {
        if (data?.id || data?.ii && data?.iii || data?.ddddddd) {
            handleModal()
            retrieveItem()
            createToast(toastDetails[0])
        } else {
            startTransition(() => setError(data))
            createToast(toastDetails[1])
        }
    }
    const networkError = () => {
        setError([{ field: 'DTO', message: 'Network Error' }])
    }
    const createItem = async () => {
        await create("weather", state).then((data) => {
            validItem(data)
        }).catch(() => { networkError() })
    }
    const retrieveItem = async () => {
        await retrieve("weather", page, size, '', '').then((data: any) => {
            startTransition(() => setPageable(data))
            startTransition(() => setStates(data.content))
        }).catch(() => { networkError() })
    }
    const loadSubStates = async () => {
        Object.entries(state).map(([key, value], index) => {
            return (
                !(atribute[index]?.type === 'checkbox' || atribute[index]?.type === 'date' || value === null && atribute[index].worth === 0 || value === null && atribute[index].worth === '' || atribute[index]?.type !== 'undefined' && !Array.isArray(atribute[index]?.worth)) &&
                retrieve(key, 0, 1000, '', '').then((data: any) => {
                    startTransition(() => {
                        subStates[index] = data.content
                        setSubStates(subStates)
                    })
                }).catch(() => { networkError() })
            )
        })
    }
    const updateItem = async () => {
        await update("weather", state).then((data) => {
            validItem(data)
        }).catch(() => { networkError() })
    }
    const deleteItem = async () => {
        if(state.id !== undefined){
            await remove("weather", state.id).then((data) => {
                validItem(data)
            }).catch(() => { networkError() })
        } else {
            await removeComposite("weather", state?.dateObservation, state?.ddddddd, state?.ii, state?.iii).then((data) => {
                validItem(data)
            }).catch(() => { networkError() })
        }
    }
    const validation = (name: string): string[] => {
        const vector: string[] = []
        if(Array.isArray(error)){
            error?.map((element: any) => { if (name == element.field) return vector.push(element?.message+'. ') })
        }
        return vector
    }
    const validationDTO = (): string[] => {
        const vector: string[] = []
        if(Array.isArray(error)){
            error?.map((element: any) => { if (element.field?.startsWith("DTO")) return vector.push(element?.message+'. ') })
        }
        return vector
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setState({ ...state, [event.target.name]: value })
    }

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setState({...state, [event.target.name]: event.target.value})
        
    }

    const handleInputChangeSubSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
        await retrieve(event.target.name, page, size, event.target.name, event.target.value).then((data: any) => {
            setState({ ...state, [event.target.name]: data?.content[0] })
        }).catch(() => { networkError() })
    }
    const handleInputChangeSubSelectArray = async (event: ChangeEvent<HTMLSelectElement>) => {
        await retrieve(event.target.name, 0, size, event.target.name, 'id').then((data: any) => {
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
        setModal(!modal)
        setError([initialErrorMessage])
    }
    const newItem = () => {
        setModal(!modal)
        resetItem()
        loadSubStates()
    }
    const removeTimeFromDate = (date: any) => {
        const aux = new Date(date)
        return new Date(aux.getFullYear(), aux.getMonth() + 1, aux.getDate()).toLocaleDateString('fr-CA');
    }
    const showObject = (values: any): any => {
        return (
            Object.entries(values).map(([key, value]: any, index) => {
                if (key !== 'id' && key !== 'password' && index < 7 && key !== 'role') {
                    return (<td>
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
                                <>{value == null ? '' : value?.name ? value.name : value.id}</>
                                :
                                <>{value}</>
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

    const onClickModal = (evt: React.MouseEvent) => {
        if ((evt.target as HTMLElement).className.includes('modal-div')) {
            setModal(false);
        }
    }

    return (
        <>
            {/* <ShineButton onMouseMove={shine} className='shiny'>Shine Button</ShineButton> */}
            {isValidToken() &&
                <>
                    <Modal show={modal} className='modal-div' onClick={(evt) => {
                        onClickModal(evt)
                    }}>
                        <article style={{ maxWidth: `${width}%`}}>
                            <header><span onClick={handleModal}>&times;</span><h2>{UriScreenFormat("weather")}</h2></header>
                            {atribute &&
                                <>
                                <div className='tabs'>
                                <button className={tab === 0 ? 'show' : 'inative'} onClick={()=>changeTab(0)}>Seção 0</button>
                                <button className={tab === 1 ? 'show' : 'inative'} onClick={()=>changeTab(1)}>Seção 1</button>
                                <button className={tab === 2 ? 'show' : 'inative'} onClick={()=>changeTab(2)}>Seção 2</button>
                                <button className={tab === 3 ? 'show' : 'inative'} onClick={()=>changeTab(3)}>Seção 3</button>
                                <button className={tab === 5 ? 'show' : 'inative'} onClick={()=>changeTab(5)}>Seção 5</button>
                                </div>
                                    <Container align={'line'} style={{ flex: '1', overflow: 'auto'}}>

                                                    <div className={tab === 0 ? 'tab' : 'hide'}>
                                                        <ContainerInput historic={true}>
                                                            <span>
                                                                        <>
                                                                            <select name={"mimi"} required value={weather.mimi} onChange={handleSelectChange}>
                                                                             <option value={'AA'}>AA</option>
                                                                             <option value={'BB'}>BB</option>   
                                                                            </select>
                                                                            <label htmlFor={"mimi"} >{"mimi"}</label>
                                                                            <label htmlFor={"mimi"}>{validation("mimi")}</label>
                                                                        </>
                                                                        
                                                            </span>
                                                        </ContainerInput>

                                                        {/* <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"mjmj"} required value={weather.mjmj} placeholder='XX' readOnly= {true} onChange={handleInputChange}/>
                                                            <label htmlFor={"mjmj"}>{"mjmj"}</label>
                                                            <label htmlFor={"mjmj"}>{validation("mjmj")}</label>
                                                            </span>
                                                        </ContainerInput> */}

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false} type="text" name={"ddddddd"} value={weather.ddddddd} onChange={handleInputChange}/>
                                                            <label htmlFor={"ddddddd"}>{"ddddddd"}</label>
                                                            <label htmlFor={"ddddddd"}>{validation("ddddddd")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'AA'? true : false}type="text" name={"ii"} value={weather.ii} onChange={handleInputChange}/>
                                                            <label htmlFor={"ii"}>{"ii"}</label>
                                                            <label htmlFor={"ii"}>{validation("ii")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'AA'? true : false}type="text" name={"iii"} value={weather.iii} onChange={handleInputChange}/>
                                                            <label htmlFor={"iii"}>{"iii"}</label>
                                                            <label htmlFor={"iii"}>{validation("iii")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        {/* <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"nbnbnb"} value={weather.nbnbnb} onChange={handleInputChange}/>
                                                            <label htmlFor={"nbnbnb"}>{"nbnbnb"}</label>
                                                            <label htmlFor={"nbnbnb"}>{validation("nbnbnb")}</label>
                                                            </span>
                                                        </ContainerInput> */}

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"yy"} required value={weather.yy} onChange={handleInputChange}/>
                                                            <label htmlFor={"yy"}>{"yy"}</label>
                                                            <label htmlFor={"yy"}>{validation("yy")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"gg"} required value={weather.gg} onChange={handleInputChange}/>
                                                            <label htmlFor={"gg"}>{"gg"}</label>
                                                            <label htmlFor={"gg"}>{validation("gg")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"iw"} required value={weather.iw} onChange={handleInputChange}/>
                                                            <label htmlFor={"iw"}>{"iw"}</label>
                                                            <label htmlFor={"iw"}>{validation("iw")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"lalala"} value={weather.lalala} onChange={handleInputChange}/>
                                                            <label htmlFor={"lalala"}>{"lalala"}</label>
                                                            <label htmlFor={"lalala"}>{validation("lalala")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"qc"} value={weather.qc} onChange={handleInputChange}/>
                                                            <label htmlFor={"qc"}>{"qc"}</label>
                                                            <label htmlFor={"qc"}>{validation("qc")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"lolololo"} value={weather.lolololo} onChange={handleInputChange}/>
                                                            <label htmlFor={"lolololo"}>{"lolololo"}</label>
                                                            <label htmlFor={"lolololo"}>{validation("lolololo")}</label>
                                                            </span>
                                                        </ContainerInput>
                                                        </div>
                                                        {/*begining of section 1*/}
                                                        <div className={tab === 1 ? 'tab' : 'hide'}>
                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"ir"} value={weather.ir} onChange={handleInputChange}/>
                                                            <label htmlFor={"ir"}>{"ir"}</label>
                                                            <label htmlFor={"ir"}>{validation("ir")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"ix"} value={weather.ix} onChange={handleInputChange}/>
                                                            <label htmlFor={"ix"}>{"ix"}</label>
                                                            <label htmlFor={"ix"}>{validation("ix")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"h"} value={weather.h} onChange={handleInputChange}/>
                                                            <label htmlFor={"h"}>{"h"}</label>
                                                            <label htmlFor={"h"}>{validation("h")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"vv"} value={weather.vv} onChange={handleInputChange}/>
                                                            <label htmlFor={"vv"}>{"vv"}</label>
                                                            <label htmlFor={"vv"}>{validation("vv")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"n"} value={weather.n} onChange={handleInputChange}/>
                                                            <label htmlFor={"n"}>{"n"}</label>
                                                            <label htmlFor={"n"}>{validation("n")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"dd"} value={weather.dd} onChange={handleInputChange}/>
                                                            <label htmlFor={"dd"}>{"dd"}</label>
                                                            <label htmlFor={"dd"}>{validation("dd")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"ff"} value={weather.ff} onChange={handleInputChange}/>
                                                            <label htmlFor={"ff"}>{"ff"}</label>
                                                            <label htmlFor={"ff"}>{validation("ff")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"fff"} value={weather.fff} onChange={handleInputChange}/>
                                                            <label htmlFor={"fff"}>{"fff"}</label>
                                                            <label htmlFor={"fff"}>{validation("fff")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"sn1_1"} value={weather.sn1_1} onChange={handleInputChange}/>
                                                            <label htmlFor={"sn1_1"}>{"sn1_1"}</label>
                                                            <label htmlFor={"sn1_1"}>{validation("sn1_1")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"ttt"} value={weather.ttt} onChange={handleInputChange}/>
                                                            <label htmlFor={"ttt"}>{"ttt"}</label>
                                                            <label htmlFor={"ttt"}>{validation("ttt")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"sn2_1"} value={weather.sn2_1} onChange={handleInputChange}/>
                                                            <label htmlFor={"sn2_1"}>{"sn2_1"}</label>
                                                            <label htmlFor={"sn2_1"}>{validation("sn2_1")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"tdtdtd"} value={weather.tdtdtd} onChange={handleInputChange}/>
                                                            <label htmlFor={"tdtdtd"}>{"tdtdtd"}</label>
                                                            <label htmlFor={"tdtdtd"}>{validation("tdtdtd")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        {/* <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"p0p0p0p0"} value={weather.p0p0p0p0} onChange={handleInputChange}/>
                                                            <label htmlFor={"p0p0p0p0"}>{"p0p0p0p0"}</label>
                                                            <label htmlFor={"p0p0p0p0"}>{validation("p0p0p0p0")}</label>
                                                            </span>
                                                        </ContainerInput> */}

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"pppp"} value={weather.pppp} onChange={handleInputChange}/>
                                                            <label htmlFor={"pppp"}>{"pppp"}</label>
                                                            <label htmlFor={"pppp"}>{validation("pppp")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        {/* <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"a3"} value={weather.a3} onChange={handleInputChange}/>
                                                            <label htmlFor={"a3"}>{"a3"}</label>
                                                            <label htmlFor={"a3"}>{validation("a3")}</label>
                                                            </span>
                                                        </ContainerInput> */}

                                                        {/* <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"hhh"} value={weather.hhh} onChange={handleInputChange}/>
                                                            <label htmlFor={"hhh"}>{"hhh"}</label>
                                                            <label htmlFor={"hhh"}>{validation("hhh")}</label>
                                                            </span>
                                                        </ContainerInput> */}

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"a"} value={weather.a} onChange={handleInputChange}/>
                                                            <label htmlFor={"a"}>{"a"}</label>
                                                            <label htmlFor={"a"}>{validation("a")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"ppp"} value={weather.ppp} onChange={handleInputChange}/>
                                                            <label htmlFor={"ppp"}>{"ppp"}</label>
                                                            <label htmlFor={"ppp"}>{validation("ppp")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        {/* <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"rrr"} value={weather.rrr} onChange={handleInputChange}/>
                                                            <label htmlFor={"rrr"}>{"rrr"}</label>
                                                            <label htmlFor={"rrr"}>{validation("rrr")}</label>
                                                            </span>
                                                        </ContainerInput> */}

                                                        {/* <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"tr"} value={weather.tr} onChange={handleInputChange}/>
                                                            <label htmlFor={"tr"}>{"tr"}</label>
                                                            <label htmlFor={"tr"}>{validation("tr")}</label>
                                                            </span>
                                                        </ContainerInput> */}

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"ww"} value={weather.ww} onChange={handleInputChange}/>
                                                            <label htmlFor={"ww"}>{"ww"}</label>
                                                            <label htmlFor={"ww"}>{validation("ww")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"w1w2"} value={weather.w1w2} onChange={handleInputChange}/>
                                                            <label htmlFor={"w1w2"}>{"w1w2"}</label>
                                                            <label htmlFor={"w1w2"}>{validation("w1w2")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"wawa"} value={weather.wawa} onChange={handleInputChange}/>
                                                            <label htmlFor={"wawa"}>{"wawa"}</label>
                                                            <label htmlFor={"wawa"}>{validation("wawa")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"wa1"} value={weather.wa1} onChange={handleInputChange}/>
                                                            <label htmlFor={"wa1"}>{"wa1"}</label>
                                                            <label htmlFor={"wa1"}>{validation("wa1")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"wa2"} value={weather.wa2} onChange={handleInputChange}/>
                                                            <label htmlFor={"wa2"}>{"wa2"}</label>
                                                            <label htmlFor={"wa2"}>{validation("wa2")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"nh"} value={weather.nh} onChange={handleInputChange}/>
                                                            <label htmlFor={"nh"}>{"nh"}</label>
                                                            <label htmlFor={"nh"}>{validation("nh")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"cl"} value={weather.cl} onChange={handleInputChange}/>
                                                            <label htmlFor={"cl"}>{"cl"}</label>
                                                            <label htmlFor={"cl"}>{validation("cl")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"cm"} value={weather.cm} onChange={handleInputChange}/>
                                                            <label htmlFor={"cm"}>{"cm"}</label>
                                                            <label htmlFor={"cm"}>{validation("cm")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"ch"} value={weather.ch} onChange={handleInputChange}/>
                                                            <label htmlFor={"ch"}>{"ch"}</label>
                                                            <label htmlFor={"ch"}>{validation("ch")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        {/* <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"gggg"} value={weather.gggg} onChange={handleInputChange}/>
                                                            <label htmlFor={"gggg"}>{"gggg"}</label>
                                                            <label htmlFor={"gggg"}>{validation("gggg")}</label>
                                                            </span>
                                                        </ContainerInput> */}
                                                        </div>
                                                        {/* begining of section 2 */}
                                                        <div className={tab === 2 ? 'tab' : 'hide'}>
                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"ds"} value={weather.ds} onChange={handleInputChange}/>
                                                            <label htmlFor={"ds"}>{"ds"}</label>
                                                            <label htmlFor={"ds"}>{validation("ds")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"vs"} value={weather.vs} onChange={handleInputChange}/>
                                                            <label htmlFor={"vs"}>{"vs"}</label>
                                                            <label htmlFor={"vs"}>{validation("vs")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"ss"} value={weather.ss} onChange={handleInputChange}/>
                                                            <label htmlFor={"ss"}>{"ss"}</label>
                                                            <label htmlFor={"ss"}>{validation("ss")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"twtwtw"} value={weather.twtwtw} onChange={handleInputChange}/>
                                                            <label htmlFor={"twtwtw"}>{"twtwtw"}</label>
                                                            <label htmlFor={"twtwtw"}>{validation("twtwtw")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"pwapwa"} value={weather.pwapwa} onChange={handleInputChange}/>
                                                            <label htmlFor={"pwapwa"}>{"pwapwa"}</label>
                                                            <label htmlFor={"pwapwa"}>{validation("pwapwa")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"hwahwa"} value={weather.hwahwa} onChange={handleInputChange}/>
                                                            <label htmlFor={"hwahwa"}>{"hwahwa"}</label>
                                                            <label htmlFor={"hwahwa"}>{validation("hwahwa")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"pwpw"} value={weather.pwpw} onChange={handleInputChange}/>
                                                            <label htmlFor={"pwpw"}>{"pwpw"}</label>
                                                            <label htmlFor={"pwpw"}>{validation("pwpw")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"hwhw"} value={weather.hwhw} onChange={handleInputChange}/>
                                                            <label htmlFor={"hwhw"}>{"hwhw"}</label>
                                                            <label htmlFor={"hwhw"}>{validation("hwhw")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"dw1dw1"} value={weather.dw1dw1} onChange={handleInputChange}/>
                                                            <label htmlFor={"dw1dw1"}>{"dw1dw1"}</label>
                                                            <label htmlFor={"dw1dw1"}>{validation("dw1dw1")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"dw2dw2"} value={weather.dw2dw2} onChange={handleInputChange}/>
                                                            <label htmlFor={"dw2dw2"}>{"dw2dw2"}</label>
                                                            <label htmlFor={"dw2dw2"}>{validation("dw2dw2")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"pw1pw1"} value={weather.pw1pw1} onChange={handleInputChange}/>
                                                            <label htmlFor={"pw1pw1"}>{"pw1pw1"}</label>
                                                            <label htmlFor={"pw1pw1"}>{validation("pw1pw1")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"hw1hw1"} value={weather.hw1hw1} onChange={handleInputChange}/>
                                                            <label htmlFor={"hw1hw1"}>{"hw1hw1"}</label>
                                                            <label htmlFor={"hw1hw1"}>{validation("hw1hw1")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"pw2pw2"} value={weather.pw2pw2} onChange={handleInputChange}/>
                                                            <label htmlFor={"pw2pw2"}>{"pw2pw2"}</label>
                                                            <label htmlFor={"pw2pw2"}>{validation("pw2pw2")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"hw2hw2"} value={weather.hw2hw2} onChange={handleInputChange}/>
                                                            <label htmlFor={"hw2hw2"}>{"hw2hw2"}</label>
                                                            <label htmlFor={"hw2hw2"}>{validation("hw2hw2")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"hwahwahwa"} value={weather.hwahwahwa} onChange={handleInputChange}/>
                                                            <label htmlFor={"hwahwahwa"}>{"hwahwahwa"}</label>
                                                            <label htmlFor={"hwahwahwa"}>{validation("hwahwahwa")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"sw"} value={weather.sw} onChange={handleInputChange}/>
                                                            <label htmlFor={"sw"}>{"sw"}</label>
                                                            <label htmlFor={"sw"}>{validation("sw")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"tbtbtb"} value={weather.tbtbtb} onChange={handleInputChange}/>
                                                            <label htmlFor={"tbtbtb"}>{"tbtbtb"}</label>
                                                            <label htmlFor={"tbtbtb"}>{validation("tbtbtb")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"is_ice"} value={weather.is_ice} onChange={handleInputChange}/>
                                                            <label htmlFor={"is_ice"}>{"is_ice"}</label>
                                                            <label htmlFor={"is_ice"}>{validation("is_ice")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"ci"} value={weather.ci} onChange={handleInputChange}/>
                                                            <label htmlFor={"ci"}>{"ci"}</label>
                                                            <label htmlFor={"ci"}>{validation("ci")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"si"} value={weather.si} onChange={handleInputChange}/>
                                                            <label htmlFor={"si"}>{"si"}</label>
                                                            <label htmlFor={"si"}>{validation("si")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"bi"} value={weather.bi} onChange={handleInputChange}/>
                                                            <label htmlFor={"bi"}>{"bi"}</label>
                                                            <label htmlFor={"bi"}>{validation("bi")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"di"} value={weather.di} onChange={handleInputChange}/>
                                                            <label htmlFor={"di"}>{"di"}</label>
                                                            <label htmlFor={"di"}>{validation("di")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false}type="text" name={"zi"} value={weather.zi} onChange={handleInputChange}/>
                                                            <label htmlFor={"zi"}>{"zi"}</label>
                                                            <label htmlFor={"zi"}>{validation("zi")}</label>
                                                            </span>
                                                        </ContainerInput>
{/* 
                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"eses"} value={weather.eses} onChange={handleInputChange}/>
                                                            <label htmlFor={"eses"}>{"eses"}</label>
                                                            <label htmlFor={"eses"}>{validation("eses")}</label>
                                                            </span>
                                                        </ContainerInput> */}

                                                        {/* <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"rs"} value={weather.rs} onChange={handleInputChange}/>
                                                            <label htmlFor={"rs"}>{"rs"}</label>
                                                            <label htmlFor={"rs"}>{validation("rs")}</label>
                                                            </span>
                                                        </ContainerInput> */}
                                                        </div>
                                                        {/*begining of section 3*/}
                                                        <div className={tab === 3 ? 'tab' : 'hide'}>
                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"sn1_3"} value={weather.sn1_3} onChange={handleInputChange}/>
                                                            <label htmlFor={"sn1_3"}>{"sn1_3"}</label>
                                                            <label htmlFor={"sn1_3"}>{validation("sn1_3")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"txtxtx"} value={weather.txtxtx} onChange={handleInputChange}/>
                                                            <label htmlFor={"txtxtx"}>{"txtxtx"}</label>
                                                            <label htmlFor={"txtxtx"}>{validation("txtxtx")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"sn2_3"} value={weather.sn2_3} onChange={handleInputChange}/>
                                                            <label htmlFor={"sn2_3"}>{"sn2_3"}</label>
                                                            <label htmlFor={"sn2_3"}>{validation("sn2_3")}</label>
                                                            </span>
                                                        </ContainerInput>
                                                        
                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"tntntn"} value={weather.tntntn} onChange={handleInputChange}/>
                                                            <label htmlFor={"tntntn"}>{"tntntn"}</label>
                                                            <label htmlFor={"tntntn"}>{validation("tntntn")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"ind89"} value={weather.ind89} onChange={handleInputChange}/>
                                                            <label htmlFor={"ind89"}>{"ind89"}</label>
                                                            <label htmlFor={"ind89"}>{validation("ind89")}</label>
                                                            </span>
                                                        </ContainerInput>
                                                        
                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input type="text" name={"p24p24p24"} value={weather.p24p24p24} onChange={handleInputChange}/>
                                                            <label htmlFor={"p24p24p24"}>{"p24p24p24"}</label>
                                                            <label htmlFor={"p24p24p24"}>{validation("p24p24p24")}</label>
                                                            </span>
                                                        </ContainerInput>
                                                        </div>
                                                        {/*begning of section 5*/}
                                                        <div className={tab === 5 ? 'tab' : 'hide'}>
                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false} type="text" name={"ichw"} value={weather.ichw} onChange={handleInputChange}/>
                                                            <label htmlFor={"ichw"}>{"ichw"}</label>
                                                            <label htmlFor={"ichw"}>{validation("ichw")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false} type="text" name={"icm"} value={weather.icm} onChange={handleInputChange}/>
                                                            <label htmlFor={"icm"}>{"icm"}</label>
                                                            <label htmlFor={"icm"}>{validation("icm")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false} type="text" name={"cs"} value={weather.cs} onChange={handleInputChange}/>
                                                            <label htmlFor={"cs"}>{"cs"}</label>
                                                            <label htmlFor={"cs"}>{validation("cs")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false} type="text" name={"icf"} value={weather.icf} onChange={handleInputChange}/>
                                                            <label htmlFor={"icf"}>{"icf"}</label>
                                                            <label htmlFor={"icf"}>{validation("icf")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false} type="text" name={"icp"} value={weather.icp} onChange={handleInputChange}/>
                                                            <label htmlFor={"icp"}>{"icp"}</label>
                                                            <label htmlFor={"icp"}>{validation("icp")}</label>
                                                            </span>
                                                        </ContainerInput>

                                                        <ContainerInput historic={true}>
                                                            <span>
                                                            <input readOnly={state.mimi === 'BB'? true : false} type="text" name={"icq"} value={weather.icq} onChange={handleInputChange}/>
                                                            <label htmlFor={"icq"}>{"icq"}</label>
                                                            <label htmlFor={"icq"}>{validation("icq")}</label>
                                                            </span>
                                                        </ContainerInput>
                                                        </div>
                    
                                    </Container>
                                    <Container>
                                        <div>{validationDTO()}</div>
                                    </Container>
                                    <Container hidden={"weather".includes('istoric') ? true : false} >
                                        {modal &&
                                        <PDFDownloadLink document={<PDFDocument object={state} />} fileName="somename.pdf">
                                                {({ loading }) => loading ? <Button category={'warning'} >Wait</Button> : <Button category={'secondary'} >Download</Button> }
                                        </PDFDownloadLink>}
                                        <Button type='reset' category={'secondary'} onClick={resetItem}>Reset</Button>
                                        {/* <Button type='reset' category={'secondary'} onClick={resetItem}>Reset</Button> */}
                                        <Button category={'success'} onClick={createItem} hidden={state.id !== "" && !"weather".includes('istoric') || "weather".includes('istoric') ? true : false}>Create</Button>
                                        <Button category={'warning'} onClick={updateItem} hidden={state.id === "" || "weather".includes('istoric') ? true : false}>Update</Button>
                                        <Button category={'danger'} onClick={deleteItem} hidden={state.id === "" || "weather".includes('istoric') ? true : false}>Delete</Button>
                                        {/* <Button category={'secondary'} onClick={handleModal}>Close</Button> */}
                                    </Container>
                                </>
                            }
                        </article>
                    </Modal>
                    <Header>
                        <TitleHeader>
                            <h1>{UriScreenFormat("weather")}</h1>
                                <label>Items per page   </label>
                                <select onChange={handleSize} >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    {/* <option value={15}>15</option> */}
                                </select>
                        </TitleHeader>
                        <><label>{key}</label><input name={search} onChange={searchItem} placeholder={`${key}`} value={search}></input></>
                        {"weather".includes('weather') && !"weather".includes('istoric') &&
                            <WeatherUpload />
                        }
                        {!"weather".includes('istoric') && <Button onClick={newItem}>New</Button>}
                    </Header>
                    {/* {ispending && <Load></Load>} */}
                    <Table>
                        <thead>
                            <tr>
                                {Object.entries(state).map(([key]: any, index) => {
                                    if (key !== 'id' && key !== 'password' && index < 7 && key !== 'role') {
                                        if(!"weather".includes('weather') || index < 6) {
                                                return (<th onClick={()=>searchKey(key)}>{key}</th>)
                                            }
                                        }
                                    })}
                            </tr>
                        </thead>
                        <ErrorBoundary fallback={<div> Something went wrong </div>} >
                            <tbody>
                                {states.map((element) => {
                                    return (
                                        <tr onClick={() => selectItem(element)}>
                                            <>{showObject(element)}</>
                                        </tr>)
                                })}
                            </tbody>
                        </ErrorBoundary>
                        <tfoot>
                            <tr>
                                <td colSpan={100}>
                                    <GroupButton>
                                        <ButtonPage onClick={() => handlePage(0)}>{'<<'}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(page - 1)} disabled={page <= 0 ? true : false}>{'<'}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(page - 1)} hidden={page <= 0 ? true : false}>{page}</ButtonPage>
                                        <ButtonPage selected={true} disabled  >{page + 1}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(page + 1)} hidden={page >= pageable.totalPages - 1 ? true : false}>{page + 2}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(page + 1)} disabled={page >= pageable.totalPages - 2 ? true : false}>{'>'}</ButtonPage>
                                        <ButtonPage onClick={() => handlePage(pageable.totalPages - 1)}>{'>>'}</ButtonPage>
                                        Total amount {pageable.totalElements}
                                    </GroupButton>
                                </td>
                            </tr>
                        </tfoot>
                    </Table>
                    <Toast className="notifications"></Toast>
                </>
            }
        </>
    )
}