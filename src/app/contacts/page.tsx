
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, PlusCircle, User, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Contact, contacts as initialContacts } from '@/lib/data/contacts-data';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function ContactsPage() {
    const router = useRouter();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // This simulates fetching contacts. In a real app, you might fetch from an API.
        // For the prototype, we add a check to see if the contact has been added to the mock file.
        const updatedContacts = [...initialContacts];
        const newContactName = localStorage.getItem('new_contact_name');
        if (newContactName) {
             const newContactPhone = localStorage.getItem('new_contact_phone') || 'N/A';
             if (!updatedContacts.some(c => c.name === newContactName)) {
                updatedContacts.push({
                    id: Date.now(),
                    name: newContactName,
                    phone: newContactPhone,
                    email: localStorage.getItem('new_contact_email') || 'N/A',
                    fallback: newContactName.charAt(0).toUpperCase(),
                });
             }
        }
        setContacts(updatedContacts);
    }, []);

    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedContacts = filteredContacts.reduce((acc, contact) => {
        const firstLetter = contact.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(contact);
        return acc;
    }, {} as Record<string, Contact[]>);


    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            <header className="p-4 border-b bg-background flex-shrink-0 z-10 flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-xl font-bold">Contacts</h1>
                <Button asChild variant="ghost" size="icon">
                    <Link href="/contacts/new">
                        <PlusCircle />
                    </Link>
                </Button>
            </header>

            <div className="p-4 flex-shrink-0">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Search" 
                        className="pl-10 h-11"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            <main className="flex-1 overflow-y-auto">
                {Object.keys(groupedContacts).sort().map(letter => (
                    <div key={letter}>
                        <div className="px-4 py-1 bg-gray-100 sticky top-0">
                            <h2 className="text-sm font-bold text-muted-foreground">{letter}</h2>
                        </div>
                        <div className="divide-y">
                        {groupedContacts[letter].map(contact => (
                            <div key={contact.id} className="p-4 flex items-center gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback>{contact.fallback}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold">{contact.name}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon"><Phone className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="icon"><Mail className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}
