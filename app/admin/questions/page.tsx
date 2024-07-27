// app/admin/questions/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/admin/sidebar/sidebar";

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  _id: string;
  question: string;
  options: Option[];
}

const Questions = () => {
  const [mcqQuestions, setMcqQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [options, setOptions] = useState<Option[]>([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);
  const [editQuestionId, setEditQuestionId] = useState<string | null>(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions');
      const data = await response.json();
      setMcqQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAddQuestion = async () => {
    if (newQuestion.trim() !== '' && options.every(option => option.text.trim() !== '')) {
      try {
        const response = await fetch('/api/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ question: newQuestion, options })
        });
        const data = await response.json();
        setMcqQuestions([...mcqQuestions, data]);
        resetForm();
      } catch (error) {
        console.error("Error adding question:", error);
      }
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    try {
      await fetch(`/api/questions/${id}`, {
        method: 'DELETE'
      });
      setMcqQuestions(mcqQuestions.filter(question => question._id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleEditQuestion = (id: string) => {
    const questionToEdit = mcqQuestions.find(question => question._id === id);
    if (questionToEdit) {
      setNewQuestion(questionToEdit.question);
      setOptions(questionToEdit.options);
      setEditQuestionId(id);
    }
  };

  const handleUpdateQuestion = async () => {
    if (newQuestion.trim() !== '' && editQuestionId && options.every(option => option.text.trim() !== '')) {
      try {
        const response = await fetch(`/api/questions/${editQuestionId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ question: newQuestion, options })
        });
        const data = await response.json();
        setMcqQuestions(mcqQuestions.map(question => question._id === editQuestionId ? data : question));
        resetForm();
      } catch (error) {
        console.error("Error updating question:", error);
      }
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const handleCorrectOptionChange = (index: number) => {
    const newOptions = options.map((option, i) => ({
      ...option,
      isCorrect: i === index
    }));
    setOptions(newOptions);
  };

  const resetForm = () => {
    setNewQuestion('');
    setOptions([
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ]);
    setEditQuestionId(null);
  };
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-semibold mb-4">MCQ Questions Management</h1>
        <div className="mb-6 bg-white p-4 rounded shadow">
          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            placeholder="Enter your question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                className="flex-grow p-2 mr-2 border rounded"
                placeholder={`Option ${index + 1}`}
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              <label className="flex items-center">
                <input
                  type="radio"
                  name="correctOption"
                  checked={option.isCorrect}
                  onChange={() => handleCorrectOptionChange(index)}
                  className="mr-1"
                />
                Correct
              </label>
            </div>
          ))}
          {editQuestionId !== null ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleUpdateQuestion}
            >
              Update Question
            </button>
          ) : (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleAddQuestion}
            >
              Add Question
            </button>
          )}
        </div>

        <div className="bg-white overflow-y-scroll rounded shadow h-[350px]">
          <table className="w-full  h-full">

            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-2 text-left">Question</th>
                <th className="p-2 text-left">Options</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className=" h-full ">
              {mcqQuestions.map(question => (
                <tr key={question._id} className="border-t">
                  <td className="p-2">{question.question}</td>
                  <td className="p-2">
                    <ul>
                      {question.options.map((option, index) => (
                        <li key={index} className={option.isCorrect ? "font-bold" : ""}>
                          {option.text} {option.isCorrect && "(Correct)"}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                      onClick={() => handleEditQuestion(question._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDeleteQuestion(question._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Questions;