import React, { useState, useEffect, useRef } from 'react';

const codeLines = [
  { text: '# Sanket Kakad • LangChain & LangGraph Agent Engine', type: 'comment' },
  { text: 'from langchain_google_genai import ChatGoogleGenerativeAI', type: 'import' },
  { text: 'from langchain.agents import create_openai_tools_agent, AgentExecutor', type: 'import' },
  { text: 'from langchain_community.vectorstores import Chroma', type: 'import' },
  { text: '', type: 'empty' },
  { text: '# 1. Initialize Multimodal Gemini & Vector Embeddings', type: 'comment' },
  { text: 'llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", streaming=True)', type: 'code' },
  { text: 'vectorstore = Chroma(embedding_function=local_embeddings)', type: 'code' },
  { text: '', type: 'empty' },
  { text: '# 2. Bind Tool Mesh & Build Autonomous Agent Graph', type: 'comment' },
  { text: 'tools = [vectorstore.as_retriever(), code_interpreter, python_repl]', type: 'code' },
  { text: 'agent = create_openai_tools_agent(llm=llm, tools=tools, prompt=prompt)', type: 'code' },
  { text: 'executor = AgentExecutor(agent=agent, tools=tools, verbose=True)', type: 'code' },
  { text: '', type: 'empty' },
  { text: '# 3. Stream Autonomous Tool Execution Steps', type: 'comment' },
  { text: 'async for event in executor.astream_events({"input": query}):', type: 'code' },
  { text: '    print(f"⚡ [Agent Stream <{event[\'name\']}>]: {event[\'data\']}")', type: 'code' }
];

export default function LangChainCodeTerminal({ isDark = true }) {
  const [displayedLineCount, setDisplayedLineCount] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    let timeoutId;

    if (displayedLineCount < codeLines.length) {
      const currentLineText = codeLines[displayedLineCount].text;

      if (currentCharIndex < currentLineText.length) {
        timeoutId = setTimeout(() => {
          setCurrentCharIndex((prev) => prev + 1);
        }, 18);
      } else {
        timeoutId = setTimeout(() => {
          setDisplayedLineCount((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 60);
      }
    } else {
      // Finished typing full code block -> pause for 3.5s then restart loop
      timeoutId = setTimeout(() => {
        setDisplayedLineCount(0);
        setCurrentCharIndex(0);
      }, 3500);
    }

    return () => clearTimeout(timeoutId);
  }, [displayedLineCount, currentCharIndex]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLineCount, currentCharIndex]);

  const renderHighlightedText = (text, type) => {
    if (type === 'comment') {
      return <span className="text-[#86868b] italic">{text}</span>;
    }
    if (type === 'import') {
      return (
        <span>
          <span className="text-[#2997ff] font-semibold">from </span>
          <span className="text-[#f5f5f7]">{text.split(' ')[1]} </span>
          <span className="text-[#2997ff] font-semibold">import </span>
          <span className="text-[#30d158]">{text.split('import ')[1]}</span>
        </span>
      );
    }

    // Basic syntax highlighting for Python tokens
    const parts = text.split(/(".*?"|'.*?'|\b(?:async|for|in|from|import|def|return)\b)/g);

    return parts.map((part, i) => {
      if (/^["'].*["']$/.test(part)) {
        return <span key={i} className="text-[#30d158]">{part}</span>;
      }
      if (/^(async|for|in|from|import|def|return)$/.test(part)) {
        return <span key={i} className="text-[#2997ff] font-bold">{part}</span>;
      }
      if (/^(llm|vectorstore|tools|agent|executor)$/.test(part)) {
        return <span key={i} className="text-[#f5a623] font-semibold">{part}</span>;
      }
      return <span key={i} className={isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'}>{part}</span>;
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-between text-left font-mono text-xs sm:text-sm">
      
      {/* Code Container */}
      <div 
        ref={containerRef} 
        className="flex-1 overflow-y-auto pr-2 space-y-1 scrollbar-none py-2"
      >
        {codeLines.slice(0, displayedLineCount).map((line, idx) => (
          <div key={idx} className="leading-relaxed flex items-start">
            <span className="w-6 text-[#86868b]/50 select-none text-[10px] pr-2 text-right shrink-0">
              {idx + 1}
            </span>
            <div className="flex-1 whitespace-pre-wrap">
              {renderHighlightedText(line.text, line.type)}
            </div>
          </div>
        ))}

        {/* Currently Typing Line */}
        {displayedLineCount < codeLines.length && (
          <div className="leading-relaxed flex items-start">
            <span className="w-6 text-[#86868b]/50 select-none text-[10px] pr-2 text-right shrink-0">
              {displayedLineCount + 1}
            </span>
            <div className="flex-1 whitespace-pre-wrap">
              {renderHighlightedText(
                codeLines[displayedLineCount].text.slice(0, currentCharIndex),
                codeLines[displayedLineCount].type
              )}
              <span className="inline-block w-2 h-4 bg-[#2997ff] ml-0.5 animate-pulse align-middle" />
            </div>
          </div>
        )}

        {/* Cursor when completed */}
        {displayedLineCount >= codeLines.length && (
          <div className="flex items-center gap-2 pt-2 text-[#30d158]">
            <span className="text-[10px] text-[#86868b]">❯</span>
            <span>Agent Graph Execution Active...</span>
            <span className="inline-block w-2 h-4 bg-[#30d158] animate-ping" />
          </div>
        )}
      </div>

      {/* Terminal Footer Bar */}
      <div className={`pt-2 mt-2 border-t text-[10px] flex items-center justify-between font-mono ${
        isDark ? 'border-[#2c2c2e] text-[#86868b]' : 'border-[#d2d2d7] text-[#6e6e73]'
      }`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>LangChain v0.3 • Gemini 2.0 Flash</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Python 3.11</span>
          <span className="text-[#2997ff]">120 FPS Loop</span>
        </div>
      </div>

    </div>
  );
}
