
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "@/components/icons";
import Link from "next/link";


export default function CopyrightPolicyPage() {
    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
             <header className="mb-8">
                <Button asChild variant="ghost" className="mb-4 -ml-4">
                    <Link href="/legal">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Legal
                    </Link>
                </Button>
                <h1 className="font-headline text-4xl font-bold">Copyright Policy</h1>
                <p className="text-muted-foreground mt-1">
                    Our policy regarding content and fair use.
                </p>
            </header>

            <div className="prose dark:prose-invert max-w-none space-y-6">
                <p>
                    Townsquare respects the intellectual property rights of others and expects its users to do the same. This policy outlines our approach to copyright and the principles of "Fair Use" under which we operate.
                </p>
                
                <h2 className="font-headline text-2xl font-bold">Fair Use in Our Content</h2>
                <p>
                    Our original content, such as articles and reports, may incorporate third-party copyrighted material under the doctrine of Fair Use. This includes, but is not limited to:
                </p>
                <ul>
                    <li>
                        <strong>News Reporting and Commentary:</strong> We may use brand names, logos, or excerpts of works when reporting on or analyzing news and cultural events.
                    </li>
                    <li>
                        <strong>Parody and Satire:</strong> Content may be used for the purpose of parody, which is a protected form of commentary.
                    </li>
                </ul>
                <p>
                    The use of such material is transformative and for the purpose of public interest, education, and commentary. We strive to use only the amount necessary to convey the intended message.
                </p>

                <h2 className="font-headline text-2xl font-bold">User-Generated Content</h2>
                <p>
                    The Townsquare platform, particularly features like the "Bulletin Board," allows users to post their own content. Users are responsible for the content they post and must ensure they have the necessary rights or are operating under fair use principles themselves.
                </p>
                 <p>
                    Townsquare does not pre-screen user-generated content but will respond to valid notices of alleged copyright infringement.
                </p>
                
                <h2 className="font-headline text-2xl font-bold">Public Domain Content</h2>
                <p>
                    Content that is in the public domain is not protected by copyright and is free for everyone to use. We encourage the use of public domain materials on our platform. Users are welcome to share, remix, and build upon works that are in the public domain.
                </p>

                <h2 className="font-headline text-2xl font-bold">Partnerships</h2>
                <p>
                    We are open to formally partnering with brands and copyright holders to feature their content on our platform. If you are a copyright owner interested in a partnership, please contact us through our Partnership Inquiry form.
                </p>

                 <Button asChild variant="link" className="p-0">
                    <Link href="/legal/partnership-inquiry">Go to Partnership Inquiry Form &rarr;</Link>
                 </Button>

                <h2 className="font-headline text-2xl font-bold">Contact Us</h2>
                <p>
                    If you have any questions about this policy or believe your copyright has been infringed upon, please contact our legal team with a detailed description of the issue.
                </p>
            </div>

        </div>
    );
}
