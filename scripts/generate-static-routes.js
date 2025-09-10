#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import page metadata from source files
async function getPageMetadata() {
  const pagesDir = path.join(__dirname, '..', 'src', 'pages');
  const pageFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('.tsx'));
  
  const routes = [];
  
  for (const file of pageFiles) {
    try {
      // Read the file content to extract metadata
      const filePath = path.join(pagesDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Extract metadata object using regex
      const metadataMatch = content.match(/export const metadata: PageMetadata = \{([^}]+)\}/s);
      if (metadataMatch) {
        const metadataContent = metadataMatch[1];
        
        // Extract title
        const titleMatch = metadataContent.match(/title:\s*['"`]([^'"`]+)['"`]/);
        const title = titleMatch ? titleMatch[1] : 'Page';
        
        // Extract path
        const pathMatch = metadataContent.match(/path:\s*['"`]([^'"`]+)['"`]/);
        const pagePath = pathMatch ? pathMatch[1] : '/';
        
        routes.push({
          title,
          path: pagePath
        });
      }
    } catch (error) {
      console.warn(`⚠️  Could not parse metadata from ${file}:`, error.message);
    }
  }
  
  return routes;
}

// Read the built index.html
const distPath = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('❌ dist/index.html not found. Run "npm run build" first.');
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexPath, 'utf8');

// Generate static HTML files for each route
async function generateStaticRoutes() {
  const routes = await getPageMetadata();
  
  if (routes.length === 0) {
    console.error('❌ No page metadata found. Make sure pages export metadata objects.');
    process.exit(1);
  }
  
  console.log(`📄 Found ${routes.length} pages with metadata:`);
  routes.forEach(route => console.log(`   ${route.path} -> ${route.title}`));
  console.log('');
  
  routes.forEach(route => {
    // Update the title in the HTML
    const routeHtml = indexHtml.replace(
      /<title>.*?<\/title>/,
      `<title>${route.title} - tmn.nyc</title>`
    );

    // Create directory if it doesn't exist
    const routeDir = path.join(distPath, route.path);
    if (route.path !== '/') {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    // Write the HTML file
    const outputPath = route.path === '/' 
      ? indexPath 
      : path.join(routeDir, 'index.html');
    
    fs.writeFileSync(outputPath, routeHtml);
    console.log(`✅ Generated: ${route.path} -> ${outputPath}`);
  });

  console.log('\n🎉 Static route generation complete!');
  console.log('📁 Each route now has its own index.html file for better SEO.');
}

generateStaticRoutes().catch(console.error);
