

import { Bugle } from '@/components/icons';

export default function ManuscriptHome() {
  return (
    <div className="bg-[#F3EFE9] min-h-screen font-uncial text-[#3a2d21]">
      <div className="container mx-auto max-w-4xl p-8 flex">
        {/* Ornate Letter */}
        <div className="flex-shrink-0 mr-8">
            <svg width="150" height="170" viewBox="0 0 150 170" className="float-left">
                <path d="M75,5 C40,5 10,30 10,85 C10,140 40,165 75,165 C110,165 140,140 140,85 C140,30 110,5 75,5 Z" fill="none" stroke="#4a5a9c" strokeWidth="6"/>
                <path d="M20,85 C40,75 110,75 130,85" fill="#4a5a9c" stroke="#4a5a9c" strokeWidth="6"/>
                <path d="M125,10 C130,5 135,10 135,20 L135,60" fill="none" stroke="#4a5a9c" strokeWidth="6" />
                
                {/* Red filigree top */}
                <path d="M 75,10 C 50,15 40,40 45,60 C 50,80 75,75 75,50 C 75,25 90,15 100,20 C 110,25 105,50 100,60" fill="none" stroke="#d44f4f" strokeWidth="1" />
                <path d="M 75,10 C 80,5 90,5 95,10" fill="none" stroke="#d44f4f" strokeWidth="1" />
                <path d="M 50,15 C 45,10 40,15 40,20" fill="none" stroke="#d44f4f" strokeWidth="1" />

                {/* Red filigree bottom */}
                <path d="M 75,160 C 50,155 40,130 45,110 C 50,90 75,95 75,120 C 75,145 90,155 100,150 C 110,145 105,120 100,110" fill="none" stroke="#d44f4f" strokeWidth="1" />
                <path d="M 75,160 C 80,165 90,165 95,160" fill="none" stroke="#d44f4f" strokeWidth="1" />
                <path d="M 50,155 C 45,160 40,155 40,150" fill="none" stroke="#d44f4f" strokeWidth="1" />

            </svg>
        </div>

        {/* Text Content */}
        <div className="text-xl leading-relaxed">
            <p><span className="text-red-600">onub: dieb: uere sue încipit prologus in li</span>brum paralipomenon</p>
            <p><span className="text-red-600">i septuaginta interpre</span>tum pura et ut ab eis</p>
            <p>igressuîla é edita permaneat superfluum me</p>
            <p>multo nati operis</p>
            <p>sime atq doctissime impelleres ut hebrea</p>
            <p>uolumina latinos</p>
            <p>moneremus. Os ei</p>
            <p>cenet aures uolunt occupauerat- et nascen</p>
            <p>as ecclie uiolauerat silentio opproban. Sic uero cum pro uarieta</p>
            <p>te regionu diuisa ferunt exemplaria et q</p>
            <p>mana illa antiquaq: translatio corrupta sit</p>
            <p>atq uitiata: nostro arbitrio quid unum sit:</p>
            <p>iudicare quid uitiatu sit: aut noui operis.</p>
        </div>
      </div>
    </div>
  );
}
