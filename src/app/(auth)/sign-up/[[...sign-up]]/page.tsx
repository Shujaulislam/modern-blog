import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 bg-grid-small-black/[0.2] -z-10 dark:bg-grid-small-white/[0.2]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative p-4 sm:p-6 rounded-xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-xl" />
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-background/80 backdrop-blur-xl border-none shadow-none",
              headerTitle: "text-foreground",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton: "bg-muted hover:bg-muted/80 text-foreground",
              formFieldLabel: "text-foreground",
              formFieldInput: "bg-muted border-none text-foreground",
              footerActionLink: "text-primary hover:text-primary/80",
              formButtonPrimary: "bg-primary hover:bg-primary/80 text-primary-foreground",
            },
          }}
        />
      </motion.div>
    </div>
  );
}
