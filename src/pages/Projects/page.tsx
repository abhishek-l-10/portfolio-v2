import { Github, ExternalLink } from "lucide-react";
import portfolio1 from "@/assets/projects/porfolio1.png";
import desktop from "@/assets/projects/desktop.png";
import osl from "@/assets/projects/osl.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/provider/page";

const MacOsButtons = () => (
  <div className="flex gap-2 mb-4">
    <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-md" />
    <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors shadow-md" />
    <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors shadow-md" />
  </div>
);

const ProjectShowcase = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const projects = [
    {
      title: "MyPortfolio-Website",
      description:
        "Created and hosted a professional work portfolio on Netlify.app, showcasing skills and projects while facilitating user-friendly communication via Netlify’s form functionalities. Tech Stack: , , and  ",
      tags: ["HTML5", "CSS3", "JavaScript"],
      links: {
        github: "",
        demo: "https://codingboy03-myportfolio.netlify.app/",
      },
      image: portfolio1,
      featured: true,
    },
    {
      title: "Desktop Based Personal-Voice-Assistant:",
      description:
        " Windows virtual assistant, powered by Python, supports visually impaired users with voice input/output, employing voice recognition and language processing technologies.The personal assistant aids users with conversation, web searches, media playback, weather updates, and reminders, leveraging a speaking rate of 150 WPM compared to the typical 40 WPM writing rate",
      tags: [
        "Pyttsx3",
        "Pyaudio",
        "Python",
        "Typescript",
        "Visual Studio Code",
        "Speech Recognition",
      ],
      links: {
        github:
          "https://github.com/abhishek-l-10/Desktop_based_Personal_Voice_Assistant",
        demo: "",
      },
      image: desktop,
      featured: true,
    },
    {
      title: "OSL Log Book(Open Source)",
      description:
        "The OSL Digital Logbook is a project developed to enable users to log their entries using a digital logbook. It is designed specifically for Open Source Lab (OSL) and can improvised to use for any entry system with minor changes in the code. The logbook allows users to scan a QR code and log their entry into the lab. Before logging in, users must first register using a domain-specific email and verify their registration using OTP. The project is built using Node.js and MongoDB.",
      tags: [
        "NodeJS",
        "OTP Verification",
        "MongoDB",
        "Nodemailer",
        "Azure Cloud",
        "JavaScript",
      ],
      links: {
        github: "https://github.com/asymmentric/osllogbook",
        demo: "",
      },
      image: osl,
      featured: true,
    },
  ];

  return (
    <div
      className={`pt-40 min-h-screen p-8 ${
        isDarkMode
          ? "bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-slate-100"
          : "bg-gradient-to-b from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1] text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center group rounded-lg p-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 bg-[length:400%_400%] animate-gradient-xy hover:bg-[length:100%_100%] transition-all duration-700 shadow-lg"
          >
            {/* Image Section */}
            <div className="md:w-1/2 overflow-hidden rounded-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Text Section */}
            <Card
              className={`md:w-1/2 rounded-lg overflow-hidden shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl p-6 ${
                isDarkMode
                  ? "bg-gradient-to-br from-slate-800 to-gray-900"
                  : "bg-gradient-to-br from-white to-gray-100"
              }`}
            >
              <MacOsButtons />

              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-emerald-400 text-sm font-mono mb-2 tracking-wide uppercase">
                      Featured Project
                    </div>
                    <CardTitle
                      className={`text-3xl font-bold ${
                        isDarkMode ? "text-slate-100" : "text-gray-900"
                      }`}
                    >
                      {project.title}
                    </CardTitle>
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.links.github}
                      className="text-slate-400 hover:text-emerald-400 transition-all duration-300 transform hover:scale-125"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={22} />
                    </a>
                    <a
                      href={project.links.demo}
                      className="text-slate-400 hover:text-emerald-400 transition-all duration-300 transform hover:scale-125"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={22} />
                    </a>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="mt-4">
                <p
                  className={`mb-6 text-lg leading-relaxed ${
                    isDarkMode ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-gray-900 shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;
