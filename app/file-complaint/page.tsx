"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "@/components/user-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Camera, Upload, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react"

// Form schemas for each step
const personalInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
})

const complaintDetailsSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  subcategory: z.string().min(1, "Please select a subcategory"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
})

const locationSchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  pincode: z.string().min(6, "Please enter a valid pincode"),
})

const evidenceSchema = z.object({
  hasEvidence: z.boolean().optional(),
  // File uploads would be handled separately
})

// Categories and subcategories
const categories = [
  {
    value: "sanitation",
    label: "Sanitation",
    subcategories: [
      { value: "garbage", label: "Garbage Collection" },
      { value: "sewage", label: "Sewage Issues" },
      { value: "public-toilets", label: "Public Toilets" },
      { value: "water-quality", label: "Water Quality" },
    ],
  },
  {
    value: "security",
    label: "Security",
    subcategories: [
      { value: "street-lights", label: "Street Lights" },
      { value: "police", label: "Police Response" },
      { value: "harassment", label: "Public Harassment" },
      { value: "theft", label: "Theft/Robbery" },
    ],
  },
  {
    value: "infrastructure",
    label: "Infrastructure",
    subcategories: [
      { value: "roads", label: "Road Conditions" },
      { value: "bridges", label: "Bridges & Flyovers" },
      { value: "public-transport", label: "Public Transport" },
      { value: "buildings", label: "Public Buildings" },
    ],
  },
  {
    value: "corruption",
    label: "Corruption",
    subcategories: [
      { value: "bribery", label: "Bribery" },
      { value: "fraud", label: "Fraud" },
      { value: "misuse", label: "Misuse of Public Funds" },
      { value: "nepotism", label: "Nepotism" },
    ],
  },
]

