
export interface Expense {
    id: number;
    description: string;
    amount: number;
    category: 'Food' | 'Transport' | 'Shopping' | 'Housing';
    date: string;
}

export const initialExpenses: Expense[] = [
    { id: 1, description: 'Groceries', amount: 75.40, category: 'Food', date: '2023-10-26' },
    { id: 2, description: 'Train Ticket', amount: 12.50, category: 'Transport', date: '2023-10-26' },
    { id: 3, description: 'New pair of shoes', amount: 120.00, category: 'Shopping', date: '2023-10-25' },
    { id: 4, description: 'Rent for November', amount: 1250.00, category: 'Housing', date: '2023-10-25' },
    { id: 5, description: 'Lunch with colleagues', amount: 22.80, category: 'Food', date: '2023-10-24' },
];
