
'use client';

import { articles } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function Y2kHome() {
    const featuredShows = [
        { name: "Survivor", image: "https://placehold.co/150x80.png", hint: "reality show logo", description: "You've seen the show, get your book, CD and video! Check out the Survivor Store.", link: "#" },
        { name: "Big Brother", image: "https://placehold.co/100x80.png", hint: "tv show logo", description: "Are you interested in possibly participating in a future Big Brother show? Sign up here!", link: "#" },
        { name: "Late Show", image: "https://placehold.co/100x80.png", hint: "late night show", description: "Can you say three-peat? Celebrate the Late Show's third consecutive Emmy victory.", link: "#" },
        { name: "Daytime", image: "https://placehold.co/100x80.png", hint: "daytime television", description: "The dish from Desiree! The soap scoop from Sneak Previews and Updates!", link: "#" },
    ];
    
    return (
        <div style={{ backgroundColor: '#000066', color: '#FFFFFF', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ width: '760px', margin: '0 auto', border: '1px solid #000066' }}>
                <header>
                    <div style={{ backgroundColor: '#000033', padding: '5px' }}>
                        <Image src="https://placehold.co/150x30/FFFFFF/000033?text=TOWNSQUARE&font=arial" alt="Townsquare Logo" width={150} height={30} />
                    </div>
                    <div style={{ backgroundColor: '#CCCCFF', color: '#000066', padding: '3px 5px', fontSize: '11px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Saturday, September 30, 2000 - Tonight's Schedule (et/pt)</span>
                        <a href="#" style={{ color: '#000066', fontWeight: 'bold' }}>Weekly Schedule</a>
                    </div>
                </header>

                <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
                    <tbody>
                        <tr>
                            <td width="150" valign="top" style={{ backgroundColor: '#000033', padding: '10px' }}>
                                <nav style={{ fontSize: '12px' }}>
                                    <h3 style={{ color: '#FFFF99', fontWeight: 'bold', margin: '0 0 5px 0' }}>NEWS</h3>
                                    <ul style={{ listStyle: 'none', paddingLeft: '10px', margin: '0' }}>
                                        {articles.slice(0, 5).map(article => (
                                            <li key={article.id} style={{ marginBottom: '4px' }}><a href="#" style={{ color: '#CCCCFF', textDecoration: 'none' }}>{article.category}</a></li>
                                        ))}
                                    </ul>
                                    <h3 style={{ color: '#FFFF99', fontWeight: 'bold', margin: '15px 0 5px 0' }}>SITES</h3>
                                     <ul style={{ listStyle: 'none', paddingLeft: '10px', margin: '0' }}>
                                        <li><a href="#" style={{ color: '#CCCCFF', textDecoration: 'none' }}>Mail</a></li>
                                        <li><a href="#" style={{ color: '#CCCCFF', textDecoration: 'none' }}>Games</a></li>
                                     </ul>
                                </nav>
                            </td>
                            <td valign="top" style={{ padding: '10px' }}>
                                <main>
                                    <div style={{ border: '1px solid #FFFFFF', padding: '10px', marginBottom: '10px' }}>
                                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#FFFF99', margin: '0 0 10px 0' }}>7 New Shows</h2>
                                        <p style={{fontSize: '12px', margin: '0'}}>Bette, Welcome to New York, That's Life, The District, Yes, Dear, The Fugitive, CSI: Crime Scene Investigation</p>
                                    </div>

                                    {featuredShows.map(show => (
                                         <table key={show.name} width="100%" cellPadding="5" cellSpacing="0" border={0} style={{ marginBottom: '15px' }}>
                                            <tbody>
                                                <tr>
                                                    <td width="100" valign="top">
                                                        <Image src={show.image} alt={show.name} data-ai-hint={show.hint} width={150} height={80} style={{border: '1px solid white'}} />
                                                    </td>
                                                    <td valign="top">
                                                        <h3 style={{ color: 'lightgreen', fontSize: '14px', fontWeight: 'bold', margin: '0 0 5px 0' }}>{show.name.toUpperCase()}</h3>
                                                        <p style={{ fontSize: '12px', margin: '0' }}>
                                                            {show.description} <a href={show.link} style={{ color: '#FFFF99', textDecoration: 'underline' }}>Click here.</a>
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                         </table>
                                    ))}

                                    <div style={{ border: '1px solid #333399', backgroundColor: '#000033', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#666699' }}>
                                        sponsor
                                    </div>
                                </main>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <footer style={{ fontSize: '10px', textAlign: 'center', padding: '10px', borderTop: '2px solid #000033' }}>
                    <p>Feedback | Advertise With Us | Copyright Information | Privacy Statement</p>
                    <p style={{ marginTop: '5px' }}>© MM, Townsquare Worldwide Inc., All Rights Reserved.</p>
                </footer>
            </div>
        </div>
    );
}
