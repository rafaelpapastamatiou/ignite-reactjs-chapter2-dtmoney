import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'

import { api } from '../services/api'

interface Transaction {
  id: number;
  title: string;
  type: string;
  category: string;
  value: number;
  createdAt: string;
}

type TransactionInput = Omit<Transaction , 'id' | 'createdAt'>

interface TransactionsProviderChildren {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderChildren){
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get<{ transactions: Transaction[] }>('http://localhost:3000/api/transactions')
    .then(response => setTransactions(response.data.transactions))
  }, [])

  const createTransaction = useCallback(async (transaction: TransactionInput) => {
    const response = await api.post('/transactions', transaction)

    setTransactions(state => [...state, response.data.transaction])
  }, [])

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions(){
  const context = useContext(TransactionsContext)

  return context;
}