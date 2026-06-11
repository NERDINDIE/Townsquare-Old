
import { Ban, Briefcase, Code, FileText, Gift, Palette, Shield, ShoppingCart, Star, UserCircle, UserPlus, Users, Book } from "@/components/icons";

export const accountTypes = [
    { 
        name: 'Guest', 
        description: 'Limited access to browse content.', 
        icon: <UserCircle className="h-8 w-8" />,
        color: 'bg-gray-500',
    },
    { 
        name: 'Member', 
        description: 'Standard access for registered users.', 
        icon: <Users className="h-8 w-8" />,
        color: 'bg-blue-500',
    },
    { 
        name: 'Seller', 
        description: 'Manage products and storefronts in the Marketplace.', 
        icon: <ShoppingCart className="h-8 w-8" />,
        color: 'bg-green-500',
    },
    { 
        name: 'Content Provider', 
        description: 'Publish articles, videos, and podcasts.', 
        icon: <FileText className="h-8 w-8" />,
        color: 'bg-indigo-500',
    },
    { 
        name: 'Partner', 
        description: 'Collaborate with Townsquare on brand initiatives.', 
        icon: <Briefcase className="h-8 w-8" />,
        color: 'bg-purple-500',
    },
    { 
        name: 'Publisher', 
        description: 'Manage your own publication or zine.', 
        icon: <Book className="h-8 w-8" />,
        color: 'bg-teal-500',
    },
    { 
        name: 'Developer', 
        description: 'Access developer tools and APIs.', 
        icon: <Code className="h-8 w-8" />,
        color: 'bg-gray-700',
    },
    { 
        name: 'Moderator', 
        description: 'Help maintain community standards and safety.', 
        icon: <Shield className="h-8 w-8" />,
        color: 'bg-red-500',
    },
];
