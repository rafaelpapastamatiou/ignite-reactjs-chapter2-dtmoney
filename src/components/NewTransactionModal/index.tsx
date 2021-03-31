import React, { useState, useCallback, FormEvent } from 'react'

import Modal from 'react-modal'

import { useTransactions } from '../../hooks/useTransactions';

import { Container, TransactionTypeContainer, TransactionTypeRadioButton } from './styles';

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({ isOpen, onRequestClose }) => {
  const { createTransaction } = useTransactions()

  const [type, setType] = useState<'deposit' | 'withdraw'>('deposit')

  const [title, setTitle] = useState('')

  const [value, setValue] = useState(0)

  const [category, setCategory] = useState('')

  const handleChangeType = useCallback((type: 'deposit' | 'withdraw') => {
    setType(type)
  }, [])

  const handleCreateNewTransaction = useCallback(async (e: FormEvent) => {
    e?.preventDefault()

    await createTransaction({ title, type, value, category })

    setTitle('')
    setValue(0)
    setCategory('')
    setType('deposit')

    onRequestClose()
  }, [createTransaction, onRequestClose, category, title, type, value])

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    > 
      <button type="button" className="react-modal-close">
        <img src={closeImg} alt="Fechar modal" onClick={onRequestClose}/>
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        
        <input 
          placeholder='Título' 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
        />

        <input 
          type='number' 
          placeholder='Valor' 
          value={value} 
          onChange={e => setValue(Number(e.target.value))} 
        />

        <TransactionTypeContainer>
          <TransactionTypeRadioButton 
            type="button" 
            onClick={() => handleChangeType('deposit')} 
            selected={type === 'deposit'}
            selectedColor='green'
          >
            <img src={incomeImg} alt="Entrada"/>
            <span>Entrada</span>
          </TransactionTypeRadioButton>
          <TransactionTypeRadioButton 
            type="button" 
            onClick={() => handleChangeType('withdraw')} 
            selected={type === 'withdraw'}
            selectedColor='red'
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </TransactionTypeRadioButton>
        </TransactionTypeContainer>

        <input 
          placeholder='Categoria' 
          value={category} 
          onChange={e => setCategory(e.target.value)} 
        />

        <button type="submit">Cadastrar</button>

      </Container>
    </Modal>
  )
}
