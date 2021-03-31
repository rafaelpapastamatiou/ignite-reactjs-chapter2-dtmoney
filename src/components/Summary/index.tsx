import React, { useMemo } from 'react';

import { useTransactions } from '../../hooks/useTransactions';

import { Container } from './styles';

import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'


export const Summary: React.FC = () => {

  const { transactions } = useTransactions()

  const summary = useMemo(() => {
    return transactions.reduce((acc, next) => {
      if(next.type === 'deposit'){
        acc.deposits += next.value
        acc.total += next.value
      } else {
        acc.withdraws += next.value
        acc.total -= next.value
      }

      return acc
    }, 
    {
      deposits: 0, 
      withdraws: 0, 
      total: 0
    }
    )
  }, [transactions])

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas"/>
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas"/>
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.withdraws)}
        </strong>
      </div>
      <div className='hightlight-background'>
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total"/>
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}