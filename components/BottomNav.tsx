import React from 'react';
import { useApp } from '../hooks/useApp';
import { Panel, ReadingMode } from '../types';
import AudioControlBar from './AudioControlBar';

const NavItem: React.FC<{ icon: string; label: string; panel?: Panel | 'memorize'; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`nav-item flex flex-col items-center justify-center p-2 transition-all duration-300 relative group ${isActive ? 'text-primary -translate-y-1' : 'text-text-secondary hover:text-primary'}`}
        aria-label={label}
    >
        <div className={`absolute -top-8 bg-primary text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-sm whitespace-nowrap`}>
            {label}
            <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45"></div>
        </div>
        <i className={`fas ${icon} text-xl mb-1 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}></i>
        {isActive && <div className="h-1 w-1 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary),0.6)]"></div>}
    </button>
);

const BottomNav: React.FC = () => {
    const { state, actions } = useApp();

    const handleNavClick = (panel?: Panel | 'memorize') => {
        if (panel === 'memorize') {
            actions.setReadingMode(ReadingMode.Memorization);
            return;
        }

        if (panel) {
            // If the audio panel is already open, clicking the audio icon does nothing (it has its own back button).
            // For other icons, toggle them off if they are already active.
            if (state.activePanel === Panel.Audio && panel === Panel.Audio) {
                return;
            }

            if (state.activePanel === panel) {
                actions.openPanel(null);
            } else {
                actions.openPanel(panel);
            }
        } else {
            actions.openPanel(null);
        }
    };

    const isAudioOpen = state.activePanel === Panel.Audio;

    return (
        <nav
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 glass-panel shadow-2xl rounded-full transition-all duration-500 ease-out ${state.isUIVisible ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0'}`}
            style={{
                height: isAudioOpen ? `calc(13rem + env(safe-area-inset-bottom, 0rem))` : 'auto',
                width: isAudioOpen ? '95%' : 'auto',
                maxWidth: '600px',
                minWidth: isAudioOpen ? 'auto' : '320px'
            }}
        >
            {isAudioOpen ? (
                <AudioControlBar />
            ) : (
                <div className="flex items-center justify-between px-8 py-3 gap-6">
                    <NavItem icon="fa-home" label="الرئيسية" panel={Panel.Dashboard} isActive={state.activePanel === Panel.Dashboard} onClick={() => handleNavClick(Panel.Dashboard)} />
                    <NavItem icon="fa-headphones-alt" label="الصوت" panel={Panel.Audio} isActive={isAudioOpen} onClick={() => handleNavClick(Panel.Audio)} />
                    <NavItem icon="fa-brain" label="الحفظ" panel="memorize" isActive={state.readingMode === ReadingMode.Memorization} onClick={() => handleNavClick('memorize')} />
                    <NavItem icon="fa-list" label="الفهرس" panel={Panel.Index} isActive={state.activePanel === Panel.Index} onClick={() => handleNavClick(Panel.Index)} />
                    <NavItem icon="fa-bookmark" label="المفضلة" panel={Panel.Bookmarks} isActive={state.activePanel === Panel.Bookmarks} onClick={() => handleNavClick(Panel.Bookmarks)} />
                </div>
            )}
        </nav>
    );
};

export default BottomNav;