import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type !== 'income'.toLowerCase() && type !== 'outcome'.toLowerCase()) {
      throw new Error('Only accepted types are: income or outcome');
    }

    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome'.toLowerCase() && value > total) {
      throw new Error('Dont has cash in your wallet! ');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
