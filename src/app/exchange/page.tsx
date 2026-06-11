
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Building, Calendar, Globe, Search, User, UserCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';

const jobs = [
    { title: 'Senior Product Manager', company: 'Innovate Corp', location: 'Remote', type: 'Full-time' },
    { title: 'UX/UI Designer', company: 'Creative Solutions', location: 'New York, NY', type: 'Contract' },
    { title: 'Backend Developer (Python)', company: 'Data Systems', location: 'San Francisco, CA', type: 'Full-time' },
];

const gigs = [
    { title: 'Logo Design for Startup', budget: '$500', skills: ['Graphic Design', 'Branding'] },
    { title: 'Write 5 Blog Posts about Tech', budget: '$750', skills: ['Copywriting', 'SEO'] },
];

const events = [
    { name: 'Tech Innovators Mixer', date: 'Nov 15, 2023', type: 'Networking' },
    { name: 'Future of Work Summit', date: 'Dec 5, 2023', type: 'Conference' },
]

export default function ExchangePage() {
    return (
        <div 
            className="container mx-auto max-w-5xl px-4 py-8 md:py-12"
            style={{'--brand-color': 'hsl(var(--brand-exchange))'} as React.CSSProperties}
        >
            <header className="mb-8">
                <h1 className="font-headline text-5xl font-bold flex items-center gap-3" style={{color: 'var(--brand-color)'}}>
                   <Briefcase className="h-12 w-12" />
                    Exchange
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Your hub for professional opportunities and networking.
                </p>
            </header>

            <section className="mb-12">
                 <Card className="p-6 bg-muted/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                        <label htmlFor="search-jobs" className="block text-sm font-medium text-muted-foreground mb-1">
                            Search jobs or keywords
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                            id="search-jobs"
                            type="search"
                            placeholder="Job title, skill, or company"
                            className="w-full h-12 pl-10"
                            />
                        </div>
                        </div>
                         <div>
                        <label htmlFor="search-location" className="block text-sm font-medium text-muted-foreground mb-1">
                            Location
                        </label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                            id="search-location"
                            type="search"
                            placeholder="City, state, or remote"
                            className="w-full h-12 pl-10"
                            />
                        </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button size="lg" style={{ backgroundColor: 'var(--brand-color)' }}>Find Jobs</Button>
                    </div>
                </Card>
            </section>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <main className="lg:col-span-2 space-y-8">
                    <section>
                        <h2 className="font-headline text-3xl font-bold mb-6">Featured Job Postings</h2>
                        <div className="space-y-4">
                            {jobs.map(job => (
                                <Card key={job.title}>
                                    <CardHeader>
                                        <CardTitle>{job.title}</CardTitle>
                                        <CardDescription className="flex items-center gap-4 pt-1">
                                            <span className="flex items-center gap-1.5"><Building className="h-4 w-4"/> {job.company}</span>
                                            <span className="flex items-center gap-1.5"><Globe className="h-4 w-4"/> {job.location}</span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter className="flex justify-between">
                                        <Badge variant="secondary">{job.type}</Badge>
                                        <Button>Apply Now</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </section>
                     <Separator />
                     <section>
                        <h2 className="font-headline text-3xl font-bold mb-6">Freelance Gigs</h2>
                         <div className="space-y-4">
                            {gigs.map(gig => (
                                <Card key={gig.title}>
                                    <CardHeader>
                                        <CardTitle>{gig.title}</CardTitle>
                                         <div className="flex gap-2 pt-2">
                                            {gig.skills.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
                                        </div>
                                    </CardHeader>
                                    <CardFooter className="flex justify-between items-center">
                                       <p className="font-semibold text-lg" style={{color: 'var(--brand-color)'}}>{gig.budget}</p>
                                       <Button>View Details</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </section>
                </main>
                <aside className="space-y-8">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><UserCheck className="h-5 w-5"/> Your Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <Button className="w-full">Complete Your Profile</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5"/> Networking Events</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {events.map(event => (
                                <div key={event.name}>
                                    <p className="font-semibold">{event.name}</p>
                                    <p className="text-sm text-muted-foreground">{event.date} &bull; {event.type}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
