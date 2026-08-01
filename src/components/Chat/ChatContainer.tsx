
import "../../styles/Akuvi.css";
import { useRef, useEffect, useState, type KeyboardEvent } from 'react';

export interface MessageInterface {
    sender: 'bot' | 'user',
    text: string,
    timestamp: number
}

const ChatContainer = () => {

    const [send, setSend] = useState(false)
    const [message, setMessage] = useState<MessageInterface[]>([])
    const inputRef = useRef<HTMLDivElement | null>(null)
    const wsRef = useRef<WebSocket | null>(null)

    useEffect(() => {
        const wsUrl = import.meta.env.VITE_API_WS as string
        const ws = new WebSocket(`${wsUrl}ws/v1/chatbot/`)
        wsRef.current = ws

        ws.onmessage = (event) => {
            //console.log('Data :', event.data)
            //const data = JSON.parse(event.data)
            //console.log('Data :', event.data)
            //console.log('data :', data)
            const botMessage: MessageInterface = {
                sender:'bot',
                text: event.data,
                timestamp: Date.now()
            }
            if (event.data != 'Is there anything else I can help you with?') {
                setMessage((prev) => [...prev, botMessage])
            }
            return () => {
                ws.close()
            }}
    }, [])

    const submitMessage = (messageText: string) => {
        const trimmedText = messageText.trim();

        if (!trimmedText) {
            return;
        }

        setSend(true)
        const userMessage: MessageInterface = {
            sender: 'user',
            text: trimmedText,
            timestamp: Date.now()
        }
        setMessage((prev) => [...prev, userMessage])

        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ message: trimmedText }))
        }

        if (inputRef.current) {
            inputRef.current.innerText = ""
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitMessage(inputRef.current?.innerText ?? "")
        }
    }

    return (
        <div className={`akuvi ${send ? "akuvi-active" : ""}`}>
            <div className={send ? "akuvi-chat-container" : "d-none"}>
                {
                    message.length > 0 && (
                        message.map((item: MessageInterface) => (
                            <span key={item.timestamp} className={item.sender === 'user' ? "user-message" : 'akuvi-message'}>{item.text}</span>
                        )))
                }
            </div>
            <div className={send ? "akuvi-input-container-parent1" : "akuvi-input-container-parent2"}>
                <div className="container akuvi-input-container my-2">
                    <div className="marge-svg mx-1 d-none">
                        <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="15" y1="50" x2="85" y2="50" stroke="black" strokeWidth="10" strokeLinecap="round" />
                            <line x1="50" y1="15" x2="50" y2="85" stroke="black" strokeWidth="10" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div
                        ref={inputRef}
                        contentEditable
                        data-placeholder="Ask something to Akuvi"
                        onKeyDown={handleKeyDown}
                        className="akuvi-input"
                        suppressContentEditableWarning={true} />
                    <button className="mx-1 akuvi-btn"
                        onClick={() => submitMessage(inputRef.current?.innerText ?? "")}
                    >
                        <svg width="40" height="40" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30 42 V18 M20 28 L30 18 L40 28"
                                stroke="black"
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                            />
                        </svg>
                    </button>
                </div>
                <span className={send ? "akuvi-disclaimer" : "d-none"}><i>Akuvi est une IA et peut faire des erreurs. Veuillez vérifier les réponses.</i></span>
            </div>
        </div>
    )
}

export default ChatContainer