import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Eye, EyeOff, RotateCcw } from 'lucide-react';

// --- БАЗА ДАННЫХ ДАНЕТОК ---
const DANETKI_LIST = [
  { id: 1, title: "Смерть в пустыне", task: "В пустыне найден мертвый человек. Рядом с ним лежит только нераскрытый рюкзак. Что произошло?", answer: "Это был парашютист. Его парашют (рюкзак) не раскрылся." },
  { id: 2, title: "Странный лифт", task: "Человек живет на 10 этаже. Утром он едет на 1 этаж, а вечером поднимается до 7-го и идет пешком. Почему?", answer: "Он карлик и не достает до кнопки 10 этажа." },
  { id: 3, title: "Мокрый Билл", task: "Билл находится в запертой комнате без окон. Там только лужа воды и осколки стекла. Билл мертв. Кто он?", answer: "Билл — это рыбка. Его аквариум разбился." }
];

export default function App() {
  // Состояние: выбранная игра и открыт ли ответ
  const [selectedGame, setSelectedGame] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Функция выбора игры из списка
  const selectGame = (game) => {
    setSelectedGame(game);
    setShowAnswer(false); // Скрываем ответ при переходе к новой игре
  };

  // Функция возврата в главное меню
  const reset = () => {
    setSelectedGame(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.noirOverlay} />
      
      <AnimatePresence mode="wait">
        {!selectedGame ? (
          // --- ЭКРАН СПИСКА ИГР ---
          <motion.div 
            key="list" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.9 }}
            style={styles.card}
          >
            <h1 style={styles.brand}>DANETKI<span style={{color: '#ff0033'}}>NOIR</span></h1>
            <p style={styles.subtitle}>ВЫБЕРИТЕ ДЕЛО ДЛЯ РАССЛЕДОВАНИЯ</p>
            
            <div style={styles.list}>
              {DANETKI_LIST.map((game) => (
                <button key={game.id} onClick={() => selectGame(game)} style={styles.listItem}>
                  <span>{game.title}</span>
                  <ChevronRight size={18} color="#ff0033" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          // --- ЭКРАН САМОЙ ИГРЫ ---
          <motion.div 
            key="game" 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -50 }}
            style={styles.gameCard}
          >
            <button onClick={reset} style={styles.backBtn}><RotateCcw size={16} /> К СПИСКУ</button>
            
            <h2 style={styles.gameTitle}>{selectedGame.title}</h2>
            
            <div style={styles.taskBox}>
              <p style={styles.taskText}>{selectedGame.task}</p>
            </div>

            {/* Блок ответа с анимацией переворота */}
            <div 
              style={{...styles.answerBox, background: showAnswer ? 'rgba(255,0,51,0.1)' : 'rgba(255,255,255,0.02)'}}
              onClick={() => setShowAnswer(!showAnswer)}
            >
              <div style={styles.answerHeader}>
                {showAnswer ? <EyeOff size={20} /> : <Eye size={20} />}
                <span>{showAnswer ? "СКРЫТЬ ОТВЕТ" : "ПОСМОТРЕТЬ ОТВЕТ (ТОЛЬКО ДЛЯ ВЕДУЩЕГО)"}</span>
              </div>
              
              {showAnswer && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  style={styles.answerText}
                >
                  {selectedGame.answer}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- СТИЛИ (Noir UI) ---
const styles = {
  container: { height: '100dvh', background: '#080808', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: 'Unbounded, sans-serif' },
  noirOverlay: { position: 'fixed', inset: 0, background: 'radial-gradient(circle, transparent, rgba(0,0,0,0.9))', pointerEvents: 'none' },
  brand: { fontSize: '28px', fontWeight: '900', letterSpacing: '-1px', marginBottom: '5px' },
  subtitle: { fontSize: '10px', color: '#666', letterSpacing: '2px', marginBottom: '30px' },
  card: { zIndex: 10, width: '100%', maxWidth: '400px', textAlign: 'center' },
  list: { display: 'flex', flexDirection: 'column', gap: '12px' },
  listItem: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '18px 25px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: '0.3s' },
  gameCard: { zIndex: 10, width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column' },
  backBtn: { background: 'none', border: 'none', color: '#666', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', cursor: 'pointer' },
  gameTitle: { color: '#ff0033', fontSize: '24px', fontWeight: '900', marginBottom: '20px' },
  taskBox: { background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '25px', marginBottom: '20px', borderLeft: '4px solid #ff0033' },
  taskText: { fontSize: '16px', lineHeight: '1.6', color: '#eee' },
  answerBox: { padding: '20px', borderRadius: '20px', cursor: 'pointer', border: '1px dashed rgba(255,0,51,0.3)' },
  answerHeader: { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', fontWeight: 'bold', color: '#ff0033' },
  answerText: { marginTop: '15px', fontSize: '14px', lineHeight: '1.5', color: '#fff' }
};
