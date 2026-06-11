
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

function generateRandomHslColor(): string {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 30) + 70; // 70-100%
    const l = Math.floor(Math.random() * 20) + 40; // 40-60%
    return `${h} ${s}% ${l}%`;
}


async function addNewBrandToDataFile(brandData: { name: string; slug: string; description: string; }) {
  const filePath = path.join(process.cwd(), 'src', 'lib', 'brands.ts');
  try {
    let fileContent = await fs.readFile(filePath, 'utf8');
    const insertionMarker = 'export const brands: Brand[] = [';
    
    const newBrandObject = `
    {
        name: '${brandData.name.replace(/'/g, "\\'")}',
        slug: '${brandData.slug}',
        description: '${brandData.description.replace(/'/g, "\\'")}',
        image: 'https://placehold.co/400x900.png',
        dataAiHint: 'abstract pattern',
    },`;

    fileContent = fileContent.replace(insertionMarker, insertionMarker + newBrandObject);
    await fs.writeFile(filePath, fileContent, 'utf8');
    console.log(`Brand "${brandData.name}" added to brands.ts`);
  } catch (error) {
    console.error(`Error writing to brands.ts:`, error);
  }
}

async function addBrandToCss(brandData: { slug: string; color: string; }) {
  const filePath = path.join(process.cwd(), 'src', 'app', 'globals.css');
  try {
    let fileContent = await fs.readFile(filePath, 'utf8');
    
    // Add to light theme
    const lightThemeMarker = /(--brand-palapa: 35 92% 60%;)/;
    const newBrandCss = `\n    --brand-${brandData.slug}: ${brandData.color};`;
    fileContent = fileContent.replace(lightThemeMarker, `$1${newBrandCss}`);

    // Add to dark theme
    const darkThemeMarker = /(--brand-palapa: 35 92% 60%;\s*})/m;
    fileContent = fileContent.replace(darkThemeMarker, `$1${newBrandCss}\n  `);

    await fs.writeFile(filePath, fileContent, 'utf8');
    console.log(`Brand color for "${brandData.slug}" added to globals.css`);
  } catch (error) {
    console.error(`Error writing to globals.css:`, error);
  }
}

async function addBrandToTailwindConfig(brandData: { slug: string; }) {
  const filePath = path.join(process.cwd(), 'src', 'tailwind.config.ts');
  try {
    let fileContent = await fs.readFile(filePath, 'utf8');
    const insertionMarker = /('brand-palapa': 'hsl\(var\(--brand-palapa\)\)',)/;
    
    const newBrandConfig = `\n        'brand-${brandData.slug}': 'hsl(var(--brand-${brandData.slug}))',`;

    fileContent = fileContent.replace(insertionMarker, `$1${newBrandConfig}`);
    await fs.writeFile(filePath, fileContent, 'utf8');
    console.log(`Brand color for "${brandData.slug}" added to tailwind.config.ts`);
  } catch (error) {
    console.error(`Error writing to tailwind.config.ts:`, error);
  }
}


export async function createBrand(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  if (name && description) {
    const slug = generateSlug(name);
    const color = generateRandomHslColor();

    await Promise.all([
      addNewBrandToDataFile({ name, slug, description }),
      addBrandToCss({ slug, color }),
      addBrandToTailwindConfig({ slug }),
    ]);

    revalidatePath('/lib/brands.ts');
    revalidatePath('/app/globals.css');
    revalidatePath('/tailwind.config.ts');
  }
}
