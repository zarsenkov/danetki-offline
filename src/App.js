import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Eye, EyeOff, RotateCcw } from 'lucide-react';

// --- БАЗА ДАННЫХ ДАНЕТОК ---
const DANETKI_LIST = [
  { id: 1, title: "Парашютист", task: "Человек лежит мертвый в поле, рядом нераскрытый рюкзак. Что случилось?", answer: "Это был парашютист, у которого не раскрылся парашют." },
  { id: 2, title: "Лифт", task: "Человек живет на 10 этаже. Едет на 1-й утром, а вечером до 7-го и идет пешком. Почему?", answer: "Он очень маленького роста (карлик) и не дотягивается до кнопки 10 этажа." },
  { id: 3, title: "Рыбка Билл", task: "Билл мертв, в комнате лужа и осколки стекла. Кто убил Билла?", answer: "Билл — золотая рыбка, его аквариум разбился." },
  { id: 4, title: "Официант", task: "Человек зашел в бар и попросил стакан воды. Официант достал ружье и выстрелил в воздух. Человек сказал 'Спасибо' и ушел. Почему?", answer: "У человека была икота. Официант напугал его, икота прошла." },
  { id: 5, title: "Альпинисты", task: "Два человека связаны одной веревкой. Один прыгает в пропасть, второй остается стоять. Зачем?", answer: "Они альпинисты. Один сорвался, а второй его удержал (страховка)." },
  { id: 6, title: "Голос на пленке", task: "Мужчина убил жену и записал это на диктофон. Полиция приехала, послушала запись и сразу арестовала его. Почему?", answer: "В конце записи он не выключил диктофон сам — голос полиции зафиксировал, как он это сделал при них." },
  { id: 7, title: "Тьма в поезде", task: "Человек ехал в поезде, зашел в туннель и покончил с собой. Если бы он ехал в вагоне для курящих, он бы выжил. Почему?", answer: "Он был слепым, ему сделали операцию. В туннеле он подумал, что снова ослеп. Если бы он курил, он бы увидел огонек сигареты." },
  { id: 8, title: "Сон водителя", task: "Водитель грузовика едет по улице с односторонним движением против знака, не зажигает фары и не останавливается перед полицией. Почему его не арестовали?", answer: "Он шел пешком по тротуару." },
  { id: 9, title: "Спичка", task: "Человек найден мертвым в пустыне со сломанной спичкой в руке. Почему он умер?", answer: "Они летели на воздушном шаре, который начал падать. Чтобы облегчить его, они тянули жребий (спички). Ему выпала короткая, и его скинули." },
  { id: 10, title: "Радио", task: "Человек слушает радио, выключает его и прыгает из окна. Почему?", answer: "Он работал на маяке. Выключив радио, он подумал, что туман рассеялся, но из-за его ошибки корабль разбился." },
  { id: 11, title: "Остров", task: "Человек на необитаемом острове нашел сундук с золотом, но расстроился. Почему?", answer: "Он умирает от жажды, золото ему не поможет." },
  { id: 12, title: "Письмо", task: "Мужчина получил письмо, прочитал его и покончил с собой. Письмо было пустым. Почему?", answer: "Он ждал вестей от пропавшего сына. Пустое письмо означало, что сын не может писать (умер)." },
  { id: 13, title: "Телефон", task: "Звонит телефон. Человек берет трубку, молчит и вешает её. Зачем?", answer: "Он живет в гостинице и не мог уснуть из-за храпа соседа за стеной. Звонок разбудил соседа и прервал храп." },
  { id: 14, title: "Снег", task: "Утром выпал снег, но на дорожке к дому соседа нет ни одного следа. Сосед не выходил из дома. Как он получил газету?", answer: "Газету ему принесли еще вчера вечером до снега." },
  { id: 15, title: "Шуба", task: "Женщина купила дорогую шубу, но через день сожгла её. Почему?", answer: "В шубе завелась моль, которая могла испортить весь гардероб." },
  { id: 16, title: "Мост", task: "Человек стоит на мосту, видит приближающийся поезд и прыгает под него. Зачем?", answer: "Он прыгнул не 'под поезд', а 'с моста в воду', спасая тонущего ребенка." },
  { id: 17, title: "Книга", task: "Человек купил книгу, прочитал первую страницу и выкинул её. Зачем?", answer: "Это был телефонный справочник, он нашел нужный номер." },
  { id: 18, title: "Лед", task: "Человек найден повешенным в пустой комнате. Под ногами только лужа воды. Стула нет. Как он это сделал?", answer: "Он встал на глыбу льда, которая потом растаяла." },
  { id: 19, title: "Яд", task: "Два человека пили один и тот же напиток со льдом. Один выпил быстро и выжил, второй пил медленно и умер. Почему?", answer: "Яд был в кубиках льда. Лёд не успел растаять в первом стакане." },
  { id: 20, title: "Свет", task: "Человек лег спать и выключил свет. Утром он посмотрел в окно и закричал от ужаса. Что он увидел?", answer: "Он был смотрителем маяка. Выключив свет, он погубил корабли." }
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
