'use client'

import { useForm as useFormspree, ValidationError } from '@formspree/react' // Import Formspree hook and ValidationError
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm as useRHFForm } from 'react-hook-form' // Alias react-hook-form's hook
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { client } from '@/sanity/lib/client' // Import the Sanity client
import { categoriesWithProductsQuery } from '@/sanity/lib/queries' // Import the GROQ query
import type { OrderForm as OrderFormType } from '@/types/sanity.types' // Import the generated type

import Container from '../shared/Container'

// Interfaces for data structure
interface Product {
  _id: string
  title: string
  slug: string
  available: boolean
  notes?: string | null
}

interface Category {
  _id: string
  title: string
  slug: string
  columnPlacement?: string | null
  products: Product[]
}

interface OrderItem {
  quantity: string
  note: string
}

// Define Props for the component, extending the Sanity type
interface OrderFormProps extends Omit<OrderFormType, '_type'> {}

// --- Zod Schema Definition ---
const orderFormSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  pickupDate: z.string().min(1, 'Pick up date is required'), // Basic check, HTML handles date format
  customerEmail: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
  customerPhone: z.string().min(1, 'Phone number is required'), // Basic check
  deliveryLocation: z.string().optional(),
  generalNote: z.string().optional(),
})

// --- Type inferred from Zod schema ---
type OrderFormData = z.infer<typeof orderFormSchema>

