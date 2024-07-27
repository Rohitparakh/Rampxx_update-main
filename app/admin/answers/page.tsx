"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/app/admin/sidebar/sidebar";

interface Answer {
  _id: string;
  clientId: string;
  questionId: string;
  selectedAnswer: string;
  createdAt: string;
}

const Answers = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    fetchAnswers();
  }, []);

  const fetchAnswers = async () => {
    try {
      const response = await fetch("/api/answers");
      if (!response.ok) {
        throw new Error("Failed to fetch answers");
      }
      const data = await response.json();
      setAnswers(data);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-semibold">User Answers</h1>
        <div className="mt-4">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-200">Client ID</th>
                <th className="px-4 py-2 border border-gray-200">Question ID</th>
                <th className="px-4 py-2 border border-gray-200">Selected Answer</th>
                <th className="px-4 py-2 border border-gray-200">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((answer) => (
                <tr key={answer._id}>
                  <td className="border px-4 py-2 border-gray-200">{answer.clientId}</td>
                  <td className="border px-4 py-2 border-gray-200">{answer.questionId}</td>
                  <td className="border px-4 py-2 border-gray-200">{answer.selectedAnswer}</td>
                  <td className="border px-4 py-2 border-gray-200">{new Date(answer.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Answers;
