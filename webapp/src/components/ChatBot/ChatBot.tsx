import { useEffect, useRef, useState, type FormEvent } from 'react';
import './ChatBot.css';

const ChatBot = () => {
	const [showChat, setShowChat] = useState(false);
	const [text, setText] = useState('');
	const [messages, setMessages] = useState<Array<string[]>>([]);
	const [isChatBotTyping, setIsChatBotTyping] = useState(false);
	const websocketRef = useRef<WebSocket | null>(null);

	useEffect(() => {
		const clientId = Date.now();
		// TODO: Update this when deploying
		const websocket = new WebSocket(`ws://localhost:8000/ws/${clientId}`);
		websocket.onopen = () => console.log('ws online');
		websocket.onclose = () => console.log('ws offline');
		websocket.onmessage = (chatMessage: MessageEvent<string>) => {
			setIsChatBotTyping(false);
			setMessages((prev) => [['bot', chatMessage.data], ...prev]);
		};
		websocketRef.current = websocket;
		return () => websocket.close();
	}, []);

	const handleClick = () => setShowChat((prev) => !prev);

	const handleEnter = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			(
				(e.target as HTMLTextAreaElement).form as HTMLFormElement
			).requestSubmit();
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formElements = form.elements as typeof form.elements & {
			chatBotInput: HTMLTextAreaElement;
		};
		if (
			websocketRef.current &&
			websocketRef.current.readyState === WebSocket.OPEN
		) {
			setIsChatBotTyping(true);
			websocketRef.current.send(text);
		}
		setMessages((prev) => [
			['user', formElements.chatBotInput.value],
			...prev,
		]);
		setText('');
	};

	return (
		<div className="chat-bot">
			<button onClick={handleClick}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className={`chat-bot-icon${
						!showChat ? '' : '-close'
					} primary-text chat-transition`}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
					/>
				</svg>
			</button>
			<div
				className={`chat-bot-chat chat-bot-chat${
					!showChat ? '-close' : '-open'
				} chat-transition`}
			>
				<button
					className={`chat-bot-exit${
						!showChat ? '-close' : '-open'
					} primary-text`}
					onClick={handleClick}
				>
					X
				</button>

				{showChat && (
					<div className="chat-bot-content">
						<div className="chat-bot-messages">
							{isChatBotTyping && (
								<p className="opacity-30">
									Agent is typing ...
								</p>
							)}
							{messages.map((msg, idx) => (
								<p
									key={idx}
									className={`chat-bot-message chat-bot-${msg[0]}-message`}
								>
									{msg[1]}
								</p>
							))}
						</div>
						<form onSubmit={handleSubmit}>
							<textarea
								value={text}
								onChange={(e) => setText(e.target.value)}
								onKeyDown={handleEnter}
								name="chatBotInput"
								className="chat-bot-input"
								rows={1}
								placeholder="Type message here ..."
							/>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default ChatBot;
