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
// import { WeatherUpload } from './weather.upload'
import { Header, TitleHeader } from '../template/header'
// import { Load } from '../template/load'
import { UriScreenFormat } from '../../service/uri.format'
// import { ShineButton } from './shine.button'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PDFDocument } from '../../component/pdf/PDFDocument'
// import { Input } from './input/Input'
// import { InputInterface } from './input/assets/input.interface'
import { Icon } from '../../assets/svg.access'

export const GenericForm = <T extends { id: string, name: string }>(object: any) => {
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
    const [confirm, setConfirm] = useState<{message: '', show: boolean, action: string}>({message: '', show: false, action: ''})
    const [key, setKey] = useState<string>('name')
    const [search, setSearch] = useState<string>('')

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
                !(atribute[index]?.type === 'checkbox' || atribute[index]?.type === 'date' || value === null && atribute[index].worth === 0 || value === null && atribute[index].worth === '' || atribute[index]?.type !== 'undefined' && !Array.isArray(atribute[index]?.worth)) || atribute[index]?.type === 'object' ?
                retrieve(key, 0, 1000, '', '').then((data: any) => {
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
        setState({ ...state, [event.target.name]: value })
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
        setModal(!modal)
        setError([initialErrorMessage])
    }
    const handleConfirm = (action: string) => {
        setConfirm({...confirm, show:!confirm.show, action: action})
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
                if (key !== 'id' && key !== 'password' && index < 7 && key !== 'role') {
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
                    <Modal show={modal} className='modal-div' onClick={(evt) => {
                        onClickModal(evt)
                    }}>
                        <article>
                            <header><span onClick={handleModal}>&times;</span><h2>
                                {UriScreenFormat(object.url) === 'Observer' ? 'Observador' : UriScreenFormat(object.url) === 'Station' ? 'Estação' : UriScreenFormat(object.url)}
                            </h2></header>
                            {atribute &&
                                <>
                                <center>
                                    <Container align={'inputs'}>
                                        {Object.entries(state).map(([key, value]: any, index) => {
                                            return (
                                                // <Input childToParent={handleInputChangeFather} key={Math.random()} type={atribute[index]?.type} name={key} value={value} readOnly={false} show={modal}></Input>
                                                <div key={key} style={atribute[index]?.type === 'hidden' ? { display: 'none' } : { display: 'flex' }}>
                                                    <ContainerInput2 key={key} error={validation(key).length !== 0 ? true : false}>
                                                        {Array.isArray(atribute[index]?.worth) || atribute[index]?.type === 'object' || atribute[index]?.type === 'undefined' ?
                                                            <select key={key} name={key} onChange={Array.isArray(value) ? handleInputChangeSubSelectArray : handleInputChangeSubSelect}
                                                                // defaultValue={typeof value[0] === 'boolean' ? undefined : atribute[index]?.type === 'date' ? removeTimeFromDate(value[0]) : value[0]}
                                                                value={Array.isArray(value) ? value[0] : value}>
                                                                {/* <option selected value={value}></option> */}
                                                                <option selected value={value === undefined || value === null || value[0] === undefined ? null : Array.isArray(value) ? value[0] : value}>
                                                                    {value === undefined || value === null || value[0] === undefined ? null : Array.isArray(value) ? (value[0].hasOwnProperty('name') ? value[0]?.name : value[0]?.id) : value.name !== undefined ? value?.name : value?.id}
                                                                </option>
                                                                {subStates[index]?.map(((result: any) => <option key={Math.random()} value={result.id}>{result?.name ? result.name : result.id}</option>))}
                                                            </select>
                                                            :
                                                            <input key={key} name={key} onChange={handleInputChange} autoComplete='off' placeholder={''} type={atribute[index]?.type}
                                                                // defaultValue={typeof value === 'boolean' ? undefined : atribute[index]?.type === 'date' ? removeTimeFromDate(value) : value}
                                                                defaultChecked={typeof value === 'boolean' ? value : undefined}
                                                                value={typeof value === 'boolean' ? undefined : value === 0 ? '' : value} />
                                                        }
                                                        <label className='label' htmlFor={key} hidden={atribute[index]?.type === 'hidden' || atribute[index]?.type === 'checkbox' ? true : false} >{key}</label>
                                                        <label htmlFor={key}>{validation(key)}</label>
                                                    </ContainerInput2>
                                                </div>
                                            )
                                        })}
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
                                    <Button category={'primary'} onClick={()=>handleConfirm('create')} hidden={compositeOrNot()}>Create</Button>
                                    <Button category={'warning'} onClick={()=>handleConfirm('update')} hidden={!compositeOrNot()}>Update</Button>
                                    <Button category={'danger'} onClick={()=>handleConfirm('delete')} hidden={!compositeOrNot()}>Delete</Button>
                                    <Button category={'secondary'} onClick={handleModal}>Close</Button>
                                </footer>
                            </>
                            }
                        </article>
                    </Modal>
                    <Header>
                        <span>
                            {!object.url.includes('istoric') && <Button category={'primary'} onClick={newItem}>Novo</Button>}
                            <TitleHeader>
                                <h1>{UriScreenFormat(object.url) === 'Observer' ? 'Observador' : UriScreenFormat(object.url) === 'Station' ? 'Estação' : UriScreenFormat(object.url)}</h1>
                            </TitleHeader>
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
                                    if (key !== 'id' && key !== 'password' && index < 7 && key !== 'role') {
                                        if (!object.url.includes('weather') || index < 6) {
                                            return (<th key={Math.random()} onClick={() => searchKey(key)}>{key}</th>)
                                        }
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
                            <tr><th>Quantidade total {pageable.totalElements}</th></tr>
                        </tfoot>
                    </Table>
                    <Toast className="notifications"></Toast>
                </>
            }
        </>
    )
}