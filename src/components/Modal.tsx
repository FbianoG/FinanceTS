import './Modal.css'

interface ModalProps {
    type: 'include' | 'edit'
    elementEdit?: any
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    onClick: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<ModalProps> = ({ type, elementEdit, onSubmit, onClick }) => {

    return (

        <div className="modal">
            {type === 'edit' &&
                <form className="modal__content" onSubmit={(e) => onSubmit(e)}>
                    <h2>Editar Item</h2>
                    <input type='text' name='name' defaultValue={elementEdit?.name} placeholder='Nome' required />
                    <input type='date' name='date' defaultValue={elementEdit?.date} required />
                    <input type='number' name='value' defaultValue={elementEdit?.value} placeholder='R$' required />
                    <select name='category' defaultValue={elementEdit?.category} >
                        <option value="educação">Educação</option>
                        <option value="comida">Comida</option>
                        <option value="lazer">Lazer</option>
                        <option value="saúde">Saúde</option>
                        <option value="veículo">Veículo</option>
                        <option value="trabalho">Trabalho</option>

                    </select>
                    <select name='type' defaultValue={elementEdit?.type}>
                        <option value="entrada">Entrada</option>
                        <option value="saída">Saída</option>
                    </select>
                    <button type='submit'>Editar Item</button>
                    <span title='Fechar' onClick={() => onClick(false)}>❌</span>
                </form>
            }

            {type === 'include' &&
                <form className="modal__content" onSubmit={(e) => onSubmit(e)}>
                    <h2>Adicionar Item</h2>
                    <input type='text' name='name' placeholder='Nome' required />
                    <input type='date' name='date' required />
                    <input type='number' name='value' placeholder='R$' required />
                    <select name='category'  >
                        <option value="comida">Comida</option>
                        <option value="compras">Compras</option>
                        <option value="educação">Educação</option>
                        <option value="lazer">Lazer</option>
                        <option value="saúde">Saúde</option>
                        <option value="trabalho">Trabalho</option>
                        <option value="veículo">Veículo</option>
                        <option value="outros">Outros</option>

                    </select>
                    <select name='type'>
                        <option value="entrada">🔷 Entrada</option>
                        <option value="saída">🔶 Saída</option>
                    </select>
                    <button type='submit'>Adicionar item</button>
                    <span title='Fechar' onClick={() => onClick(false)}>❌</span>
                </form>
            }




        </div>
    )
}

export default Modal