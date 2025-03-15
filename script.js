//accordion

document.addEventListener("DOMContentLoaded", () => {
  const faqButtons = document.querySelectorAll(
    '[data-orientation="vertical"] button'
  );

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const contentId = button.getAttribute("aria-controls");
      const content = document.getElementById(contentId);

      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", !isOpen);
      button.setAttribute("data-state", isOpen ? "closed" : "open");

      if (content) {
        content.hidden = isOpen;
        content.setAttribute("data-state", isOpen ? "closed" : "open");
      }

      faqButtons.forEach((otherButton) => {
        if (otherButton !== button) {
          const otherContentId = otherButton.getAttribute("aria-controls");
          const otherContent = document.getElementById(otherContentId);

          if (otherContent && !otherContent.hidden) {
            otherContent.hidden = true;
            otherContent.setAttribute("data-state", "closed");
            otherButton.setAttribute("aria-expanded", "false");
            otherButton.setAttribute("data-state", "closed");
          }
        }
      });
    });
  });

  const getStartedBtn = document.getElementById("get-started-btn");
  const accessCodeInput = document.getElementById("access-code");
  const userNameInput = document.getElementById("user-name");
  const errorMessage = document.getElementById("error-message");
  const heroSection = document.getElementById("hero-section");
  const mainContent = document.getElementById("main-content");
  const mainHeader = document.getElementById("main-header");
  const logoutBtn = document.querySelector(
    'button:has(svg[stroke-linecap="round"])'
  );

  // Add logout functionality
  logoutBtn.addEventListener("click", () => {
    // Reset the form inputs
    accessCodeInput.value = "";
    userNameInput.value = "";

    // Show hero section and hide main content
    heroSection.classList.remove("hidden");
    mainContent.classList.add("hidden");
    mainHeader.classList.add("hidden");

    // Show logout notification
    Swal.fire({
      icon: "success",
      title: "Logged Out Successfully",
      text: "Thank you for using English Janala!",
      confirmButtonColor: "#8b5cf6",
      timer: 2000,
      showConfirmButton: false,
    });
  });

  getStartedBtn.addEventListener("click", () => {
    const accessCode = accessCodeInput.value;
    const userName = userNameInput.value.trim();

    if (!userName) {
      Swal.fire({
        icon: "error",
        title: "Name Required",
        text: "Please enter your name",
        confirmButtonColor: "#8b5cf6",
      });
      return;
    }

    if (accessCode === "123456") {
      heroSection.classList.add("hidden");
      mainContent.classList.remove("hidden");
      mainHeader.classList.remove("hidden");

      Swal.fire({
        icon: "success",
        title: `Welcome ${userName}!`,
        text: "Get ready to enhance your English vocabulary",
        confirmButtonColor: "#8b5cf6",
        timer: 2000,
        showConfirmButton: false,
      });

      initializeApp();
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Access Code",
        text: "The access code is 123456",
        confirmButtonColor: "#8b5cf6",
      });
      accessCodeInput.value = "";
    }
  });

  [userNameInput, accessCodeInput].forEach((input) => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        getStartedBtn.click();
      }
    });
  });

  accessCodeInput.removeEventListener("input", () => {
    errorMessage.classList.add("hidden");
  });
});

async function initializeApp() {
  try {
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = `
      <div class="flex items-center justify-center w-full">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
        <span class="ml-2 text-violet-600">Loading lessons...</span>
      </div>
    `;

    await displayLabels();

    displayVocabulary();
  } catch (error) {
    console.error("Error initializing app:", error);
    Swal.fire({
      icon: "error",
      title: "Error Loading Content",
      text: "There was an error loading the lessons. Please try again.",
      confirmButtonColor: "#8b5cf6",
    });
  }
}

//lesson

async function getLabel() {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/levels/all"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch lessons");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching labels:", error);
    throw error;
  }
}

