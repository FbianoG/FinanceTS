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

  const [lista, setLista] = useState<Item[]>([])



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

  useEffect(() => {
    // console.log(lista)
    if (lista.length > 0) localStorage.setItem('Lista', JSON.stringify(lista))
  }, [lista])

  useEffect(() => {
    const getList: any = localStorage.getItem('Lista')
    setLista(JSON.parse(getList))
  }, [])


  const receita = () => {
    const entradas = lista.filter(element => element.type === 'entrada')
    const rec = entradas.reduce((acc, att) => acc + att.value, 0)
    return rec
  }
  const despesa = () => {
    const entradas = lista.filter(element => element.type === 'saída')
    const rec = entradas.reduce((acc, att) => acc + att.value, 0)
    return rec
  }

  return (
    <>

      <div className="painel">
        <div className="painel__card">
          <h3 className="painel__card-title">Receitas</h3>
          <span style={{ color: '#37ad37' }}>R$ +{lista && lista.length > 0 && receita().toFixed(2)}</span>
        </div>
        <div className="painel__card">
          <h3 className="painel__card-title">Despesas</h3>
          <span style={{ color: '#f13333' }}>R$ -{lista && lista.length > 0 && despesa().toFixed(2)}</span>
        </div>
        <div className="painel__card">
          <h3 className="painel__card-title">Saldo</h3>
          <span style={{ color: '#1e90ff' }}>R$ {lista && lista.length > 0 && (receita() - despesa()).toFixed(2)}</span>
        </div>
      </div>

      {/* {lista && <Chart list={lista} />} */}




      {/* {lista && <ListItem list={lista} deleteItem={deleteItem} setShowModal={setShowModal} setShowModalInclude={setShowModalInclude} setElementEdit={setElementEdit} />} */}


      {/* {showModal && elementEdit && <Modal type='edit' elementEdit={elementEdit} onSubmit={(e) => editItem(e, elementEdit.id)} onClick={setShowModal} />} */}
      {/* {showModalInclude && <Modal type='include' onSubmit={includeValores} onClick={setShowModalInclude} />} */}

    </>
  )
}