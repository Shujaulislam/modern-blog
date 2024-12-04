"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/moving-border";
import { cn } from "@/lib/utils";
import { IconBuildingSkyscraper, IconUser, IconCheck, IconX } from "@tabler/icons-react";

type FormType = "individual" | "company";

interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  validation?: (value: string) => string | undefined;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  position: string;
  phone: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactForm = () => {
  const [formType, setFormType] = useState<FormType>("individual");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    position: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email format";
    return undefined;
  };

  const validatePhone = (phone: string) => {
    if (!phone) return undefined; // Phone is optional
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phone)) return "Invalid phone format";
    return undefined;
  };

  const individualFields: FormField[] = [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      placeholder: "John Doe",
      required: true,
      validation: (value) => (!value ? "Name is required" : undefined),
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "john@example.com",
      required: true,
      validation: validateEmail,
    },
    {
      id: "phone",
      label: "Phone",
      type: "tel",
      placeholder: "+1 (555) 000-0000",
      validation: validatePhone,
    },
  ];

  const companyFields: FormField[] = [
    {
      id: "company",
      label: "Company Name",
      type: "text",
      placeholder: "Acme Inc.",
      required: true,
      validation: (value) => (!value ? "Company name is required" : undefined),
    },
    {
      id: "name",
      label: "Contact Person",
      type: "text",
      placeholder: "John Doe",
      required: true,
      validation: (value) => (!value ? "Contact person is required" : undefined),
    },
    {
      id: "position",
      label: "Position",
      type: "text",
      placeholder: "Marketing Manager",
    },
    {
      id: "email",
      label: "Business Email",
      type: "email",
      placeholder: "john@company.com",
      required: true,
      validation: validateEmail,
    },
    {
      id: "phone",
      label: "Business Phone",
      type: "tel",
      placeholder: "+1 (555) 000-0000",
      validation: validatePhone,
    },
  ];

  const validateField = (field: FormField, value: string) => {
    if (field.validation) {
      return field.validation(value);
    }
    if (field.required && !value) {
      return `${field.label} is required`;
    }
    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: FormField) => {
    setTouched((prev) => new Set(prev).add(field.id));
    const error = validateField(field, formData[field.id as keyof FormData]);
    if (error) {
      setErrors((prev) => ({ ...prev, [field.id]: error }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    const fields = formType === "individual" ? individualFields : companyFields;
    
    fields.forEach((field) => {
      const error = validateField(field, formData[field.id as keyof FormData]);
      if (error) {
        newErrors[field.id] = error;
      }
    });

    // Validate message field
    if (!formData.message) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: formType,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }

      setIsSuccess(true);
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          company: "",
          position: "",
          phone: "",
          message: "",
        });
        setIsSuccess(false);
        setTouched(new Set());
      }, 2000);

    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800"
    >
      {/* Form Type Selector */}
      <div className="relative mb-8 flex bg-neutral-950 p-1 rounded-lg w-full sm:w-fit">
        <motion.div
          className="absolute inset-y-1 rounded-md bg-neutral-800"
          initial={false}
          animate={{
            x: formType === "individual" ? 0 : "100%",
            width: "50%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <button
          onClick={() => setFormType("individual")}
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 min-w-[120px]",
            formType === "individual"
              ? "text-white"
              : "text-neutral-400 hover:text-white"
          )}
        >
          <IconUser size={16} />
          Individual
        </button>
        <button
          onClick={() => setFormType("company")}
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 min-w-[120px]",
            formType === "company"
              ? "text-white"
              : "text-neutral-400 hover:text-white"
          )}
        >
          <IconBuildingSkyscraper size={16} />
          Company
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={formType}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Dynamic Form Fields */}
            {(formType === "individual" ? individualFields : companyFields).map(
              (field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-medium text-neutral-200"
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>
                  <div className="relative mt-1">
                    <input
                      type={field.type}
                      id={field.id}
                      value={formData[field.id as keyof FormData]}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur(field)}
                      className={cn(
                        "block w-full rounded-lg border px-4 py-2 text-neutral-200 transition-colors bg-neutral-950",
                        errors[field.id] && touched.has(field.id)
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-neutral-800 focus:border-emerald-500 focus:ring-emerald-500"
                      )}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                    {errors[field.id] && touched.has(field.id) && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors[field.id]}
                      </motion.p>
                    )}
                  </div>
                </div>
              )
            )}
          </motion.div>
        </AnimatePresence>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-neutral-200"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1">
            <textarea
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              onBlur={() => setTouched((prev) => new Set(prev).add("message"))}
              rows={4}
              className={cn(
                "block w-full rounded-lg border px-4 py-2 text-neutral-200 transition-colors bg-neutral-950",
                errors.message && touched.has("message")
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-neutral-800 focus:border-emerald-500 focus:ring-emerald-500"
              )}
              placeholder="Tell us about your project..."
              required
            />
            {errors.message && touched.has("message") && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.message}
              </motion.p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex items-center gap-2 text-emerald-500">
                  <IconCheck size={20} />
                  <span>Message sent successfully!</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  borderRadius="1.5rem"
                  className={cn(
                    "w-full bg-neutral-900 text-white border-neutral-800 hover:bg-neutral-800",
                    isLoading && "opacity-50 cursor-not-allowed"
                  )}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-neutral-400 border-t-white rounded-full"
                      />
                      Sending...
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* General Error Message */}
        {errors.submit && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm text-center mt-2"
          >
            {errors.submit}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
};

export default ContactForm;
