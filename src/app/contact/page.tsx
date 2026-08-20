import { Mail } from "lucide-react"
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Button } from "@/components/ui/Button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Aji Arlando",
  description: "Get in touch with Aji Arlando for collaborations, technical inquiries, or to discuss your next project.",
}

export default function ContactPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  const nextUrl = `${siteUrl}/contact?success=true`

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-12 md:py-16 flex flex-col gap-12 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Left Column */}
        <div className="flex flex-col gap-12">
          <header>
            <h1 className="font-heading text-5xl md:text-[64px] font-extrabold leading-[1.1] text-primary mb-4">
              Contact
            </h1>
            <p className="font-mono text-base text-muted max-w-md leading-[1.6]">
              Get in touch for collaborations or technical inquiries.
            </p>
          </header>

          <div className="flex flex-col gap-8">
            {/* Email Section */}
            <div className="flex flex-col gap-2 border-l border-primary pl-6 py-1">
              <span className="font-mono text-[10px] font-medium text-outline uppercase tracking-widest">
                EMAIL
              </span>
              <a 
                href="mailto:ajiarlando127@gmail.com" 
                className="font-heading text-xl md:text-3xl font-bold text-primary hover:text-outline transition-all duration-200 ease-in-out flex flex-wrap items-center gap-3 w-fit break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
              >
                ajiarlando127@gmail.com
                <Mail className="w-6 h-6 stroke-[1.5]" />
              </a>
            </div>

            {/* Socials Section */}
            <div className="flex flex-col gap-3 border-l border-primary pl-6 py-1">
              <span className="font-mono text-[10px] font-medium text-outline uppercase tracking-widest">
                SOCIALS
              </span>
              <ul className="flex flex-col gap-2">
                <li>
                  <a href="https://github.com/ajiarl" target="_blank" rel="noopener noreferrer" className="font-mono text-base text-primary hover:bg-primary hover:text-white transition-all duration-200 ease-in-out inline-flex items-center gap-3 px-2 py-1 -ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50">
                    GitHub <FiGithub className="w-4 h-4 stroke-[2]" />
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/ajiarlando" target="_blank" rel="noopener noreferrer" className="font-mono text-base text-primary hover:bg-primary hover:text-white transition-all duration-200 ease-in-out inline-flex items-center gap-3 px-2 py-1 -ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50">
                    LinkedIn <FiLinkedin className="w-4 h-4 stroke-[2]" />
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/ajiii.ar" target="_blank" rel="noopener noreferrer" className="font-mono text-base text-primary hover:bg-primary hover:text-white transition-all duration-200 ease-in-out inline-flex items-center gap-3 px-2 py-1 -ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50">
                    Instagram <FiInstagram className="w-4 h-4 stroke-[2]" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Location Section */}
            <div className="flex flex-col gap-2 border-l border-primary pl-6 py-1">
              <span className="font-mono text-[10px] font-medium text-outline uppercase tracking-widest">
                LOCATION
              </span>
              <p className="font-mono text-base text-primary leading-[1.6]">
                Palembang, Indonesia<br />
                WIB (UTC+7)
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="border-2 border-primary p-6 md:p-10 h-fit">
          <form 
            action="https://formsubmit.co/ajiarlando127@gmail.com" 
            method="POST"
            className="flex flex-col gap-6"
          >
            {/* Formsubmit config */}
            <input type="hidden" name="_next" value={nextUrl} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="New message from Portfolio" />
            <input
              type="text"
              name="_honey"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />
            
            <Input 
              label="NAME"
              name="name"
              type="text"
              required
            />
            
            <Input 
              label="EMAIL"
              name="email"
              type="email"
              required
            />
            
            <Textarea 
              label="MESSAGE"
              name="message"
              rows={6}
              required
            />

            <div className="pt-4">
              <Button type="submit" variant="outline" className="w-full text-center flex justify-center border-primary border-2 whitespace-nowrap">
                SEND MESSAGE
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
