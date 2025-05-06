"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, X, Send, Globe, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
]

// Mock translations for common phrases
const translations = {
  en: {
    welcome: "Hello! I'm GrievX Assistant. How can I help you today?",
    placeholder: "Type your message here...",
    send: "Send",
    helpTopics: "I can help with: filing complaints, tracking status, finding resources",
  },
  hi: {
    welcome: "नमस्ते! मैं GrievX सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?",
    placeholder: "अपना संदेश यहां टाइप करें...",
    send: "भेजें",
    helpTopics: "मैं इनमें मदद कर सकता हूँ: शिकायत दर्ज करना, स्थिति ट्रैक करना, संसाधन खोजना",
  },
  es: {
    welcome: "¡Hola! Soy el Asistente de GrievX. ¿Cómo puedo ayudarte hoy?",
    placeholder: "Escribe tu mensaje aquí...",
    send: "Enviar",
    helpTopics: "Puedo ayudar con: presentar quejas, seguimiento de estado, encontrar recursos",
  },
  fr: {
    welcome: "Bonjour! Je suis l'assistant GrievX. Comment puis-je vous aider aujourd'hui?",
    placeholder: "Tapez votre message ici...",
    send: "Envoyer",
    helpTopics: "Je peux aider avec: dépôt de plaintes, suivi de statut, recherche de ressources",
  },
  de: {
    welcome: "Hallo! Ich bin der GrievX-Assistent. Wie kann ich Ihnen heute helfen?",
    placeholder: "Geben Sie Ihre Nachricht hier ein...",
    send: "Senden",
    helpTopics: "Ich kann helfen bei: Beschwerden einreichen, Status verfolgen, Ressourcen finden",
  },
}

// Mock responses based on user input
const getMockResponse = (input: string, lang: string) => {
  const lowerInput = input.toLowerCase()

  if (
    lowerInput.includes("file") ||
    lowerInput.includes("complaint") ||
    lowerInput.includes("report") ||
    lowerInput.includes("शिकायत") ||
    lowerInput.includes("queja") ||
    lowerInput.includes("plainte")
  ) {
    return {
      en: "To file a complaint, go to the 'File Complaint' section and fill out the form with details about your issue.",
      hi: "शिकायत दर्ज करने के लिए, 'शिकायत दर्ज करें' अनुभाग पर जाएं और अपनी समस्या के बारे में विवरण के साथ फॉर्म भरें।",
      es: "Para presentar una queja, vaya a la sección 'Presentar queja' y complete el formulario con detalles sobre su problema.",
      fr: "Pour déposer une plainte, allez à la section 'Déposer une plainte' et remplissez le formulaire avec les détails de votre problème.",
      de: "Um eine Beschwerde einzureichen, gehen Sie zum Abschnitt 'Beschwerde einreichen' und füllen Sie das Formular mit Details zu Ihrem Problem aus.",
    }[lang]
  }

  if (
    lowerInput.includes("track") ||
    lowerInput.includes("status") ||
    lowerInput.includes("update") ||
    lowerInput.includes("स्थिति") ||
    lowerInput.includes("estado") ||
    lowerInput.includes("statut")
  ) {
    return {
      en: "You can track your complaint status in the 'Track Complaint' section using your complaint ID.",
      hi: "आप अपनी शिकायत आईडी का उपयोग करके 'शिकायत ट्रैक करें' अनुभाग में अपनी शिकायत की स्थिति को ट्रैक कर सकते हैं।",
      es: "Puede realizar un seguimiento del estado de su queja en la sección 'Seguimiento de queja' utilizando su ID de queja.",
      fr: "Vous pouvez suivre l'état de votre plainte dans la section 'Suivi de plainte' en utilisant votre identifiant de plainte.",
      de: "Sie können den Status Ihrer Beschwerde im Abschnitt 'Beschwerde verfolgen' mit Ihrer Beschwerde-ID verfolgen.",
    }[lang]
  }

  if (
    lowerInput.includes("help") ||
    lowerInput.includes("मदद") ||
    lowerInput.includes("ayuda") ||
    lowerInput.includes("aide") ||
    lowerInput.includes("hilfe")
  ) {
    return translations[lang as keyof typeof translations].helpTopics
  }

  // Default response
  return {
    en: "I'm not sure I understand. Could you please clarify or try asking about filing complaints, tracking status, or finding resources?",
    hi: "मुझे समझ नहीं आया। क्या आप स्पष्ट कर सकते हैं या शिकायत दर्ज करने, स्थिति ट्रैक करने, या संसाधन खोजने के बारे में पूछने का प्रयास कर सकते हैं?",
    es: "No estoy seguro de entender. ¿Podría aclarar o intentar preguntar sobre cómo presentar quejas, seguir el estado o encontrar recursos?",
    fr: "Je ne suis pas sûr de comprendre. Pourriez-vous préciser ou essayer de poser des questions sur le dépôt de plaintes, le suivi de l'état ou la recherche de ressources?",
    de: "Ich bin mir nicht sicher, ob ich verstehe. Könnten Sie bitte klären oder versuchen, nach dem Einreichen von Beschwerden, der Statusverfolgung oder dem Finden von Ressourcen zu fragen?",
  }[lang]
}

export function EnhancedChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [language, setLanguage] = useState("en")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Add welcome message when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now().toString(),
        content: translations[language as keyof typeof translations].welcome,
        sender: "bot" as const,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length, language])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user" as const,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        content: getMockResponse(input, language),
        sender: "bot" as const,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  const changeLanguage = (lang: string) => {
    setLanguage(lang)
    // Add a language change notification
    const notification = {
      id: Date.now().toString(),
      content: {
        en: "Language changed to English",
        hi: "भाषा हिंदी में बदली गई",
        es: "Idioma cambiado a Español",
        fr: "Langue changée en Français",
        de: "Sprache auf Deutsch geändert",
      }[lang],
      sender: "bot" as const,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, notification])
  }

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 h-14 w-14 rounded-full p-0 shadow-lg">
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 sm:w-96 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">GrievX Assistant</h3>
                <Badge variant="outline" className="text-xs">
                  {languages.find((l) => l.code === language)?.name || "English"}
                </Badge>
              </div>
            </div>
            <div className="flex gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((lang) => (
                    <DropdownMenuItem key={lang.code} onClick={() => changeLanguage(lang.code)}>
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="max-h-80 overflow-y-auto p-4">
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="mt-1 text-right text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="flex w-full gap-2">
              <Input
                placeholder={translations[language as keyof typeof translations].placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
