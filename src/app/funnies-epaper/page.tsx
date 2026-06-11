
'use client';

import Image from "next/image";

const ComicStrip = ({ title, panels, hint }: { title: string, panels: number, hint: string }) => (
    <div className="border-t-2 border-black pt-2">
        <h3 className="font-bold text-center text-sm uppercase mb-1">{title}</h3>
        <div className="flex gap-1">
            {Array.from({ length: panels }).map((_, i) => (
                 <div key={i} className="relative w-full aspect-square border border-black">
                    <Image src={`https://placehold.co/150x150.png`} alt={`${title} panel ${i+1}`} fill style={{ objectFit: 'cover' }} data-ai-hint={hint} />
                </div>
            ))}
        </div>
    </div>
);

const TextBlock = ({ title, content }: { title: string, content: string }) => (
    <div className="p-1">
        <h3 className="font-bold text-center text-sm uppercase border-b border-black mb-1">{title}</h3>
        <p className="text-[10px] leading-tight">{content}</p>
    </div>
)

const Crossword = () => {
    const size = 15;
    return (
        <div className="p-1">
             <h3 className="font-bold text-center text-sm uppercase border-b border-black mb-1">Crossword</h3>
            <div className="grid grid-cols-15 gap-px bg-black aspect-square border border-black" style={{ gridTemplateColumns: `repeat(${size}, 1fr)`}}>
                {Array.from({ length: size * size }).map((_, i) => (
                    <div key={i} className="bg-white" />
                ))}
            </div>
        </div>
    )
}


export default function FunniesEpaperPage() {
    return (
        <div className="bg-amber-50 p-4 font-sans text-black">
            <div className="max-w-7xl mx-auto bg-white p-2">
                <header className="flex justify-between items-center border-b-2 border-black pb-1 text-xs px-2">
                    <span>THE CALGARY HERALD</span>
                    <span>Tuesday, March 29, 1960</span>
                    <span>Page 11</span>
                </header>

                <main className="grid grid-cols-7 gap-2 mt-2">
                    {/* Column 1 */}
                    <div className="space-y-2">
                        <ComicStrip title="They'll Do It Every Time" panels={2} hint="vintage comic" />
                        <ComicStrip title="Crosstown" panels={1} hint="vintage comic" />
                        <ComicStrip title="Strictly Business" panels={1} hint="vintage comic office" />
                    </div>

                    {/* Column 2 */}
                    <div className="col-span-2 space-y-2 border-r-2 border-l-2 border-black px-2">
                         <TextBlock 
                            title="Daily Astrology" 
                            content="ARIES (Mar. 21 to Apr. 20) You will have the opportunity to make a very favorable change today... TAURUS (Apr. 21 to May 21) You should have little trouble solving your financial problems today... GEMINI (May 22 to June 21) Make an effort to be a bit more sociable..." 
                        />
                         <TextBlock 
                            title="Little Stories For Bedtime"
                            content="Grandfather Frog Has a Trying Day. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
                        />
                         <TextBlock 
                            title="That Body Of Yours"
                            content="By James W. Barton, M.D. - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod, dolor eu rutrum feugiat, enim sem dictum odio, vitae aliquet nunc."
                        />
                    </div>
                    
                    {/* Column 3 & 4 */}
                    <div className="col-span-4 grid grid-cols-2 gap-2">
                         <div className="col-span-2">
                            <ComicStrip title="Steve Canyon" panels={4} hint="adventure comic strip" />
                        </div>
                        <div className="col-span-2">
                            <ComicStrip title="Li'l Abner" panels={4} hint="hillbilly comic strip" />
                        </div>
                         <div className="col-span-2 border-y-2 border-black my-1 py-1">
                           <h2 className="text-3xl font-bold text-center tracking-widest">Jones-Brown Co RUGS</h2>
                           <p className="text-center text-sm">40th AVE WEST OPPOSITE EATONS</p>
                        </div>
                         <div className="col-span-2">
                            <ComicStrip title="Ozark Ike" panels={4} hint="baseball comic strip" />
                        </div>
                    </div>
                    
                     {/* Column 5 & 6 (spanning from col 1 to 4 effectively) */}
                    <div className="col-span-3 space-y-2">
                        <Crossword />
                         <TextBlock 
                            title="Daily Quiz"
                            content="1. Who was the first man to fly the English Channel? 2. What is the capital of Australia? 3. In what year did World War II end? Answers tomorrow."
                        />
                    </div>

                    {/* Column 7 (spanning from col 5 to 7 effectively) */}
                    <div className="col-span-4 grid grid-cols-2 gap-2">
                         <div className="col-span-2">
                            <ComicStrip title="Dick Tracy" panels={4} hint="detective comic strip" />
                        </div>
                        <div className="col-span-2">
                            <ComicStrip title="Mary Worth" panels={4} hint="drama comic strip" />
                        </div>
                    </div>
                    
                     {/* Bottom Row */}
                     <div className="col-span-7 grid grid-cols-7 gap-2 border-t-2 border-black pt-2 mt-2">
                        <div className="col-span-1">
                            <ComicStrip title="Myrila" panels={1} hint="fantasy comic" />
                        </div>
                        <div className="col-span-2">
                            <ComicStrip title="Winnie Winkle" panels={2} hint="fashion comic" />
                        </div>
                         <div className="col-span-2">
                            <ComicStrip title="Joe Palooka" panels={2} hint="boxing comic" />
                        </div>
                         <div className="col-span-2">
                            <ComicStrip title="The Nebbs" panels={2} hint="family comic strip" />
                        </div>
                     </div>


                </main>
            </div>
        </div>
    );
}
