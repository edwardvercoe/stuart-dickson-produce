"use client"

import React, { useState, useEffect } from "react"
import { client } from "@/sanity/lib/client" // Import the Sanity client
import { categoriesWithProductsQuery } from "@/sanity/lib/queries" // Import the GROQ query

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { OrderForm as OrderFormType } from "@/types/sanity.types" // Import the generated type
import Container from "../shared/Container"

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
interface OrderFormProps extends Omit<OrderFormType, '_type'> { }

// --- Reusable Category Card Component ---
interface CategoryCardProps {
    category: Category;
    orderDetails: Record<string, OrderItem>;
    handleInputChange: (productId: string, field: keyof OrderItem, value: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, orderDetails, handleInputChange }) => (
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
                                    value={orderDetails[product._id]?.quantity || ""}
                                    onChange={(e) => handleInputChange(product._id, "quantity", e.target.value)}
                                    className="w-full h-7 text-sm p-1 rounded-none border-gray-300 focus:ring-0 focus:border-gray-400"
                                    disabled={!product.available}
                                    placeholder={!product.available ? "N/A" : ""}
                                />
                            </td>
                            <td className="border border-r-0 p-1 w-32 md:w-48">
                                <Input
                                    value={orderDetails[product._id]?.note || ""}
                                    onChange={(e) => handleInputChange(product._id, "note", e.target.value)}
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
);

export function OrderForm({ title, email, phone, fax }: OrderFormProps) {
  const [customerName, setCustomerName] = useState("")
  const [pickupDate, setPickupDate] = useState(new Date().toISOString().split("T")[0])
  const [generalNote, setGeneralNote] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [deliveryLocation, setDeliveryLocation] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [orderDetails, setOrderDetails] = useState<Record<string, OrderItem>>({})
  const [error, setError] = useState<string | null>(null) // Added error state

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        setError(null) // Reset error on new fetch
        // Directly fetch data using the Sanity client
        const data = await client.fetch<Category[]>(categoriesWithProductsQuery)
        setCategories(data)

        // Initialize orderDetails state
        const initialDetails: Record<string, OrderItem> = {}
        data.forEach((category) => {
          category.products.forEach((product) => {
            initialDetails[product._id] = { quantity: "", note: "" }
          })
        })
        setOrderDetails(initialDetails)

      } catch (err) {
        console.error("Error fetching categories directly from Sanity:", err)
        setError("Failed to load product data. Please try refreshing the page.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, []) // Empty dependency array ensures this runs once on mount

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Prepare data for submission
    const orderData = {
      customerName,
      pickupDate,
      generalNote,
      customerEmail,
      customerPhone,
      deliveryLocation,
      // Include form source details from props if needed for Typeform
      formDetails: {
        title,
        email,
        phone,
        fax
      },
      items: Object.entries(orderDetails)
        .filter(([_, item]) => item.quantity || item.note)
        .map(([productId, item]) => {
          const product = categories
            .flatMap(cat => cat.products)
            .find(p => p._id === productId);
          return {
            productId,
            productName: product?.title || 'Unknown Product',
            quantity: item.quantity,
            note: item.note,
          }
        }),
    }
    console.log("Form Data to Submit:", JSON.stringify(orderData, null, 2))
    // --- TODO: Send orderData to Typeform API/Webhook ---
    alert("Order Submitted (See console for data)") // Placeholder
  }

  // --- Column Splitting Logic ---
  let leftColumnCategories: Category[] = [];
  let rightColumnCategories: Category[] = [];
  const unassignedCategories: Category[] = [];

  categories.forEach(category => {
    if (category.columnPlacement === 'left') {
      leftColumnCategories.push(category);
    } else if (category.columnPlacement === 'right') {
      rightColumnCategories.push(category);
    } else {
      unassignedCategories.push(category);
    }
  });

  // Distribute unassigned categories somewhat evenly
  unassignedCategories.forEach((category, index) => {
    // Prioritize filling the shorter column or default to left
    if (leftColumnCategories.length <= rightColumnCategories.length) {
      leftColumnCategories.push(category);
    } else {
      rightColumnCategories.push(category);
    }
  });


  // --- Render Logic (remains largely the same as the page version) ---

  if (error) {
    return (
        <div className="container mx-auto p-4  text-center text-red-600">
            <p>{error}</p>
        </div>
    )
  }

  return (
    // Wrap everything in a single Card acting as the "paper"
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
              <a href={`mailto:${email}`} className="text-brand hover:underline">
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
          <Label htmlFor="customerName" className="font-semibold mb-1 block text-sm">
            Customer Name:
          </Label>
          <Input
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            placeholder="Your Name or Business Name"
            className="h-8 rounded-none border-gray-300 focus:ring-0 focus:border-gray-400 text-sm"
          />
        </div>
        <div>
          <Label htmlFor="pickupDate" className="font-semibold mb-1 block text-sm">
            Pick Up Date:
          </Label>
          <Input
            id="pickupDate"
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            required
            className="h-8 rounded-none border-gray-300 focus:ring-0 focus:border-gray-400 text-sm"
          />
        </div>
        <div>
            <Label htmlFor="customerEmail" className="font-semibold mb-1 block text-sm">
                Customer Email:
            </Label>
            <Input
                id="customerEmail"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="h-8 rounded-none border-gray-300 focus:ring-0 focus:border-gray-400 text-sm"
                required
            />
        </div>
        <div>
            <Label htmlFor="customerPhone" className="font-semibold mb-1 block text-sm">
                Customer Phone:
            </Label>
            <Input
                id="customerPhone"
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="e.g., 555-123-4567"
                className="h-8 rounded-none border-gray-300 focus:ring-0 focus:border-gray-400 text-sm"
                required
            />
        </div>
        <div className="md:col-span-2">
            <Label htmlFor="deliveryLocation" className="font-semibold mb-1 block text-sm">
                Delivery Location (Optional):
            </Label>
            <Input
                id="deliveryLocation"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                placeholder="Carpark (X or Y) and Car Rego Number"
                className="h-8 rounded-none border-gray-300 focus:ring-0 focus:border-gray-400 text-sm"
            />
        </div>
      </div>

      {/* Form Body starts here */}
      <form onSubmit={handleSubmit} className="p-0">
        {/* Categories Section - Use borders, no gaps */}
        {isLoading ? (
          <div className="p-4 text-center">Loading products...</div> // Simple loading indicator
        ) : error ? (
             <div className="p-4 text-center text-red-600">
                <p>{error}</p>
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
                <div className="p-2 border-r text-center w-[80px] hidden md:block">Qty</div>
                <div className="p-2 w-[128px] md:w-[192px] hidden md:block">Note</div>
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
                <Label htmlFor="generalNote" className="font-semibold block mb-1 text-sm">General Order Note</Label>
                <Textarea
                    id="generalNote"
                    value={generalNote}
                    onChange={(e) => setGeneralNote(e.target.value)}
                    placeholder="Add any general notes for your order here..."
                    rows={3}
                    className="rounded-none border-gray-300 focus:ring-0 focus:border-gray-400 text-sm md:h-32"
                />
            </div>
          </div>
        )}

        {/* Submit Button - Positioned at the bottom */}
        <div className="p-4 flex justify-center">
          <Button type="submit" size="lg" disabled={isLoading || !!error} className="rounded-sm">
            Submit Order
          </Button>
        </div>
      </form>
    </Card>
    </Container>

  )
} 