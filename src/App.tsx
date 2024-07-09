import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Modal from './components/Modal'
import ListItem from './components/Item';
import Chart from './components/Chart';

export interface Item {
  id: string
  name: string
  value: number
  date: string
  category: string
  type: string
}

export default function App() {

  const [showModal, setShowModal] = useState<false | true>(false)
  const [showModalInclude, setShowModalInclude] = useState<false | true>(false)
  const [elementEdit, setElementEdit] = useState<Item | null>(null)

  const [dateInitial, setDateInitial] = useState<string>()
  const [dateEnd, setDateEnd] = useState<string>()

  const [lista, setLista] = useState<Item[]>([])
  const [filterLista, setFilterList] = useState<Item[]>([])

  // Functions //
  useEffect(() => {
    if (lista.length > 0) localStorage.setItem('Lista', JSON.stringify(lista))
    calculeDate()
  }, [lista])

  useEffect(() => {
    const getList = localStorage.getItem('Lista')
    if (getList) setLista(JSON.parse(getList))
  }, [])

  const includeValores = (e: any) => {
    e.preventDefault()
    const field = e.target
    const item: Item = {
      id: uuidv4(),
      name: field.name.value,
      value: Number(field.value.value),
      date: field.date.value,
      category: field.category.value,
      type: field.type.value
    }
    setLista([...lista, item])
    setShowModalInclude(false)
  }

  const deleteItem = (i: string) => {
    const newList = lista.filter(element => (element.id !== i))
    if (newList.length == 0) localStorage.setItem('Lista', JSON.stringify(newList))
    setLista(newList)
  }

  const editItem = (e: React.FormEvent<HTMLFormElement>, id: any) => {
    e.preventDefault()
    const form = e.currentTarget;
    const item: Item = {
      id: id,
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      value: Number((form.elements.namedItem('value') as HTMLInputElement).value),
      date: (form.elements.namedItem('date') as HTMLInputElement).value,
      category: (form.elements.namedItem('category') as HTMLInputElement).value,
      type: (form.elements.namedItem('type') as HTMLInputElement).value,
    }
    const newList = lista.map((element) => {
      return id === element.id ? item : element
    })
    setLista(newList.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    setShowModal(false)
  }

  const receita = () => {
    const entradas = filterLista.filter((element) => element.type === 'entrada')
    const rec = entradas.reduce((acc, att) => acc + att.value, 0)
    return rec
  }

  const despesa = () => {
    const entradas = filterLista.filter(element => element.type === 'saída')
    const rec = entradas.reduce((acc, att) => acc + att.value, 0)
    return rec
  }

  const calculeDate = () => {
    if (dateEnd && dateInitial) {
      const newList = lista.filter(element => { if (new Date(element.date) >= new Date(dateInitial) && new Date(element.date) <= new Date(dateEnd)) return element })
      setFilterList(newList)
    }
    else setFilterList(lista)
  }

  return (
    <>
      <div className="painel">
        <div className="painel__card">
          <h3 className="painel__card-title">Receitas</h3>
          <span style={{ color: '#37ad37' }}>R$ +{filterLista && receita().toFixed(2)}</span>
        </div>
        <div className="painel__card">
          <h3 className="painel__card-title">Despesas</h3>
          <span style={{ color: '#f13333' }}>R$ -{filterLista && despesa().toFixed(2)}</span>
        </div>
        <div className="painel__card">
          <h3 className="painel__card-title">Saldo</h3>
          <span style={(receita() - despesa()) >= 0 ? { color: '#37ad37' } : { color: '#f13333' }}>R$ {filterLista && (receita() - despesa()).toFixed(2)}</span>
        </div>
      </div>
      {filterLista && <Chart list={filterLista} />}

      <label htmlFor='' style={{ width: '200px', margin: '0 auto', }}>Começo:</label>
      <input type='date' style={{ width: '200px', margin: '0 auto 10px', cursor: 'pointer', }} onChange={(e) => setDateInitial(new Date(e.target.value).toISOString())} />
      <label htmlFor='' style={{ width: '200px', margin: '0 auto', }}>Fim:</label>
      <input type='date' style={{ width: '200px', margin: '0 auto 10px', cursor: 'pointer', }} onChange={(e) => setDateEnd(new Date(e.target.value).toISOString())} />
      <button style={{ width: '200px', margin: '0 auto 10px', cursor: 'pointer', }} onClick={calculeDate}>✔️</button>
      {filterLista && <ListItem list={filterLista} deleteItem={deleteItem} setShowModal={setShowModal} setShowModalInclude={setShowModalInclude} setElementEdit={setElementEdit} />}
      {showModal && elementEdit && <Modal type='edit' elementEdit={elementEdit} onSubmit={(e) => editItem(e, elementEdit.id)} onClick={setShowModal} />}
      {showModalInclude && <Modal type='include' onSubmit={includeValores} onClick={setShowModalInclude} />}
    </>
  )
}