async function displayLabels() {
  const lessonContainer = document.getElementById("lesson-container");
  const data = await getLabel();

  lessonContainer.innerHTML = data
    .map((lesson) => {
      return `
     <button class="lesson-button
                inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm hover:text-accent-foreground h-12 px-4 py-4 border-violet-200 hover:border-violet-300 hover:bg-violet-50"
                data-level-no="${lesson.level_no}"
              >
               ${lesson.lessonName}
      </button>
    `;
    })
    .join("");

  const lessonButtons = document.querySelectorAll(".lesson-button");
  lessonButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        const vocabularyContainer = document.getElementById(
          "vocabulary-container"
        );
        vocabularyContainer.innerHTML = `
          <div class="col-span-3">
            <div class="flex items-center justify-center w-full p-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
              <span class="ml-2 text-violet-600 poppins-font">Loading vocabulary...</span>
            </div>
          </div>
        `;

        const levelNo = button.getAttribute("data-level-no");
        const response = await fetch(
          `https://openapi.programming-hero.com/api/level/${levelNo}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch vocabulary");
        }
        const data = await response.json();

        displayVocabularyForLevel(data.data);

        lessonButtons.forEach((btn) => {
          btn.classList.remove("bg-violet-100");
        });
        button.classList.add("bg-violet-100");
      } catch (error) {
        console.error("Error fetching level data:", error);
        Swal.fire({
          icon: "error",
          title: "Error Loading Vocabulary",
          text: "There was an error loading the vocabulary. Please try again.",
          confirmButtonColor: "#8b5cf6",
        });
      }
    });
  });
}

// Function to display vocabulary for a specific level
function displayVocabularyForLevel(vocabularyData) {
  const vocabularyContainer = document.getElementById("vocabulary-container");

  if (!vocabularyData || vocabularyData.length === 0) {
    vocabularyContainer.innerHTML = `
      <div class="col-span-3">
        <div class="mt-4 text-center">
          <img src="./assets/alert-error.png" alt="No lesson available" class="mx-auto max-w-xs" />
          <p class="mt-4 text-gray-500 bangla-font bangla-font">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        </div>
        <h1 class="text-2xl font-bold text-center bangla-font">নেক্সট লেসন এ যান</h1>
      </div>
    `;
    return;
  }

  vocabularyContainer.innerHTML = vocabularyData
    .map((item) => {
      const word = item.word || "Unknown";
      const meaning = item.meaning || "No meaning available";
      const pronunciation = item.pronunciation || "No pronunciation available";
      const id = item.id || item.level || 0;

      return `
      <div class="bg-white rounded-lg shadow-sm p-6 active:bg-violet-50">
        <div class="text-center mb-4 p-10">
          <h2 class="text-2xl font-bold text-black cursor-pointer hover:text-violet-700 word-title mb-2 poppins-font" data-id="${id}">${word}</h2>
          <p class="text-gray-500 text-sm poppins-font">Meaning /Pronunciation</p>
          <p class="text-gray-700 font-medium mt-1 text-lg poppins-font">"${meaning} / ${pronunciation}"</p>
        </div>
        <div class="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
          <button class="info-btn text-gray-600 hover:text-violet-600 transition-colors duration-200 poppins-font" data-id="${id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
          </button>
          <button class="pronunciation-btn text-gray-600 hover:text-violet-600 transition-colors duration-200 poppins-font" data-word="${word}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
          </button>
        </div>
      </div>
      `;
    })
    .join("");

  // Add event listeners for word titles and info buttons
  const wordTitles = document.querySelectorAll(".word-title");
  wordTitles.forEach((title) => {
    title.addEventListener("click", () =>
      showWordDetails(title.getAttribute("data-id"))
    );
  });

  const infoButtons = document.querySelectorAll(".info-btn");
  infoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      showWordDetails(id);
    });
  });

  const pronunciationButtons = document.querySelectorAll(".pronunciation-btn");
  pronunciationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const word = button.getAttribute("data-word");

      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.lang = "en-US";

      button.classList.add("text-violet-600");
      utterance.onend = () => {
        button.classList.remove("text-violet-600");
      };

      window.speechSynthesis.speak(utterance);
    });
  });
}

// Function to show word details in modal
async function showWordDetails(id) {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/word/${id}`
    );
    const result = await response.json();
    const wordData = result.data;

    const modal = document.getElementById("word-modal");
    const modalContent = modal.querySelector(".bg-white");
    const wordDetails = document.getElementById("word-details");

    const word = wordData.word || "Unknown";
    const pronunciation =
      wordData.pronunciation || "No pronunciation available";
    const meaning = wordData.meaning || "No meaning available";
    const sentence = wordData.sentence || "No example available";
    const synonyms = wordData.synonyms || [];

    wordDetails.innerHTML = `
      <div class="mb-6">
        <p class="text-[30px] font-bold mt-1 flex items-center">${word} (   <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 cursor-pointer hover:text-violet-600 pronunciation-icon" width="31" height="31" viewBox="0 0 31 31" fill="none" data-pronunciation="${pronunciation}">
          <g clip-path="url(#clip0_13_249)">
            <path d="M28.4167 16.7921C28.4132 19.8742 27.1874 22.8291 25.008 25.0084C22.8286 27.1878 19.8738 28.4137 16.7917 28.4171H14.2083C11.1263 28.4133 8.17167 27.1874 5.99237 25.0081C3.81307 22.8288 2.58709 19.8741 2.58333 16.7921H0C0.00444394 20.559 1.50282 24.1704 4.16643 26.834C6.83005 29.4976 10.4414 30.996 14.2083 31.0004H16.7917C20.5586 30.996 24.1699 29.4976 26.8336 26.834C29.4972 24.1704 30.9956 20.559 31 16.7921H28.4167Z" fill="currentColor"/>
            <path d="M11.6257 16.7917H6.55069C6.85975 18.9451 7.93484 20.9149 9.57876 22.3397C11.2227 23.7645 13.3252 24.5489 15.5007 24.5489C17.6761 24.5489 19.7786 23.7645 21.4225 22.3397C23.0665 20.9149 24.1416 18.9451 24.4506 16.7917H19.3757V14.2084H24.5423V10.3334H19.3757V7.75007H24.4506C24.1416 5.59668 23.0665 3.62692 21.4225 2.20209C19.7786 0.77727 17.6761 -0.00708008 15.5007 -0.00708008C13.3252 -0.00708008 11.2227 0.77727 9.57876 2.20209C7.93484 3.62692 6.85975 5.59668 6.55069 7.75007H11.6257V10.3334H6.45898V14.2084H11.6257V16.7917Z" fill="currentColor"/>
          </g>
          <defs>
            <clipPath id="clip0_13_249">
              <rect width="31" height="31" fill="white"/>
            </clipPath>
          </defs>
        </svg> :  ${pronunciation}  )</p>
      </div>
      
      <div class="space-y-4">
        <div>
          <p class="font-medium text-gray-700">Meaning:</p>
          <p class="text-lg bangla-font">${meaning}</p>
        </div>
        
        <div>
          <p class="font-medium text-gray-700">Example:</p>
          <p class="poppins-font">${sentence}</p>
        </div>
        
        <div>
          <p class="font-medium bangla-font">সমার্থক শব্দ গুলো</p>
          <div class="flex flex-wrap gap-2 mt-1">
            ${
              synonyms.length > 0
                ? synonyms
                    .map(
                      (syn) => `
                  <span class="px-4 py-2 bg-[#EDF7FF] rounded-md text-[18px]">${syn}</span>
                `
                    )
                    .join("")
                : '<span class="text-gray-500">No synonyms available</span>'
            }
          </div>
        </div>
      
      </div>
      
      <div class="mt-10" id="close-modal">
        <button class="complete-learning-btn w-auto mr-auto flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors poppins-font">
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          close
        </button>
      </div>
    `;

    const pronunciationIcon = modal.querySelector(".pronunciation-icon");
    if (pronunciationIcon) {
      pronunciationIcon.addEventListener("click", () => {
        console.log("Pronunciation icon clicked");

        if (!window.speechSynthesis) {
          console.error("Speech synthesis not supported in this browser");
          return;
        }

        const word = wordData.word;
        console.log("Word to pronounce:", word);

        const voices = window.speechSynthesis.getVoices();
        const utterance = new SpeechSynthesisUtterance(word);

        const englishVoice = voices.find((voice) => voice.lang.includes("en"));
        if (englishVoice) {
          utterance.voice = englishVoice;
        }

        utterance.lang = "en-US";
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 1;

        pronunciationIcon.classList.add("text-violet-600");

        utterance.onstart = () => {
          console.log("Speech started");
        };

        utterance.onend = () => {
          console.log("Speech ended");
          pronunciationIcon.classList.remove("text-violet-600");
        };

        utterance.onerror = (event) => {
          console.error("Speech error:", event);
          pronunciationIcon.classList.remove("text-violet-600");
        };

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      });

      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = () => {
          const voices = window.speechSynthesis.getVoices();
          console.log("Available voices:", voices.length);
        };
      }
    }

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    setTimeout(() => {
      modalContent.classList.remove("scale-90", "opacity-0");
      modalContent.classList.add("scale-100", "opacity-100");
    }, 10);

    const closeButton = document.getElementById("close-modal");
    const completeLearningBtn = modal.querySelector(".complete-learning-btn");

    const closeModal = () => {
      modalContent.classList.remove("scale-100", "opacity-100");
      modalContent.classList.add("scale-90", "opacity-0");

      setTimeout(() => {
        modal.classList.remove("flex");
        modal.classList.add("hidden");
      }, 300);
    };

    closeButton.onclick = closeModal;
    completeLearningBtn.onclick = closeModal;

    modal.onclick = (e) => {
      if (e.target === modal) {
        closeModal();
      }
    };
  } catch (error) {
    console.error("Error fetching word details:", error);
  }
}

