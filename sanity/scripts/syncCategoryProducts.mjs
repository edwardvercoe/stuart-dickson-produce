// syncCategoryProducts.mjs
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Read configuration, falling back to values potentially used in your app
// Ensure these environment variables are set in your .env file
const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION || process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-04-01'; // Use a recent API version as fallback

// --- IMPORTANT ---
// This script requires a WRITE token. Make sure SANITY_API_WRITE_TOKEN is set in your .env file.
// This is DIFFERENT from the SANITY_API_READ_TOKEN used elsewhere in your app.
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(`Error: Missing required environment variables in .env file:
    - SANITY_PROJECT_ID (or NEXT_PUBLIC_SANITY_PROJECT_ID)
    - SANITY_DATASET (or NEXT_PUBLIC_SANITY_DATASET)
    - SANITY_API_WRITE_TOKEN (Ensure this has write permissions!)`);
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token, // Use the WRITE token
  useCdn: false, // Ensure fresh data for modifications
  apiVersion,
});

async function syncCategoryProducts() {
  console.log(`Syncing products for project ${projectId}, dataset ${dataset}`);
  console.log('Fetching all categories...');
  const categories = await client.fetch('*[_type == "category"]{_id, title, "currentProductRefs": products[]._ref}');
  console.log(`Found ${categories.length} categories.`);

  if (categories.length === 0) {
    console.log('No categories found. Exiting.');
    return;
  }

  let updatedCount = 0;
  let skippedCount = 0;
  const errors = [];

  for (const category of categories) {
    console.log(`\nProcessing category: ${category.title} (${category._id})`);
    try {
      // Find all products that *actually* reference this category
      const referencingProducts = await client.fetch(
        '*[_type == "product" && category._ref == $categoryId]{_id}',
        { categoryId: category._id }
      );
      console.log(` Found ${referencingProducts.length} products referencing this category.`);

      // Create the desired array of reference objects for the patch
      const newProductReferences = referencingProducts.map(product => ({
        _key: product._id, // Using product _id as _key for stability
        _type: 'reference',
        _ref: product._id,
      }));

      // --- Optimization: Only patch if the array is actually different ---
      const currentRefsSet = new Set(category.currentProductRefs || []);
      const newRefsSet = new Set(newProductReferences.map(ref => ref._ref));

      if (currentRefsSet.size === newRefsSet.size && [...currentRefsSet].every(ref => newRefsSet.has(ref))) {
          console.log(' Product array is already up-to-date. Skipping patch.');
          skippedCount++;
          continue; // Skip to the next category
      }
      // --- End Optimization ---


      // Patch the category document to set the products array
      console.log(` Updating category document's products array...`);
      await client
        .patch(category._id)
        // Use set to overwrite the entire array ensuring it's correct
        .set({ products: newProductReferences })
        .commit({ autoGenerateArrayKeys: false }); // Keys are provided

      console.log(` Successfully updated category: ${category.title}`);
      updatedCount++;

    } catch (error) {
      console.error(` Error processing category ${category.title} (${category._id}):`, error);
      errors.push({ category: category.title, error: error.message });
    }
  }

  console.log('\n--- Sync Complete ---');
  console.log(`Successfully updated ${updatedCount} categories.`);
  console.log(`Skipped ${skippedCount} categories (already up-to-date).`);
  if (errors.length > 0) {
    console.warn(`Encountered errors with ${errors.length} categories:`);
    errors.forEach(err => console.warn(` - ${err.category}: ${err.error}`));
  }
  console.log('--------------------');
}

// --- REMINDER ---
// Have you backed up your dataset? `sanity dataset export <dataset_name> backup.tar.gz`
// --- -------- ---

syncCategoryProducts().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});
