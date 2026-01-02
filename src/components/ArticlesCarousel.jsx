import React, { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { marked } from 'marked';
import { BookOpen, Clock, User, X, Check, Share2, ChevronRight, ChevronDown } from 'lucide-react';
import RoughAnnotation from './RoughAnnotation';

gsap.registerPlugin(ScrollTrigger);

// Helper function to extract YAML frontmatter from raw Markdown text
function parseFrontmatter(rawText) {
  if (!rawText) return {};
  const match = rawText.match(/^---[\s\S]*?---/);
  if (!match) return {};
  const yamlBlock = match[0].replace(/---/g, '').trim();
  const meta = {};
  yamlBlock.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      meta[key] = value;
    }
  });
  return meta;
}

// Vite eager glob import to auto-discover all .md files inside public/assets/articles/
const articleModules = import.meta.glob('../../public/assets/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

function discoverArticles() {
  const list = [];
  for (const path in articleModules) {
    const rawText = articleModules[path];
    const filename = path.split('/').pop().replace(/\.md$/, '');
    const meta = parseFrontmatter(rawText);

    list.push({
      id: meta.id || filename,
      filePath: `/assets/articles/${filename}.md`,
      rawText: rawText,
      category: meta.category || 'Generative AI',
      readTime: meta.readTime || '5 min read',
      date: meta.date || '2026',
      author: meta.author || 'Sanket Kakad',
      title: meta.title || filename.replace(/-/g, ' '),
      excerpt: meta.excerpt || 'Technical publication.'
    });
  }
  return list;
}

export default function ArticlesCarousel({ theme = 'dark' }) {
  const isDark = theme === 'dark';
  const [articles, setArticles] = useState(discoverArticles);
  const [selectedArticleId, setSelectedArticleId] = useState(() => (articles[0] ? articles[0].id : ''));
  const [visibleCount, setVisibleCount] = useState(4);
  const [parsedHtml, setParsedHtml] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Keep articles in sync if glob modules update
  useEffect(() => {
    const discovered = discoverArticles();
    setArticles(discovered);
    if (discovered.length > 0 && !discovered.some((a) => a.id === selectedArticleId)) {
      setSelectedArticleId(discovered[0].id);
    }
  }, []);

  const currentArticle = articles.find((a) => a.id === selectedArticleId || a.filePath.includes(selectedArticleId)) || articles[0];

  // Sync state with URL Hash (e.g. #article-retrieval-augmented-generation-rag)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#article-')) {
        const articleId = hash.replace('#article-', '');
        const found = articles.find((a) => a.id === articleId || a.filePath.includes(articleId));
        if (found) {
          setSelectedArticleId(found.id);
          setIsReaderOpen(true);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [articles]);

  // Convert raw Markdown text to HTML whenever selected article changes
  useEffect(() => {
    if (!currentArticle) return;
    setIsLoading(true);

    const processMarkdown = (rawText) => {
      const bodyContent = rawText.replace(/^---[\s\S]*?---/, '').trim();
      marked.setOptions({
        gfm: true,
        breaks: true
      });
      const html = marked.parse(bodyContent);
      setParsedHtml(html);
      setIsLoading(false);
    };

    if (currentArticle.rawText) {
      processMarkdown(currentArticle.rawText);
    } else {
      fetch(currentArticle.filePath)
        .then((res) => res.text())
        .then((text) => processMarkdown(text))
        .catch(() => {
          setParsedHtml(`<h1>${currentArticle.title}</h1><p>${currentArticle.excerpt}</p>`);
          setIsLoading(false);
        });
    }
  }, [selectedArticleId, currentArticle]);

  const openReader = (articleId) => {
    setSelectedArticleId(articleId);
    setIsReaderOpen(true);
    window.history.pushState(null, '', `#article-${articleId}`);
  };

  const closeReader = () => {
    setIsReaderOpen(false);
    window.history.pushState(null, '', '#articles');
  };

  const copyShareLink = (e, articleId) => {
    if (e) e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}#article-${articleId}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedId(articleId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const loadMoreArticles = () => {
    setVisibleCount((prev) => Math.min(prev + 4, articles.length));
  };

  return (
    <section id="articles" className={`py-24 relative overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-[#000000] text-[#f5f5f7]' : 'bg-[#f5f5f7] text-[#1d1d1f]'
    }`}>
      
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#0071e3]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border transition-colors ${
              isDark 
                ? 'bg-[#161617] border-[#2c2c2e] text-[#2997ff]' 
                : 'bg-[#ffffff] border-[#d2d2d7] text-[#0071e3] shadow-sm'
            }`}>
              <BookOpen className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Markdown Article Library</span>
            </div>
            
            <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
            }`}>
              Engineering Publications & Deep Dives
            </h2>
          </div>

          <p className={`text-sm md:text-base font-light max-w-md ${
            isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
          }`}>
            Showing {Math.min(visibleCount, articles.length)} of {articles.length} technical publications. Click any article to read or share.
          </p>
        </div>

        {/* Empty State Fallback if no files in public/assets/articles */}
        {articles.length === 0 ? (
          <div className={`text-center py-16 rounded-3xl border ${
            isDark ? 'bg-[#161617] border-[#2c2c2e] text-[#86868b]' : 'bg-[#ffffff] border-[#d2d2d7] text-[#6e6e73]'
          }`}>
            <BookOpen className="w-12 h-12 text-[#0071e3] mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No Articles Found</h3>
            <p className="text-sm font-light max-w-md mx-auto">
              Add `.md` files to `public/assets/articles/` directory to auto-discover and render publications live on the website.
            </p>
          </div>
        ) : (
          /* Article Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {articles.slice(0, visibleCount).map((art) => {
              const isSelected = currentArticle && currentArticle.id === art.id;
              const isCopied = copiedId === art.id;
              return (
                <div
                  key={art.id}
                  onClick={() => openReader(art.id)}
                  className={`apple-glass-card rounded-3xl p-8 border transition-all duration-300 relative cursor-pointer group flex flex-col justify-between ${
                    isSelected
                      ? isDark 
                        ? 'bg-[#161617] border-[#0071e3] shadow-2xl shadow-[#0071e3]/20' 
                        : 'bg-[#ffffff] border-[#0071e3] shadow-xl shadow-[#0071e3]/10'
                      : isDark 
                        ? 'bg-[#161617]/70 border-[#2c2c2e] hover:border-[#3a3a3c]' 
                        : 'bg-[#ffffff]/80 border-[#d2d2d7] hover:border-[#b0b0b8] shadow-sm'
                  }`}
                >
                  <div>
                    {/* Card Header Badges & Share Link Button */}
                    <div className="flex items-center justify-between mb-4 text-xs font-mono">
                      <span className={`px-3 py-1 rounded-full font-semibold uppercase tracking-wider border ${
                        isDark ? 'bg-[#2c2c2e] border-white/10 text-[#2997ff]' : 'bg-[#f5f5f7] border-[#d2d2d7] text-[#0071e3]'
                      }`}>
                        {art.category}
                      </span>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-[#86868b]">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{art.readTime}</span>
                        </div>

                        {/* Share Button */}
                        <button
                          onClick={(e) => copyShareLink(e, art.id)}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 text-[11px] ${
                            isCopied
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                              : isDark
                                ? 'bg-[#2c2c2e] border-white/10 text-[#86868b] hover:text-[#f5f5f7]'
                                : 'bg-[#f5f5f7] border-[#d2d2d7] text-[#6e6e73] hover:text-[#1d1d1f]'
                          }`}
                          title="Copy Shareable Link"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3.5 h-3.5" />
                              <span>Share</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl sm:text-2xl font-bold tracking-tight mb-3 group-hover:text-[#0071e3] transition-colors ${
                      isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
                    }`}>
                      {art.title}
                    </h3>

                    {/* Excerpt */}
                    <p className={`text-sm leading-relaxed mb-6 font-light ${
                      isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
                    }`}>
                      {art.excerpt}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className={`pt-4 border-t flex items-center justify-between text-xs font-mono ${
                    isDark ? 'border-[#2c2c2e]' : 'border-[#d2d2d7]'
                  }`}>
                    <div className="flex items-center gap-2 text-[#86868b]">
                      <User className="w-3.5 h-3.5 text-[#0071e3]" />
                      <span>{art.author} • {art.date}</span>
                    </div>

                    <button className="flex items-center gap-1 text-[#0071e3] font-bold group-hover:translate-x-1 transition-transform">
                      <span>Read Article</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Lazy Load More Button */}
        {visibleCount < articles.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreArticles}
              className={`px-8 py-3.5 rounded-full font-semibold text-xs transition-all border flex items-center gap-2 cursor-pointer active:scale-95 ${
                isDark
                  ? 'bg-[#161617] hover:bg-[#2c2c2e] text-[#f5f5f7] border-[#2c2c2e] shadow-lg'
                  : 'bg-[#ffffff] hover:bg-[#e8e8ed] text-[#1d1d1f] border-[#d2d2d7] shadow-md'
              }`}
            >
              <span>Load More Articles ({articles.length - visibleCount} Remaining)</span>
              <ChevronDown className="w-4 h-4 text-[#0071e3]" />
            </button>
          </div>
        )}

      </div>

      {/* Full-Screen Reader Modal Overlay */}
      {isReaderOpen && currentArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className={`max-w-4xl w-full rounded-3xl p-8 sm:p-12 border max-h-[90vh] overflow-y-auto relative ${
            isDark ? 'bg-[#161617] border-[#2c2c2e] text-[#f5f5f7]' : 'bg-[#ffffff] border-[#d2d2d7] text-[#1d1d1f]'
          }`}>
            
            {/* Modal Top Actions */}
            <div className="flex items-center justify-between pb-6 border-b border-[#2c2c2e] mb-6">
              <button
                onClick={(e) => copyShareLink(e, currentArticle.id)}
                className={`px-3.5 py-1.5 rounded-full border text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  copiedId === currentArticle.id
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : isDark
                      ? 'bg-[#2c2c2e] border-white/10 text-[#f5f5f7] hover:bg-[#3a3a3c]'
                      : 'bg-[#f5f5f7] border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#e8e8ed]'
                }`}
              >
                {copiedId === currentArticle.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#0071e3]" />
                    <span>Shareable Deep Link</span>
                  </>
                )}
              </button>

              <button
                onClick={closeReader}
                className={`p-2 rounded-full border transition-colors cursor-pointer ${
                  isDark ? 'bg-[#2c2c2e] border-white/10 hover:bg-[#3a3a3c]' : 'bg-[#f5f5f7] border-[#d2d2d7] hover:bg-[#e8e8ed]'
                }`}
                title="Close Reader"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <span className="text-xs font-mono text-[#0071e3] uppercase tracking-wider block mb-2">
                {currentArticle.category} • {currentArticle.readTime}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                {currentArticle.title}
              </h2>
              <div className="text-xs font-mono text-[#86868b]">
                By {currentArticle.author} • {currentArticle.date}
              </div>
            </div>

            {isLoading ? (
              <div className="py-16 text-center text-sm font-mono text-[#86868b] animate-pulse">
                Parsing Markdown file...
              </div>
            ) : (
              <div 
                className={`prose max-w-none text-base leading-relaxed pt-6 border-t ${
                  isDark ? 'border-[#2c2c2e] prose-invert text-[#a1a1a6]' : 'border-[#d2d2d7] text-[#424245]'
                }`}
                dangerouslySetInnerHTML={{ __html: parsedHtml }}
              />
            )}
          </div>
        </div>
      )}

    </section>
  );
}
