
import { AlertTriangle, Siren, Waves, Flame, CloudLightning, Home, ShieldAlert, ThermometerSun, Tornado } from '@/components/icons';

const TsunamiIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z"/>
        <path d="M3 12a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v0Z"/>
        <path d="M3 18a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v0Z"/>
    </svg>
);


export const alertTypes = {
    earthquake: {
        title: 'Earthquake',
        icon: <AlertTriangle size={80} className="mb-4 text-black"/>,
        bgColor: 'bg-[#f08080]',
        details: 'Estimated magnitude 6.1, 20 miles away.',
        instructions: [
            { name: 'Drop to your hands and knees.' },
            { name: 'Cover your head and neck with your arms.' },
            { name: 'Hold on to any sturdy shelter.' }
        ]
    },
    flood: {
        title: 'Flood Warning',
        icon: <Waves size={80} className="mb-4 text-black"/>,
        bgColor: 'bg-blue-500',
        details: 'Severe flooding expected. Evacuate to higher ground.',
        instructions: [
            { name: 'Seek higher ground immediately.' },
            { name: 'Do not walk or drive through floodwaters.' },
            { name: 'Listen to emergency broadcast channels.' }
        ]
    },
    wildfire: {
        title: 'Wildfire Alert',
        icon: <Flame size={80} className="mb-4 text-black"/>,
        bgColor: 'bg-orange-500',
        details: 'Rapidly spreading wildfire nearby. Evacuate immediately.',
        instructions: [
            { name: 'Follow evacuation orders from authorities.' },
            { name: 'Stay informed via local news and alerts.' },
            { name: 'Cover your face to protect from smoke.' }
        ]
    },
    'child-abduction': {
        title: 'Child Abduction Alert',
        icon: <Siren size={80} className="mb-4 text-black"/>,
        bgColor: 'bg-amber-500',
        details: 'Child abduction reported. Vehicle: Blue Sedan, Plate: 123-ABC.',
        instructions: [
            { name: 'Be observant of your surroundings.' },
            { name: 'Report any sightings to 911 immediately.' },
            { name: 'Do not approach the vehicle or suspect.' }
        ]
    },
    tornado: {
        title: 'Tornado Warning',
        icon: <Tornado size={80} className="mb-4 text-black"/>,
        bgColor: 'bg-red-600',
        details: 'A tornado has been sighted. Seek shelter immediately.',
        instructions: [
            { name: 'Go to a basement or an interior room on the lowest floor.' },
            { name: 'Stay away from windows, doors, and outside walls.' },
            { name: 'Cover your body with a blanket, sleeping bag, or mattress.' }
        ]
    },
    tsunami: {
        title: 'Tsunami Warning',
        icon: <TsunamiIcon className="mb-4 h-20 w-20 text-black" />,
        bgColor: 'bg-teal-600',
        details: 'Tsunami may have been generated. Move inland to higher ground.',
        instructions: [
            { name: 'Move to the highest possible ground as far inland as you can.' },
            { name: 'Stay there until you are told it is safe to return.' },
            { name: 'Listen to emergency information and authorities.' }
        ]
    },
    thunderstorm: {
        title: 'Severe Thunderstorm',
        icon: <CloudLightning size={80} className="mb-4 text-black"/>,
        bgColor: 'bg-indigo-600',
        details: 'Damaging winds, large hail, and lightning possible.',
        instructions: [
            { name: 'Stay indoors and away from windows.' },
            { name: 'Unplug sensitive electronics to prevent power surge damage.' },
            { name: 'Avoid contact with plumbing and electrical equipment.' }
        ]
    },
    'heat-wave': {
        title: 'Extreme Heat',
        icon: <ThermometerSun size={80} className="mb-4 text-black"/>,
        bgColor: 'bg-red-500',
        details: 'Dangerously high temperatures expected. Stay cool and hydrated.',
        instructions: [
            { name: 'Drink plenty of water, even if you do not feel thirsty.' },
            { name: 'Stay in an air-conditioned place as much as possible.' },
            { name: 'Check on relatives and neighbors, especially the elderly.' }
        ]
    },
    'civil-emergency': {
        title: 'Civil Emergency',
        icon: <ShieldAlert size={80} className="mb-4 text-black"/>,
        bgColor: 'bg-gray-700',
        details: 'Active threat in your area. Shelter in place. Lock doors.',
        instructions: [
            { name: 'Go indoors immediately and bring your pets with you.' },
            { name: 'Lock all doors and windows. Stay away from them.' },
            { name: 'Await further instructions from authorities.' }
        ]
    }
};
