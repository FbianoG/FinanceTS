import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Modal from './components/Modal'
import ListItem from './components/Item';
import Chart from './components/Chart';



export default function App() {

  const [inputName, setInputName] = useState<string>('')
  const [inputCategory, setInputCategory] = useState<string>('educação')
  const [inputDate, setInputDate] = useState<string>('')
  const [inputValue, setInputValue] = useState<number>(0)
  const [inputType, setInputType] = useState<'entrada' | 'saída'>('entrada')

  const [showModal, setShowModal] = useState<false | true>(false)
  const [showModalInclude, setShowModalInclude] = useState<false | true>(false)
  const [elementEdit, setElementEdit] = useState<Item>()
  const [elementIndex, setElementIndex] = useState<number>()



  const [lista, setLista] = useState<Item[]>([])


  type Item = {
    id: string
    name: string
    value: number
    date: string
    category: string
    type: string
  }

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

    console.log(item)
    setLista([...lista, item])
    setShowModalInclude(false)
  }

  const deleteItem = (i: string) => {
    const newList = lista.filter(element => (element.id !== i))
    if (newList.length == 0) localStorage.setItem('Lista', JSON.stringify(newList))
    setLista(newList)
  }

  const editItem = (e: any, id: string) => {
    e.preventDefault()

    const item: Item = {
      id: id,
      name: e.target.name.value,
      value: Number(e.target.value.value),
      date: e.target.date.value,
      category: e.target.category.value,
      type: e.target.type.value
    }

    const newList = lista.map((element) => {
      return id === element.id ? item : element
    })

    setLista(newList.sort((a: any, b: any) => new Date(a.date) - new Date(b.date)))

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


  const handleShowModal = (e) => {

  }




  return (
    <>

      <div className="painel">
        <div className="painel__card">
          <h3 className="painel__card-title">Receitas</h3>
          <span style={{ color: '#37ad37' }}>R$ +{receita().toFixed(2)}</span>
        </div>
        <div className="painel__card">
          <h3 className="painel__card-title">Despesas</h3>
          <span style={{ color: '#f13333' }}>R$ -{despesa().toFixed(2)}</span>
        </div>
        <div className="painel__card">
          <h3 className="painel__card-title">Saldo</h3>
          <span style={{ color: '#1e90ff' }}>R$ {(receita() - despesa()).toFixed(2)}</span>
        </div>
      </div>

      <Chart list={lista} />




      <ListItem list={lista} deleteItem={deleteItem} setShowModal={setShowModal} setShowModalInclude={setShowModalInclude} setElementEdit={setElementEdit} />


      {showModal && <Modal type='edit' elementEdit={elementEdit} onSubmit={editItem} onClick={setShowModal} />}
      {showModalInclude && <Modal type='include' onSubmit={includeValores} onClick={setShowModalInclude} />}

    </>
  )
}