// --- Reusable Category Card Component ---
interface CategoryCardProps {
  category: Category
  orderDetails: Record<string, OrderItem>
  handleInputChange: (
    productId: string,
    field: keyof OrderItem,
    value: string,
  ) => void
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  orderDetails,
  handleInputChange,
}) => (
  // Remove the outer Card wrapper, use borders for separation
  <div key={category._id} className="border-t">
    <div className="p-2 px-3 font-semibold bg-gray-50">
      <h3>{category.title}</h3>
    </div>
    <div className="p-0">
      <table className="w-full border-collapse text-sm">
        {/* Keep thead for structure, but hide visually if needed or simplify */}
        {/* Simplified header structure could go here if needed */}
        <tbody>
          {category.products.map((product) => (
            <tr key={product._id}>
              {/* Add borders to cells */}
              <td className="border p-1 px-3">{product.title}</td>
              <td className="border p-1 w-20">
                <Input
                  type="number"
                  min="0"
                  value={orderDetails[product._id]?.quantity || ''}
                  onChange={(e) =>
                    handleInputChange(product._id, 'quantity', e.target.value)
                  }
                  className="w-full h-7 text-sm p-1 rounded-none border-gray-300 focus:ring-0 focus:border-gray-400"
                  disabled={!product.available}
                  placeholder={!product.available ? 'N/A' : ''}
                />
              </td>
              <td className="border border-r-0 p-1 w-32 md:w-48">
                <Input
                  value={orderDetails[product._id]?.note || ''}
                  onChange={(e) =>
                    handleInputChange(product._id, 'note', e.target.value)
                  }
                  className="w-full h-7 text-sm p-1 rounded-none border-gray-300 focus:ring-0 focus:border-gray-400"
                  disabled={!product.available}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export function OrderForm({ title, email, phone, fax }: OrderFormProps) {
  // --- State Variables ---
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [orderDetails, setOrderDetails] = useState<Record<string, OrderItem>>(
    {},
  ) // Keep for item details
  const [fetchError, setFetchError] = useState<string | null>(null)

  // --- React Hook Form Setup ---
  const {
    register,
    handleSubmit: handleRHFSubmit, // Rename to avoid conflict
    formState: { errors: rhfErrors, isSubmitting: isRHFSubmitting }, // Get errors and submitting state
    reset: resetRHFForm, // Function to reset RHF fields
  } = useRHFForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      customerName: '',
      pickupDate: new Date().toISOString().split('T')[0], // Set default date
      customerEmail: '',
      customerPhone: '',
      deliveryLocation: '',
      generalNote: '',
    },
  })

  // --- Formspree Setup ---
  const [formspreeState, handleFormspreeSubmit] = useFormspree(
    process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || '{your-form-id}', // Use your Form ID here
  )

  // --- Fetch Data ---
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        setFetchError(null)
        const data = await client.fetch<Category[]>(categoriesWithProductsQuery)
        setCategories(data)
        const initialDetails: Record<string, OrderItem> = {}
        data.forEach((category) => {
          category.products.forEach((product) => {
            initialDetails[product._id] = { quantity: '', note: '' }
          })
        })
        setOrderDetails(initialDetails)
      } catch (err) {
        console.error('Error fetching categories:', err)
        setFetchError('Failed to load product data. Please try refreshing.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // --- Handle Item Input Changes (remains the same) ---
  const handleInputChange = (
    productId: string,
    field: keyof OrderItem,
    value: string,
  ) => {
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [productId]: {
        ...prevDetails[productId],
        [field]: value,
      },
    }))
  }

  // --- Submit Handler ---
  const onValidSubmit = async (validatedData: OrderFormData) => {
    // Prepare final data including items and form source (original nested structure)
    const orderData = {
      ...validatedData, // Validated data from react-hook-form
      // Add form source details as a nested object
      formSourceDetails: {
        title,
        email,
        phone,
        fax,
      },
      // Transform and add items as an array of objects
      items: Object.entries(orderDetails)
        .filter(([_, item]) => item.quantity || item.note) // Keep only items with quantity or note
        .map(([productId, item]) => {
          const product = categories
            .flatMap((cat) => cat.products)
            .find((p) => p._id === productId)
          return {
            productId,
            productName: product?.title || 'Unknown Product', // Include product name
            quantity: item.quantity || '0', // Default quantity if only note exists
            note: item.note,
          }
        }),
      // Add a simple subject line for the email notification
      _subject: `New Order From: ${validatedData.customerName}`,
      // Optional: You can customize the reply-to address
      _replyto: validatedData.customerEmail,
    }

    console.log(
      'Form Data to Submit (Original Nested):',
      JSON.stringify(orderData, null, 2),
    )

    // Submit the combined data using Formspree's submit handler
    // @ts-ignore - Suppress TS error for sending nested data structure to Formspree
    await handleFormspreeSubmit(orderData)

    // Optionally reset the RHF form fields after successful submission
    // if (formspreeState.succeeded) {
    //    resetRHFForm();
    //    // Reset order items state if needed
    //    // const initialDetails... setOrderDetails(initialDetails)
    // }
  }

  // --- Column Splitting Logic ---
  let leftColumnCategories: Category[] = []
  let rightColumnCategories: Category[] = []
  const unassignedCategories: Category[] = []

  categories.forEach((category) => {
    if (category.columnPlacement === 'left') {
      leftColumnCategories.push(category)
    } else if (category.columnPlacement === 'right') {
      rightColumnCategories.push(category)
    } else {
      unassignedCategories.push(category)
    }
  })

  // Distribute unassigned categories somewhat evenly
  unassignedCategories.forEach((category, index) => {
    // Prioritize filling the shorter column or default to left
    if (leftColumnCategories.length <= rightColumnCategories.length) {
      leftColumnCategories.push(category)
    } else {
      rightColumnCategories.push(category)
    }
  })

  // --- Render Logic ---

  if (fetchError) {
    return (
      <Container>
        <div className="p-4 text-center text-red-600">
          <p>{fetchError}</p>
        </div>
      </Container>
    )
  }

  // Display success message using Formspree state
  if (formspreeState.succeeded) {
    return (
      <Container>
        <Card className="mx-auto p-6 border shadow-md bg-white my-8 text-center">
          <h2 className="text-xl font-semibold mb-0 text-green-600">
            Order Submitted Successfully!
          </h2>
          <p>Thank you for your order. We will process it shortly.</p>
          {/* Optional: Add a button to submit another order */}
          {/* <Button onClick={() => window.location.reload()} className="mt-4">Submit Another Order</Button> */}
        </Card>
      </Container>
    )
  }

  return (
    <Container>
      <Card className=" mx-auto p-0  border shadow-md bg-white my-8">
        {/* Header Section - Mimicking the top part of the form */}
        <div className="text-center border-b p-4 pt-8">
          <h1 className="text-xl font-bold mb-1">
            Stuart Dickson Produce Order Sheet
          </h1>
          <div className="flex flex-col md:flex-row justify-center items-center gap-x-6 gap-y-1 text-sm mb-3">
            {email && (
              <div className="flex items-center gap-1">
                <span className="font-semibold">Email:</span>
                <a
                  href={`mailto:${email}`}
                  className="text-brand hover:underline"
                >
                  {email}
                </a>
              </div>
            )}
            {fax && (
              <div className="flex items-center gap-1">
                <span className="font-semibold">Fax:</span>
                <span>{fax}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-1">
                <span className="font-semibold">Phone:</span>
                <span>{phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Customer Info Section - Integrated into the main card */}
        <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-b">
          <div>
            <Label
              htmlFor="customerName"
              className="font-semibold mb-1 block text-sm"
            >
              Customer Name:
            </Label>
            <Input
              id="customerName"
              {...register('customerName')}
              placeholder="Your Name or Business Name"
              className={`h-8 rounded-none border-gray-300 focus:ring-0 focus:border-gray-400 text-sm ${rhfErrors.customerName ? 'border-red-500' : ''}`}
              aria-invalid={rhfErrors.customerName ? 'true' : 'false'}
            />
            {rhfErrors.customerName && (
              <p className="text-xs text-red-600 mt-1">
                {rhfErrors.customerName.message}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="pickupDate"
              className="font-semibold mb-1 block text-sm"
            >
              Pick Up Date:
            </Label>
            <Input
              id="pickupDate"
              type="date"
              {...register('pickupDate')}
              className={`h-8 rounded-none border-gray-300 focus:ring-0 focus:border-gray-400 text-sm ${rhfErrors.pickupDate ? 'border-red-500' : ''}`}
              aria-invalid={rhfErrors.pickupDate ? 'true' : 'false'}
            />
            {rhfErrors.pickupDate && (
              <p className="text-xs text-red-600 mt-1">
                {rhfErrors.pickupDate.message}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="customerEmail"
              className="font-semibold mb-1 block text-sm"
            >
              Customer Email:
            </Label>
            <Input
              id="customerEmail"
              type="email"
              {...register('customerEmail')}
              placeholder="your.email@example.com"
              className={`h-8 rounded-none border-gray-300 focus:ring-0 focus:border-gray-400 text-sm ${rhfErrors.customerEmail ? 'border-red-500' : ''}`}
              aria-invalid={rhfErrors.customerEmail ? 'true' : 'false'}
            />
            {rhfErrors.customerEmail && (
              <p className="text-xs text-red-600 mt-1">
                {rhfErrors.customerEmail.message}
              </p>
            )}
            <ValidationError
              prefix="Email"
              field="customerEmail"
              errors={formspreeState.errors}
              className="text-xs text-red-600 mt-1"
            />
          </div>
          <div>
            <Label
              htmlFor="customerPhone"
              className="font-semibold mb-1 block text-sm"
            >
              Customer Phone:
            </Label>
            <Input
              id="customerPhone"
              type="tel"
              {...register('customerPhone')}
              placeholder="+61 4XX XXX XXX"
              className={`h-8 rounded-none border-gray-300 focus:ring-0 focus:border-gray-400 text-sm ${rhfErrors.customerPhone ? 'border-red-500' : ''}`}
              aria-invalid={rhfErrors.customerPhone ? 'true' : 'false'}
            />
            {rhfErrors.customerPhone && (
              <p className="text-xs text-red-600 mt-1">
                {rhfErrors.customerPhone.message}
              </p>
            )}
            <ValidationError
              prefix="Phone"
              field="customerPhone"
              errors={formspreeState.errors}
              className="text-xs text-red-600 mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <Label
              htmlFor="deliveryLocation"
              className="font-semibold mb-1 block text-sm"
            >
              Delivery Location (Optional):
            </Label>
            <Input
              id="deliveryLocation"
              {...register('deliveryLocation')}
              placeholder="Carpark (X or Y) and Car Rego Number"
              className="h-8 rounded-none border-gray-300 focus:ring-0 focus:border-gray-400 text-sm"
            />
            <ValidationError
              prefix="Delivery Location"
              field="deliveryLocation"
              errors={formspreeState.errors}
              className="text-xs text-red-600 mt-1"
            />
          </div>
        </div>

        {/* Form Body starts here */}
        <form onSubmit={handleRHFSubmit(onValidSubmit)} className="p-0">
          {/* Categories Section - Use borders, no gaps */}
          {isLoading ? (
            <div className="p-4 text-center">Loading products...</div> // Simple loading indicator
          ) : fetchError ? (
            <div className="p-4 text-center text-red-600">
              <p>{fetchError}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 border-b">
              {/* Table Header Row - Spans across both columns */}
              <div className="col-span-1 md:col-span-2 border-b bg-gray-100 font-semibold grid grid-cols-[1fr_80px_128px] md:grid-cols-[1fr_80px_192px_1fr_80px_192px]">
                {/* Left Column Headers */}
                <div className="p-2 px-3 border-r">Stock</div>
                <div className="p-2 border-r text-center w-[80px]">Qty</div>
                <div className="p-2 border-r w-[128px] md:w-[192px]">Note</div>
                {/* Right Column Headers - Repeat for md screens */}
                <div className="p-2 px-3 border-r hidden md:block">Stock</div>
                <div className="p-2 border-r text-center w-[80px] hidden md:block">
                  Qty
                </div>
                <div className="p-2 w-[128px] md:w-[192px] hidden md:block">
                  Note
                </div>
              </div>

              {/* Left Column Categories */}
              <div className="flex flex-col border-r">
                {leftColumnCategories.map((category) => (
                  <CategoryCard
                    key={category._id}
                    category={category}
                    orderDetails={orderDetails}
                    handleInputChange={handleInputChange}
                  />
                ))}
              </div>

              {/* Right Column Categories */}
              <div className="flex flex-col">
                {rightColumnCategories.map((category) => (
                  <CategoryCard
                    key={category._id}
                    category={category}
                    orderDetails={orderDetails}
                    handleInputChange={handleInputChange}
                  />
                ))}
              </div>

              {/* General Note Section - Spanning full width below columns */}
              <div className="md:col-span-2 border-t p-4">
                <Label
                  htmlFor="generalNote"
                  className="font-semibold block mb-1 text-sm"
                >
                  General Order Note (Optional)
                </Label>
                <Textarea
                  id="generalNote"
                  {...register('generalNote')}
                  placeholder="Add any general notes for your order here..."
                  rows={3}
                  className="rounded-none border-gray-300 focus:ring-0 focus:border-gray-400 text-sm md:h-32"
                />
              </div>
            </div>
          )}

          {/* Submit Button - Positioned at the bottom */}
          <div className="p-4 flex justify-center">
            <Button
              type="submit"
              size="lg"
              disabled={
                isLoading ||
                !!fetchError ||
                isRHFSubmitting ||
                formspreeState.submitting
              }
              className="rounded-sm"
            >
              {formspreeState.submitting ? 'Submitting...' : 'Submit Order'}
            </Button>
          </div>
          <ValidationError
            errors={formspreeState.errors}
            className="p-4 pt-0 text-center text-red-600 text-sm"
          />
        </form>
      </Card>
    </Container>
  )
}
