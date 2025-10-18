'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Contact {
  id: string;
  nick: string;
  status: 'online' | 'away' | 'busy' | 'offline' | 'invisible';
  description: string;
}

interface Message {
  id: string;
  author: string;
  time: string;
  text: string;
  isOwn: boolean;
}

interface ChatHistory {
  [contactId: string]: Message[];
}

interface GaduGaduWindowProps {
  onClose: () => void;
}

export default function GaduGaduWindow({ onClose }: GaduGaduWindowProps) {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<string>('Sylwia');
  const [myStatus, setMyStatus] = useState<'online' | 'away' | 'busy' | 'offline' | 'invisible'>(
    'online'
  );
  const [myDescription, setMyDescription] = useState('▂ ▃ ▅ ▆ █ sLuChAm MuZy █ ▆ ▅ ▃ ▂');
  const [editingDescription, setEditingDescription] = useState(false);
  const [tempDescription, setTempDescription] = useState('');
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const contacts: Contact[] = [
    {
      id: 'Artur',
      nick: '~ArTuReK~',
      status: 'online',
      description: '<<<CS 1.6>>> de_dust2 24/7!!! kto chce grać??? pisać!',
    },
    {
      id: 'Julka',
      nick: '•●๋•JuLkA•●๋•',
      status: 'online',
      description: '♪♫•*¨*•.¸¸ TOKIO HOTEL ¸¸.•*¨*•♫♪ BiLL jEsT mÓj <3<3<3',
    },
    {
      id: 'Kaska',
      nick: 'KaŚkA***',
      status: 'online',
      description: '°º¤ø,¸¸,ø¤º°`°º¤ø KOCHAM KONIE °º¤ø,¸¸,ø¤º°`°º¤ø,¸¸',
    },
    {
      id: 'Marcin',
      nick: 'MaRcInXxX',
      status: 'online',
      description: '>>>www.moja-strona.prv.pl<<< WEJDŹ I PODPISZ KSIĘGĘ GOŚCI!!!',
    },
    {
      id: 'Piasek',
      nick: 'PiAsEcZeK',
      status: 'away',
      description: '▬▬ı═══════ﺤ zaraz wracam... chyba... -═══════ı▬▬',
    },
    {
      id: 'Rafal',
      nick: 'RaFaŁeK',
      status: 'busy',
      description: '【ツ】matura 2006... NIE PISAĆ!!! uczę się【ツ】',
    },
    {
      id: 'Slawekx',
      nick: 'SŁaWeK!!',
      status: 'away',
      description: '╔═╗ ║║║ ╚═╝ jestem na obiedzie brb',
    },
    {
      id: 'Sylwia',
      nick: '¤SyLwIa¤',
      status: 'online',
      description: '✿◕ ‿ ◕✿ *~PiNk GiRl~* ✿◕ ‿ ◕✿ rOżOwO Mi !!!1',
    },
    {
      id: 'Wanda',
      nick: 'WaNdZiA',
      status: 'offline',
      description: 'zzZZzzzZZZ... jak coś ważnego to SMS: 608-xxx-xxx',
    },
    {
      id: 'Daniel',
      nick: 'DaNiEl_666',
      status: 'away',
      description: '♫♪.ılılıll|̲̅̅●̲̅̅|̲̅̅=̲̅̅|̲̅̅●̲̅̅|llılılı.♫♪ SLIPKNOT 4 EVER ♫♪',
    },
    {
      id: 'Ania',
      nick: '**AnIa**',
      status: 'online',
      description: '(͡๏̯͡๏) jestem smutna... nikt mnie nie rozumie... (͡๏̯͡๏)',
    },
    {
      id: 'Tomek',
      nick: 'ToMeK_13',
      status: 'online',
      description: '☠ eMo KiD ☠ mY cHeMiCaL rOmAnCe ☠ życie nie ma sensu...',
    },
    {
      id: 'Gosia',
      nick: '•GoŚkA•',
      status: 'busy',
      description: '♥♥♥ mÓj ChŁoPaK jESt nAjLePsZy ♥♥♥ kOChAm Cię MaRcIn!!!',
    },
    {
      id: 'Bartek',
      nick: 'BarTkO',
      status: 'online',
      description: '→ www.fotka.pl/bartek123 ← ZOBACZ MOJE FOTKI!!!',
    },
    { id: 'e', nick: 'e', status: 'online', description: '' },
  ];

  const [chatHistory, setChatHistory] = useState<ChatHistory>({
    '¤SyLwIa¤': [
      {
        id: '1',
        author: '¤SyLwIa¤',
        time: '14:32',
        text: 'hejka! :*** co u Ciebie słychać? :)',
        isOwn: false,
      },
      {
        id: '2',
        author: 'Ja',
        time: '14:33',
        text: 'cześć! wszystko spoko, a u Ciebie?',
        isOwn: true,
      },
      {
        id: '3',
        author: '¤SyLwIa¤',
        time: '14:34',
        text: 'super! :) kupiłam sobie różową bluzkę <3<3',
        isOwn: false,
      },
    ],
    '•●๋•JuLkA•●๋•': [
      {
        id: '1',
        author: '•●๋•JuLkA•●๋•',
        time: '15:20',
        text: 'widziałaś nowy teledysk Tokio Hotel???',
        isOwn: false,
      },
      {
        id: '2',
        author: 'Ja',
        time: '15:21',
        text: 'jeszcze nie! Bill jest taki słodki <3',
        isOwn: true,
      },
      {
        id: '3',
        author: '•●๋•JuLkA•●๋•',
        time: '15:21',
        text: 'PRAWDA!!! kocham go <3<3<3',
        isOwn: false,
      },
    ],
    '~ArTuReK~': [
      {
        id: '1',
        author: '~ArTuReK~',
        time: '16:45',
        text: 'grasz dzisiaj w CS? mamy turniej na szkole',
        isOwn: false,
      },
      {
        id: '2',
        author: 'Ja',
        time: '16:46',
        text: 'może później, muszę się pouczyć',
        isOwn: true,
      },
      { id: '3', author: '~ArTuReK~', time: '16:46', text: 'no dobra, to pa', isOwn: false },
    ],
  });

  useEffect(() => {
    if (activeChat && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, activeChat]);

  const getStatusColor = (status: string) => {
    const colors = {
      online: 'radial-gradient(circle, #66ff66, #00cc00)',
      away: 'radial-gradient(circle, #ffff66, #ffcc00)',
      busy: 'radial-gradient(circle, #ff6666, #ff0000)',
      offline: 'radial-gradient(circle, #cccccc, #888888)',
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

  const getStatusText = (status: string) => {
    const texts = {
      online: 'Dostępny',
      away: 'Zaraz wracam',
      busy: 'Zajęty',
      offline: 'Niedostępny',
      invisible: 'Niewidoczny',
    };
    return texts[status as keyof typeof texts] || 'Dostępny';
  };

  const handleDoubleClick = (contactId: string) => {
    setActiveChat(contactId);
    if (!chatHistory[contactId]) {
      setChatHistory((prev) => ({
        ...prev,
        [contactId]: [],
      }));
    }
  };

  const handleEditDescription = () => {
    setTempDescription(myDescription);
    setEditingDescription(true);
  };

  const handleSaveDescription = () => {
    setMyDescription(tempDescription);
    setEditingDescription(false);
  };

  const handleCancelEdit = () => {
    setEditingDescription(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        width: activeChat ? '620px' : '220px',
        height: '520px',
        fontFamily: 'Tahoma, sans-serif',
        fontSize: '11px',
        transition: 'width 0.3s ease',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        position: 'relative',
      }}
    >
      {/* Przycisk zamykania głównego okna */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          width: '20px',
          height: '20px',
          background: '#ff0000',
          color: '#fff',
          border: '1px solid #cc0000',
          borderRadius: '50%',
          fontSize: '12px',
          cursor: 'pointer',
          fontWeight: 'bold',
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
        title="Zamknij Gadu-Gadu"
      >
        ×
      </button>

      {/* OKNO CZATU */}
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
          {/* Nagłówek czatu */}
          <div
            style={{
              height: '22px',
              background: 'linear-gradient(to bottom, #0055cc, #0044aa)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 8px',
              justifyContent: 'space-between',
              color: 'white',
              fontWeight: 'normal',
              fontSize: '11px',
            }}
          >
            <div>Rozmowa z {activeChat}</div>
            <button
              onClick={() => setActiveChat(null)}
              style={{
                width: '16px',
                height: '14px',
                background: '#c0c0c0',
                color: '#000',
                border: '1px outset #fff',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontFamily: 'Marlett',
              }}
            >
              r
            </button>
          </div>

          {/* Reklama */}
          <div
            style={{
              height: '55px',
              background: 'linear-gradient(135deg, #4a90e2 0%, #63b3ed 50%, #90cdf4 100%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: '13px',
              fontWeight: 'bold',
              borderBottom: '2px solid #999',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px' }}>Pomalemy wybrać najlepszą ofertę</div>
              <div style={{ fontSize: '11px', marginTop: '3px', fontWeight: 'normal' }}>Nordea</div>
            </div>
          </div>

          {/* Historia rozmowy */}
          <div
            style={{
              flex: 1,
              background: '#ffffcc',
              overflow: 'auto',
              padding: '6px',
              border: '1px inset #808080',
              margin: '2px',
            }}
          >
            {chatHistory[activeChat]?.map((msg) => (
              <div key={msg.id} style={{ marginBottom: '4px', fontSize: '11px' }}>
                <div
                  style={{
                    color: msg.isOwn ? '#0000aa' : '#aa0000',
                    fontWeight: 'bold',
                  }}
                >
                  {msg.author} ({msg.time})
                </div>
                <div style={{ color: '#000', marginLeft: '10px', marginTop: '1px' }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Toolbar formatowania */}
          <div
            style={{
              height: '24px',
              background: 'linear-gradient(to bottom, #ff8844, #ff6622)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 4px',
              gap: '2px',
              borderTop: '1px solid #ffaa66',
              borderBottom: '1px solid #cc4400',
            }}
          >
            {['B', 'I', 'U', '🎨', '😊'].map((btn) => (
              <div
                key={btn}
                style={{
                  width: '20px',
                  height: '18px',
                  background: '#f0f0f0',
                  border: '1px outset #fff',
                  fontSize: '10px',
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
          <div
            style={{
              height: '70px',
              background: '#ffffcc',
              border: '1px inset #808080',
              margin: '2px',
              padding: '4px',
              fontSize: '11px',
              fontFamily: 'Tahoma, sans-serif',
              overflow: 'auto',
              color: '#999',
            }}
          >
            [Tu byś pisał wiadomości... ale jest to tylko demo, bo muszę znaleźć pracę:)]
          </div>

          {/* Dolny pasek */}
          <div
            style={{
              height: '26px',
              background: 'linear-gradient(to bottom, #ff8844, #ff6622)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 6px',
              fontSize: '11px',
              borderTop: '1px solid #ffaa66',
            }}
          >
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                style={{
                  padding: '3px 10px',
                  background: '#f0f0f0',
                  border: '1px outset #fff',
                  fontSize: '11px',
                  cursor: 'pointer',
                  color: '#000',
                  fontFamily: 'Tahoma, sans-serif',
                }}
              >
                Wyślij
              </button>
              <button
                style={{
                  padding: '3px 10px',
                  background: '#f0f0f0',
                  border: '1px outset #fff',
                  fontSize: '11px',
                  cursor: 'pointer',
                  color: '#000',
                  fontFamily: 'Tahoma, sans-serif',
                }}
              >
                Menu
              </button>
            </div>
            <button
              onClick={() => setActiveChat(null)}
              style={{
                padding: '3px 10px',
                background: '#f0f0f0',
                border: '1px outset #fff',
                fontSize: '11px',
                cursor: 'pointer',
                color: '#000',
                fontFamily: 'Tahoma, sans-serif',
              }}
            >
              Zamknij
            </button>
          </div>
        </div>
      )}

      {/* LISTA KONTAKTÓW */}
      <div
        style={{
          width: '220px',
          height: '100%',
          background: '#f0f0f0',
          border: '2px outset #d4d0c8',
          borderLeft: activeChat ? 'none' : '2px outset #d4d0c8',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Nagłówek z zakładkami */}
        <div
          style={{
            height: '40px',
            background: 'linear-gradient(to bottom, #ff8844, #ff6622)',
            display: 'flex',
            flexDirection: 'column',
            borderTop: '1px solid #ffaa66',
          }}
        >
          <div
            style={{
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '0 8px',
            }}
          >
            <div
              style={{
                background: '#ffffcc',
                padding: '2px 12px',
                fontSize: '11px',
                fontWeight: 'bold',
                border: '1px outset #fff',
                cursor: 'pointer',
                color: '#000',
              }}
            >
              Gadu-Gadu
            </div>
            <div
              style={{
                background: '#f0f0f0',
                padding: '2px 12px',
                fontSize: '11px',
                fontWeight: 'bold',
                border: '1px outset #fff',
                cursor: 'pointer',
                color: '#000',
              }}
            >
              PowerGG
            </div>
          </div>
          <div
            style={{
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            <div
              style={{
                background: '#ffffcc',
                padding: '2px 8px',
                fontSize: '10px',
                fontWeight: 'bold',
                border: '1px outset #fff',
                cursor: 'pointer',
                color: '#000',
              }}
            >
              Kontakty
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div
          style={{
            height: '26px',
            background: 'linear-gradient(to bottom, #ff8844, #ff6622)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 4px',
            gap: '2px',
            borderTop: '1px solid #ffaa66',
            borderBottom: '1px solid #cc4400',
          }}
        >
          {['📧', '⚙', '👥', '🔍'].map((icon) => (
            <div
              key={icon}
              style={{
                width: '20px',
                height: '18px',
                background: '#f0f0f0',
                border: '1px outset #fff',
                fontSize: '10px',
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
            background: '#cce5ff',
            overflow: 'auto',
            border: '1px inset #808080',
            margin: '2px',
          }}
        >
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact.id)}
              onDoubleClick={() => handleDoubleClick(contact.id)}
              title={contact.description}
              style={{
                minHeight: '36px',
                display: 'flex',
                alignItems: 'center',
                padding: '3px 4px',
                cursor: 'pointer',
                fontSize: '11px',
                background: selectedContact === contact.id ? '#0055cc' : 'transparent',
                color: selectedContact === contact.id ? 'white' : 'black',
              }}
            >
              <div
                style={{
                  width: '13px',
                  height: '13px',
                  marginRight: '5px',
                  borderRadius: '50%',
                  background: getStatusColor(contact.status),
                  border: `1px solid ${getStatusBorder(contact.status)}`,
                  flexShrink: 0,
                }}
              />
              <div style={{ overflow: 'hidden', flex: 1 }}>
                <div style={{ fontWeight: 'bold' }}>{contact.nick}</div>
                {contact.description && (
                  <div
                    style={{
                      fontSize: '9px',
                      color: selectedContact === contact.id ? '#ffeecc' : '#666',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {contact.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Panel własnego statusu */}
        <div
          style={{
            minHeight: '80px',
            background: 'linear-gradient(to bottom, #ff8844, #ff6622)',
            display: 'flex',
            flexDirection: 'column',
            padding: '6px',
            borderTop: '1px solid #ffaa66',
            gap: '4px',
            position: 'relative',
          }}
        >
          <div style={{ fontSize: '9px', color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
            ID 1426551 tel
          </div>

          {/* Opis */}
          {!editingDescription ? (
            <div
              onClick={handleEditDescription}
              style={{
                background: '#fff',
                border: '1px inset #808080',
                padding: '4px',
                fontSize: '9px',
                minHeight: '28px',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
              title="Kliknij aby edytować opis"
            >
              {myDescription}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <textarea
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
                style={{
                  background: '#fff',
                  border: '1px inset #808080',
                  padding: '4px',
                  fontSize: '9px',
                  minHeight: '28px',
                  fontFamily: 'Tahoma, sans-serif',
                  resize: 'none',
                }}
                autoFocus
              />
              <div style={{ display: 'flex', gap: '2px' }}>
                <button
                  onClick={handleSaveDescription}
                  style={{
                    flex: 1,
                    padding: '2px',
                    background: '#f0f0f0',
                    border: '1px outset #fff',
                    fontSize: '9px',
                    cursor: 'pointer',
                  }}
                >
                  OK
                </button>
                <button
                  onClick={handleCancelEdit}
                  style={{
                    flex: 1,
                    padding: '2px',
                    background: '#f0f0f0',
                    border: '1px outset #fff',
                    fontSize: '9px',
                    cursor: 'pointer',
                  }}
                >
                  Anuluj
                </button>
              </div>
            </div>
          )}

          {/* Status ikonki */}
          <div
            style={{
              display: 'flex',
              gap: '3px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: getStatusColor(myStatus),
                border: `2px solid ${getStatusBorder(myStatus)}`,
                cursor: 'pointer',
              }}
              onClick={() => setShowStatusMenu(!showStatusMenu)}
            />
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: '#f0f0f0',
                border: '1px solid #999',
              }}
            />
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: '#f0f0f0',
                border: '1px solid #999',
              }}
            />
          </div>

          {showStatusMenu && (
            <div
              style={{
                position: 'absolute',
                bottom: '85px',
                left: '4px',
                right: '4px',
                background: '#fff',
                border: '2px outset #d4d0c8',
                boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                zIndex: 100,
              }}
            >
              {(['online', 'away', 'busy', 'invisible'] as const).map((status) => (
                <div
                  key={status}
                  onClick={() => {
                    setMyStatus(status);
                    setShowStatusMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    background: myStatus === status ? '#0055cc' : 'transparent',
                    color: myStatus === status ? 'white' : 'black',
                  }}
                >
                  <div
                    style={{
                      width: '13px',
                      height: '13px',
                      borderRadius: '50%',
                      background: getStatusColor(status),
                      border: `1px solid ${getStatusBorder(status)}`,
                    }}
                  />
                  {getStatusText(status)}
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              fontSize: '9px',
              color: '#fff',
              textAlign: 'center',
              marginTop: '2px',
            }}
          >
            Mój status:
          </div>
          <div
            style={{
              background: '#fff',
              padding: '2px 4px',
              fontSize: '9px',
              textAlign: 'center',
              border: '1px inset #808080',
            }}
          >
            {getStatusText(myStatus)}
          </div>
        </div>
      </div>
    </div>
  );
}