//vocabulary

async function displayVocabulary() {
  const vocabularyContainer = document.getElementById("vocabulary-container");
  vocabularyContainer.innerHTML = `
    <div class="col-span-3">
      <div class="bg-white p-8 rounded-lg shadow-sm max-w-2xl mx-auto">
        <p class="text-gray-500 text-sm mb-2 bangla-font">
         আপনি এখনো কোন Lesson Select করেননি।
        </p>
        <p class="text-xl font-medium bangla-font">একটি Lesson Select করুন।</p>
      </div>
    </div>
  `;
}

displayVocabulary();

//faq

const faq = [
  {
    question: "What is the difference between var, let, and const?",
    answer:
      "var is function-scoped and allows re-declaration. let is block-scoped and cannot be re-declared in the same scope. const is also block-scoped but cannot be reassigned after declaration.",
  },
  {
    question: "What is the difference between map(), forEach(), and filter()?",
    answer:
      "map() creates a new array by applying a function to each element. forEach() iterates over an array but does not return a new array. filter() returns a new array containing elements that pass a given condition.",
  },
  {
    question:
      "Explain arrow functions and how they are different from regular functions.",
    answer:
      "Arrow functions have a shorter syntax and do not bind their own 'this' value, making them useful for callbacks. Unlike regular functions, they cannot be used as constructors and do not have their own 'arguments' object.",
  },
  {
    question: "How do JavaScript Promises work?",
    answer:
      "Promises represent asynchronous operations. They can be in one of three states: pending, resolved, or rejected. The .then() method handles success, while .catch() handles errors.",
  },
  {
    question: "How do closures work in JavaScript?",
    answer:
      "A closure is a function that retains access to its lexical scope even when the function is executed outside that scope. This allows private variables and function encapsulation.",
  },
];

