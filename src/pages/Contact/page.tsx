import { useState, FormEvent, ChangeEvent } from "react";
import { Send, MapPin, Mail } from "lucide-react";
import { useTheme } from "@/provider/page";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<string | null>(null);

  const validateForm = (): boolean => {
    let tempErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("Please fill in all required fields correctly.");
      return;
    }

    // Create a new FormData object to send to Web3Forms API
    const form = new FormData();
    form.append("access_key", "90f4b8af-e590-42b0-beaf-10b18f66a703"); // Replace with your Web3Forms access key
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("subject", formData.subject || "New Contact Form Submission");
    form.append("message", formData.message);

    try {
      // Send form data to Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setErrors({});
      } else {
        setStatus(result.message || "There was an error sending your message.");
      }
    } catch (error) {
      setStatus("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode
          ? "bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white"
          : "bg-gradient-to-r from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1] text-gray-900"
      }`}
    >
      <section className="w-full py-8 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <div className="space-y-8 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-lg bg-gradient-to-br from-white/5 to-white/10">
              <div>
                <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  Get in Touch
                </h2>
                <p
                  className={`text-lg ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Have a question or want to work together? Drop us a message!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p
                      className={`${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      olovajs@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="bg-gradient-to-br from-pink-500/30 to-blue-500/30 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p
                      className={`${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Laxmipure, Natore 6400
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`backdrop-blur-xl p-8 rounded-3xl shadow-2xl border ${
                isDarkMode
                  ? "border-white/10 bg-white/5"
                  : "border-white/20 bg-white/30"
              } transition-all duration-300`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.name
                          ? "border-red-500"
                          : isDarkMode
                          ? "border-gray-700/50 bg-white/5 text-white"
                          : "border-gray-300/50 bg-white/30 text-gray-800"
                      } focus:border-blue-500 focus:outline-none transition-colors backdrop-blur-sm`}
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.email
                          ? "border-red-500"
                          : isDarkMode
                          ? "border-gray-700/50 bg-white/5 text-white"
                          : "border-gray-300/50 bg-white/30 text-gray-800"
                      } focus:border-blue-500 focus:outline-none transition-colors backdrop-blur-sm`}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.subject
                          ? "border-red-500"
                          : isDarkMode
                          ? "border-gray-700/50 bg-white/5 text-white"
                          : "border-gray-300/50 bg-white/30 text-gray-800"
                      } focus:border-blue-500 focus:outline-none transition-colors backdrop-blur-sm`}
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows={4}
                      className={`w-full px-4 py-3 rounded-xl border resize-none ${
                        errors.message
                          ? "border-red-500"
                          : isDarkMode
                          ? "border-gray-700/50 bg-white/5 text-white"
                          : "border-gray-300/50 bg-white/30 text-gray-800"
                      } focus:border-blue-500 focus:outline-none transition-colors backdrop-blur-sm`}
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 backdrop-blur-sm"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Status Message */}
              {status && (
                <div
                  className={`mt-4 p-3 rounded-lg backdrop-blur-sm ${
                    status.includes("success")
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}
                >
                  <p className="text-center">{status}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
