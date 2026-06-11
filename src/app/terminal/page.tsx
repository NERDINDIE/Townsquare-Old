
'use client';

import { cn } from '@/lib/utils';
import { Terminal as TerminalIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const commands = {
    help: 'Available commands: help, about, clear, bbs, exit',
    about: 'Townsquare Terminal v1.0. A gateway to the digital arcade.',
    clear: '',
    bbs: 'Redirecting to BBS...',
    exit: 'Exiting terminal...',
};

export default function TerminalPage() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<string[]>(['Welcome to the Arcade Saloon Terminal.', 'Type `help` to see available commands.']);
    const router = useRouter();
    
    useEffect(() => {
        const terminalInput = document.getElementById('terminal-input');
        if (terminalInput) {
            terminalInput.focus();
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const command = input.trim().toLowerCase();
        let newOutput = [...output, `> ${input}`];

        if (command in commands) {
             const result = commands[command as keyof typeof commands];
             if (command === 'clear') {
                 newOutput = [];
             } else if (command === 'bbs') {
                 newOutput.push(result);
                 setTimeout(() => router.push('/teletext'), 1000);
             } else if (result) {
                newOutput.push(result);
             }
        } else if (command) {
            newOutput.push(`Command not found: ${command}`);
        }
        
        setOutput(newOutput);
        setInput('');

        setTimeout(() => {
            const terminalWindow = document.getElementById('terminal-window');
            if (terminalWindow) {
                terminalWindow.scrollTop = terminalWindow.scrollHeight;
            }
        }, 0);
    };

    return (
        <div 
            className="flex flex-col h-screen bg-black text-green-400 p-4 font-mono text-lg"
            onClick={() => document.getElementById('terminal-input')?.focus()}
            style={{fontFamily: "'VT323', monospace"}}
        >
            <div id="terminal-window" className="flex-1 overflow-y-auto">
                {output.map((line, index) => (
                    <div key={index} className="whitespace-pre-wrap">{line}</div>
                ))}
                <form onSubmit={handleFormSubmit} className="flex">
                    <span className="text-green-400 mr-2">&gt;</span>
                    <input
                        id="terminal-input"
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        className="bg-transparent border-none text-green-400 focus:outline-none w-full"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                    />
                </form>
            </div>
            <footer className="border-t border-green-400/50 pt-2 mt-4 text-xs flex justify-between">
                <span>[ ARCADE SALOON TERMINAL ]</span>
                <span>Type 'exit' to close</span>
            </footer>
        </div>
    );
}
