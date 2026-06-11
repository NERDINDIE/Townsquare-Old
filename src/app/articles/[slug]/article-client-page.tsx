
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { articles, Article } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Headphones, Loader2, Languages, Plus, BookCheck, CheckCircle, XCircle, AlertCircle } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import { ArticleCard } from '@/components/ArticleCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { textToSpeech } from '@/ai/flows/text-to-speech-flow';
import { translateArticle } from '@/ai/flows/translation-flow';
import { analyzeText, AnalyzeTextOutput } from '@/ai/flows/fact-checker-flow';
import { toast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


interface ArticleClientPageProps {
    article: Article;
    relatedArticles: Article[];
}

export function ArticleClientPage({ article, relatedArticles }: ArticleClientPageProps) {
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedContent, setTranslatedContent] = useState<string | null>(null);
  const [targetLanguage, setTargetLanguage] = useState<string>('Spanish');
  const [isRetro, setIsRetro] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeTextOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
      const checkRetro = () => {
          setIsRetro(document.documentElement.classList.contains('font-y2k'));
      }
      checkRetro();
      
      const observer = new MutationObserver(checkRetro);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

      return () => observer.disconnect();
  }, []);
  
  const currentContent = translatedContent || article.content;

  const handleListen = async () => {
    setIsGeneratingAudio(true);
    try {
      const { audio } = await textToSpeech({ text: currentContent });
      setAudioSrc(audio);
    } catch (error) {
      console.error('Failed to generate audio', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate audio. Please try again later.',
      });
    } finally {
      setIsGeneratingAudio(false);
    }
  };
  
  const handleTranslate = async () => {
    if (!targetLanguage) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select a language to translate to.',
      });
      return;
    }
    setIsTranslating(true);
    try {
      const { translation } = await translateArticle({ text: article.content, targetLanguage });
      setTranslatedContent(translation);
    } catch (error) {
        console.error('Failed to translate article', error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not translate the article. Please try again.',
        });
    } finally {
        setIsTranslating(false);
    }
  };

  const handleFactCheck = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
        const result = await analyzeText({ text: article.content, analysisType: 'fact-check' });
        setAnalysisResult(result);
        toast({
            title: 'Analysis Complete',
            description: 'The fact-check results are now available below the article.',
        });
    } catch (error) {
        console.error('Failed to analyze article:', error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not perform fact-check. Please try again.',
        });
    } finally {
        setIsAnalyzing(false);
    }
  };
  
  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
        case 'Accurate':
            return <CheckCircle className="h-5 w-5 text-green-500" />;
        case 'Inaccurate':
            return <XCircle className="h-5 w-5 text-red-500" />;
        case 'Misleading':
            return <AlertCircle className="h-5 w-5 text-yellow-500" />;
        default:
            return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  if (isRetro) {
      return (
          <div className="retro-blog-container">
              <div className="retro-blog-header">
                  <h1 className="retro-blog-title">{article.title}</h1>
                  <p className="retro-blog-meta">Posted by {article.author} on {article.date}</p>
              </div>
              <div className="retro-blog-content">
                  <Image
                      src={article.image}
                      alt={article.title}
                      width={600}
                      height={400}
                      className="retro-blog-image"
                      data-ai-hint="news story"
                      priority
                  />
                  {currentContent.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                  ))}
              </div>
              <div className="retro-blog-comments">
                  <h3>Comments (3)</h3>
                  <div className="retro-blog-comment-form">
                      <h4>Leave a comment</h4>
                      <textarea placeholder="Your comment..."></textarea>
                      <button>Submit</button>
                  </div>
                   <div className="retro-blog-comment">
                        <p><strong>John Smith:</strong> This is a fantastic article! Really well-written and informative.</p>
                        <span>2 days ago</span>
                   </div>
                   <div className="retro-blog-comment">
                        <p><strong>Emily White:</strong> I learned so much from this. Thank you for shedding light on this important topic.</p>
                        <span>1 day ago</span>
                   </div>
                   <div className="retro-blog-comment">
                        <p><strong>Alex Doe:</strong> Great read! Has anyone else had a similar experience?</p>
                        <span>1 hour ago</span>
                   </div>
              </div>
               <div className="retro-blog-footer">
                  <Link href="/">[ Back to Homepage ]</Link>
              </div>
          </div>
      )
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/articles">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all articles
            </Link>
        </Button>
      <article>
        <header className="mb-8">
            <Badge variant="destructive" className="mb-4 uppercase text-sm tracking-wider">{article.category}</Badge>
            <div className="flex justify-between items-start">
              <h1 className="font-headline text-4xl md:text-5xl font-bold leading-tight">
                  {article.title}
              </h1>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <Button onClick={handleListen} disabled={isGeneratingAudio || isTranslating || isAnalyzing} variant="outline" size="icon">
                    {isGeneratingAudio ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Headphones className="h-5 w-5" />
                    )}
                     <span className="sr-only">Listen to article</span>
                </Button>
                 <Button onClick={handleTranslate} disabled={isTranslating || isGeneratingAudio || isAnalyzing} variant="outline" size="icon">
                    {isTranslating ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Languages className="h-5 w-5" />
                    )}
                     <span className="sr-only">Translate article</span>
                </Button>
                 <Button onClick={handleFactCheck} disabled={isAnalyzing || isGeneratingAudio || isTranslating} variant="outline" size="icon">
                    {isAnalyzing ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <BookCheck className="h-5 w-5" />
                    )}
                     <span className="sr-only">Fact-check article</span>
                </Button>
              </div>
            </div>
             <div className="mt-4 flex items-center gap-4">
                <Select onValueChange={setTargetLanguage} defaultValue={targetLanguage} disabled={isTranslating || isAnalyzing}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="Japanese">Japanese</SelectItem>
                        <SelectItem value="Mandarin Chinese">Mandarin Chinese</SelectItem>
                    </SelectContent>
                </Select>
                 {translatedContent && (
                    <Button variant="ghost" size="sm" onClick={() => setTranslatedContent(null)}>
                        Show Original
                    </Button>
                )}
            </div>
            {audioSrc && (
                <audio controls autoPlay className="w-full mt-4">
                    <source src={audioSrc} type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
            )}
            <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
                <span>By {article.author}</span>
                <span>&bull;</span>
                <span>{article.date}</span>
            </div>
        </header>
        <div className="relative mb-8 h-64 md:h-96 w-full overflow-hidden rounded-lg">
            <Image
            src={article.image}
            alt={`Cover image for ${article.title}`}
            fill
            className="object-cover"
            data-ai-hint="news story"
            priority
            />
        </div>
        <div className="text-lg leading-relaxed space-y-6 text-foreground/90">
            {currentContent.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
            ))}
        </div>
      </article>

      {(isAnalyzing || analysisResult) && (
        <>
            <Separator className="my-12" />
            <section id="fact-check-results">
                <Card>
                    <CardHeader>
                        <CardTitle>Fact & Bias Analysis</CardTitle>
                        <CardDescription>AI-powered analysis of the article content.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {isAnalyzing ? (
                             <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8">
                                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                                <p>Analyzing article for factual claims...</p>
                            </div>
                        ) : analysisResult ? (
                            <>
                                <p className="text-muted-foreground italic">{analysisResult.summary}</p>
                                {analysisResult.claims && analysisResult.claims.length > 0 && (
                                    <div className="space-y-4">
                                        <Separator />
                                        {analysisResult.claims.map((item, index) => (
                                            <div key={index} className="p-4 rounded-lg border bg-muted/30">
                                                <div className="flex items-center gap-2 mb-2">
                                                    {getVerdictIcon(item.verdict)}
                                                    <h4 className="font-semibold">Claim: "{item.claim}"</h4>
                                                </div>
                                                <Badge variant="outline">{item.verdict}</Badge>
                                                <p className="text-sm text-muted-foreground mt-2">{item.explanation}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : null}
                    </CardContent>
                </Card>
            </section>
        </>
      )}


      <Separator className="my-12" />

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="mb-12">
            <h2 className="font-headline text-3xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((related) => (
                    <ArticleCard key={related.id} article={related} small />
                ))}
            </div>
        </section>
      )}

      {/* Comments Section */}
        <section>
            <h2 className="font-headline text-3xl font-bold mb-6">Comments (3)</h2>
            <div className="space-y-8">
                {/* Comment Form */}
                <div className="flex items-start space-x-4">
                    <Avatar>
                        <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <Textarea placeholder="Write a comment..." className="mb-2" />
                        <Button size="sm">Post Comment</Button>
                    </div>
                </div>

                {/* Existing Comments */}
                <div className="flex items-start space-x-4">
                    <Avatar>
                        <AvatarFallback>U1</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">John Smith</p>
                            <p className="text-xs text-muted-foreground">2 days ago</p>
                        </div>
                        <p className="text-sm text-foreground/90">
                            This is a fantastic article! Really well-written and informative.
                        </p>
                    </div>
                </div>
                 <div className="flex items-start space-x-4">
                    <Avatar>
                        <AvatarFallback>U2</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">Emily White</p>
                            <p className="text-xs text-muted-foreground">1 day ago</p>
                        </div>
                        <p className="text-sm text-foreground/90">
                            I learned so much from this. Thank you for shedding light on this important topic. I'm looking forward to reading more.
                        </p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <Avatar>
                        <AvatarFallback>U3</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">Alex Doe</p>
                            <p className="text-xs text-muted-foreground">1 hour ago</p>
                        </div>
                        <p className="text-sm text-foreground/90">
                            Great read! Has anyone else had a similar experience?
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
}
