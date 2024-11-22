'use client';

import React from 'react';
import { useState, useEffect } from "react";
import Title from "./Title";
import ImageUploadForm from './ImageUploadForm';

export default function FlaskConnector(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const getHello = async () => {
    try {
      const response = await fetch("http://localhost:5000/hello", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setInputValue("");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      console.error("Error fetching message:", error);
      setResult("Failed to fetch message");
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
        <div>
          <Title title={"Chapter 6. AI service workflow"} />
          <div className="flex flex-col items-center justify-center gap-8 pt-8 pb-48 m-auto">
            {result ? (
              <div className="flex flex-col items-center gap-8">
                <p>{result}</p>
                <ImageUploadForm />
              </div>
            ) 
            : (<div className='flex flex-col items-center gap-8'>
              <p>서버의 익힘 정도를 확인해 보세요.</p>
              <button 
                onClick={getHello}
                className={`bg-blue-500 text-white px-4 py-2 rounded}`}
                style={{ width: '250px', height: '50px' }} 
              >
                  <p>확인하기</p>
              </button>
            </div>)}
            
          </div>
        </div>
    </div>
  );
}