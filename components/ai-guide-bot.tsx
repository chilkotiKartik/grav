"use client"

import { useState, useRef } from "react"
import { useToast } from "@/components/ui/use-toast"
import dynamic from "next/dynamic"

// Dynamically import the Lottie player with SSR disabled
const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), {
  ssr: false,
})

interface AIGuideBotProps {
  initialOpen?: boolean
}

// Available languages
const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
]

export function AIGuideBot({ initialOpen = false }: AIGuideBotProps) {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [currentMessage, setCurrentMessage] = useState("")
  const [userInput, setUserInput] = useState("")
  const [mounted, setMounted] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(languages[0])
  const [showLanguages, setShowLanguages] = useState(false)
  const [chatHistory, setChatHistory] = useState<{ role: "bot" | "user"; message: string }[]>([])
  const chatEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Mock messages for the AI Guide in different languages
  const welcomeMessages = {
    en: "Hello! I'm GrievX Guide Bot. How can I help you today?",
    hi: "नमस्ते! मैं GrievX गाइड बॉट हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?",
    ta: "வணக்கம்! நான் GrievX வழிகாட்டி பாட். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
    bn: "হ্যালো! আমি GrievX গাইড বট। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
    mr: "नमस्कार! मी GrievX गाइड बॉट आहे. आज मी आपली कशी मदत करू शकतो?",
    kn: "ಹಲೋ! ನಾನು GrievX ಗೈಡ್ ಬಾಟ್. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
  }

  const helpMessages = {
    fileComplaint: {
      en: "To file a complaint, click on the 'File Complaint' button. You'll be guided through a simple step-by-step process.",
      hi: "शिकायत दर्ज करने के लिए, 'शिकायत दर्ज करें' बटन पर क्लिक करें। आपको एक सरल चरण-दर-चरण प्रक्रिया के माध्यम से मार्गदर्शन किया जाएगा।",
      ta: "புகார் செய்ய, 'புகார் தாக்கல் செய்' பொத்தானைக் கிளிக் செய்யவும். நீங்கள் ஒரு எளிய படிப்படியான செயல்முறை வழியாக வழிநடத்தப்படுவீர்கள்.",
      bn: "অভিযোগ দায়ের করতে, 'অভিযোগ দায়ের করুন' বোতামে ক্লিক করুন। আপনাকে একটি সহজ ধাপে ধাপে প্রক্রিয়ার মাধ্যমে গাইড করা হবে।",
      mr: "तक्रार दाखल करण्यासाठी, 'तक्रार दाखल करा' बटणावर क्लिक करा. तुम्हाला एका साध्या पायरी-दर-पायरी प्रक्रियेद्वारे मार्गदर्शन केले जाईल.",
      kn: "ದೂರು ಸಲ್ಲಿಸಲು, 'ದೂರು ಸಲ್ಲಿಸು' ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ. ನೀವು ಸರಳ ಹಂತ-ಹಂತದ ಪ್ರಕ್ರಿಯೆಯ ಮೂಲಕ ಮಾರ್ಗದರ್ಶನ ಮಾಡಲಾಗುತ್ತದೆ.",
    },
    trackComplaint: {
      en: "To track your complaint, go to the 'Track Complaint' page and enter your complaint ID. You can also see all your complaints in your dashboard.",
      hi: "अपनी शिकायत को ट्रैक करने के लिए, 'शिकायत ट्रैक करें' पेज पर जाएं और अपना शिकायत आईडी दर्ज करें। आप अपने डैशबोर्ड में अपनी सभी शिकायतें भी देख सकते हैं।",
      ta: "உங்கள் புகாரைக் கண்காணிக்க, 'புகாரைக் கண்காணி' பக்கத்திற்குச் சென்று உங்கள் புகார் ஐடியை உள்ளிடவும். உங்கள் டாஷ்போர்டில் உங்கள் அனைத்து புகார்களையும் காணலாம்.",
      bn: "আপনার অভিযোগ ট্র্যাক করতে, 'অভিযোগ ট্র্যাক করুন' পৃষ্ঠায় যান এবং আপনার অভিযোগ আইডি লিখুন। আপনি আপনার ড্যাশবোর্ডে আপনার সমস্ত অভিযোগও দেখতে পারেন।",
      mr: "तुमची तक्रार ट्रॅक करण्यासाठी, 'तक्रार ट्रॅक करा' पृष्ठावर जा आणि तुमचा तक्रार आयडी प्रविष्ट करा. तुम्ही तुमच्या डॅशबोर्डवर तुमच्या सर्व तक्रारी देखील पाहू शकता.",
      kn: "ನಿಮ್ಮ ದೂರನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು, 'ದೂರು ಟ್ರ್ಯಾಕ್' ಪುಟಕ್ಕೆ ಹೋಗಿ ಮತ್ತು ನಿಮ್ಮ ದೂರು ಐಡಿಯನ್ನು ನಮೂದಿಸಿ. ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಎಲ್ಲಾ ದೂರುಗಳನ್ನು ನೀವು ನೋಡಬಹುದು.",
    },
    reminder: {
      en: "If your complaint is not resolved within the expected timeframe, you can send a reminder. Go to your dashboard, find the complaint, and click on the 'Send Reminder' button.",
      hi: "यदि आपकी शिकायत अपेक्षित समय सीमा के भीतर हल नहीं होती है, तो आप एक रिमाइंडर भेज सकते हैं। अपने डैशबोर्ड पर जाएं, शिकायत खोजें, और 'रिमाइंडर भेजें' बटन पर क्लिक करें।",
      ta: "உங்கள் புகார் எதிர்பார்க்கப்படும் காலக்கெடுவிற்குள் தீர்க்கப்படவில்லை என்றால், நீங்கள் ஒரு நினைவூட்டலை அனுப்பலாம். உங்கள் டாஷ்போர்டுக்குச் சென்று, புகாரைக் கண்டறிந்து, 'நினைவூட்டல் அனுப்பு' பொத்தானைக் கிளிக் செய்யவும்.",
      bn: "আপনার অভিযোগ প্রত্যাশিত সময়সীমার মধ্যে সমাধান না হলে, আপনি একটি রিমাইন্ডার পাঠাতে পারেন। আপনার ড্যাশবোর্ডে যান, অভিযোগটি খুঁজুন এবং 'রিমাইন্ডার পাঠান' বোতামে ক্লিক করুন।",
      mr: "तुमची तक्रार अपेक्षित कालावधीत सोडवली गेली नाही तर तुम्ही रिमाइंडर पाठवू शकता. तुमच्या डॅशबोर्डवर जा, तक्रार शोधा आणि 'रिमाइंडर पाठवा' बटणावर क्लिक करा.",
      kn: "ನಿಮ್ಮ ದೂರನ್ನು ನಿರೀಕ್ಷಿತ ಸಮಯದೊಳಗೆ ಪರಿಹರಿಸದಿದ್ದರೆ, ನೀವು ರಿಮೈಂಡರ್ ಕಳುಹಿಸಬಹುದು. ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹೋಗಿ, ದೂರನ್ನು ಹುಡುಕಿ ಮತ್ತು 'ರಿಮೈಂಡರ್ ಕಳುಹಿಸಿ' ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.",
    },
    townhall: {
      en: "Join our virtual townhalls to interact with officials and discuss community issues. Check the 'Townhall' section for upcoming events and past discussions.",
      hi: "अधिकारियों के साथ बातचीत करने और सामुदायिक मुद्दों पर चर्चा करने के लिए हमारे वर्चुअल टाउनहॉल में शामिल हों। आगामी कार्यक्रमों और पिछली चर्चाओं के लिए 'टाउनहॉल' अनुभाग देखें।",
      ta: "அதிகாரிகளுடன் தொடர்புகொள்ளவும் சமூக பிரச்சினைகளை விவாதிக்கவும் எங்கள் மெய்நிகர் டவுன்ஹால்களில் சேரவும். வரவிருக்கும் நிகழ்வுகள் மற்றும் கடந்த கால விவாதங்களுக்கு 'டவுன்ஹால்' பிரிவைப் பார்க்கவும்.",
      bn: "কর্মকর্তাদের সাথে যোগাযোগ করতে এবং সম্প্রদায়ের সমস্যা নিয়ে আলোচনা করতে আমাদের ভার্চুয়াল টাউনহলে যোগ দিন। আসন্ন ইভেন্ট এবং অতীত আলোচনার জন্য 'টাউনহল' বিভাগ দেখুন।",
      mr: "अधिकाऱ्यांशी संवाद साधण्यासाठी आणि समुदायाच्या समस्यांवर चर्चा करण्यासाठी आमच्या व्हर्च्युअल टाउनहॉलमध्ये सामील व्हा. आगामी कार्यक्रम आणि मागील चर्चांसाठी 'टाउनहॉल' विभाग तपासा.",
      kn: "ಅಧಿಕಾರಿಗಳೊಂದಿಗೆ ಸಂವಹನ ನಡೆಸಲು ಮತ್ತು ಸಮುದಾಯದ ಸಮಸ್ಯೆಗಳನ್ನು ಚರ್ಚಿಸಲು ನಮ್ಮ ವರ್ಚುವಲ್ ಟೌನ್‌ಹಾಲ್‌ಗಳಲ್ಲಿ ಸೇರಿಕೊಳ್ಳಿ. ಮುಂಬರುವ ಈವೆಂಟ್‌ಗಳು ಮತ್ತು ಹಿಂದಿನ ಚರ್ಚೆಗಳಿಗಾಗಿ 'ಟೌನ್‌ಹಾಲ್' ವಿಭಾಗವನ್ನು ಪರಿಶೀಲಿಸಿ.",
    },
  }
}
