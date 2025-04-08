// deleteDuplicateProducts.mjs
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// --- Configuration ---
// Set to true to actually delete duplicates, false to only report them.
// START WITH `false` TO REVIEW FIRST!
const EXECUTE_DELETION = false;
// --- End Configuration ---

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION || process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-04-01';
const token = process.env.SANITY_API_WRITE_TOKEN; // Requires WRITE token for deletion

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
  token,
  useCdn: false,
  apiVersion,
});

async function findAndDeleteDuplicates() {
  console.log(`Checking for duplicate products in project ${projectId}, dataset ${dataset}`);
  console.log(`--- ${EXECUTE_DELETION ? 'DELETION MODE ENABLED' : 'DRY RUN MODE (reporting only)'} ---`);

  // Fetch all products with necessary fields, including category slug
  console.log('Fetching all products...');
  const products = await client.fetch(`*[_type == "product"]{
    _id,
    _createdAt,
    title,
    "categoryRef": category._ref,
    "categorySlug": category->slug.current
  }`);
  console.log(`Found ${products.length} products.`);

  if (products.length === 0) {
    console.log('No products found. Exiting.');
    return;
  }

  // Group products by category reference first, then by title
  const groupedByCategory = products.reduce((acc, product) => {
    const categoryKey = product.categoryRef || 'uncategorized'; // Handle products without a category ref
    if (!acc[categoryKey]) {
      acc[categoryKey] = {};
    }
    // Use original title for grouping key if available, otherwise fallback
    const titleKey = product.title ? product.title.trim().toLowerCase() : (product._id || 'untitled');
    if (!acc[categoryKey][titleKey]) {
      acc[categoryKey][titleKey] = [];
    }
    acc[categoryKey][titleKey].push(product);
    return acc;
  }, {});

  const duplicatesToDelete = [];
  let duplicateSetsFound = 0;

  console.log('\nIdentifying duplicates...');

  // Iterate through grouped products to find duplicates
  for (const categoryRef in groupedByCategory) {
    for (const titleKey in groupedByCategory[categoryRef]) { // Changed loop variable name for clarity
      const potentialDuplicates = groupedByCategory[categoryRef][titleKey];

      if (potentialDuplicates.length > 1) {
        duplicateSetsFound++;
        // Use the title from the first product for logging (assuming they are the same)
        const displayTitle = potentialDuplicates[0].title || titleKey;
        console.log(`\n Duplicate Set Found in Category [${categoryRef}] for Title "${displayTitle}":`);

        // --- Updated Sorting/Selection Logic ---
        potentialDuplicates.sort((a, b) => {
          const slugA = a.categorySlug;
          const slugB = b.categorySlug;
          const idAIncludesSlug = slugA && a._id.includes(slugA);
          const idBIncludesSlug = slugB && b._id.includes(slugB);

          // Prioritize keeping the one whose _id includes the category slug
          if (idAIncludesSlug && !idBIncludesSlug) {
            return -1; // Keep a (put it first)
          }
          if (!idAIncludesSlug && idBIncludesSlug) {
            return 1; // Keep b (put it first)
          }

          // Fallback: Keep the oldest one
          return new Date(a._createdAt) - new Date(b._createdAt);
        });
        // --- End Updated Logic ---

        const productToKeep = potentialDuplicates[0];
        console.log(`  - Keeping: ${productToKeep._id} (Created: ${productToKeep._createdAt}, Slug in ID: ${productToKeep.categorySlug && productToKeep._id.includes(productToKeep.categorySlug)})`);

        // Mark others for deletion
        for (let i = 1; i < potentialDuplicates.length; i++) {
          const productToDelete = potentialDuplicates[i];
          console.log(`  - ${EXECUTE_DELETION ? 'Deleting' : 'Will delete'}: ${productToDelete._id} (Created: ${productToDelete._createdAt}, Slug in ID: ${productToDelete.categorySlug && productToDelete._id.includes(productToDelete.categorySlug)})`);
          duplicatesToDelete.push(productToDelete);
        }
      }
    }
  }

  console.log(`\n--- Summary ---`);
  console.log(`Found ${duplicateSetsFound} sets of duplicate products.`);
  console.log(`Identified ${duplicatesToDelete.length} individual product documents for deletion.`);

  if (EXECUTE_DELETION && duplicatesToDelete.length > 0) {
    console.warn('\nProceeding with deletion...');
    try {
      // Use a transaction to delete all identified duplicates AND remove their references
      const transaction = client.transaction();

      duplicatesToDelete.forEach(item => {
        // 1. Unset the reference from the category's products array
        // We need the category ID and the _key of the reference (which we set to be the product ID)
        if (item.categoryRef && item._id) {
             console.log(`   - Scheduling unset of reference [${item._id}] from category [${item.categoryRef}]`);
             transaction.patch(item.categoryRef, {
                unset: [`products[_key=="${item._id}"]`]
             });
        } else {
             console.warn(`   - Could not schedule reference removal for product ${item._id} - missing categoryRef.`);
        }

        // 2. Delete the product document itself
        console.log(`   - Scheduling deletion of product document [${item._id}]`);
        transaction.delete(item._id);
      });

      console.log('Committing transaction...');
      const result = await transaction.commit({ autoGenerateArrayKeys: false }); // Use autoGenerateArrayKeys: false as keys are provided or not needed
      // The result from commit when deleting might not directly list IDs, check length or inspect if needed
      console.log(`Transaction committed. Check Sanity studio to confirm deletions.`);
      //console.log(`Successfully deleted ${result.results.length} duplicate product documents.`);

    } catch (error) {
      console.error('\nError during deletion transaction:', error);
    }
  } else if (!EXECUTE_DELETION && duplicatesToDelete.length > 0) {
    console.log('\nDRY RUN complete. No changes were made.');
    console.log('To delete these duplicates, set EXECUTE_DELETION = true in the script and run again.');
  } else {
    console.log('\nNo duplicates identified for deletion.');
  }
   console.log('---------------');
}

// --- REMINDER ---
// BACK UP YOUR DATASET BEFORE RUNNING WITH EXECUTE_DELETION = true
// `sanity dataset export <dataset_name> backup-$(date +%s).tar.gz`
// --- -------- ---

findAndDeleteDuplicates().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
}); 