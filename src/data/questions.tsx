import { 
  Leaf, Lightbulb, Recycle, Bike, Wind, Factory, Utensils, Sun, 
  BatteryCharging, Droplets, Droplet, Zap, Trash2, Sprout, BookOpen, Globe2, Thermometer
} from "lucide-react";

export type Difficulty = "basic" | "advanced";

export interface Question {
  id: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  icon: any; // React.ElementType
}

export const questions: Question[] = [
  // === 基礎題 (25題) ===
  { id: "b1", difficulty: "basic", question: "離開教室時，最後一個離開的同學應該怎麼做？", options: ["隨手關閉電燈和冷氣", "讓它開著保持通風", "只關冷氣不關燈", "趕快跑出去不用管"], answerIndex: 0, explanation: "隨手關燈和關閉電源是節約能源最基本也最重要的一步喔！", icon: Lightbulb },
  { id: "b2", difficulty: "basic", question: "喝完飲料的塑膠杯應該丟在哪裡？", options: ["紙類回收", "一般垃圾桶", "塑膠資源回收桶", "廚餘桶"], answerIndex: 2, explanation: "塑膠杯屬於資源回收物，確實分類可以減少垃圾量並回收再利用！", icon: Recycle },
  { id: "b3", difficulty: "basic", question: "為了減少碳排放，去學校最好的交通方式是什麼？", options: ["每天請父母開車接送", "搭乘計程車", "走路、騎自行車或搭大眾運輸", "自己騎機車"], answerIndex: 2, explanation: "步行、騎腳踏車或搭乘大眾交通工具屬於「綠色運輸」，能有效減少溫室氣體排放。", icon: Bike },
  { id: "b4", difficulty: "basic", question: "洗手時，怎樣做可以節約用水？", options: ["水龍頭開到最大", "抹肥皂時先把水龍頭關起來", "邊洗手邊玩水", "洗越久越好"], answerIndex: 1, explanation: "抹肥皂時暫時關閉水龍頭，每次能省下好幾公升的乾淨水資源呢。", icon: Droplets },
  { id: "b5", difficulty: "basic", question: "如果天氣只有一點點熱（大約26度），我們應該？", options: ["馬上把冷氣開到20度", "穿厚外套然後開冷氣", "打開窗戶通風或吹電風扇即可", "打開冰箱門散熱"], answerIndex: 2, explanation: "適度利用自然通風或電風扇，減少對冷氣的依賴，是最環保的避暑方式。", icon: Wind },
  { id: "b6", difficulty: "basic", question: "電腦教室下課後應該要？", options: ["讓電腦開著", "關閉電腦與螢幕電源", "拔掉所有線路", "用外套蓋住螢幕"], answerIndex: 1, explanation: "確實關閉電腦與螢幕電源，能避免不必要的待機耗電。", icon: Lightbulb },
  { id: "b7", difficulty: "basic", question: "吃午餐時，最環保的餐具是？", options: ["免洗筷", "塑膠湯匙", "自己帶可重複使用的餐具", "紙餐盒"], answerIndex: 2, explanation: "自備環保餐具能大幅減少一次性塑膠及木材消耗。", icon: Utensils },
  { id: "b8", difficulty: "basic", question: "發現洗手槽的水龍頭滴水不停，應該怎麼辦？", options: ["裝作沒看到", "通知總務處或老師維修", "拿膠帶貼起來", "放臉盆接水不管它"], answerIndex: 1, explanation: "漏水會浪費大量水資源，應盡速報修。", icon: Droplets },
  { id: "b9", difficulty: "basic", question: "教室冷氣溫度應該設定在幾度最剛好？", options: ["20-22度", "26-28度", "越低越好", "30度以上"], answerIndex: 1, explanation: "26-28度是人體感到舒適的溫度範圍，搭配電風扇可以冷得更均勻且省電。", icon: Wind },
  { id: "b10", difficulty: "basic", question: "用過的筆記本如果背面還有空白，可以怎麼做？", options: ["直接丟進垃圾桶", "拿去燒掉", "當作計算紙重複使用", "撕下來摺紙飛機"], answerIndex: 2, explanation: "將單面廢紙作為計算紙再次利用，是落實物盡其用的好習慣。", icon: Recycle },
  { id: "b11", difficulty: "basic", question: "丟棄寶特瓶前正確的步驟是？", options: ["直接丟就好", "洗淨、壓扁、回收", "裝滿水再丟", "用火燒掉"], answerIndex: 1, explanation: "洗淨壓扁不僅能減少堆放體積，也能讓回收過程更順利衛生。", icon: Recycle },
  { id: "b12", difficulty: "basic", question: "如果大白天走廊非常明亮，我們可以？", options: ["關閉走廊多餘的燈光", "把燈全打開", "把窗簾拉上開燈", "點蠟燭"], answerIndex: 0, explanation: "善用自然採光，可以減少日間照明用電。", icon: Sun },
  { id: "b13", difficulty: "basic", question: "打掃時收集到的校園落葉，最環保的處理方式是？", options: ["倒進一般垃圾袋發財", "集中作落葉堆肥", "堆在水溝裡", "用火燒掉"], answerIndex: 1, explanation: "落葉堆肥可轉化為天然肥料，回歸校園土壤，這是資源循環的一種。", icon: Leaf },
  { id: "b14", difficulty: "basic", question: "買文具時，我們應該優先選擇哪一種？", options: ["包裝最華麗的", "最便宜拋棄式的", "有環保標章的產品", "會發出聲音的"], answerIndex: 2, explanation: "環保標章代表該產品在製造過程中對環境較友善，且符合低污染的標準。", icon: Sprout },
  { id: "b15", difficulty: "basic", question: "營養午餐如果吃不完該怎麼做最好？", options: ["一開始就只盛裝自己能吃完的份量", "偷偷丟到垃圾桶", "免強吃下肚子痛", "倒在花盆裡"], answerIndex: 0, explanation: "源頭減量是最好的做法，吃多少拿多少，減少廚餘。", icon: Utensils },
  { id: "b16", difficulty: "basic", question: "洗拖把怎麼做比較省水？", options: ["水龍頭開最大沖洗", "一邊聊天一邊開水", "用水桶接水洗拖把", "用飲水機的水洗"], answerIndex: 2, explanation: "使用水桶盛水清洗可以控制用水量，避免長流水的浪費。", icon: Droplet },
  { id: "b17", difficulty: "basic", question: "運動完口渴了，最好的解渴方式是？", options: ["買瓶裝礦泉水", "買手搖飲料", "用自己的水壺裝學校飲水機的水", "忍耐不喝水"], answerIndex: 2, explanation: "自備水壺是最環保、省錢且減少塑膠瓶的做法。", icon: Droplets },
  { id: "b18", difficulty: "basic", question: "氣溫稍微變涼卻有些悶的時候，室內該如何保持舒適？", options: ["開強烈冷氣", "打開窗戶讓空氣對流", "一直開著冰箱", "全部關緊躲起來"], answerIndex: 1, explanation: "開窗自然通風能改善室內空氣品質，又不需要耗電。", icon: Wind },
  { id: "b19", difficulty: "basic", question: "不小心打破了玻璃杯，玻璃碎片應該怎麼處理？", options: ["用紙包好丟一般垃圾", "直接丟塑膠回收", "妥善包裝後標示清楚交給資源回收車", "藏在土裡"], answerIndex: 2, explanation: "玻璃屬於資源回收，但打破的玻璃需用紙妥善包住並標示，以免清潔人員受傷。", icon: Recycle },
  { id: "b20", difficulty: "basic", question: "哪一種方式能有效減少上課的紙張使用？", options: ["用單面空白處印講義", "老師利用電子產品投影教材", "每人發十份備用考卷", "把紙剪小塊"], answerIndex: 1, explanation: "數位化與電子白板的使用，能大幅取代傳統的紙本講義。", icon: BookOpen },
  { id: "b21", difficulty: "basic", question: "廢棄不用的電池應該怎麼辦？", options: ["丟進一般垃圾", "埋在公園土裡", "拿到便利商店或學校的廢電池回收筒", "和廢紙一起回收"], answerIndex: 2, explanation: "廢電池含有重金屬，隨意丟棄會嚴重污染土壤和地下水，必須妥善分類回收。", icon: BatteryCharging },
  { id: "b22", difficulty: "basic", question: "教室冷氣濾網大約多久清洗一次比較省電？", options: ["每天", "兩週到一個月", "一年一次", "壞掉再洗"], answerIndex: 1, explanation: "定期清洗濾網能維持冷氣效能，大約可節省2~5%的耗電。", icon: Wind },
  { id: "b23", difficulty: "basic", question: "為什麼要多吃在地種植的蔬菜水果？", options: ["因為長得比較奇怪", "能減少食物運輸過程產生的碳排放", "因為一定比較甜", "為了多花錢"], answerIndex: 1, explanation: "在地食材「食物里程」短，減少運輸所需的燃料與排碳。", icon: Leaf },
  { id: "b24", difficulty: "basic", question: "去福利社買東西時，為了環保可以怎麼做？", options: ["買三層塑膠包裝的零食", "自己不拿提袋，直接用雙手或帶購物袋拿走", "要求店員多給幾個塑膠袋", "買完馬上把包裝隨地丟"], answerIndex: 1, explanation: "拒絕不必要的包裝與提袋，是消費者實踐綠生活最簡單的做法。", icon: Trash2 },
  { id: "b25", difficulty: "basic", question: "如果一定要列印文件，怎麼設定比較環保？", options: ["單面彩色列印", "放大字體印個20頁", "雙面列印並適當縮小", "每印一張換一台印表機"], answerIndex: 2, explanation: "雙面列印與多頁合併列印能直接將紙張消耗減半。", icon: Recycle },

  // === 進階題 (25題) ===
  { id: "a1", difficulty: "advanced", question: "什麼是「碳足跡」(Carbon Footprint)？", options: ["鞋底沾上碳粉踩出的腳印", "一項產品或活動在整個生命週期中排放的溫室氣體總量", "植物吸收二氧化碳的速度", "大氣層中臭氧破洞的大小"], answerIndex: 1, explanation: "碳足跡可以衡量我們的行為對氣候變遷造成多少影響，數值越低越環保。", icon: Factory },
  { id: "a2", difficulty: "advanced", question: "學校宣導達到「淨零碳排」的最終目標是？", options: ["完全不使用任何電力", "將校園所有的樹木砍掉", "人為造成的溫室氣體排放量，與人為移除量達到平衡", "每天只能呼吸規定次數"], answerIndex: 2, explanation: "淨零並不是「零排放」，而是讓排放的量與減少/吸收的量互相抵銷，達到淨值為零。", icon: Globe2 },
  { id: "a3", difficulty: "advanced", question: "校園餐廳可以透過哪種方式幫助達成淨零目標？", options: ["提供更多一次性塑膠餐具", "推廣在地食材與低碳蔬食餐點", "食物煮完直接倒掉不吃", "進口國外的昂貴碳酸飲料"], answerIndex: 1, explanation: "吃在地食材能減少長途運輸的碳排，低碳蔬食則能減少畜牧業產生的溫室氣體。", icon: Utensils },
  { id: "a4", difficulty: "advanced", question: "越來越多學校在屋頂安裝太陽能板，這屬於何種計畫？", options: ["發展綠色再生能源", "增加化石燃料的使用", "為了美觀沒有實際作用", "溫室氣體製造計畫"], answerIndex: 0, explanation: "太陽能是取之不盡的綠色再生能源，能替代燃煤發電，減少碳排。", icon: Sun },
  { id: "a5", difficulty: "advanced", question: "以下哪個不是「資源循環零廢棄」的做法？", options: ["使用環保杯買飲料", "將廢棄紙張做成再生紙", "把舊手機直接丟進焚化爐燒掉", "二手物品交換再利用"], answerIndex: 2, explanation: "舊手機內含有許多珍貴金屬與有害物質，必須透過專門的電子廢棄物管道回收。", icon: BatteryCharging },
  { id: "a6", difficulty: "advanced", question: "「溫室效應」主要涉及哪些氣體？", options: ["氧氣與氮氣", "二氧化碳與甲烷", "氦氣與氫氣", "氬氣與氖氣"], answerIndex: 1, explanation: "溫室氣體如二氧化碳(CO2)與甲烷(CH4)會吸收地球表面的熱輻射，導致全球暖化。", icon: Factory },
  { id: "a7", difficulty: "advanced", question: "近年在永續發展中常聽到的「ESG」代表什麼？", options: ["環境(Env)、社會(Social)、公司治理(Gov)", "教育、科學、地理", "電子、太空、重力", "效率、速度、成長"], answerIndex: 0, explanation: "ESG是評估一個組織永續經營與社會責任的三大核心指標。", icon: Sprout },
  { id: "a8", difficulty: "advanced", question: "產品上的「碳標籤」是為了告訴消費者什麼資訊？", options: ["產品有多重", "表示該產品從原料、製造到廢棄所產生的碳排放量", "產品烤焦的程度", "能產生多少熱量"], answerIndex: 1, explanation: "碳標籤能幫助消費者在購物時，辨識並選擇碳排放較低的綠色商品。", icon: Factory },
  { id: "a9", difficulty: "advanced", question: "什麼是「循環經濟」(Circular Economy)？", options: ["一種會不斷繞圈的商業模式", "從設計階段就考量資源重複利用，消滅廢棄物概念", "用錢買別人丟掉的垃圾", "不管效率只管生產"], answerIndex: 1, explanation: "傳統是「開採-製造-廢棄」，循環經濟則追求「資源-產品-再生資源」的封閉式循環。", icon: Recycle },
  { id: "a10", difficulty: "advanced", question: "電視或冷氣在插著插頭但未開啟的狀態下，會不會耗電？", options: ["絕對不會", "會，這稱為「待機電力」", "不但不耗電還會發電", "只有晚上會耗電"], answerIndex: 1, explanation: "有指示燈或遙控功能的電器，未開機仍會耗損待機電力，長期累積相當驚人。", icon: Zap },
  { id: "a11", difficulty: "advanced", question: "台灣的「節能標章」圖案是由哪些元素組成？", options: ["星星、月亮、太陽", "插頭、愛心、雙手及火苗", "大樹和水滴", "燈泡和烏龜"], answerIndex: 1, explanation: "設計理念是雙手懷抱著火苗，呈現出節省能源與愛護環境的意涵。", icon: Lightbulb },
  { id: "a12", difficulty: "advanced", question: "什麼是「水足跡」(Water Footprint)？", options: ["沾水踩出的腳印", "一個產品在整個生命週期中消耗掉的所有水資源總體積", "海洋佔地球的面積", "喝水的能力"], answerIndex: 1, explanation: "包含農業灌溉、工業製造等隱形用水，例如生產一件棉T恤可能需要上千公升的水。", icon: Droplets },
  { id: "a13", difficulty: "advanced", question: "以下哪一種交通方式不屬於「綠色運輸」？", options: ["搭乘捷運", "自己開一輛燃油小汽車", "騎乘YouBike", "共乘電動巴士"], answerIndex: 1, explanation: "自己駕駛燃油汽車的人均碳排放量最高，不符合綠色運輸低碳排的原則。", icon: Factory },
  { id: "a14", difficulty: "advanced", question: "台灣推動的「2050淨零排放」中，極關鍵的一環是發展何種能源？", options: ["媒炭火力發電", "石油與天然氣", "太陽光電、風力等再生能源", "人力發電"], answerIndex: 2, explanation: "再生能源不產生溫室氣體，是替代傳統化石燃料的關鍵解方。", icon: Sun },
  { id: "a15", difficulty: "advanced", question: "何謂「食物里程」(Food Miles)？", options: ["比賽吃東西的速度", "食物從產地到消費者餐桌所經過的運輸距離", "食物在肚子裡消化的時間", "食物保存的期限"], answerIndex: 1, explanation: "里程越高，運輸過程消耗的燃料與排放的溫室氣體就越多。", icon: Globe2 },
  { id: "a16", difficulty: "advanced", question: "LED燈泡與傳統白熾燈泡相比，大約可節省多少比例的電力？", options: ["10%", "30%", "70% 到 80% 甚至更多", "兩者耗電一樣"], answerIndex: 2, explanation: "LED發光效率高且壽命長，是照明節能的最佳選擇。", icon: Lightbulb },
  { id: "a17", difficulty: "advanced", question: "校園建置「雨水回收系統」，收集到的雨水通常用於哪裡最合適？", options: ["直接拿來當飲用水", "沖馬桶與澆灌校園植物", "用來煮營養午餐", "拿來洗臉"], answerIndex: 1, explanation: "雨水為「中水」，處理後用於沖廁和灌溉，能有效減輕自來水廠的負擔。", icon: Droplet },
  { id: "a18", difficulty: "advanced", question: "學校回收的廚餘，經過處理後最常見的兩大用途是？", options: ["做成塑膠與鐵器", "堆肥與養豬(飼料)", "直接傾倒至海中", "曬乾當成建築材料"], answerIndex: 1, explanation: "熟廚餘多用作養豬飼料，生廚餘則透過發酵成為有機堆肥。", icon: Sprout },
  { id: "a19", difficulty: "advanced", question: "「碳匯」(Carbon Sink)的意思是什麼？", options: ["計算碳排的會計準則", "能將二氧化碳從大氣中吸收並儲存起來的自然或人工機制(如森林、海洋)", "買賣碳排放權的匯率", "碳排放的稅金"], answerIndex: 1, explanation: "保護森林與海洋等碳匯，對於抵銷碳排放、達成淨零至關重要。", icon: Leaf },
  { id: "a20", difficulty: "advanced", question: "國際上為了應對氣候變遷，於2015年通過了哪一項重要協定將升溫控制在1.5度內？", options: ["京都議定書", "巴黎協定", "蒙特婁議定書", "華盛頓公約"], answerIndex: 1, explanation: "《巴黎協定》是全球氣候治理的里程碑，各國承諾制定減碳目標。", icon: Globe2 },
  { id: "a21", difficulty: "advanced", question: "「氣候變遷」造成的影響不包含下列何者？", options: ["海平面上升", "極端氣候(如暴雨、乾旱)發生頻率增加", "南北極冰棚融化", "地球重力消失"], answerIndex: 3, explanation: "重力與氣候無關。氣候變遷嚴重威脅生態平衡及人類生存環境。", icon: Factory },
  { id: "a22", difficulty: "advanced", question: "為達成「零廢棄」，我們常說的 3R 原則中最首要的第一步是什麼？", options: ["回收 (Recycle)", "減量 (Reduce)", "再使用 (Reuse)", "拒絕 (Refuse)"], answerIndex: 1, explanation: "源頭減量(Reduce)能直接減少資源消耗與後續處理成本，是解決廢棄物問題的根本。", icon: Recycle },
  { id: "a23", difficulty: "advanced", question: "買家電時，能源效率分級標示中，哪一個等級最省電？", options: ["第1級", "第3級", "第5級", "第10級"], answerIndex: 0, explanation: "級數越低越省電，第1級產品是同類產品中的節能模範生。", icon: Zap },
  { id: "a24", difficulty: "advanced", question: "政府推廣的「綠色採購」，包含了以下哪一項重點？", options: ["只買綠色的東西", "優先購買具環保標章、低污染、可回收的產品", "買便宜但會快速壞掉的物品", "購買國外進口的超跑"], answerIndex: 1, explanation: "綠色採購利用消費者的力量，鼓勵廠商生產對環境友善的商品。", icon: Sprout },
  { id: "a25", difficulty: "advanced", question: "在校園實踐「低碳生活」，下列哪一個做法是錯的？", options: ["少搭電梯，多走樓梯", "天氣冷就把所有暖氣開到最強並打開窗戶", "隨手關閉不使用的電源", "多吃當季在地蔬菜"], answerIndex: 1, explanation: "開暖氣又開窗會導致熱能流失、嚴重耗電，完全悖離低碳原則。", icon: Thermometer },
];
