
import { notFound } from "next/navigation";
import { townsquares, Townsquare } from "@/lib/townsquares";
import { allPosts, PostWithAuthor } from "@/lib/bulletin-board-data";
import { articles, Article } from "@/lib/data";
import { TownsquareClientPage } from "./townsquare-client-page";

export async function generateStaticParams() {
  return townsquares.map((ts) => ({
    slug: ts.slug,
  }));
}

function getTownsquareData(slug: string) {
    const townsquare = townsquares.find(ts => ts.slug === slug);

    if (!townsquare) {
        return null;
    }

    const historicalPosts = allPosts.filter(post => 
        townsquare.historicalHandles?.includes(post.author.handle)
    );

    // Placeholder for city-specific articles. 
    // In a real app, this would be a more sophisticated filter.
    const cityArticles = articles.slice(0, 3);
    const relatedTownsquares = townsquares.filter(ts => ts.slug !== townsquare.slug).slice(0, 3);

    return {
        townsquare,
        historicalPosts,
        cityArticles,
        relatedTownsquares
    }
}


export default function TownsquarePage({ params }: { params: { slug: string } }) {
    const data = getTownsquareData(params.slug);

    if (!data) {
        notFound();
    }

    return <TownsquareClientPage {...data} />;
}
