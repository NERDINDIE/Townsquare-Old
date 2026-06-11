
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "@/components/icons";
import Link from "next/link";


export default function PartnershipGuidelinesPage() {
    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
             <header className="mb-8">
                <Button asChild variant="ghost" className="mb-4 -ml-4">
                    <Link href="/legal">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Legal
                    </Link>
                </Button>
                <h1 className="font-headline text-4xl font-bold">Partnership Guidelines</h1>
                <p className="text-muted-foreground mt-1">
                    Core principles for all content and brand partnerships.
                </p>
            </header>

            <div className="prose dark:prose-invert max-w-none space-y-6">
                <p>
                    Townsquare is committed to maintaining a high-quality, trustworthy, and user-centric platform. All partnerships, whether with individuals or third-party brands, are subject to the following unbreakable guidelines. Adherence to these principles is non-negotiable and is a prerequisite for any collaboration.
                </p>
                
                <h2 className="font-headline text-2xl font-bold">1. User Experience First</h2>
                <p>
                    The experience of our users is paramount. Partnership content must not be intrusive, disruptive, or deceptive. This includes, but is not limited to:
                </p>
                <ul>
                    <li>
                        <strong>No Intrusive Advertising:</strong> Autoplaying video/audio ads, pop-ups, and screen-takeover ads are strictly prohibited.
                    </li>
                    <li>
                        <strong>No Dark Patterns:</strong> Interfaces must be clear, honest, and may not trick users into taking actions they did not intend.
                    </li>
                     <li>
                        <strong>Performance:</strong> Partner content must be optimized for performance and not degrade the speed or responsiveness of the application.
                    </li>
                </ul>

                <h2 className="font-headline text-2xl font-bold">2. Absolute Transparency</h2>
                <p>
                    Users have an unconditional right to know when they are interacting with sponsored or partnered content. All collaborations must be clearly, conspicuously, and unambiguously disclosed.
                </p>
                 <ul>
                    <li>
                        All sponsored content must be labeled with "Sponsored," "Advertisement," or "In partnership with [Brand Name]" at the beginning of the content.
                    </li>
                     <li>
                        Native advertising that is designed to blend in with non-sponsored content is forbidden. The distinction must always be clear to the user.
                    </li>
                </ul>
                
                <h2 className="font-headline text-2xl font-bold">3. Content Integrity and Quality</h2>
                <p>
                    We maintain a high standard for all content on our platform, and partner content is no exception.
                </p>
                <ul>
                    <li>
                        <strong>Factual Accuracy:</strong> All claims made in partnered content must be verifiably true and not misleading. Partners are responsible for the accuracy of their content.
                    </li>
                     <li>
                        <strong>No Harmful Content:</strong> Content promoting hate speech, discrimination, violence, harassment, or misinformation is strictly prohibited.
                    </li>
                     <li>
                        <strong>Quality Standards:</strong> All content must be well-produced, professionally presented, and provide genuine value to our users.
                    </li>
                </ul>

                <h2 className="font-headline text-2xl font-bold">4. Brand and Mission Alignment</h2>
                <p>
                    We only partner with individuals and brands that align with our core mission of fostering community, promoting knowledge, and encouraging creativity. We reserve the unconditional right to refuse or terminate a partnership with any entity that we believe contradicts these values or could harm the reputation or trust of the Townsquare platform.
                </p>

                <h2 className="font-headline text-2xl font-bold">Review and Enforcement</h2>
                <p>
                    All potential partners will undergo a review process. Townsquare reserves the right to reject any partnership proposal for any reason. Existing partners found to be in violation of these guidelines will have their partnership terminated immediately. These guidelines are subject to change without notice.
                </p>

                <Button asChild variant="link" className="p-0">
                    <Link href="/legal/partnership-inquiry">Proceed to Partnership Inquiry Form &rarr;</Link>
                 </Button>

            </div>

        </div>
    );
}
