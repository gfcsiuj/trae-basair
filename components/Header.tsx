import React from 'react';
import { useApp } from '../hooks/useApp';
import { Panel } from '../types';

const Header: React.FC = () => {
    const { state, actions } = useApp();
    const { pageData, currentPage, surahs, isVerseByVerseLayout } = state;

    const firstVerse = pageData.right?.[0] || pageData.left?.[0];
    const surah = firstVerse ? surahs.find(s => s.id === firstVerse.chapter_id) : null;
    const pageNumForDisplay = window.innerWidth > 1024 && state.pageData.left ? `${currentPage + 1}-${currentPage}` : currentPage;


    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${state.isUIVisible ? 'translate-y-0' : '-translate-y-full'}`}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent pointer-events-none h-24"></div>
            <div
                className="relative mx-4 mt-2 glass-panel rounded-2xl shadow-lg flex items-center justify-between px-4 py-2 text-text-primary"
            >
                <div className="flex items-center gap-3">
                    <button onClick={() => actions.openPanel(Panel.Menu)} className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                        <i className="fas fa-bars text-xl"></i>
                    </button>
                    <div>
                        <h1 className="text-sm font-bold text-text-primary">{surah?.name_arabic || 'جاري التحميل...'}</h1>
                        <p className="text-xs text-text-secondary">
                            {firstVerse && `الجزء ${firstVerse.juz_number} • صفحة ${pageNumForDisplay}`}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={() => actions.openPanel(Panel.Search)} className="p-2 rounded-lg hover:bg-primary/10 text-text-secondary hover:text-primary transition-colors">
                        <i className="fas fa-search text-lg"></i>
                    </button>
                    <button onClick={actions.toggleVerseByVerseLayout} className={`p-2 rounded-lg hover:bg-primary/10 transition-colors ${isVerseByVerseLayout ? 'text-primary' : 'text-text-secondary hover:text-primary'}`}>
                        <i className="fas fa-layer-group text-lg"></i>
                    </button>
                    <button onClick={() => actions.openPanel(Panel.Settings)} className="p-2 rounded-lg hover:bg-primary/10 text-text-secondary hover:text-primary transition-colors">
                        <i className="fas fa-cog text-lg"></i>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;