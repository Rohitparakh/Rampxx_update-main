import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import "./../components/style/passportmodel.css";

interface Question {
  _id: string;
  question: string;
  options: { text: string }[];
}

interface PassportModelProps {
  onBackToPassport: () => void;
  onNavigateToNebula: () => void;
  isSubmitting: boolean
}

const PassportModel: React.FC<PassportModelProps> = ({
  onBackToPassport,
  onNavigateToNebula,
  isSubmitting
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [allQuestionsAnswered, setAllQuestionsAnswered] =
    useState<boolean>(false);
  const [clientId, setClientId] = useState<string>("");
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const initializeComponent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data);
        setClientId(uuidv4());
        setInitialized(true);
      } catch (error) {
        console.error("Initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!initialized) {
      initializeComponent();
    }
  }, [initialized]);

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedOption(event.target.value);
  };

  const handleNext = (): void => {
    if (selectedOption === "") {
      return;
    }

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questions[currentQuestionIndex]._id]: selectedOption,
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption("");
    } else {
      setAllQuestionsAnswered(true);
      handleNavigateToNebula();
    }
  };

  const handleNavigateToNebula = (): void => {
    onNavigateToNebula();
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#ffffff49]">
      <div className="absolute inset-0 bg-white opacity-5"></div>

      <div className="w-[621px] shadow-[0px_0px_0px_1px_rgba(255,_255,_255,_0.1),_0px_19px_43.9px_-2px_rgba(0,_0,_0,_0.12),_0px_2px_24px_rgba(0,_0,_0,_0.32),_0px_4px_4px_-1px_rgba(0,_0,_0,_0.25)] rounded-2xl bg-[#0d0d10] box-border max-w-full overflow-hidden flex flex-col items-start justify-start pt-0 px-0 pb-[26px] gap-[24px] leading-[normal] tracking-[normal] text-left text-13xl text-white font-vt323 border-[1.3px] border-solid border-[#0f0f0f] z-10 relative">
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_bottom_right,_rgba(208,_246,_3,_0.15),_transparent_70%)]"></div>

        <header className="w-full h-[150px] relative overflow-hidden">
          <Image
            src="/passportmodelhead.png"
            alt="Header Background"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
          <div className="relative z-10 w-full h-full flex justify-between items-start px-4 pt-4">
            <button
              onClick={onBackToPassport}
              className="flex items-center text-white no-underline text-sm bg-transparent border-none cursor-pointer"
            >
              <ArrowLeft className="mr-1 w-4 h-4" />
              <span>back to Passport</span>
            </button>
            <div
              className="w-16 h-16 flex justify-center items-center relative"
              style={{ left: "-244px", top: "23px" }}
            ></div>
          </div>
        </header>

        {isLoading ? (
          <div className="self-stretch flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D0F603]"></div>
          </div>
        ) : currentQuestion ? (
          <>
            <div className="self-stretch flex flex-row items-start justify-start py-0 px-5 box-border max-w-full">
              <div className="qnstext flex-1 relative text-4xl inline-block max-w-full">
                {currentQuestion.question}
              </div>
            </div>

            <div className="w-full px-6 text-xl">
              <div className="flex flex-col gap-4">
                {currentQuestion.options.map((option, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="blockchain-question"
                      value={option.text}
                      checked={selectedOption === option.text}
                      onChange={handleOptionChange}
                      className="hidden"
                    />
                    <span
                      className={`flex items-center before:content-[''] before:w-4 before:h-4 before:border before:border-[#565948] before:rounded-full before:mr-2 ${
                        selectedOption === option.text
                          ? "before:bg-[#D0F603] before:border-[#D0F603] text-[#D0F603]"
                          : "text-[#565948]"
                      }`}
                    >
                      {option.text === "all" ? (
                        <span
                          className={
                            selectedOption === option.text
                              ? "text-[#D0F603]"
                              : "text-[#565948]"
                          }
                        >
                          All of the above
                        </span>
                      ) : (
                        option.text
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="w-full flex justify-center">
              {allQuestionsAnswered ? (
                <button
                  onClick={handleNavigateToNebula}
                  disabled={isSubmitting}
                  className="relative inline-flex w-[300px] h-[90px] overflow-hidden p-[2px] hover:shadow-[0_0_20px_rgba(179,207,61,1)] transition-all duration-[400ms] group"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#B3CF3D_0%,transparent_15%,transparent_100%)] group-hover:hidden" />
                  <div className="inline-flex h-full w-full cursor-pointer items-center justify-center text-2xl text-gray-50 backdrop-blur-3xl btn-fi relative">
                    Submit
                    <span className="btn-fi-line"></span>
                  </div>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={selectedOption === ""}
                  className="relative inline-flex w-[300px] h-[90px] overflow-hidden p-[2px] hover:shadow-[0_0_20px_rgba(179,207,61,1)] transition-all duration-[400ms] group"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#B3CF3D_0%,transparent_15%,transparent_100%)] group-hover:hidden" />

                  <span className="relative z-10"></span>
                  <div className="inline-flex h-full w-full cursor-pointer items-center justify-center text-2xl text-gray-50 backdrop-blur-3xl btn-fi relative">
                    {currentQuestionIndex < questions.length - 1
                      ? "Next Question"
                      : "Submit"}
                    <span className="btn-fi-line"></span>
                  </div>
                </button>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PassportModel;
