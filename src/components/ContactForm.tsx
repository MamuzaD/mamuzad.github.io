"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import emailjs from "@emailjs/browser"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().min(2, { message: "please include a name" }).max(50, {
    message: "that's a long name, could you use a nickname perhaps",
  }),
  email: z.string().email({ message: "please use a valid email" }),
  message: z.string().min(10, { message: "bit of a short message" }).max(500, {
    message: "bit of a long message, would you rather discuss in a meeting?",
  }),
})
interface ContactFormProps {
  setViewForm: (value: React.SetStateAction<boolean>) => void
}

export default function ContactForm({ setViewForm }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const templateParams = {
      from_name: values.name,
      from_email: values.email,
      message: values.message,
    }

    const service = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID
    const template = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY

    console.log("Service:", service)
    console.log("Template:", template)
    console.log("Public Key:", publicKey)

    emailjs
      .send(service, template, templateParams, { publicKey: publicKey })
      .then(
        () => {
          setIsSubmitted(true)
          setTimeout(() => {
            setViewForm(false)
          }, 2000)
        },
        (error) => {
          console.log("Error!", error)
        }
      )
  }

  return (
    <div>
      {isSubmitted ? (
        <p className="text-2xl font-medium text-primary">
          sent! thanks for reaching out
        </p>
      ) : (
        <>
          <h3
            className={`min-h-26 z-50 mb-4 cursor-pointer, auto] text-center text-4xl font-bold`}
            onClick={() => setViewForm(false)}
          >
            contact me
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="bob" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="bob@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>message</FormLabel>
                    <FormControl>
                      <Textarea
                        className="w-96"
                        placeholder="hey i saw your portfolio..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between gap-4">
                <Button type="submit">Submit</Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setViewForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </div>
  )
}
