
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, PlayCircle, Search, ShoppingBag, Tag, Car } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { deals, products, carsForSale, groceryItems, cleaningProducts, weeklyDeals, freshDeals } from '@/lib/data/marketplace-data';

const PriceCircle = ({ price, oldPrice }: { price: string, oldPrice?: string }) => (
    <div className="relative">
        {oldPrice && <p className="text-sm text-gray-500 line-through text-center -mb-2">{oldPrice}</p>}
        <div className="bg-red-600 text-white rounded-full h-16 w-16 flex items-center justify-center text-xl font-bold border-2 border-white shadow-md">
            {price}
        </div>
    </div>
);

const FreshPriceCircle = ({ price }: { price: string }) => (
    <div className="bg-red-600 text-white rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold border-2 border-white shadow-md">
        {price}
    </div>
);


function SupermarketFlyer() {
    return (
        <div className="bg-white p-4 shadow-lg font-sans text-black">
            {/* Header News Section */}
            <header className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b">
                <div className="md:col-span-2">
                    <div className="flex justify-between items-center border-b pb-1 mb-2">
                            <span className="text-sm font-semibold">Toplum</span>
                        <span className="text-xs text-gray-500">4. Sayfa</span>
                    </div>
                    <h2 className="text-red-600 text-xl font-bold">AOC'YE YİNE DURDURMA</h2>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                            <Image src="https://placehold.co/400x200.png" width={400} height={200} alt="News" className="w-full" data-ai-hint="building aerial view" />
                            <p className="text-xs mt-1">Ankara 5. İdare Mahkemesi, Atatürk Orman Çiftliği arazisine inşa edilen ve Başbakanlık hizmet binası olarak kullanılan yapı hakkında daha önce verilen ‘durdurma’ kararını yineledi.</p>
                        </div>
                        <div>
                            <h3 className="font-bold">Yasakçı yaratan karanlık</h3>
                            <p className="text-sm mt-1">The dark that creates the prohibitionist. Some text follows here.</p>
                            <h3 className="font-bold mt-2">Gül denilince akla gelenler</h3>
                            <p className="text-sm mt-1">What comes to mind when you say 'rose'. Some text follows here.</p>
                        </div>
                    </div>
                </div>
                <div>
                        <div className="border-b pb-1 mb-2">
                        <h3 className="font-bold">Ahmet HAKAN</h3>
                        <p className="text-red-600 font-bold">Neye yaradı</p>
                    </div>
                        <h3 className="font-bold mt-2">Twitter yasağından bile daha tehlikeli</h3>
                    <p className="text-sm mt-1">More dangerous than the Twitter ban. Text follows.</p>
                    <h3 className="font-bold mt-2 text-red-600 text-lg">Tuvalet yerine lavabo diyor</h3>
                    <p className="text-sm mt-1">He says sink instead of toilet. Text here.</p>
                </div>
            </header>
            
            {/* Main Ad Section */}
            <main className="mt-4">
                {/* Spring Cleaning Section */}
                <div className="bg-gradient-to-b from-purple-200 via-green-100 to-white p-4 rounded-lg flex justify-between items-center border">
                    <div>
                        <h2 className="text-5xl font-extrabold text-green-600">kipa</h2>
                        <div className="mt-4 flex gap-4 items-end">
                            <Image src={cleaningProducts[0].image} alt={cleaningProducts[0].name} width={100} height={100} data-ai-hint={cleaningProducts[0].dataAiHint}/>
                            <div className="text-center">
                                <p className="text-gray-500 line-through">{cleaningProducts[0].oldPrice}</p>
                                <p className="text-4xl font-bold text-red-600 -mt-2">{cleaningProducts[0].price}</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="bg-green-500 text-white p-4 rounded-full inline-block -rotate-12">
                            <p className="text-xl font-bold">bahar</p>
                            <p className="text-2xl font-bold -mt-2">temizliği</p>
                        </div>
                        <div className="mt-4 flex gap-2 items-center">
                            <Image src={cleaningProducts[1].image} alt={cleaningProducts[1].name} width={80} height={120} data-ai-hint={cleaningProducts[1].dataAiHint}/>
                            <div className="text-center">
                                <p className="text-lg font-bold">{cleaningProducts[1].installments}</p>
                                <p className="text-4xl font-bold text-red-600">{cleaningProducts[1].price}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Deals of the Week Section */}
                <div className="bg-red-600 text-white text-center py-2 mt-4 rounded-t-lg">
                    <h3 className="text-2xl font-bold">Haftanın Bombaları</h3>
                </div>
                    <div className="bg-red-50 border p-4 grid grid-cols-4 gap-4 items-end text-center">
                    {weeklyDeals.map(item => (
                        <div key={item.name} className="flex flex-col items-center">
                            <p className="font-semibold h-10">{item.name}</p>
                            <Image src={item.image} alt={item.name} width={100} height={100} className="my-2" data-ai-hint={item.dataAiHint}/>
                            <PriceCircle price={item.price} oldPrice={item.oldPrice} />
                        </div>
                    ))}
                </div>

                {/* Fresh Deals Section */}
                    <div className="bg-green-600 text-white text-center py-2 mt-4 rounded-t-lg">
                    <h3 className="text-2xl font-bold">TAPTAZE FIRSATLAR</h3>
                </div>
                <div className="bg-green-50 border p-4 grid grid-cols-3 gap-4 items-end text-center">
                    {freshDeals.map(item => (
                        <div key={item.name} className="flex flex-col items-center">
                            <Image src={item.image} alt={item.name} width={120} height={100} className="my-2" data-ai-hint={item.dataAiHint}/>
                            <FreshPriceCircle price={item.price} />
                        </div>
                    ))}
                </div>
            </main>
                <footer className="mt-4 border-t pt-4 text-xs text-gray-500">
                <p>Prices valid from 14-20 August or while stocks last. Product availability may vary by store.</p>
            </footer>
        </div>
    );
}