export default function FileComplaintPage() {
  const { user } = useUser()
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    personalInfo: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
    },
    complaintDetails: {
      category: "",
      subcategory: "",
      title: "",
      description: "",
    },
    location: {
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
    evidence: {
      hasEvidence: false,
      files: [],
    },
  })

  // Form for personal info
  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: formData.personalInfo,
  })

  // Form for complaint details
  const complaintDetailsForm = useForm<z.infer<typeof complaintDetailsSchema>>({
    resolver: zodResolver(complaintDetailsSchema),
    defaultValues: formData.complaintDetails,
  })

  // Form for location
  const locationForm = useForm<z.infer<typeof locationSchema>>({
    resolver: zodResolver(locationSchema),
    defaultValues: formData.location,
  })

  // Form for evidence
  const evidenceForm = useForm<z.infer<typeof evidenceSchema>>({
    resolver: zodResolver(evidenceSchema),
    defaultValues: formData.evidence,
  })

  // Handle category change to update subcategories
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    complaintDetailsForm.setValue("category", value)
    complaintDetailsForm.setValue("subcategory", "")
  }

  // Get subcategories based on selected category
  const getSubcategories = () => {
    if (!selectedCategory) return []
    const category = categories.find((cat) => cat.value === selectedCategory)
    return category ? category.subcategories : []
  }

  // Handle form submission for each step
  const handleStepSubmit = async (stepData: any) => {
    // Update form data
    switch (step) {
      case 1:
        setFormData((prev) => ({ ...prev, personalInfo: stepData }))
        break
      case 2:
        setFormData((prev) => ({ ...prev, complaintDetails: stepData }))
        break
      case 3:
        setFormData((prev) => ({ ...prev, location: stepData }))
        break
      case 4:
        setFormData((prev) => ({ ...prev, evidence: { ...prev.evidence, hasEvidence: stepData.hasEvidence } }))
        break
    }

    // Move to next step or submit
    if (step < 5) {
      setStep(step + 1)
    } else {
      // Submit the complaint
      submitComplaint()
    }
  }

  // Submit the complete complaint
  const submitComplaint = async () => {
    // In a real app, you would send this to your API
    console.log("Submitting complaint:", formData)

    // Generate a proper complaint ID
    const year = new Date().getFullYear()
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    const complaintId = `GRV${year}-${randomNum}`

    // Show success toast
    toast({
      title: "Complaint Submitted Successfully!",
      description: `Your complaint has been registered with ID: ${complaintId}`,
    })

    // Redirect to success page
    setTimeout(() => {
      router.push(`/track-complaint?id=${complaintId}`)
    }, 2000)
  }

  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Form {...personalInfoForm}>
            <form onSubmit={personalInfoForm.handleSubmit(handleStepSubmit)} className="space-y-6">
              <FormField
                control={personalInfoForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={personalInfoForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={personalInfoForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        )

      case 2:
        return (
          <Form {...complaintDetailsForm}>
            <form onSubmit={complaintDetailsForm.handleSubmit(handleStepSubmit)} className="space-y-6">
              <FormField
                control={complaintDetailsForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={(value) => handleCategoryChange(value)} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={complaintDetailsForm.control}
                name="subcategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcategory</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedCategory}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subcategory" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {getSubcategories().map((subcategory) => (
                          <SelectItem key={subcategory.value} value={subcategory.value}>
                            {subcategory.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={complaintDetailsForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complaint Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a brief title for your complaint" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={complaintDetailsForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide details about your complaint"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button type="submit">
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        )

      case 3:
        return (
          <Form {...locationForm}>
            <form onSubmit={locationForm.handleSubmit(handleStepSubmit)} className="space-y-6">
              <FormField
                control={locationForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the address related to the complaint"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={locationForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={locationForm.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter state" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={locationForm.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter pincode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button type="submit">
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        )

      case 4:
        return (
          <Form {...evidenceForm}>
            <form onSubmit={evidenceForm.handleSubmit(handleStepSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Upload Evidence</h3>
                <p className="text-muted-foreground">
                  Upload any photos, videos, or documents that support your complaint.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">Upload Photos</p>
                      <p className="text-xs text-muted-foreground">JPG, PNG, HEIC</p>
                      <Input type="file" accept="image/*" className="hidden" id="photo-upload" multiple />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => document.getElementById("photo-upload")?.click()}
                      >
                        Select Files
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">Upload Documents</p>
                      <p className="text-xs text-muted-foreground">PDF, DOC, DOCX</p>
                      <Input type="file" accept=".pdf,.doc,.docx" className="hidden" id="doc-upload" multiple />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => document.getElementById("doc-upload")?.click()}
                      >
                        Select Files
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <p className="text-sm text-muted-foreground">
                  You can continue without uploading evidence, but providing evidence helps in faster resolution.
                </p>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(3)}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button type="submit">
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Review Your Complaint</h3>
              <p className="text-muted-foreground">Please review your complaint details before submitting.</p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">Name:</div>
                    <div className="text-sm font-medium">{formData.personalInfo.name}</div>

                    <div className="text-sm text-muted-foreground">Email:</div>
                    <div className="text-sm font-medium">{formData.personalInfo.email}</div>

                    <div className="text-sm text-muted-foreground">Phone:</div>
                    <div className="text-sm font-medium">{formData.personalInfo.phone}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Complaint Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">Category:</div>
                    <div className="text-sm font-medium capitalize">{formData.complaintDetails.category}</div>

                    <div className="text-sm text-muted-foreground">Subcategory:</div>
                    <div className="text-sm font-medium capitalize">{formData.complaintDetails.subcategory}</div>

                    <div className="text-sm text-muted-foreground">Title:</div>
                    <div className="text-sm font-medium">{formData.complaintDetails.title}</div>
                  </div>

                  <div className="pt-2">
                    <div className="text-sm text-muted-foreground mb-1">Description:</div>
                    <div className="text-sm border rounded-md p-3 bg-muted/30">
                      {formData.complaintDetails.description}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">Address:</div>
                    <div className="text-sm font-medium">{formData.location.address}</div>

                    <div className="text-sm text-muted-foreground">City:</div>
                    <div className="text-sm font-medium">{formData.location.city}</div>

                    <div className="text-sm text-muted-foreground">State:</div>
                    <div className="text-sm font-medium">{formData.location.state}</div>

                    <div className="text-sm text-muted-foreground">Pincode:</div>
                    <div className="text-sm font-medium">{formData.location.pincode}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(4)}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={submitComplaint}>Submit Complaint</Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">File a Complaint</h1>
          <p className="text-muted-foreground">Help us improve your community by reporting issues</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {["Personal Info", "Complaint Details", "Location", "Evidence", "Review"].map((label, index) => {
              const stepNumber = index + 1
              const isActive = step === stepNumber
              const isCompleted = step > stepNumber

              return (
                <div key={label} className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : isCompleted
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/30 text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <span>{stepNumber}</span>}
                  </div>
                  <span
                    className={`text-xs mt-2 ${isActive || isCompleted ? "text-primary font-medium" : "text-muted-foreground"}`}
                  >
                    {label}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 right-0 h-1 bg-muted-foreground/20 rounded-full" />
            <div
              className="absolute top-0 left-0 h-1 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardContent className="pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
