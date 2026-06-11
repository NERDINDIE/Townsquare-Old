
'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader } from "./ui/card";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { PlusCircle, Smartphone, Watch, Orbit, Bell, Settings, Radio } from "lucide-react";
import { WatchfaceMaker } from "./WatchfaceMaker";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { toast } from "@/hooks/use-toast";
import { Progress } from "./ui/progress";

const connectedDevices = [
    { name: 'Pixel Watch 2', type: 'WearOS', icon: <Watch className="h-6 w-6"/> },
    { name: 'Apple Watch Ultra', type: 'WatchOS', icon: <Smartphone className="h-6 w-6"/> },
]

export function WearablesManager() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [updatingDeviceId, setUpdatingDeviceId] = useState<string | null>(null);
    const [updateProgress, setUpdateProgress] = useState(0);

    const handleFindDevice = (deviceName: string) => {
        toast({
            title: "Finding Device",
            description: `Pinging your ${deviceName}... It should be making a sound now.`,
        });
    };
    
    const handleUpdateOS = (deviceName: string) => {
        setUpdatingDeviceId(deviceName);
        setUpdateProgress(0);

        const interval = setInterval(() => {
            setUpdateProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUpdatingDeviceId(null);
                    toast({
                        title: "Update Complete",
                        description: `Your ${deviceName} is now up to date.`,
                    });
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    return (
        <div>
            <p className="text-sm text-muted-foreground mb-4">
                Connect your favorite wearables to receive notifications and quick updates on the go.
            </p>

            <Accordion type="single" collapsible className="w-full space-y-4">
                 {connectedDevices.map((device, index) => (
                    <AccordionItem value={`item-${index}`} key={index} className="border-b-0">
                         <Card>
                             <AccordionTrigger className="w-full p-0 hover:no-underline">
                                <CardHeader className="flex flex-row items-center gap-4 w-full p-4">
                                     <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                        {device.icon}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className="font-semibold text-lg">{device.name}</p>
                                        <p className="text-sm text-muted-foreground">{device.type}</p>
                                    </div>
                                </CardHeader>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 space-y-4">
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                     <Button variant="outline" onClick={() => handleFindDevice(device.name)}>
                                        <Orbit className="mr-2 h-4 w-4" /> Find My Watch
                                    </Button>
                                    <Button variant="outline" onClick={() => handleFindDevice('Phone')}>
                                        <Smartphone className="mr-2 h-4 w-4" /> Find My Phone
                                    </Button>
                                </div>
                                <Card className="bg-muted/50">
                                    <CardHeader>
                                        <CardTitle className="text-base">Software Update</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {updatingDeviceId === device.name ? (
                                            <div>
                                                <p className="text-sm mb-2">Updating... {updateProgress}%</p>
                                                <Progress value={updateProgress} />
                                            </div>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">Your watch is up to date.</p>
                                        )}
                                    </CardContent>
                                    <CardFooter>
                                         <Button size="sm" onClick={() => handleUpdateOS(device.name)} disabled={updatingDeviceId !== null}>
                                            Check for Update
                                        </Button>
                                    </CardFooter>
                                </Card>
                                <Card className="bg-muted/50">
                                    <CardHeader>
                                        <CardTitle className="text-base">Remote Control</CardTitle>
                                    </CardHeader>
                                     <CardContent className="flex gap-2">
                                        <Button variant="secondary" size="sm"><Radio className="mr-2"/>Media</Button>
                                        <Button variant="secondary" size="sm"><Bell className="mr-2"/>Notifications</Button>
                                         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button variant="secondary" size="sm"><Settings className="mr-2"/>Watch Face</Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-md p-0 bg-black border-gray-700">
                                                <WatchfaceMaker onClose={() => setIsDialogOpen(false)} />
                                            </DialogContent>
                                        </Dialog>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                         </Card>
                    </AccordionItem>
                ))}
            </Accordion>
            
            <Button variant="outline" className="mt-6 w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Connect a New Device
            </Button>
        </div>
    )
}