export default function MarketplacePage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-headline text-5xl font-bold flex items-center gap-3">
            <ShoppingBag className="h-12 w-12 text-brand-marketplace" />
            Marketplace
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Your source for weekly ads and local savings.
          </p>
        </div>
        <div className="flex gap-2">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input 
                    type="search" 
                    placeholder="Search ads, coupons, or stores"
                    className="w-full md:w-80 h-12 pl-12 pr-4 rounded-full border bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
        </div>
      </header>
      
      <section className="mb-12">
        <h2 className="font-headline text-2xl font-bold mb-4">Loyalty & Memberships</h2>
        <Card>
            <CardHeader>
                <CardTitle>Link Your Membership Card</CardTitle>
                <CardDescription>Get exclusive discounts and perks by linking your store membership cards.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-end gap-4">
                <div className="flex-1 w-full">
                    <label htmlFor="membership-number" className="block text-sm font-medium text-muted-foreground mb-1">
                        Enter Membership Number
                    </label>
                    <Input id="membership-number" placeholder="e.g., 123456789" />
                </div>
                <Button>Link Card</Button>
            </CardContent>
        </Card>
      </section>

       {/* Live Shopping Section */}
       <section className="mb-12">
          <h2 className="font-headline text-3xl font-bold mb-4">Live Shopping</h2>
          <Card className="overflow-hidden">
            <div className="relative aspect-video w-full">
              <Image src="https://placehold.co/1280x720.png" alt="Live stream placeholder" fill className="object-cover" data-ai-hint="live stream studio" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button size="lg" variant="secondary">
                      <PlayCircle className="mr-2 h-6 w-6"/>
                      Watch Live Now
                  </Button>
              </div>
              <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-md text-sm font-semibold flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                LIVE
              </div>
            </div>
          </Card>
      </section>

      
      <Tabs defaultValue="ads" className="w-full">
        <TabsList className="grid w-full grid-cols-5 md:w-auto md:inline-flex">
            <TabsTrigger value="ads">Weekly Ads</TabsTrigger>
            <TabsTrigger value="deals">Featured Deals</TabsTrigger>
            <TabsTrigger value="products">Shop Products</TabsTrigger>
            <TabsTrigger value="groceries">Groceries</TabsTrigger>
            <TabsTrigger value="cars">Buy a Car</TabsTrigger>
        </TabsList>

        <TabsContent value="ads" className="mt-8">
             <SupermarketFlyer />
        </TabsContent>

        <TabsContent value="deals" className="mt-8">
            <div className="space-y-6">
                {deals.map((deal, index) => (
                <Card key={index} className="flex flex-col md:flex-row overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="md:w-1/3 relative aspect-video md:aspect-auto">
                        <Image src={deal.image} alt={deal.title} fill className="object-cover" data-ai-hint={deal.dataAiHint} />
                    </div>
                    <div className="md:w-2/3 flex flex-col">
                        <CardHeader>
                            <CardTitle>{deal.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2 pt-1">
                                <Tag className="h-4 w-4" />
                                {deal.store}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{deal.description}</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild>
                                <Link href="#">View Deal <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        </CardFooter>
                    </div>
                </Card>
                ))}
            </div>
        </TabsContent>

        <TabsContent value="products" className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <Card key={index}>
                        <CardContent className="p-0">
                            <div className="relative aspect-square">
                                <Image src={product.image} alt={product.name} fill className="object-cover rounded-t-lg" data-ai-hint={product.dataAiHint}/>
                            </div>
                        </CardContent>
                        <CardHeader className="p-4">
                            <CardTitle className="text-lg">{product.name}</CardTitle>
                        </CardHeader>
                        <CardFooter className="p-4 flex justify-between items-center">
                            <p className="font-bold text-lg">{product.price}</p>
                            <Button asChild variant="outline" size="sm">
                                <Link href="/cart">Add to Cart</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </TabsContent>
        
        <TabsContent value="groceries" className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {groceryItems.map((product, index) => (
                    <Card key={index}>
                        <CardContent className="p-0">
                            <div className="relative aspect-square">
                                <Image src={product.image} alt={product.name} fill className="object-cover rounded-t-lg" data-ai-hint={product.dataAiHint}/>
                            </div>
                        </CardContent>
                        <CardHeader className="p-4">
                            <CardTitle className="text-lg">{product.name}</CardTitle>
                        </CardHeader>
                        <CardFooter className="p-4 flex justify-between items-center">
                            <p className="font-bold text-lg">{product.price}</p>
                            <Button asChild variant="outline" size="sm">
                                <Link href="/cart">Add to Cart</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </TabsContent>

        <TabsContent value="cars" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {carsForSale.map((car, index) => (
                    <Card key={index} className="group overflow-hidden">
                        <CardContent className="p-0">
                            <div className="relative aspect-video">
                                <Image src={car.image} alt={car.name} fill className="object-cover rounded-t-lg group-hover:scale-105 transition-transform" data-ai-hint={car.dataAiHint}/>
                            </div>
                        </CardContent>
                        <CardHeader className="p-4">
                            <CardTitle className="text-xl">{car.name}</CardTitle>
                            <CardDescription>{car.mileage} &bull; {car.location}</CardDescription>
                        </CardHeader>
                        <CardFooter className="p-4 flex justify-between items-center">
                            <p className="font-bold text-2xl">{car.price}</p>
                            <Button>View Details</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </TabsContent>
      </Tabs>
      
    </div>
  );
}
