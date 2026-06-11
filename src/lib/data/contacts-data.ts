
export interface Contact {
    id: number;
    name: string;
    phone: string;
    email: string;
    fallback: string;
}

export const contacts: Contact[] = [
    {
        id: 1,
        name: 'Alex Doe',
        phone: '(555) 111-2222',
        email: 'alex.doe@example.com',
        fallback: 'AD',
    },
    {
        id: 2,
        name: 'Brenda Smith',
        phone: '(555) 333-4444',
        email: 'brenda.smith@example.com',
        fallback: 'BS',
    },
    {
        id: 3,
        name: 'Charles Green',
        phone: '(555) 555-6666',
        email: 'charles.green@example.com',
        fallback: 'CG',
    },
    {
        id: 4,
        name: 'Diana White',
        phone: '(555) 777-8888',
        email: 'diana.white@example.com',
        fallback: 'DW',
    }
];
