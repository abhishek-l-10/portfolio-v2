import { Card } from "@/components/ui/card";
import { Briefcase, Calendar, Code } from "lucide-react";
import { ReactNode } from "react";
import { useTheme } from "../../provider/page";
import { motion } from "framer-motion";

export default function ProfessionalJourney() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`${
        isDark ? "bg-[#090F1C]" : "bg-zinc-50"
      } py-16 md:py-32 min-h-screen relative overflow-hidden`}
    >
      {/* Grid Background */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"
              : "bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]"
          } bg-[size:4rem_4rem]`}
        />
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-r from-[#090F1C] via-transparent to-[#090F1C]"
              : "bg-gradient-to-r from-zinc-50 via-transparent to-zinc-50"
          }`}
        />
      </div>

      <div className="@container mx-auto max-w-5xl px-6 relative">
        <div className="text-center">
          <h2
            className={`text-balance text-4xl font-semibold lg:text-5xl ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Professional Journey
          </h2>
          <p className={`mt-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            "Transforming ideas into digital reality, one project at a time"
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 mx-auto mt-8 gap-6 md:mt-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <ExperienceCard
            title="Intern"
            company="BTF Technology"
            period="04/2024 - 06/2024"
            description="Developed technical skills in nestJs, GA4, and testing web applications. I also improved my ability to quickly learn new software tools through online resources and colleague guidance"
            icon={<Briefcase />}
          />
          <ExperienceCard
            title="Trainee Software Engineer"
            company="BTF Technology"
            period=" 07/2024 - 01/2025"
            description="Equipped with the Electron.js framework and  developed the Myprism Desktop application."
            icon={<Briefcase />}
          />

          <ExperienceCard
            title="Junior Software Engineer"
            company="BTF Technology"
            period="02/2025 - Present"
            description="Currently working with the Desktop Development Team"
            icon={<Code />}
          />
        </motion.div>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  icon: ReactNode;
}

const ExperienceCard = ({
  title,
  company,
  period,
  description,
  icon,
}: ExperienceCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      className="h-full"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <Card
        className={`group h-full ${
          isDark
            ? "bg-[#090F1C]/80 border-gray-700 hover:shadow-blue-500/20"
            : "bg-white/90 border-gray-200 hover:shadow-blue-500/10"
        } shadow-zinc-950/5 transition-all duration-300 hover:-translate-y-1`}
      >
        <div className="flex flex-col p-6 gap-4">
          <CardDecorator>
            <div
              className={`size-6 ${isDark ? "text-blue-400" : "text-blue-600"}`}
            >
              {icon}
            </div>
          </CardDecorator>

          <div className="flex-1">
            <h3
              className={`text-xl font-medium ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h3>
            <div className="flex flex-col gap-2 mt-1">
              <p
                className={`font-medium ${
                  isDark ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {company}
              </p>
              <div
                className={`flex items-center gap-1 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <Calendar className="size-4" />
                <span className="text-sm">{period}</span>
              </div>
            </div>
            <p className={`mt-3 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const CardDecorator = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`relative mx-auto size-24 duration-200 ${
        isDark
          ? "[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] group-hover:bg-white/5 group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]"
          : "[--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)]"
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(circle_at_center,black_25%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--tw-gradient-to)_75%)] animate-pulse-slow opacity-80"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[conic-gradient(from_45deg_at_center,transparent,var(--tw-gradient-to),transparent)] animate-spin-slow opacity-40"
      />
      <div
        className={`absolute inset-0 m-auto flex size-10 items-center justify-center  bg-transparent `}
      >
        {children}
      </div>
    </div>
  );
};
