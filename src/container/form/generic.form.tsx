import { useState, ChangeEvent, useEffect, useTransition, useLayoutEffect } from 'react'
import { isValidToken } from '../../service/service.token'
import { ErrorMessage } from '../../assets/error/errorMessage'
import { initialErrorMessage } from '../../assets/error/errorMessage.initial'
import { create, retrieve, update, remove, removeAll } from '../../service/service.crud'
import { Container, ContainerInput } from './generic.field'
import { AtributeSet } from './generic.atribute'
import { Atribute } from '../../component/atribute/atribute.interface'
import { Tooltip } from '../tooltip/tooltip'
import { Table } from '../template/table'
import { Button, ButtonPage, GroupButton } from '../template/button'
import { Pageable } from '../../component/pageable/pageable.interface'
import { initialPageable } from '../../component/pageable/pageable.initial'
import { ErrorBoundary } from 'react-error-boundary'
import { Modal } from '../template/modal'
import { Toast } from '../toast/toast'
import { createToast, toastDetails } from '../toast/toast.message'
import { SubAtributeSet } from '../../component/atribute/subAtribute'

export const GenericForm = <T extends { id: string, name: string }>(object: any, url: string) => {
    const [state, setState] = useState<T>(object.object)
    const [states, setStates] = useState<T[]>([object.object])
    const [subStates, setSubStates] = useState<Object[][]>(SubAtributeSet(state))
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [atribute, setAtribute] = useState<Atribute[]>(AtributeSet(object.object))
    const [page, setPage] = useState<number>(0)
    const [size, setSize] = useState<number>(8)
    const [pageable, setPageable] = useState<Pageable>(initialPageable)
    const [ispending, startTransition] = useTransition()
    const [modal, setModal] = useState<boolean>(false)

    // useLayoutEffect(() => {
    //     subStates.map((index: any) => { console.log(index) })
    // }, [subStates])
    useEffect(() => {
        retrieveItem()
    }, [page, size])
    const resetItem = () => {
        setState(object.object)
        setError([initialErrorMessage])
    }
    const selectItem = async (data: any) => {
        setState(data)
        handleModal()
    }
    const validItem = (data: any) => {
        if (data?.id) {
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
        await create(object.url, state).then((data) => {
            validItem(data)
        }).catch((error) => { networkError() })
    }
    // const retrieve1 = async (url: string) => {
    //     await retrieve(url, page, size, "id").then((data) => {startTransition(() => return data.content)})
    // }
    const retrieveItem = async () => {
        await retrieve(object.url, page, size, "name".toLowerCase()).then((data) => {
            startTransition(() => setPageable(data))
            startTransition(() => setStates(data.content))
        }).catch((error) => { networkError() })
    }
    const retrieveSubItem = async (search: string, index: number) => {
        await retrieve(search, page, size, "name".toLowerCase()).then((data) => {
            startTransition(() => {
                subStates[index] = data.content
                setSubStates(subStates)
            })
        }).catch((error) => { networkError() })
    }
    // const subStatesON = () => {
    //     Object.keys(atribute).map((key) =>
    //         setSubStates(current => [...current, [key]] )
    //     )
    // }
    const subStatesOFF = () => {
        atribute.map((index: any) => {
            console.log('add', index)
        })
        console.log("show", atribute)
    }
    const subIndex = () => {
        // console.log(atribute[3])
        let array: Object[] = new Array(Object.keys(state).length)
        Object.keys(state).map((key, index) => {
            console.log(key)
            array[index] = key
        })
        console.log(array)
    }

    const updateItem = async () => {
        await update(object.url, state).then((data) => {
            validItem(data)
        }).catch((error) => { networkError() })
    }
    const deleteItem = async () => {
        await remove(object.url, state.id).then((data) => {
            validItem(data)
        }).catch((error) => { networkError() })
    }
    const validation = (name: string): string[] => {
        let vector: string[] = []
        error?.map((element: any) => { if (name == element.field) return vector.push(element?.message) })
        return vector
    }
    const validationDTO = (): string[] => {
        let vector: string[] = []
        error?.map((element: any) => { if (element.field?.startsWith("DTO")) return vector.push(element?.message) })
        return vector
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setState({ ...state, [event.target.name]: value })
    }
    const handleInputChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }
    const handleInputChangeSubSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log(JSON.stringify(event.target.value))
        // setState({ ...state, [event.target.name]: [subStates.find((item: any) => item.id === event.target.value )] })
        setState({ ...state, [event.target.name]: event.target.value })
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
    }
    const showObject = (values: any): any => {
        return (
            Object.entries(values).map(([key, value], index) => {
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
                        // typeof value === 'boolean' ?
                        <>{JSON.stringify(value)}</>
                        // :
                        // key === 'password' ?
                        //     <>*</>
                        //     :
                        //     <>{value}</>
                    }
                </td>)
            }))
    }
    return (
        <>
            {/* https://cdpn.io/agrimsrud/fullpage/RwKbwXN?anon=true&view= */}
            {isValidToken() &&
                <>
                    <Modal show={modal}>
                        <article>
                            <header><span onClick={handleModal}>&times;</span><h2>Modal Header</h2></header>
                            {atribute &&
                                <>
                                    <Container>
                                        {Object.entries(state).map(([key, value], index) => {
                                            return (
                                                <div>
                                                    {typeof value === 'object' ?
                                                        <Tooltip data-tip={validation(key)} hidden={validation(key).length === 0} >
                                                            <ContainerInput>
                                                                {Array.isArray(atribute[index]?.worth) ?
                                                                    <select name={key} onChange={handleInputChangeSelect} >
                                                                        {atribute[index].worth.map((result: any) => <option placeholder={key} data-value={result} >{result}</option>)}
                                                                    </select>
                                                                    :
                                                                    atribute[index]?.type === 'text' ?
                                                                        <>
                                                                            <select name={key} onChange={handleInputChangeSubSelect} onClick={() => retrieveSubItem(key, index)}>
                                                                                {subStates[index].map(((result: any) => <option placeholder={key} value={result.id}>{result.id}</option>))}
                                                                                {/* <option>{JSON.stringify(subStates[index])}</option> */}
                                                                                {/* <option>{subStates[index].map((result: any)=> JSON.stringify(result))}</option> */}
                                                                                {/* {subStates.map((result: any, index: any) => <option placeholder={key} value={result.id} >{result.id}</option>)} */}
                                                                                {/* {subStates[index].map((result: any, index: any) => <option placeholder={key} value={result.id} >{result.id}</option>)} */}
                                                                            </select>
                                                                            <label>{key}{JSON.stringify(state)}</label>
                                                                        </>
                                                                        :
                                                                        <ContainerInput>
                                                                            <input type={atribute[index]?.type} required name={key} value={value} onChange={handleInputChange} autoComplete='off' />
                                                                            <label htmlFor={key} hidden={atribute[index]?.type === 'hidden' ? true : false}>{key}</label>
                                                                        </ContainerInput>
                                                                }
                                                            </ContainerInput>
                                                        </Tooltip>
                                                        :
                                                        <Tooltip data-tip={validation(key)} hidden={validation(key).length === 0} >
                                                            <ContainerInput>
                                                                <input type={atribute[index]?.type} required name={key} value={value} onChange={handleInputChange} autoComplete='off' />
                                                                <label htmlFor={key} hidden={atribute[index]?.type === 'hidden' ? true : false}>{key}</label>
                                                            </ContainerInput>
                                                        </Tooltip>
                                                    }
                                                </div>
                                            )
                                        })}
                                        <div>{validationDTO()}</div>
                                    </Container>
                                    <Container block={false} >
                                        <Button onClick={resetItem}>Reset</Button>
                                        <Button onClick={createItem} hidden={state.id === "" ? false : true}>Create</Button>
                                        <Button onClick={updateItem} hidden={state.id === "" ? true : false}>Update</Button>
                                        <Button onClick={deleteItem} hidden={state.id === "" ? true : false}>Delete</Button>
                                        <Button onClick={handleModal}>Close</Button>
                                        {/* <Button onClick={subStatesON}>subStatesON</Button> */}
                                        <Button onClick={subStatesOFF}>subStatesOFF</Button>
                                        <Button onClick={subIndex}>subIndex</Button>
                                    </Container>
                                </>
                            }
                        </article>
                    </Modal>
                    <Container block={false} >
                        <Button onClick={newItem}>New</Button>
                        Items per page
                        <select onChange={handleSize} >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                        </select>
                    </Container>
                    <Table>
                        <thead>
                            <tr>
                                {Object.entries(state).map(([key, value], index) => {
                                    return (<th>{key}</th>)
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