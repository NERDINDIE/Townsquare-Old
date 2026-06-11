
'use client';

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { PlusCircle } from "lucide-react";

const initialProfiles = [
    { name: 'Jane Doe', avatar: 'https://github.com/shadcn.png', type: 'Adult' as const, initials: 'JD' },
];

const kidAvatars = [
    'https://placehold.co/100x100/FFC107/424242?text=A',
    'https://placehold.co/100x100/4CAF50/FFFFFF?text=B',
    'https://placehold.co/100x100/2196F3/FFFFFF?text=C',
    'https://placehold.co/100x100/E91E63/FFFFFF?text=D',
    'https://placehold.co/100x100/9C27B0/FFFFFF?text=E',
]

export function ProfileSwitcher() {
    const [profiles, setProfiles] = useState(initialProfiles);
    const [newProfileName, setNewProfileName] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(kidAvatars[0]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddProfile = () => {
        if(newProfileName.trim()) {
            const newProfile = {
                name: newProfileName,
                avatar: selectedAvatar,
                type: 'Child' as const,
                initials: newProfileName.charAt(0).toUpperCase(),
            };
            setProfiles([...profiles, newProfile]);
            setNewProfileName('');
            setSelectedAvatar(kidAvatars[0]);
            setIsDialogOpen(false);
        }
    }

    return (
        <div>
            <div className="space-y-4">
                {profiles.map((profile, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center gap-4 p-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={profile.avatar} alt={profile.name} />
                                <AvatarFallback>{profile.initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold text-lg">{profile.name}</p>
                            </div>
                            <Badge variant={profile.type === 'Adult' ? 'secondary' : 'default'} className={profile.type === 'Child' ? 'bg-blue-500' : ''}>
                                {profile.type}
                            </Badge>
                        </CardHeader>
                    </Card>
                ))}
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="mt-6 w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Child Profile
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add a Child Profile</DialogTitle>
                        <DialogDescription>
                            Create a new profile for a child to give them access to the Playground.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                             <Label htmlFor="name">Child's Name</Label>
                            <Input 
                                id="name" 
                                placeholder="e.g. Alex" 
                                value={newProfileName}
                                onChange={(e) => setNewProfileName(e.target.value)}
                            />
                        </div>
                       <div className="space-y-2">
                            <Label>Choose an Avatar</Label>
                            <div className="flex flex-wrap gap-2">
                                {kidAvatars.map((avatarUrl, index) => (
                                    <button key={index} onClick={() => setSelectedAvatar(avatarUrl)} className={`rounded-full border-2 ${selectedAvatar === avatarUrl ? 'border-primary' : 'border-transparent'} p-0.5`}>
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={avatarUrl} />
                                            <AvatarFallback>{index}</AvatarFallback>
                                        </Avatar>
                                    </button>
                                ))}
                            </div>
                       </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddProfile}>Create Profile</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
