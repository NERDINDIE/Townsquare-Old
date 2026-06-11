
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Link as LinkIcon } from "@/components/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { services } from "@/lib/data/connections-data";


export default function ConnectionsPage() {
    const router = useRouter();
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <header className="mb-8 flex items-center gap-4">
        <Button onClick={() => router.back()} variant="ghost" size="icon">
            <ArrowLeft />
        </Button>
        <h1 className="font-headline text-2xl font-bold flex items-center gap-2">
            <LinkIcon className="h-6 w-6" />
            Connections
        </h1>
      </header>

      <div className="space-y-4">
        {services.map((service) => {
          const serviceCard = (
            <Card key={service.name}>
              <CardHeader className="flex flex-row items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription className="mt-1">{service.description}</CardDescription>
                </div>
                <Button variant={service.connected ? 'secondary' : 'outline'}>
                  {service.buttonText}
                </Button>
              </CardHeader>
            </Card>
          );
          return service.href ? <Link href={service.href} key={service.name}>{serviceCard}</Link> : serviceCard;
        })}
      </div>
    </div>
  );
}
