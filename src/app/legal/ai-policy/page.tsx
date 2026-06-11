
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "@/components/icons";
import Link from "next/link";

export default function AiPolicyPage() {
    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
             <header className="mb-8">
                <Button asChild variant="ghost" className="mb-4 -ml-4">
                    <Link href="/legal">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Legal
                    </Link>
                </Button>
                <h1 className="font-headline text-4xl font-bold">AI Usage & Safety Policy</h1>
                <p className="text-muted-foreground mt-1">
                    Our commitment to responsible and ethical AI.
                </p>
            </header>

            <div className="prose dark:prose-invert max-w-none space-y-6">
                <p>
                    Townsquare utilizes generative AI to power various creative and assistive features throughout the application. We are committed to the responsible development and deployment of this technology. This policy outlines the principles and restrictions governing the use of AI on our platform.
                </p>
                
                <h2 className="font-headline text-2xl font-bold">1. Our Commitment to Safety</h2>
                <p>
                    We employ multiple layers of safety measures to prevent the generation of harmful content. This includes, but is not limited to:
                </p>
                <ul>
                    <li>
                        <strong>Prompt and Output Filtering:</strong> We use safety classifiers and content filters provided by our AI model partners (e.g., Google's Gemini Safety Filters) to block harmful inputs and outputs.
                    </li>
                    <li>
                        <strong>Internal Moderation Flows:</strong> We have developed proprietary AI flows, like our Guideline Checker, to analyze content against our specific community and partnership standards.
                    </li>
                    <li>
                        <strong>User Reporting:</strong> We empower our users to report any content they find inappropriate or harmful, which is then reviewed by our moderation team.
                    </li>
                </ul>

                <h2 className="font-headline text-2xl font-bold">2. Prohibited Uses of AI Features</h2>
                <p>
                    Users may not use Townsquare's AI features to create or distribute content that is:
                </p>
                 <ul>
                    <li>
                        <strong>Hate Speech or Harassment:</strong> Content that promotes discrimination, disparages, or harasses on the basis of race, ethnicity, religion, gender, sexual orientation, disability, or other protected characteristics.
                    </li>
                    <li>
                        <strong>Sexually Explicit:</strong> Generating pornographic material or content that is sexually explicit or exploitative.
                    </li>
                    <li>
                        <strong>Violent or Graphic:</strong> Content that glorifies violence, incites violence against individuals or groups, or graphically depicts acts of violence.
                    </li>
                    <li>
                        <strong>Self-Harm:</strong> Content that encourages or provides instructions on how to self-harm or commit suicide.
                    </li>
                    <li>
                        <strong>Misinformation and Disinformation:</strong> Creating content that is deliberately false and intended to mislead people on important civic or health matters.
                    </li>
                    <li>
                        <strong>Malicious Impersonation & Deepfakes:</strong> Creating convincing but false images, audio, or video of individuals (i.e., "deepfakes") without consent, especially for malicious purposes like misinformation or harassment.
                    </li>
                </ul>
                
                <h2 className="font-headline text-2xl font-bold">3. User Responsibility</h2>
                <p>
                   You are responsible for the prompts you provide to the AI and the content you ultimately choose to create and share. While our safety systems are robust, they are not infallible. Attempting to circumvent these safety measures is a violation of our terms of service and may result in account suspension or termination.
                </p>

                 <h2 className="font-headline text-2xl font-bold">4. Continuous Improvement</h2>
                <p>
                    The field of AI safety is constantly evolving. We are committed to continuously updating our models, policies, and safety systems to address new and emerging threats. We appreciate our community's help in identifying areas for improvement.
                </p>
            </div>
        </div>
    );
}
