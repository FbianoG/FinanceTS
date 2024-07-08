import { useEffect, useState } from 'react'
import './Item.css'
import { Item } from '../App'

interface ListProps {
    list: any
    deleteItem: any
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    setElementEdit: React.Dispatch<React.SetStateAction<any>>
    setShowModalInclude: React.Dispatch<React.SetStateAction<boolean>>
}

const ListItem: React.FC<ListProps> = ({ list, deleteItem, setShowModal, setElementEdit, setShowModalInclude }) => {

    const [filter, setFilter] = useState<string>()
    const [listFilter, setListFilter] = useState<any>([])

    useEffect(() => {
        if (!filter) return
        if (filter === 'value') setListFilter([...list].sort((a, b) => a.value - b.value))
        if (filter === 'date') setListFilter([...list].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
        if (filter === 'name') setListFilter([...list].sort((a, b) => a.name.localeCompare(b.name)))
        if (filter === 'category') setListFilter([...list].sort((a, b) => a.category.localeCompare(b.category)))
        if (filter === 'type') setListFilter([...list].sort((a, b) => a.type.localeCompare(b.type)))
    }, [filter])


    useEffect(() => { setListFilter(list) }, [list])

    return (
        <div className='list__item'>
            <div className="item__header">
                <span onClick={() => setFilter('name')}>Nome</span>
                <span onClick={() => setFilter('value')}>Valor</span>
                <span onClick={() => setFilter('date')}>Data</span>
                <span onClick={() => setFilter('type')}>Tipo</span>
                <span onClick={() => setFilter('category')}>Categoria</span>
                <button title='Incluir item' onClick={() => setShowModalInclude(true)}>➕</button>
            </div>
            <div className="list">
                {listFilter.map((element: Item) => (
                    <div className="item" key={element.id}>
                        <span>{element.name}</span>
                        <span>R${(element.value).toFixed(2)}</span>
                        <span>{element.date.split('-').reverse().join('/')}</span>
                        <span>{element.type === 'entrada' ? '🔷' : '🔶'}</span>
                        <span>{element.category}</span>
                        <button title='Editar item' onClick={() => { setShowModal(true); setElementEdit(element) }}>✏️</button>
                        <button title='Excluir item' onClick={() => deleteItem(element.id)}>🗑️</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListItem