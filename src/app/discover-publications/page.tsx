
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { brands } from "@/lib/brands";
import { ArrowLeft, Check } from "@/components/icons";
import Link from "next/link";

export default function DiscoverPublicationsPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <header className="mb-8 flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/more">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="font-headline text-2xl font-bold">Discover Publications</h1>
      </header>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-muted-foreground">Popular in Townsquare</h2>
        {brands.map((brand, index) => (
          <Card key={brand.slug}>
            <CardHeader className="flex flex-row items-start gap-4 p-4">
              <Avatar className="h-12 w-12 rounded-lg">
                <AvatarImage src={`https://placehold.co/64x64.png?text=${brand.name.charAt(0)}`} alt={brand.name} />
                <AvatarFallback>{brand.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-xl">{brand.name}</CardTitle>
                <CardDescription className="mt-1">{brand.description}</CardDescription>
              </div>
              <Button variant={index < 2 ? "secondary" : "outline"} size="sm" className="w-28">
                {index < 2 ? <Check className="mr-2 h-4 w-4" /> : null}
                {index < 2 ? "Subscribed" : "Subscribe"}
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
