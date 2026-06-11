
import { PlaygroundHeader } from '@/components/PlaygroundHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { playgroundContent } from '@/lib/playground-data';
import { ArrowRight, BookOpen, Gamepad2, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function PlaygroundPage() {
  const featuredArticle = playgroundContent.articles[0];
  const games = playgroundContent.games;
  const comics = playgroundContent.comics;
  const videos = playgroundContent.videos;

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 min-h-screen">
      <PlaygroundHeader />
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Featured Story */}
        <section className="mb-16">
          <Card className="grid grid-cols-1 md:grid-cols-2 overflow-hidden border-4 border-yellow-400 shadow-lg rounded-2xl">
            <div className="relative h-64 md:h-auto">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                className="object-cover"
                data-ai-hint="kids story illustration"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <CardHeader className="p-0">
                <CardTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100">{featuredArticle.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-4">
                <p className="text-muted-foreground">{featuredArticle.excerpt}</p>
              </CardContent>
              <CardFooter className="p-0 mt-6">
                <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white rounded-full">
                  Read Story <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </div>
          </Card>
        </section>

        {/* Fun & Games */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-400 flex items-center gap-3">
            <Gamepad2 className="h-8 w-8" /> Fun & Games
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {games.map((item) => (
              <Card key={item.title} className="group overflow-hidden rounded-xl text-center border-2 border-green-400 hover:shadow-xl transition-shadow">
                <CardContent className="p-4 flex flex-col items-center justify-center aspect-square">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Comics & Books */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400 flex items-center gap-3">
            <BookOpen className="h-8 w-8" /> Comics & Books
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {comics.map((item) => (
              <Link href="#" key={item.title} className="group block">
                <Card className="overflow-hidden rounded-xl border-2 border-purple-400 hover:shadow-xl transition-shadow">
                  <div className="aspect-[2/3] relative">
                    <Image src={item.image} alt={item.title} fill className="object-cover" data-ai-hint="comic book cover" />
                  </div>
                  <CardFooter className="p-3 bg-white dark:bg-gray-800">
                    <h3 className="font-semibold truncate">{item.title}</h3>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Watch & Learn */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-orange-600 dark:text-orange-400 flex items-center gap-3">
            <Video className="h-8 w-8" /> Watch & Learn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((item) => (
              <Link href="#" key={item.title} className="group block">
                <Card className="overflow-hidden rounded-xl border-2 border-orange-400 hover:shadow-xl transition-shadow">
                  <div className="aspect-video relative">
                    <Image src={item.thumbnail} alt={item.title} fill className="object-cover" data-ai-hint="kids video still" />
                     <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <PlayCircleIcon className="h-16 w-16 text-white/80 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <CardFooter className="p-4 bg-white dark:bg-gray-800">
                    <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.duration}</p>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

function PlayCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  )
}
