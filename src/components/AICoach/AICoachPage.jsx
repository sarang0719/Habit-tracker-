import React, { useState, useEffect, useRef } from 'react';
import { useHabits } from '../../hooks/useHabits';
import { getLocalAIResponse } from '../../services/localAIService';
import { Bot, User, Send } from 'lucide-react';

import useMobile from '../../hooks/useMobile';

const AICoachPage = () => {
    const { habits } = useHabits();
    const isMobile = useMobile();
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: "Hello! I'm your private AI Coach. How can I help you crush your habits today?" }
    ]);

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // Use Local AI Service
            const response = await getLocalAIResponse(userMsg.text, habits);
            let aiResponseText = response;

            if (typeof response === 'object' && response !== null && response.text) {
                aiResponseText = response.text;
                // Handle Actions (simplified for UI update)
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: aiResponseText }]);
        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: "My circuits are tangled. Try again?" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: isMobile ? '16px' : '32px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(217, 70, 239, 0.3)' }}>
                    <Bot size={24} color="white" />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>AI Coach Chat</h2>
            </div>

            <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Chat Area */}
                <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {messages.map(msg => (
                        <div key={msg.id} style={{
                            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            maxWidth: '80%',
                            display: 'flex', gap: '12px',
                            flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
                        }}>
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                background: msg.sender === 'user' ? 'rgba(255,255,255,0.1)' : 'var(--accent-primary)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                            }}>
                                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>

                            <div style={{
                                padding: '12px 16px', borderRadius: '16px',
                                background: msg.sender === 'user' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                                color: 'white',
                                borderTopRightRadius: msg.sender === 'user' ? '4px' : '16px',
                                borderTopLeftRadius: msg.sender === 'ai' ? '4px' : '16px',
                                lineHeight: '1.5'
                            }}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Bot size={16} />
                            </div>
                            <div style={{ padding: '12px 16px', borderRadius: '16px', borderTopLeftRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', fontSize: '13px', fontStyle: 'italic' }}>
                                AI is thinking...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} style={{ padding: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '12px' }}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask for motivation or insights..."
                        style={{
                            flex: 1, padding: '12px', borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.05)',
                            color: 'white', outline: 'none'
                        }}
                    />
                    <button type="submit" className="btn-primary" style={{ padding: '0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>Send</span> <Send size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AICoachPage;
