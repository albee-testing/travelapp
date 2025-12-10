import React, { useState, useEffect, useRef } from 'react';
import { 
  Plane, 
  Train, 
  Utensils, 
  Camera, 
  MapPin, 
  Calendar, 
  Clock, 
  X, 
  Navigation, 
  Sun, 
  CloudRain, 
  Cloud,
  ChevronRight,
  Info,
  Map as MapIcon,
  ShoppingBag,
  Coins,
  ArrowRightLeft,
  Ticket,
  Plus,
  Edit2, // 新增：用於編輯地點資訊的圖標
  Trash2,
  Save,
  GripVertical,
  QrCode,
  ExternalLink,
  Mail,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

// --- 初始資料 (Initial Data) ---
const initialTripData = {
  title: "🇮🇹 Italy Xmas 2025",
  startDate: "2025-12-11",
  days: Array.from({ length: 13 }, (_, i) => i + 1),
  itinerary: {
    // Day 1: Dec 11 (Thurs)
    1: [
      {
        id: 'd1-1',
        time: '17:50',
        type: 'flight',
        title: '從香港出發 (HKG)',
        location: 'Hong Kong International Airport', 
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Hong+Kong+International+Airport',
        description: '搭乘航班 CA110 前往義大利。',
        ticketStatus: 'booked',
        details: {
          label: '航班資訊',
          info: '航班: CA110 / 訂位代號: ERXWL02025',
          imagePlaceholder: '電子機票截圖' 
        },
        ticketImages: [], // 新增：用於存放多個圖片 Base64 字串
      }
    ],
    // Day 2: Dec 12 (Fri)
    2: [
      {
        id: 'd2-1',
        time: '06:30',
        type: 'flight',
        title: '抵達米蘭機場 (MXP)',
        location: 'Malpensa Airport',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Malpensa+Airport',
        description: 'Landed MXP。辦理入境手續，領取行李。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd2-2',
        time: '09:00',
        type: 'hotel',
        title: 'Airbnb 放行李',
        location: 'Via Domenico Scarlatti, 30',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Via+Domenico+Scarlatti+30+Milan',
        description: '前往住宿地點寄放行李 (Put luggage)。',
        ticketStatus: 'booked',
        details: {
          label: '住宿資訊',
          info: 'Via Domenico Scarlatti, 30, Milan',
          imagePlaceholder: 'Airbnb 確認信'
        },
        ticketImages: [],
      },
      {
        id: 'd2-3',
        time: '13:00',
        type: 'shopping',
        title: 'DMAG Outlet',
        location: 'DMAG Outlet',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=DMAG+Outlet+Milan',
        description: '逛街購物行程。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd2-4',
        time: '14:00',
        type: 'food',
        title: '午餐：Matia\'s',
        location: 'Matia\'s',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Matia\'s+Milan',
        description: '享用當地美食。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd2-5',
        time: '15:00',
        type: 'shopping',
        title: 'Ferrari Store',
        location: 'Ferrari Store',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Ferrari+Store+Milan',
        description: '參觀法拉利旗艦店。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd2-6',
        time: '16:00',
        type: 'sightseeing',
        title: 'Navigli 運河區',
        location: 'Alzaia Naviglio Grande',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Alzaia+Naviglio+Grande',
        description: 'Alzaia Naviglio Grande (River) 漫步。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd2-7',
        time: '19:00',
        type: 'sightseeing',
        title: '聖誕市集 (Xmas market)',
        location: 'Milan Christmas Market',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Milan+Christmas+Market',
        description: '體驗米蘭聖誕市集氛圍。',
        ticketStatus: 'none',
        ticketImages: [],
      }
    ],
    // Day 3: Dec 13 (Sat)
    3: [
      {
        id: 'd3-1',
        time: '11:00',
        type: 'sightseeing',
        title: '米蘭大教堂 (Duomo)',
        location: 'Duomo di Milano',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Duomo+di+Milano',
        description: '參觀宏偉的哥德式教堂 (Church)。',
        ticketStatus: 'booked',
        details: {
          label: '門票資訊',
          info: '預約時段: 11:00',
          imagePlaceholder: '大教堂門票 QR'
        },
        ticketImages: [],
      },
      {
        id: 'd3-2',
        time: '14:00',
        type: 'sightseeing',
        title: '最後的晚餐 (Last supper)',
        location: 'Santa Maria delle Grazie',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Santa+Maria+delle+Grazie',
        description: '參觀達文西名畫。',
        ticketStatus: 'needed',
        ticketImages: [],
      },
      {
        id: 'd3-3',
        time: '15:00',
        type: 'shopping',
        title: '艾曼紐二世迴廊',
        location: 'Galleria Vittorio Emanuele II',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Galleria+Vittorio+Emanuele+II',
        description: 'Galleria Vittorio Emanuele II 逛街拍照。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd3-4',
        time: '18:00',
        type: 'sightseeing',
        title: '斯卡拉歌劇院 (Opera)',
        location: 'Teatro alla Scala',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Teatro+alla+Scala',
        description: 'Teatro alla Sala 參觀。',
        ticketStatus: 'needed',
        ticketImages: [],
      },
      {
        id: 'd3-5',
        time: '19:00',
        type: 'food',
        title: '晚餐與歌劇 (Dinner/Opera)',
        location: 'Teatro alla Scala Area',
        locationUrl: '',
        description: 'Dinner & watch opera。',
        ticketStatus: 'none',
        ticketImages: [],
      }
    ],
    // Day 4: Dec 14 (Sun)
    4: [
      {
        id: 'd4-1',
        time: '12:30',
        type: 'sightseeing',
        title: '米蘭足球賽 (Milan match)',
        location: 'San Siro Stadium',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=San+Siro+Stadium',
        description: '觀賞足球比賽。',
        ticketStatus: 'needed',
        ticketImages: [],
      },
      {
        id: 'd4-2',
        time: '16:45',
        type: 'train',
        title: '火車前往 Bolzano',
        location: 'Milano Centrale',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Milano+Centrale',
        description: '搭乘火車移動至 Bolzano。',
        ticketStatus: 'booked',
        details: {
          label: '車票資訊',
          info: 'Trenitalia 訂位代號：976BGH',
          imagePlaceholder: '電子車票截圖'
        },
        ticketImages: [],
      },
      {
        id: 'd4-3',
        time: '19:58',
        type: 'sightseeing',
        title: '抵達 Bolzano / 聖誕市集',
        location: 'Bolzano',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Bolzano',
        description: '19:58 抵達，參觀 Xmas Market。',
        ticketStatus: 'none',
        ticketImages: [],
      }
    ],
    // Day 5: Dec 15 (Mon) - Ortisei / Vigo di Fassa
    5: [
      {
        id: 'd5-1',
        time: '06:30',
        type: 'sightseeing',
        title: 'Seceda 纜車 / 景點',
        location: 'Ortisei, Seceda',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Seceda+Ortisei',
        description: '清晨前往 Seceda 觀景點。',
        ticketStatus: 'needed',
        ticketImages: [],
      },
      {
        id: 'd5-2',
        time: '07:00',
        type: 'sightseeing',
        title: 'Fly2 (活動)',
        location: 'Ortisei Area',
        locationUrl: '',
        description: '根據行程截圖的特殊活動，需確認具體內容。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd5-3',
        time: '14:00',
        type: 'sightseeing',
        title: '雪橇馬車之旅 (Carriage ride)',
        location: 'Dolomites Area',
        locationUrl: '',
        description: '馬車遊覽多洛米蒂山區。',
        ticketStatus: 'booked',
        details: {
          label: '聯絡資訊',
          info: '電話: 39 333 2446089 / Email: klaus.trocker@gmail.com',
          imagePlaceholder: '預約確認截圖'
        },
        ticketImages: [],
      },
      {
        id: 'd5-4',
        time: '17:00',
        type: 'sightseeing',
        title: '聖誕市集 (Xmas Market)',
        location: 'Ortisei / Vigo di Fassa',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Ortisei+Christmas+Market',
        description: '傍晚時分逛聖誕市集。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd5-5',
        time: '19:00',
        type: 'train',
        title: '公車 180 時刻表確認',
        location: 'Vigo di Fassa',
        locationUrl: '',
        description: '確認隔日前往 Mestre (Day 7) 的 Bus 180 時刻表。',
        ticketStatus: 'none',
        ticketImages: [],
      }
    ],
    // Day 6: Dec 16 (Tue) - Vigo di Fassa
    6: [
      {
        id: 'd6-1',
        time: '15:00',
        type: 'sightseeing',
        title: 'QC Terme 溫泉 (5 hours)',
        location: 'QC Terme Dolomiti',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=QC+Terme+Dolomiti',
        description: '在多洛米蒂享受 5 小時溫泉體驗。',
        ticketStatus: 'needed',
        ticketImages: [],
      }
    ],
    // Day 7: Dec 17 (Wed) - Venice (Transportation Breakdown)
    7: [
      {
        id: 'd7-1',
        time: '05:28',
        type: 'train',
        title: '公車 180：Vigo di Fassa to Bolzano',
        location: 'Vigo di Fassa, Carpe Diem',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Vigo+di+Fassa+Carpe+Diem+Bus+Stop',
        description: '搭乘 Bus 180 出發。',
        ticketStatus: 'booked',
        ticketImages: [],
      },
      {
        id: 'd7-2',
        time: '06:42',
        type: 'train',
        title: '抵達 Bolzano/Bozen 轉車',
        location: 'Bolzano/Bozen Stazione',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Bolzano+Stazione',
        description: '抵達 Bolzano (Bozen) 火車站，準備轉乘火車。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd7-3',
        time: '07:12',
        type: 'train',
        title: '火車：Bolzano/Bozen to Verona',
        location: 'Bolzano/Bozen Stazione',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Bolzano+Stazione',
        description: '搭乘火車前往 Verona。',
        ticketStatus: 'booked',
        ticketImages: [],
      },
      {
        id: 'd7-4',
        time: '08:40',
        type: 'train',
        title: '抵達 Verona 轉車',
        location: 'Verona Porta Nuova',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Verona+Porta+Nuova+Stazione',
        description: '抵達 Verona，準備轉乘火車往 Venezia Mestre。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd7-5',
        time: '09:00',
        type: 'train',
        title: '火車：Verona to Venezia Mestre',
        location: 'Verona Porta Nuova',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Verona+Porta+Nuova+Stazione',
        description: '搭乘火車前往 Venezia Mestre。',
        ticketStatus: 'booked',
        ticketImages: [],
      },
      {
        id: 'd7-6',
        time: '10:00',
        type: 'hotel',
        title: '抵達 Mestre & 寄放行李',
        location: 'Venezia Mestre Station',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Venezia+Mestre+Station',
        description: '抵達 Mestre，前往住宿 Four point Mestre 寄放行李。',
        ticketStatus: 'booked',
        details: {
          label: '住宿資訊',
          info: 'Four point Mestre',
          imagePlaceholder: '住宿確認信'
        },
        ticketImages: [],
      },
      {
        id: 'd7-7',
        time: '11:00',
        type: 'sightseeing',
        title: '赤足橋 & 里亞托橋 (Ponte di Rialto)',
        location: 'Ponte di Rialto, Venice',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Ponte+di+Rialto+Venice',
        description: '遊覽威尼斯地標里亞托橋。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd7-8',
        time: '12:00',
        type: 'sightseeing',
        title: '沉船書店 (Libreria Acqua Alta) 與嘆息橋',
        location: 'Libreria Acqua Alta',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Libreria+Acqua+Alta+Venice',
        description: '打卡特色書店並前往嘆息橋。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd7-9',
        time: '13:00',
        type: 'food',
        title: '午餐：I Tre Mercanti (Tiramisu)',
        location: 'I Tre Mercanti, Venice',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=I+Tre+Mercanti+Tiramisu+Venice',
        description: '享用著名的提拉米蘇。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd7-10',
        time: '15:00',
        type: 'sightseeing',
        title: '聖馬可廣場 & 聖馬可教堂',
        location: 'St. Mark\'s Square, Venice',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=St.+Mark\'s+Square+Venice',
        description: '參觀廣場和教堂。',
        ticketStatus: 'needed',
        ticketImages: [],
      },
      {
        id: 'd7-11',
        time: '16:00',
        type: 'food',
        title: 'Florian Cafe 下午茶',
        location: 'Caffè Florian, Venice',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Caffè+Florian+Venice',
        description: '在歷史悠久的咖啡館享用下午茶。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd7-12',
        time: '17:00',
        type: 'sightseeing',
        title: 'Gondola 貢多拉船 (學院橋日落)',
        location: 'Ponte dell\'Accademia, Venice',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Ponte+dell\'Accademia+Venice',
        description: '貢多拉體驗並觀賞學院橋日落。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd7-13',
        time: '18:00',
        type: 'train',
        title: '步行至憲法橋/火車站',
        location: 'Venice Santa Lucia Station',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Venice+Santa+Lucia+Station',
        description: '前往火車站區域，準備回 Mestre 住宿。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd7-14',
        time: '19:00',
        type: 'sightseeing',
        title: '威尼斯聖誕市集 (Xmas Market)',
        location: 'Venice Christmas Market',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Venice+Christmas+Market',
        description: '體驗威尼斯的夜間聖誕市集。',
        ticketStatus: 'none',
        ticketImages: [],
      }
    ],
    // Day 8: Dec 18 (Thu) - Florence
    8: [
      {
        id: 'd8-1',
        time: '10:30',
        type: 'food',
        title: '中央市場 (Mercato Centrale)',
        location: 'Mercato Centrale, Florence',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Mercato+Centrale+Florence',
        description: '參觀並享用午餐。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd8-2',
        time: '12:00',
        type: 'sightseeing',
        title: 'Biblioteca Marucelliana (圖書館)',
        location: 'Biblioteca Marucelliana, Florence',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Biblioteca+Marucelliana+Florence',
        description: '參觀歷史悠久的圖書館。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd8-3',
        time: '13:00',
        type: 'sightseeing',
        title: '學院美術館 (Galleria dell\'Accademia)',
        location: 'Galleria dell\'Accademia, Florence',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Galleria+dell\'Accademia+Florence',
        description: '參觀約 1 小時。',
        ticketStatus: 'needed',
        ticketImages: [],
      },
      {
        id: 'd8-4',
        time: '15:00',
        type: 'sightseeing',
        title: '老橋 (Ponte Vecchio)',
        location: 'Ponte Vecchio, Florence',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Ponte+Vecchio+Florence',
        description: '遊覽佛羅倫斯著名老橋。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd8-5',
        time: '16:00',
        type: 'sightseeing',
        title: '聖米尼亞託大殿與玫瑰園',
        location: 'San Miniato al Monte, Florence',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=San+Miniato+al+Monte+Florence',
        description: '參觀聖米尼亞託大殿，經過 Viale Giuseppe Poggi 玫瑰園。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd8-6',
        time: '17:00',
        type: 'sightseeing',
        title: '米開朗基羅廣場 (Piazzale Michelangelo)',
        location: 'Piazzale Michelangelo, Florence',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Piazzale+Michelangelo+Florence',
        description: '觀看日落和城市全景。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd8-7',
        time: '18:00',
        type: 'food',
        title: '晚餐：Trattoria Zaza (已預訂)',
        location: 'Trattoria Zaza, Florence',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Trattoria+Zaza+Florence',
        description: '晚餐已預訂。',
        ticketStatus: 'booked',
        details: {
          label: '訂位資訊',
          info: '餐廳：Zaza',
          imagePlaceholder: '訂位確認截圖'
        },
        ticketImages: [],
      },
      {
        id: 'd8-8',
        time: '19:00',
        type: 'sightseeing',
        title: 'Odeon 書店與電影院',
        location: 'Odeon Firenze',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Odeon+Firenze',
        description: '逛書店或看電影。',
        ticketStatus: 'none',
        ticketImages: [],
      }
    ],
    // Day 9: Dec 19 (Fri) - Pisa & La Spezia
    9: [
      {
        id: 'd9-1',
        time: '08:53',
        type: 'train',
        title: '佛羅倫斯 to 比薩 (Pisa)',
        location: 'Firenze Santa Maria Novella',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Firenze+Santa+Maria+Novella',
        description: '搭乘火車前往比薩。',
        ticketStatus: 'booked',
        ticketImages: [],
      },
      {
        id: 'd9-2',
        time: '10:24',
        type: 'sightseeing',
        title: '抵達比薩 / 斜塔打卡',
        location: 'Leaning Tower of Pisa',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Leaning+Tower+of+Pisa',
        description: '抵達比薩，參觀斜塔並拍照。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd9-3',
        time: '11:57',
        type: 'train',
        title: '比薩 to 拉斯佩齊亞 (La Spezia)',
        location: 'Pisa Centrale',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Pisa+Centrale',
        description: '搭乘火車前往 La Spezia。',
        ticketStatus: 'booked',
        ticketImages: [],
      },
      {
        id: 'd9-4',
        time: '13:54',
        type: 'train',
        title: '抵達拉斯佩齊亞',
        location: 'La Spezia Centrale',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=La+Spezia+Centrale',
        description: '抵達拉斯佩齊亞，準備Check-in 或前往五漁村。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd9-5',
        time: '18:00',
        type: 'food',
        title: '晚餐：Alla Marina / Trattoria dal billy',
        location: 'Monterosso / Riomaggiore (Cinque Terre)',
        locationUrl: '',
        description: '在五漁村地區享用晚餐。',
        ticketStatus: 'needed', 
        ticketImages: [],
      },
      {
        id: 'd9-6',
        time: '20:00',
        type: 'sightseeing',
        title: '聖誕市集 (Xmas Market)',
        location: 'La Spezia Christmas Market',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=La+Spezia+Christmas+Market',
        description: '逛當地的聖誕市集。',
        ticketStatus: 'none',
        ticketImages: [],
      }
    ],
    // Day 10: Dec 20 (Sat) - Florence
    10: [
      {
        id: 'd10-1',
        time: '09:45',
        type: 'sightseeing',
        title: '聖母百花大教堂 (Duomo)',
        location: 'Cattedrale di Santa Maria del Fiore, Florence',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Cattedrale+di+Santa+Maria+del+Fiore+Florence',
        description: '參觀大教堂、主廣場和共和廣場。',
        ticketStatus: 'booked',
        details: {
          label: '預約時段',
          info: '09:45 登頂或教堂參觀',
          imagePlaceholder: '門票 QR Code'
        },
        ticketImages: [],
      },
      {
        id: 'd10-2',
        time: '11:00',
        type: 'food',
        title: '午餐：L Opera Caffe / 尋找貓咪塗鴉',
        location: 'L\'Opera Caffè',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=L\'Opera+Caffè+Florence',
        description: '午餐或咖啡，並尋找 IG: cubetto_1967_ 的貓咪塗鴉。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd10-3',
        time: '14:00',
        type: 'sightseeing',
        title: '烏菲茲美術館 (The Uffizi)',
        location: 'Uffizi Gallery, Florence',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Uffizi+Gallery+Florence',
        description: '參觀文藝復興時期藝術收藏。',
        ticketStatus: 'needed',
        ticketImages: [],
      },
      {
        id: 'd10-4',
        time: '17:00',
        type: 'sightseeing',
        title: 'Fotoautomatica 拍照',
        location: 'Fotoautomatica, Florence',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Fotoautomatica+Florence',
        description: '找尋復古自助拍照亭。',
        ticketStatus: 'none',
        ticketImages: [],
      },
      {
        id: 'd10-5',
        time: '17:00',
        type: 'train',
        title: '離開佛羅倫斯',
        location: 'Firenze Santa Maria Novella',
        locationUrl: 'https://www.google.com/maps/search/?api=1&query=Firenze+Santa+Maria+Novella',
        description: '16:00 或 17:00 離開佛羅倫斯，前往下一站。',
        ticketStatus: 'booked',
        ticketImages: [],
      }
    ]
  }
};

// --- Helper Functions ---
const getIcon = (type) => {
  switch (type) {
    case 'flight': return <Plane className="w-5 h-5" />;
    case 'train': return <Train className="w-5 h-5" />;
    case 'food': return <Utensils className="w-5 h-5" />;
    case 'sightseeing': return <Camera className="w-5 h-5" />;
    case 'shopping': return <ShoppingBag className="w-5 h-5" />;
    case 'hotel': return <MapPin className="w-5 h-5" />;
    case 'ticket': return <Ticket className="w-5 h-5" />;
    default: return <MapPin className="w-5 h-5" />;
  }
};

const getColor = (type) => {
  switch (type) {
    case 'flight': return 'bg-blue-100 text-blue-600 border-blue-200';
    case 'train': return 'bg-orange-100 text-orange-600 border-orange-200';
    case 'food': return 'bg-red-100 text-red-600 border-red-200';
    case 'sightseeing': return 'bg-green-100 text-green-600 border-green-200';
    case 'shopping': return 'bg-pink-100 text-pink-600 border-pink-200';
    case 'hotel': return 'bg-purple-100 text-purple-600 border-purple-200';
    case 'ticket': return 'bg-amber-100 text-amber-600 border-amber-200';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
};

// 新增：每日城市與住宿的初始資料
const getInitialDailyLocations = () => ({
  1: { city: 'Hong Kong', address: 'HKG International Airport' },
  2: { city: 'Milan (米蘭)', address: 'Via Domenico Scarlatti, 30' },
  3: { city: 'Milan (米蘭)', address: 'Via Domenico Scarlatti, 30' },
  4: { city: 'Bolzano (波爾查諾)', address: 'Accommodation near Stazione' },
  5: { city: 'Dolomites (多洛米蒂)', address: 'Vigo di Fassa Accommodation' },
  6: { city: 'Dolomites (多洛米蒂)', address: 'Vigo di Fassa Accommodation' },
  7: { city: 'Venice (威尼斯)', address: 'Four point Mestre' },
  8: { city: 'Florence (佛羅倫斯)', address: 'Florence Accommodation (TBC)' },
  9: { city: 'Pisa / La Spezia (比薩/拉斯佩齊亞)', address: 'La Spezia Accommodation (TBC)' },
  10: { city: 'Florence (佛羅倫斯)', address: 'Florence Accommodation (TBC)' },
  11: { city: 'Rome (羅馬)', address: 'TBC' },
  12: { city: 'Rome (羅馬)', address: 'TBC' },
  13: { city: 'Returning', address: 'Fiumicino Airport (FCO)' },
});

// --- Location Edit Modal Component ---
const LocationEditModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [city, setCity] = useState(initialData.city || '');
  const [address, setAddress] = useState(initialData.address || '');

  useEffect(() => {
    if (initialData) {
      setCity(initialData.city || '');
      setAddress(initialData.address || '');
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ city, address });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[75] flex items-end sm:items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={onClose}></div>
      
      <div className="w-full sm:w-[400px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden pointer-events-auto animate-slide-up pb-safe flex flex-col">
        <div className="bg-purple-600 px-6 py-4 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-2">
            <Edit2 className="w-5 h-5" />
            <h3 className="font-bold text-lg">編輯當日地點</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">城市 / 地區</label>
              <input 
                type="text" 
                required
                placeholder="例如：米蘭 (Milan)"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 outline-none font-bold text-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">主要住宿 / 地點</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  required
                  placeholder="輸入住宿地址或主要地點"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 p-2.5 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button 
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-purple-200 flex justify-center items-center gap-2"
            >
              <Save className="w-5 h-5" />
              儲存地點資訊
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- Components ---

const EventFormModal = ({ isOpen, onClose, onSave, onDelete, initialData }) => {
  const [formData, setFormData] = useState({
    time: '',
    title: '',
    type: 'sightseeing',
    location: '',
    description: '',
    ticketStatus: 'none',
    ticketUrl: '',
    ticketImages: [], // 變更 1: 使用陣列來儲存多張圖片
    detailsLabel: '',
    detailsInfo: ''
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        time: initialData.time || '',
        title: initialData.title || '',
        type: initialData.type || 'sightseeing',
        location: initialData.location || '',
        description: initialData.description || '',
        ticketStatus: initialData.ticketStatus || 'none',
        ticketUrl: initialData.ticketUrl || '',
        // 變更 2: 初始化時載入 ticketImages 陣列
        ticketImages: initialData.ticketImages || [], 
        detailsLabel: initialData.details?.label || '',
        detailsInfo: initialData.details?.info || ''
      });
    } else {
      setFormData({
        time: '12:00',
        title: '',
        type: 'sightseeing',
        location: '',
        description: '',
        ticketStatus: 'none',
        ticketUrl: '',
        ticketImages: [], // 新增行程時預設為空陣列
        detailsLabel: '',
        detailsInfo: ''
      });
    }
  }, [initialData, isOpen]);

  const handleFileChange = (e) => {
    // 變更 3: 處理多檔案選擇
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ 
            ...prev, 
            ticketImages: [...prev.ticketImages, reader.result] // 附加新的 Base64 字串到陣列
          }));
        };
        reader.readAsDataURL(file);
      }
    });
    // 重設 input value 以便再次選擇相同檔案
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index) => {
    // 變更 4: 根據索引移除特定的圖片
    setFormData(prev => ({ 
      ...prev, 
      ticketImages: prev.ticketImages.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      ...formData,
      id: initialData?.id || Date.now().toString(),
      locationUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.location || formData.title)}`,
      // 確保將圖片陣列傳遞給 onSave
      ticketImages: formData.ticketImages,
      details: (formData.detailsLabel || formData.detailsInfo) ? {
        label: formData.detailsLabel || '詳細資訊',
        info: formData.detailsInfo,
        // 移除 imagePlaceholder，因為我們直接使用 ticketImages
      } : null
    };
    onSave(eventData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={onClose}></div>
      
      <div className="w-full sm:w-[480px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden pointer-events-auto animate-slide-up pb-safe max-h-[90vh] flex flex-col">
        <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center text-white shrink-0">
          <h3 className="font-bold text-lg">{initialData ? '編輯行程' : '新增行程'}</h3>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
          <div className="space-y-4">
            {/* Basic Info Group */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-xs font-bold text-gray-500 mb-1">時間</label>
                <input 
                  type="time" 
                  required
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1">類型</label>
                <select 
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="sightseeing">觀光 (Sightseeing)</option>
                  <option value="food">美食 (Food)</option>
                  <option value="shopping">購物 (Shopping)</option>
                  <option value="flight">航班 (Flight)</option>
                  <option value="train">交通 (Train)</option>
                  <option value="hotel">住宿 (Hotel)</option>
                  <option value="ticket">票券 (Ticket)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">標題</label>
              <input 
                type="text" 
                required
                placeholder="例如：米蘭大教堂"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">地點</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="輸入地點以產生導航連結"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Ticket Management Section */}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
              <label className="block text-xs font-bold text-amber-700 mb-2 flex items-center gap-1">
                <Ticket className="w-3 h-3" />
                門票 / 憑證管理
              </label>
              
              <div className="space-y-3">
                 {/* Status Selector */}
                <div className="flex gap-2">
                   {['none', 'needed', 'booked'].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFormData({...formData, ticketStatus: status})}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold border transition-colors ${
                          formData.ticketStatus === status 
                            ? (status === 'booked' ? 'bg-green-100 text-green-700 border-green-300' 
                               : status === 'needed' ? 'bg-red-100 text-red-700 border-red-300' 
                               : 'bg-gray-200 text-gray-700 border-gray-300')
                            : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {status === 'none' ? '無需門票' : status === 'needed' ? '尚未購買' : '已取得'}
                      </button>
                   ))}
                </div>

                {formData.ticketStatus !== 'none' && (
                  <>
                    {/* URL Input */}
                    <input 
                      type="url" 
                      placeholder="門票 PDF 連結 (URL)"
                      value={formData.ticketUrl}
                      onChange={e => setFormData({...formData, ticketUrl: e.target.value})}
                      className="w-full bg-white border border-amber-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                    />

                    {/* Image Upload (Screenshot) - 變更點 */}
                    <div>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        accept="image/*" 
                        multiple // 允許選擇多個檔案
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      
                      {/* Image List Preview */}
                      {formData.ticketImages.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          {formData.ticketImages.map((image, index) => (
                            <div key={index} className="relative group rounded-lg overflow-hidden border border-amber-200 shadow-sm">
                              <img src={image} alt={`Ticket ${index + 1}`} className="w-full h-24 object-cover" />
                              <button 
                                 type="button"
                                 onClick={() => removeImage(index)} // 移除特定圖片
                                 className="absolute top-1 right-1 p-1 bg-red-500/80 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                              <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-[10px] p-0.5 text-center font-bold">
                                憑證 {index + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Upload Button */}
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full h-16 border-2 border-dashed border-amber-300 rounded-lg bg-amber-50/50 flex flex-col items-center justify-center text-amber-600 cursor-pointer hover:bg-amber-100 transition-colors ${formData.ticketImages.length > 0 ? 'mt-2' : ''}`}
                      >
                        <Plus className="w-5 h-5 mb-1 opacity-50" />
                        <span className="text-xs font-bold">{formData.ticketImages.length > 0 ? '新增更多截圖' : '上傳 QR Code / 截圖'}</span>
                        <span className="text-[10px] opacity-70">支援多圖與離線檢視</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">描述</label>
              <textarea 
                rows="2"
                placeholder="行程備註..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              />
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            {initialData && (
              <button 
                type="button"
                onClick={() => {
                  if(window.confirm('確定要刪除此行程嗎？')) {
                    onDelete(initialData.id);
                    onClose();
                  }
                }}
                className="p-3 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            <button 
              type="submit"
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-200 flex justify-center items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {initialData ? '儲存變更' : '新增行程'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- View Ticket Modal ---
const ViewTicketModal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  const handleGmailSearch = () => {
    // Smart deep link to search Gmail
    const query = encodeURIComponent(event.title);
    window.open(`https://mail.google.com/mail/u/0/#search/${query}`, '_blank');
  };

  const hasImages = event.ticketImages && event.ticketImages.length > 0; // 變更 5: 檢查圖片陣列

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-800" />
        </button>

        <div className="bg-amber-50 p-4 border-b border-amber-100 text-center">
            <h3 className="font-bold text-gray-800">{event.title}</h3>
            <p className="text-xs text-gray-500 font-mono mt-1">Ticket & Voucher</p>
        </div>

        {/* 變更 6: 顯示多張圖片的滾動區域 */}
        <div className="p-0 bg-gray-100 min-h-[300px] flex items-center justify-center relative">
           {hasImages ? (
             <div className="w-full h-full overflow-y-auto max-h-[60vh] p-4 space-y-4">
               {event.ticketImages.map((image, index) => (
                  <div key={index} className="rounded-lg shadow-xl overflow-hidden bg-white p-2 border border-gray-200">
                    <img 
                       src={image} 
                       alt={`Ticket ${index + 1}`} 
                       className="w-full h-auto object-contain" 
                       style={{ maxHeight: '60vh' }}
                    />
                     <p className="text-center text-xs font-semibold text-gray-500 mt-2">
                        憑證 {index + 1}
                     </p>
                  </div>
               ))}
             </div>
           ) : (
             <div className="text-center p-8">
               <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-3" />
               <p className="text-gray-500 font-medium">未上傳圖片</p>
               <p className="text-xs text-gray-400 mt-1">請嘗試使用連結或搜尋信箱</p>
             </div>
           )}
        </div>

        <div className="p-4 space-y-3 bg-white">
          {event.ticketUrl && (
             <a 
               href={event.ticketUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition-colors"
             >
               <ExternalLink className="w-4 h-4" />
               開啟購票連結 / PDF
             </a>
          )}
          
          <button 
            onClick={handleGmailSearch}
            className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <Mail className="w-4 h-4" />
            在 Gmail 中搜尋此票券
          </button>
        </div>
      </div>
    </div>
  );
};

const CurrencyModal = ({ isOpen, onClose }) => {
  const [eur, setEur] = useState('');
  const [hkd, setHkd] = useState('');
  const [rate, setRate] = useState(8.2);

  useEffect(() => {
    if (eur !== '') {
      setHkd((parseFloat(eur) * rate).toFixed(1));
    } else {
      setHkd('');
    }
  }, [eur, rate]);

  const handleHkdChange = (val) => {
    setHkd(val);
    if (val !== '') {
      setEur((parseFloat(val) / rate).toFixed(2));
    } else {
      setEur('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={onClose}></div>
      <div className="w-full sm:w-80 bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden pointer-events-auto animate-slide-up transform transition-all pb-safe">
        <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5" />
            <h3 className="font-bold">匯率換算</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
            <span>當前匯率 (預設)</span>
            <div className="flex items-center gap-1">
              <span>1 EUR ≈ </span>
              <input type="number" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="w-12 bg-white border border-gray-300 rounded px-1 text-center font-bold text-gray-700 focus:outline-none focus:border-indigo-500" />
              <span>HKD</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 mb-1">EUR (€)</label>
                <input type="number" value={eur} onChange={(e) => setEur(e.target.value)} placeholder="0" className="w-full text-2xl font-bold text-indigo-600 border-b-2 border-indigo-100 focus:border-indigo-600 outline-none py-1 bg-transparent placeholder-indigo-200" autoFocus />
             </div>
             <ArrowRightLeft className="w-5 h-5 text-gray-300 mt-4" />
             <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 mb-1">HKD ($)</label>
                <input type="number" value={hkd} onChange={(e) => handleHkdChange(e.target.value)} placeholder="0" className="w-full text-2xl font-bold text-gray-800 border-b-2 border-gray-200 focus:border-gray-400 outline-none py-1 bg-transparent placeholder-gray-200" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DetailModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
            <Info className="w-5 h-5 text-indigo-500" />
            {data.details.label || '詳細資訊'}
          </h3>
          <button onClick={onClose} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6">
             <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">內容</h4>
             <p className="text-xl font-bold text-gray-800">{data.details.info}</p>
          </div>
          <div className="bg-gray-100 rounded-xl h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 text-gray-400">
            <Camera className="w-10 h-10 mb-2 opacity-50" />
            <span className="text-sm">{data.details.imagePlaceholder || '憑證截圖 / 照片'}</span>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <button onClick={onClose} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-200">關閉</button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function TravelApp() {
  const [activeDay, setActiveDay] = useState(2); // 從 Day 2 開始，因為 Day 1 仍在香港
  const [itinerary, setItinerary] = useState(initialTripData.itinerary);
  const [dailyLocations, setDailyLocations] = useState(getInitialDailyLocations()); // 新增：管理每日城市/住宿
  const [modalOpen, setModalOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [locationEditOpen, setLocationEditOpen] = useState(false); // 新增：地點編輯Modal
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [weather, setWeather] = useState({ temp: 8, condition: 'Sunny' });
  
  // Drag and Drop States
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const navScrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const currentItinerary = itinerary[activeDay] || [];
  const currentDailyLocation = dailyLocations[activeDay] || { city: 'TBC', address: 'TBC' };

  // Helper function to get weather based on day
  const getWeatherByDay = (day) => {
      // 保持原有的天氣邏輯
      if (day <= 3) return { temp: 9, condition: 'Sunny' };
      if (day === 4) return { temp: 9, condition: 'Sunny' };
      if (day === 5) return { temp: 4, condition: 'Sunny' };
      if (day === 6) return { temp: 6, condition: 'Sunny' };
      if (day === 7) return { temp: 8, condition: 'Cloudy' };
      if (day === 8) return { temp: 9, condition: 'Sunny' }; 
      if (day === 9) return { temp: 12, condition: 'Sunny' }; 
      if (day === 10) return { temp: 12, condition: 'Sunny' }; 
      
      const temps = [6, 8, 5, 10, 7]; 
      const conds = ['Sunny', 'Cloudy', 'Rainy'];
      return {
          temp: temps[Math.floor(Math.random() * temps.length)],
          condition: conds[Math.floor(Math.random() * conds.length)]
      };
  };

  useEffect(() => {
    setWeather(getWeatherByDay(activeDay));
    
    if(navScrollRef.current) {
        const button = navScrollRef.current.children[activeDay - 1];
        if (button) {
            button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }
  }, [activeDay]);

  // --- Location Edit Handler ---
  const handleSaveLocation = (newLocation) => {
      setDailyLocations(prev => ({
          ...prev,
          [activeDay]: newLocation
      }));
  };

  // --- CRUD Operations (Itinerary) ---
  const handleAddEvent = (newEvent) => {
    const updatedItinerary = { ...itinerary };
    if (!updatedItinerary[activeDay]) updatedItinerary[activeDay] = [];
    updatedItinerary[activeDay] = [...updatedItinerary[activeDay], newEvent].sort((a, b) => a.time.localeCompare(b.time));
    setItinerary(updatedItinerary);
  };

  const handleUpdateEvent = (updatedEvent) => {
    const updatedItinerary = { ...itinerary };
    updatedItinerary[activeDay] = updatedItinerary[activeDay].map(ev => 
      ev.id === updatedEvent.id ? updatedEvent : ev
    ).sort((a, b) => a.time.localeCompare(b.time));
    setItinerary(updatedItinerary);
  };

  const handleDeleteEvent = (id) => {
    const updatedItinerary = { ...itinerary };
    updatedItinerary[activeDay] = updatedItinerary[activeDay].filter(ev => ev.id !== id);
    setItinerary(updatedItinerary);
  };

  // --- Drag and Drop Handlers ---
  const onDragStart = (e, index) => {
    dragItem.current = index;
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragEnter = (e, index) => {
    dragOverItem.current = index;
  };

  const onDragEnd = () => {
    setIsDragging(false);
    if (dragItem.current !== null && dragOverItem.current !== null) {
        const _itinerary = { ...itinerary };
        const dayEvents = [...(_itinerary[activeDay] || [])];
        const draggedEvent = dayEvents[dragItem.current];
        dayEvents.splice(dragItem.current, 1);
        dayEvents.splice(dragOverItem.current, 0, draggedEvent);
        _itinerary[activeDay] = dayEvents;
        setItinerary(_itinerary);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const onDropOnDay = (e, targetDay) => {
    e.preventDefault();
    if (dragItem.current !== null) {
      const _itinerary = { ...itinerary };
      const sourceEvents = [...(_itinerary[activeDay] || [])];
      const eventToMove = sourceEvents[dragItem.current];
      sourceEvents.splice(dragItem.current, 1);
      _itinerary[activeDay] = sourceEvents;
      if (!_itinerary[targetDay]) _itinerary[targetDay] = [];
      _itinerary[targetDay] = [..._itinerary[targetDay], eventToMove].sort((a, b) => a.time.localeCompare(b.time));
      setItinerary(_itinerary);
      alert(`行程已移動至 Day ${targetDay}`);
      dragItem.current = null;
      dragOverItem.current = null;
      setIsDragging(false);
    }
  };

  const openDetail = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const openEdit = (event) => {
    setSelectedEvent(event);
    setFormOpen(true);
  };

  const openAdd = () => {
    setSelectedEvent(null);
    setFormOpen(true);
  };

  const openTicket = (event) => {
    setSelectedEvent(event);
    setTicketModalOpen(true);
  };
  
  const openLocationEdit = () => {
    setLocationEditOpen(true);
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Sunny': return <Sun className="w-8 h-8 text-yellow-400" />;
      case 'Rainy': return <CloudRain className="w-8 h-8 text-blue-400" />;
      default: return <Cloud className="w-8 h-8 text-gray-400" />;
    }
  };

  // Helper to render ticket status badge/button
  const renderTicketButton = (event) => {
    if (!event.ticketStatus || event.ticketStatus === 'none') return null;

    if (event.ticketStatus === 'needed') {
      return (
        <button 
          onClick={(e) => { e.stopPropagation(); openEdit(event); }}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          購票
        </button>
      );
    }
    
    // 檢查是否有圖片或連結
    const hasAssets = event.ticketImages?.length > 0 || event.ticketUrl;

    return (
      <button 
        onClick={(e) => { e.stopPropagation(); openTicket(event); }}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-100"
      >
        <QrCode className="w-3.5 h-3.5" />
        {hasAssets ? '憑證' : '連結'}
        {event.ticketImages?.length > 1 && (
            <span className="ml-1 px-1 rounded bg-emerald-200 text-emerald-800 text-[10px] font-black">{event.ticketImages.length}</span>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-32 relative overflow-hidden selection:bg-indigo-100">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-b-[40px] shadow-xl z-0"></div>

      {/* --- Hero Section --- */}
      <header className="relative z-10 pt-12 px-6 pb-8 text-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-sm font-medium opacity-80 uppercase tracking-widest mb-1">Travel Itinerary</h2>
            <h1 className="text-3xl font-extrabold">{initialTripData.title}</h1>
          </div>
          <div className="flex flex-col items-center bg-white/20 backdrop-blur-md rounded-2xl p-3 shadow-inner">
            {getWeatherIcon(weather.condition)}
            <span className="text-xl font-bold mt-1">{weather.temp}°C</span>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 shadow-lg">
          <div className="bg-white text-indigo-600 rounded-lg p-3 text-center min-w-[60px]">
            <span className="block text-xs font-bold uppercase">Dec</span>
            <span className="block text-2xl font-black">{10 + activeDay}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              {/* 變更: 顯示城市和地址 */}
              <h3 className="text-lg font-bold">
                {currentDailyLocation.city}
              </h3>
               <button 
                  onClick={openLocationEdit}
                  className="p-1 bg-white/10 hover:bg-white/30 rounded-full transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
            </div>
            {/* 變更: 顯示住宿地址 */}
            <p className="text-sm opacity-90 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              {currentDailyLocation.address}
            </p>
          </div>
        </div>
      </header>

      {/* --- Timeline Content --- */}
      <main className="relative z-10 px-4 -mt-4">
        {currentItinerary.length > 0 ? (
          <div className="space-y-6 pb-4">
            {currentItinerary.map((item, index) => (
              <div 
                key={item.id} 
                className={`relative flex group transition-all duration-300 ${isDragging && dragItem.current === index ? 'opacity-40 scale-95' : 'opacity-100'}`}
                draggable
                onDragStart={(e) => onDragStart(e, index)}
                onDragEnter={(e) => onDragEnter(e, index)}
                onDragEnd={onDragEnd}
                onDragOver={(e) => e.preventDefault()}
              >
                
                {/* Timeline Line */}
                <div className="absolute left-[3.25rem] top-0 bottom-0 w-0.5 bg-gray-200 group-last:bottom-auto group-last:h-full -z-10"></div>
                
                {/* Time Column */}
                <div className="w-14 flex-shrink-0 flex flex-col items-center pt-2 cursor-grab active:cursor-grabbing">
                  <span className="text-sm font-bold text-gray-600">{item.time}</span>
                  <div className={`mt-2 w-3 h-3 rounded-full border-2 border-white shadow-sm ring-2 ${item.type === 'flight' ? 'bg-blue-500 ring-blue-100' : 'bg-indigo-500 ring-indigo-100'}`}></div>
                  <GripVertical className="w-4 h-4 text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Card */}
                <div className="flex-1 ml-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative">
                  {/* Edit Button (Top Right) */}
                  <button 
                    onClick={() => openEdit(item)}
                    className="absolute top-3 right-3 p-1.5 text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors opacity-0 group-hover:opacity-100 z-10"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {/* Header: Icon & Title */}
                  <div className="flex items-start justify-between mb-3 pr-8">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${getColor(item.type)} relative`}>
                        {getIcon(item.type)}
                        {/* Status Dot */}
                        {item.ticketStatus === 'needed' && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></div>
                        )}
                        {item.ticketStatus === 'booked' && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-800 leading-tight">{item.title}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-500 mb-4 pl-1 border-l-2 border-gray-100 ml-1 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Actions Area */}
                  <div className="flex gap-2 mt-auto">
                    <button 
                      onClick={() => window.open(item.locationUrl, '_blank')}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5 text-indigo-500" />
                      導航
                    </button>
                    
                    {/* Dynamic Ticket Button */}
                    {renderTicketButton(item)}
                    
                    {/* Detail Button (Only if details exist AND no ticket button took up space, or logic can be adjusted) */}
                    {item.details && !renderTicketButton(item) && (
                      <button 
                        onClick={() => openDetail(item)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-100"
                      >
                        <Info className="w-3.5 h-3.5" />
                        詳細
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200">
            <div className="inline-block p-4 rounded-full bg-gray-50 mb-4">
              <Calendar className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">Day {activeDay} 尚無行程</p>
            <p className="text-xs text-gray-400 mt-1">點擊右下角 + 新增行程</p>
          </div>
        )}
      </main>

      {/* --- Floating Action Button (Add) --- */}
      <button
        onClick={openAdd}
        className="fixed bottom-28 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl shadow-indigo-300 flex items-center justify-center hover:bg-indigo-700 hover:scale-110 transition-all z-30"
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* --- Bottom Navigation --- */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.03)] z-40 pb-safe">
        <div className="flex items-center px-2 py-3">
          {/* Static Buttons Group */}
          <div className="flex items-center border-r border-gray-100 mr-2 pr-2">
            <button className="flex flex-col items-center justify-center min-w-[3.5rem] gap-1 p-1 text-gray-400 hover:text-indigo-600 transition-colors">
              <MapIcon className="w-5 h-5" />
              <span className="text-[9px] font-bold">MAP</span>
            </button>
            <button 
              onClick={() => setCurrencyOpen(true)}
              className="flex flex-col items-center justify-center min-w-[3.5rem] gap-1 p-1 text-gray-400 hover:text-indigo-600 transition-colors"
            >
              <Coins className="w-5 h-5" />
              <span className="text-[9px] font-bold">RATE</span>
            </button>
          </div>

          {/* Scrollable Days */}
          <div 
            ref={navScrollRef}
            className="flex-1 flex overflow-x-auto gap-3 px-2 no-scrollbar" 
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {initialTripData.days.map((day) => (
              <div
                key={day}
                onDragOver={(e) => {
                  e.preventDefault(); // Allow Drop
                  if (activeDay !== day) {
                    e.currentTarget.classList.add('bg-indigo-50', 'border-indigo-300');
                  }
                }}
                onDragLeave={(e) => {
                  if (activeDay !== day) {
                     e.currentTarget.classList.remove('bg-indigo-50', 'border-indigo-300');
                  }
                }}
                onDrop={(e) => {
                  e.currentTarget.classList.remove('bg-indigo-50', 'border-indigo-300');
                  if (activeDay !== day) onDropOnDay(e, day);
                }}
              >
                <button
                  onClick={() => setActiveDay(day)}
                  className={`flex-shrink-0 scroll-snap-align-center flex flex-col items-center justify-center w-12 h-14 rounded-xl transition-all duration-300 border ${
                    activeDay === day
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 transform scale-105'
                      : 'bg-white text-gray-400 border-gray-100 hover:border-indigo-200'
                  }`}
                >
                  {/* START: 根據您的要求修改為顯示月份 "Dec" 和日期 "10 + day" */}
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Dec</span>
                  <span className="text-lg font-black leading-none">{10 + day}</span>
                  {/* END: 變更區域 */}
                </button>
              </div>
            ))}
          </div>
          
           <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      </nav>

      {/* --- Modals --- */}
      <DetailModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        data={selectedEvent} 
      />

      <EventFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={selectedEvent ? handleUpdateEvent : handleAddEvent}
        onDelete={handleDeleteEvent}
        initialData={selectedEvent}
      />

      <CurrencyModal
        isOpen={currencyOpen}
        onClose={() => setCurrencyOpen(false)}
      />

      <ViewTicketModal
        isOpen={ticketModalOpen}
        onClose={() => setTicketModalOpen(false)}
        event={selectedEvent}
      />

      {/* 新增: 地點編輯 Modal */}
      <LocationEditModal
        isOpen={locationEditOpen}
        onClose={() => setLocationEditOpen(false)}
        onSave={handleSaveLocation}
        initialData={currentDailyLocation}
      />

      {/* --- Global Styles --- */}
      <style>{`
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .scroll-snap-align-center { scroll-snap-align: center; }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.5s ease-out forwards; opacity: 1; }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
}