const faqContainer = document.getElementById("faq-container");

let faqHTML = "";
faq.forEach((item, index) => {
  faqHTML += `
<div
                  data-state="closed"
                  data-orientation="vertical"
                  class="border-b bg-gray-50 rounded-md mb-4"
                >
                  <h3
                    data-orientation="vertical"
                    data-state="closed"
                    class="flex"
                  >
                    <button
                      type="button"
                      aria-controls="faq-content-${index}"
                      aria-expanded="false"
                      data-state="closed"
                      data-orientation="vertical"
                      id="faq-button-${index}"
                      class="flex flex-1 items-center justify-between py-6 px-6 text-lg font-semibold transition-all hover:underline [&amp;[data-state=open]>svg]:rotate-180 text-left poppins-font"
                      data-radix-collection-item=""
                    >
                      ${item.question}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="w-5 h-5 accordion-icon"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </button>
                  </h3>
                  <div
                    data-state="closed"
                    id="faq-content-${index}"
                    hidden=""
                    role="region"
                    aria-labelledby="faq-button-${index}"
                    data-orientation="vertical"
                    class="overflow-hidden text-base data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
                    style="
                      --radix-accordion-content-height: var(
                        --radix-collapsible-content-height
                      );
                      --radix-accordion-content-width: var(
                        --radix-collapsible-content-width
                      );
                    "
                  >
                    <div class="px-6 py-6 text-gray-700 leading-relaxed poppins-font">
                      ${item.answer}
                    </div>
                  </div>
                </div>
`;
});

faqContainer.innerHTML = faqHTML;

//year

const year = document.getElementById("year");
year.innerHTML = new Date().getFullYear();
