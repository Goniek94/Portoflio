'use client';

import React, { useState } from 'react';

/* ---------- TYPY ---------- */
interface Contact {
  id: string;
  nick: string;
  status: 'online' | 'away' | 'busy' | 'offline' | 'invisible';
  description: string;
}

interface ChatMessage {
  id: string;
  author: string;
  time: string;
  text: string;
  isOwn: boolean;
}

interface GaduGaduWindowProps {
  onClose: () => void;
}

/* ---------- GŁÓWNY KOMPONENT GADU-GADU ---------- */
export default function GaduGaduWindow({ onClose }: GaduGaduWindowProps) {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [selectedContact, setSelectedContact] = useState('Sylwia');

  const contacts: Contact[] = [
    { id: 'Artur', nick: 'Artur', status: 'online', description: 'gra w CS 1.6' },
    { id: 'Julka', nick: 'Julka', status: 'online', description: 'słucha Tokio Hotel ♥♥♥' },
    { id: 'Kaska', nick: 'Kaska', status: 'online', description: 'kocha konie i HP!!!' },
    { id: 'Marcin', nick: 'Marcin', status: 'online', description: 'www.moja-strona.prv.pl' },
    { id: 'Piasek', nick: 'Piasek', status: 'away', description: 'zaraz wracam...' },
    { id: 'Rafal', nick: 'Rafal', status: 'busy', description: 'uczę się do matury :(' },
    { id: 'Slawekx', nick: 'Slawekx', status: 'away', description: 'jestem na obiedzie' },
    { id: 'Sylwia', nick: 'Sylwia', status: 'online', description: '*~*~* PINK 4EVER *~*~*' },
    { id: 'Wanda', nick: 'Wanda', status: 'offline', description: 'poszłam spać zzz...' },
    { id: 'Daniel', nick: 'Daniel', status: 'away', description: 'gram na gitarze 🎸' },
  ];

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', author: 'Ja', time: '16:06', text: 'elo', isOwn: true },
    { id: '2', author: 'Julka', time: '16:07', text: 'o tak', isOwn: false },
    { id: '3', author: 'Julka', time: '16:07', text: '<bonus:bicz>', isOwn: false },
    {
      id: '4',
      author: 'Ja',
      time: '16:08',
      text: 'hehehe nie mam tych obrazkow (moze i dobrze...)',
      isOwn: true,
    },
    { id: '5', author: 'Julka', time: '16:09', text: 'lajny jest', isOwn: false },
  ]);

  const getStatusColor = (status: string) => {
    const colors = {
      online: 'radial-gradient(circle, #33ff33, #00cc00)',
      away: 'radial-gradient(circle, #ffff33, #ffcc00)',
      busy: 'radial-gradient(circle, #ff6633, #ff3300)',
      offline: 'radial-gradient(circle, #cccccc, #999999)',
      invisible: 'radial-gradient(circle, #cc99ff, #9966cc)',
    };
    return colors[status as keyof typeof colors] || colors.offline;
  };

  const getStatusBorder = (status: string) => {
    const borders = {
      online: '#009900',
      away: '#cc9900',
      busy: '#cc0000',
      offline: '#666666',
      invisible: '#663399',
    };
    return borders[status as keyof typeof borders] || borders.offline;
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && activeChat) {
      const now = new Date();
      const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        author: 'Ja',
        time,
        text: messageInput.trim(),
        isOwn: true,
      };
      setChatMessages((prev) => [...prev, newMessage]);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        width: activeChat ? '580px' : '180px',
        height: '100%',
        fontFamily: 'Tahoma, sans-serif',
        fontSize: '11px',
        transition: 'width 0.3s ease',
        position: 'relative',
      }}
    >
      {/* PRZYCISK ZAMYKANIA */}
      <div
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 99,
        }}
      >
        <button
          onClick={onClose}
          title="Zamknij okno"
          style={{
            width: 22,
            height: 22,
            background: '#e81123',
            color: '#fff',
            border: '1px solid #9c1a1a',
            borderRadius: 3,
            fontWeight: 'bold',
            fontSize: 14,
            cursor: 'pointer',
            boxShadow: '1px 1px 3px #8884',
          }}
        >
          ×
        </button>
      </div>

      {/* OKNO ROZMOWY */}
      {activeChat && (
        <div
          style={{
            width: '400px',
            height: '100%',
            background: '#f0f0f0',
            border: '2px outset #d4d0c8',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Reklama */}
          <div
            style={{
              height: '60px',
              background: 'linear-gradient(to right, #4a90e2, #87ceeb)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: '11px',
              fontWeight: 'bold',
              borderBottom: '1px solid #999',
            }}
          >
            <div>Pomożemy wybrać najlepszą opcję</div>
            <div style={{ fontSize: '9px', marginTop: '5px' }}>LG Picture Bank & Co. Nordea</div>
          </div>

          {/* Historia rozmowy */}
          <div
            style={{
              flex: 1,
              background: '#ffffcc',
              overflow: 'auto',
              padding: '4px',
              border: '1px inset #d4d0c8',
              margin: '2px',
            }}
          >
            {activeChat &&
              chatMessages.map((msg) => (
                <div key={msg.id} style={{ marginBottom: '2px', fontSize: '10px' }}>
                  <div
                    style={{
                      color: msg.isOwn ? '#000080' : '#800000',
                      fontWeight: 'bold',
                    }}
                  >
                    {msg.author} ({msg.time})
                  </div>
                  <div style={{ color: '#000', marginLeft: '10px' }}>{msg.text}</div>
                </div>
              ))}
          </div>

          {/* Toolbar formatowania */}
          <div
            style={{
              height: '25px',
              background: 'linear-gradient(to bottom, #ff9966, #ff6633)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 4px',
              gap: '2px',
            }}
          >
            {['B', 'I', 'U', '🎨', '😊'].map((btn) => (
              <div
                key={btn}
                style={{
                  width: '20px',
                  height: '18px',
                  background: '#f0f0f0',
                  border: '1px outset #d4d0c8',
                  fontSize: '9px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {btn}
              </div>
            ))}
          </div>

          {/* Pole tekstowe */}
          <textarea
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Napisz wiadomość..."
            style={{
              height: '50px',
              background: '#ffffcc',
              border: '1px inset #d4d0c8',
              margin: '2px',
              padding: '2px',
              fontSize: '10px',
              fontFamily: 'Tahoma, sans-serif',
              resize: 'none',
            }}
          />

          {/* Dolny pasek */}
          <div
            style={{
              height: '25px',
              background: 'linear-gradient(to bottom, #ff9966, #ff6633)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 4px',
              fontSize: '9px',
              color: 'white',
            }}
          >
            <div style={{ display: 'flex', gap: '2px' }}>
              <button
                onClick={handleSendMessage}
                style={{
                  padding: '2px 8px',
                  background: '#f0f0f0',
                  border: '1px outset #d4d0c8',
                  fontSize: '9px',
                  cursor: 'pointer',
                  color: '#000',
                }}
              >
                Wyślij
              </button>
              <button
                style={{
                  padding: '2px 8px',
                  background: '#f0f0f0',
                  border: '1px outset #d4d0c8',
                  fontSize: '9px',
                  cursor: 'pointer',
                  color: '#000',
                }}
              >
                Menu
              </button>
            </div>
            <div
              onClick={onClose}
              style={{
                cursor: 'pointer',
                textDecoration: 'underline',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              Zamknij
            </div>
          </div>
        </div>
      )}

      {/* LISTA KONTAKTÓW */}
      <div
        style={{
          width: '180px',
          height: '100%',
          background: '#f0f0f0',
          border: '2px outset #d4d0c8',
          borderLeft: activeChat ? 'none' : '2px outset #d4d0c8',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            height: '35px',
            background: 'linear-gradient(to bottom, #ff9966, #ff6633)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              background: '#ffffcc',
              padding: '4px 8px',
              fontSize: '9px',
              fontWeight: 'bold',
              border: '1px inset #d4d0c8',
              cursor: 'pointer',
            }}
          >
            Gadu-Gadu
          </div>
          <div
            style={{
              background: '#f0f0f0',
              padding: '4px 8px',
              fontSize: '9px',
              fontWeight: 'bold',
              border: '1px outset #d4d0c8',
              cursor: 'pointer',
            }}
          >
            PowerGG
          </div>
        </div>

        {/* Toolbar */}
        <div
          style={{
            height: '25px',
            background: 'linear-gradient(to bottom, #ff9966, #ff6633)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
          }}
        >
          {['📧', '⚙', '👥'].map((icon) => (
            <div
              key={icon}
              style={{
                width: '18px',
                height: '18px',
                background: '#f0f0f0',
                border: '1px outset #d4d0c8',
                fontSize: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </div>
          ))}
        </div>

        {/* Lista kontaktów */}
        <div
          style={{
            flex: 1,
            background: 'white',
            overflow: 'auto',
            border: '1px inset #d4d0c8',
            margin: '2px',
          }}
        >
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact.id)}
              onDoubleClick={() => setActiveChat(contact.id)}
              style={{
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 4px',
                cursor: 'pointer',
                fontSize: '10px',
                background: selectedContact === contact.id ? '#316ac5' : 'transparent',
                color: selectedContact === contact.id ? 'white' : 'black',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  marginRight: '4px',
                  borderRadius: '50%',
                  background: getStatusColor(contact.status),
                  border: `1px solid ${getStatusBorder(contact.status)}`,
                }}
              />
              <div style={{ fontWeight: 'bold' }}>{contact.nick}</div>
            </div>
          ))}
        </div>

        {/* Dolny panel */}
        <div
          style={{
            height: '65px',
            background: 'linear-gradient(to bottom, #ff9966, #ff6633)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '9px',
            padding: '4px',
          }}
        >
          <div style={{ fontSize: '8px', marginBottom: '2px' }}>ID 1426551 tel.</div>
          <div style={{ fontSize: '8px', marginBottom: '4px' }}>zmiany, zmiany zmiany...</div>
          <div style={{ display: 'flex', gap: '2px', marginBottom: '4px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                background: '#ff6633',
                borderRadius: '50%',
                border: '1px solid #cc0000',
              }}
            />
            <div
              style={{
                width: '12px',
                height: '12px',
                background: '#f0f0f0',
                border: '1px solid #999',
                borderRadius: '50%',
              }}
            />
            <div
              style={{
                width: '12px',
                height: '12px',
                background: '#f0f0f0',
                border: '1px solid #999',
                borderRadius: '50%',
              }}
            />
          </div>
          <div style={{ fontSize: '8px', color: 'white' }}>Mój status:</div>
          <div
            style={{
              background: 'white',
              color: 'black',
              padding: '2px 4px',
              fontSize: '8px',
              border: '1px inset #d4d0c8',
              width: '120px',
              textAlign: 'center',
            }}
          >
            zajęty...
          </div>
        </div>
      </div>
    </div>
  );
}
